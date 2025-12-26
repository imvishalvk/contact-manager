import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../Server/Axiosinstance'

function AddContact() {
    const [contacts,setContacts] = useState({
        firstName:"",
        lastName:"",
        numberCode:"",
        number:"",
        email:"",
        designation:"",
        companyName:"",
        linkedin:"",
        github:"",
        profileImage:"" || "https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg",
        cityName:"",
        state:"",
        zip:""
    })
    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setContacts((prev)=>{
            return {...prev, [name]:value }
        })
        
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await axiosInstance.post("/contacts",{...contacts})
        Navigate("/")
    }
    const Navigate = useNavigate();
    // console.log(contact)
    // console.log(num)
    // onChange={(e)=>setNum(e.target.value)}
    return (
        <>
            <section className="container">
                <div className="container d-flex justify-content-between align-items-center">
                    <p className="h2">Add Contact</p>
                    {/* <Link to={'/addcontact'} className="btn btn-primary fs-5">Add Contact <i className='fa fa-plus-circle'></i></Link> */}
                </div>
                <hr className='mx-auto' style={{ width: "85%" }} />
                <form className="row g-3 needs-validation mt-3" noValidate onSubmit={handleSubmit} >
                    <div className="col-md-4">
                        <label htmlFor="FirstName" className="form-label">First name</label>
                        <input type="text" className="form-control" id="FirstName"  required name='firstName' onChange={handleChange}/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="lastName" className="form-label">Last name</label>
                        <input type="text" className="form-control" id="lastName"  required name='lastName' onChange={handleChange}/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend"> 
                                <select name="numberCode" id="numberCode" className='px-2 ' style={{appearance:"none"}}  onChange={handleChange}>
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
                            <input type="tel" className="form-control"  id="phoneNumber" aria-describedby="inputGroupPrepend" required name='number' onChange={handleChange}/>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email"  required name="email"  onChange={handleChange}/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="designation" className="form-label">Designation</label>
                        <input type="text" className="form-control" id="designation" required name="designation"  onChange={handleChange}/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="companyName" className="form-label">Company Name</label>
                        <input type="text" className="form-control" id="companyName"  required name="companyName"  onChange={handleChange}/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="linkedin" className="form-label">Linkedin</label>
                        <input type="text" className="form-control" id="linkedin"  required name="linkedin"  onChange={handleChange}/>
                    </div><div className="col-md-4">
                        <label htmlFor="github" className="form-label">Github</label>
                        <input type="text" className="form-control" id="github"  required name="github"  onChange={handleChange}/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="profileImage" className="form-label">Profile Picture Link</label>
                        <input type="text" className="form-control" id="profileImage"  required name="profileImage"  onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="cityName" className="form-label">City</label>
                        <input type="text" className="form-control" id="cityName" required name="cityName"  onChange={handleChange}/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <select className="form-select" id="state" defaultValue="" required name="state" onChange={handleChange}>
                            <option disabled value="">Choose...</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Maharasthra">Maharashtra</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="zip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="zip" required name="zip"  onChange={handleChange}/>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                            <label className="form-check-label" htmlFor="invalidCheck" >
                                Agree to terms and conditions
                            </label>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                        <button className="btn btn-primary" type="submit"> Submit form</button>
                        <Link className='btn btn-danger' to="/">Cancel</Link>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AddContact