import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../Server/Axiosinstance";

function ViewContact() {
    const { contactId } = useParams();
    const [contacts, setContacts] = useState({})
    const getContact = async () => {
        const response = await axiosInstance(`/contacts/${contactId}`)
        setContacts(response.data)
    }
    useEffect(() => {
        getContact()
    }, [])
    return (
        <section className="container card p-4">
            <div className="d-flex align-items-center flex-wrap">
                <img src={contacts.profileImage} className="rounded-circle" height="200" width="200" alt="" />
                <div className=" mx-5">
                    <p className="h3">{contacts.firstName} {contacts.lastName}</p>
                    <p className=""> {contacts.designation}</p>
                    <p className="btn btn-outline-primary">{contacts.companyName}</p>
                </div>
            </div>
            <hr />
            <div className="row g-4 ">
            <div className="col-md-6">
              <h6 className="text-muted"><i class="fa-solid fa-phone"></i> Phone</h6>
              <a href={`tel:${contacts.numberCode}${contacts.number}`} className="fw-semibold text-decoration-none">
                {contacts.numberCode} {contacts.number}
              </a>
            </div>

            <div className="col-md-6">
              <h6 className="text-muted"><i class="fa-solid fa-envelope"></i> Email</h6>
              <a href={`mailto:${contacts.email}`} className="fw-semibold text-decoration-none">{contacts.email}</a>
            </div>

            <div className="col-md-6">
              <h6 className="text-muted"><i class="fa-brands fa-linkedin "></i> LinkedIn</h6>
              <a href={`https://www.linkedin.com/in/${contacts.linkedin}`} className="text-decoration-none">
                {contacts.linkedin}
              </a>
            </div>

            <div className="col-md-6">
              <h6 className="text-muted"><i class="fa-brands fa-github"></i> GitHub</h6>
              <a href={`https://github.com/${contacts.github}`} className="text-decoration-none">
                {contacts.github}
              </a>
            </div>
          </div>
          <hr />
          <div>
            <div className="mt-3">
            <h5 className="mb-3">  <i class="fa-solid fa-map-pin text-danger"></i> Address</h5>
            <p className="mb-1">
              <strong>City :</strong> {contacts.cityName}
            </p>
            <p className="mb-1">
              <strong>State :</strong> {contacts.state}
            </p>
            <p className="mb-1">
              <strong>Zip :</strong> {contacts.zip}
            </p>
          </div>
          </div>
          <hr />
            <div className="d-flex justify-content-between mt-4">
            <Link to="/" className="btn btn-outline-secondary">
            <i className="fa-solid fa-angle-left"></i> Back
            </Link>
            <Link to={`/editcontact/${contactId}`} className="btn btn-primary">
              <i className="fa fa-edit"></i> Edit Contact
            </Link>
          </div>
        </section>
    )
}

export default ViewContact;
