import { Link } from "react-router-dom"
function Navbar() {
  return (
    <>
        <div className="navbar mb-5">
            <div className="container">
                <Link to={"/"} className="navbar-brand py-2 "> <i className="fa fa-phone"></i> Contact Manager</Link>
            </div>

        </div>
    </>
  )
}

export default Navbar