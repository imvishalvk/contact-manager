
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../Server/Axiosinstance'

function EditContact() {
    const { contactId } = useParams();
    const navigate = useNavigate();

    const [contacts, setContacts] = useState({
        firstName: "",
        lastName: "",
        numberCode: "",
        number: "",
        email: "",
        designation: "",
        companyName: "",
        linkedin: "",
        github: "",
        profileImage: "" || "https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg",
        cityName: "",
        state: "",
        zip: ""
    });
    const handleChange = (e) => {
        setContacts({
            ...contacts,
            [e.target.id]: e.target.value
        });
    };
    const fetchContact = async () => {
        const response = await axiosInstance.get(`/contacts/${contactId}`);
        const data = response.data;
        setContacts({
            firstName: data.firstName,
            lastName: data.lastName,
            numberCode: data.numberCode,
            number: data.number,
            email: data.email,
            designation: data.designation,
            companyName: data.companyName,
            linkedin: data.linkedin,
            github: data.github || data.gitHub,
            profileImage: data.profileImage,
            cityName: data.cityName,
            state: data.state,
            zip: data.zip
        })
        console.log(data)
    };
    useEffect(() => {
        fetchContact();
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosInstance.put(`/contacts/${contactId}`, contacts);
        navigate('/');
    };
    return (
        <>
            <section className="container">
                <div className="container d-flex justify-content-between align-items-center">
                    <p className="h2">Edit Contact</p>
                </div>
                <hr className='mx-auto' style={{ width: "85%" }} />
                <form className="row g-3 needs-validation mt-3" noValidate onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="firstName" className="form-label">First name</label>
                        <input type="text" className="form-control" id="firstName" value={contacts.firstName} onChange={handleChange} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="lastName" className="form-label">Last name</label>
                        <input type="text" className="form-control" id="lastName" value={contacts.lastName} onChange={handleChange} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="number" className="form-label">Phone Number</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">
                                <select name="numberCode" id="numberCode" value={contacts.numberCode} className='px-2 ' style={{ appearance: "none" }} onChange={handleChange}>
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+61">+61</option>
                                    <option value="+971">+971</option>
                                    <option value="+966">+966</option>
                                    <option value="+33">+33</option>
                                    <option value="+39">+39</option>
                                    <option value="+34">+34</option>
                                    <option value="+86">+86</option>
                                    <option value="+81">+81</option>
                                    <option value="+82">+82</option>
                                    <option value="+65">+65</option>
                                </select> </span>
                            <input type="tel" className="form-control" id="number" aria-describedby="inputGroupPrepend" required value={contacts.number} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={contacts.email} required onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="designation" className="form-label">Designation</label>
                        <input type="text" className="form-control" id="designation" value={contacts.designation} required onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="companyName" className="form-label">Company Name</label>
                        <input type="text" className="form-control" id="companyName" value={contacts.companyName} required onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="linkedin" className="form-label">Linkedin</label>
                        <input type="text" className="form-control" id="linkedin" value={contacts.linkedin} required onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="github" className="form-label">Github</label>
                        <input type="text" className="form-control" id="github" value={contacts.github} required onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="profileImage" className="form-label">Profile Picture Link</label>
                        <input type="text" className="form-control" id="profileImage" value={contacts.profileImage} required onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="cityName" className="form-label">City</label>
                        <input type="text" className="form-control" id="cityName" value={contacts.cityName} required onChange={handleChange} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <select className="form-select" id="state" value={contacts.state} required onChange={handleChange}>
                            <option disabled value="">Choose...</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Maharasthra">Maharashtra</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="zip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="zip" required value={contacts.zip} onChange={handleChange} />
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                        <button className="btn btn-primary" type="submit">Update</button>
                        <Link className='btn btn-danger' to="/">Cancel</Link>
                    </div>
                </form>
            </section>
        </>
    )
}

export default EditContact