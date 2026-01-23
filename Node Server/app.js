const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 3000;

/* ---------- Helpers ---------- */
function readDB() {
  return JSON.parse(fs.readFileSync("db.json", "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
}

/* ---------- Server ---------- */
http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  /* ---------- HOME ---------- */
  if (pathname === "/" && method === "GET") {
    res.end(JSON.stringify({
      message: "Server is running",
      endpoints: [
        "GET /contacts",
        "GET /contacts/:id",
        "POST /contacts",
        "PUT /contacts/:id",
        "DELETE /contacts/:id"
      ]
    }));
  }

  /* ---------- GET ALL CONTACTS ---------- */
  else if (pathname === "/contacts" && method === "GET") {
    const contacts = readDB();
    res.end(JSON.stringify(contacts));
  }

  /* ---------- GET CONTACT BY ID ---------- */
  else if (pathname.startsWith("/contacts/") && method === "GET") {
    const id = pathname.split("/")[2];
    const contacts = readDB();

    const contact = contacts.find(c => c.id === id);
    res.end(JSON.stringify(contact || { message: "Contact not found" }));
  }

  /* ---------- ADD CONTACT ---------- */
  else if (pathname === "/contacts" && method === "POST") {
    let body = "";

    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const newContact = JSON.parse(body);
      const contacts = readDB();

      newContact.id = Math.random().toString(16).slice(2, 6);
      contacts.push(newContact);

      writeDB(contacts);
      res.end(JSON.stringify({ message: "Contact added", data: newContact }));
    });
  }

  /* ---------- UPDATE CONTACT ---------- */
  else if (pathname.startsWith("/contacts/") && method === "PUT") {
    const id = pathname.split("/")[2];
    let body = "";

    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const updatedData = JSON.parse(body);
      const contacts = readDB();

      const index = contacts.findIndex(c => c.id === id);
      if (index === -1) {
        res.end(JSON.stringify({ message: "Contact not found" }));
        return;
      }

      contacts[index] = {
        ...contacts[index],
        ...updatedData
      };

      writeDB(contacts);
      res.end(JSON.stringify({ message: "Contact updated" }));
    });
  }

  /* ---------- DELETE CONTACT ---------- */
  else if (pathname.startsWith("/contacts/") && method === "DELETE") {
    const id = pathname.split("/")[2];
    let contacts = readDB();

    contacts = contacts.filter(c => c.id !== id);
    writeDB(contacts);

    res.end(JSON.stringify({ message: "Contact deleted" }));
  }

  /* ---------- INVALID ROUTE ---------- */
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));
  }

}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
