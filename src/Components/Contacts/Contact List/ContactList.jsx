import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../Server/Axiosinstance'

function ContactList() {
    const [contacts, setContacts] = useState([])
    const getData = async () => {
        const response = await axiosInstance.get("/contacts")
        setContacts(response.data)
    }
    useEffect(() => {
        getData()
    }, [])
    console.log(contacts.profileImage)
    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (!confirmDelete) return;
        await axiosInstance.delete(`/contacts/${id}`)
        setContacts(contacts.filter((user) => user.id !== id))
    }
    console.log(contacts)
    return (
        <>
            <nav>
                <div className="container d-flex justify-content-between align-items-center">
                    <p className="h2">Contact List</p>
                    <Link to={'/addcontact'} className="btn btn-primary fs-5">Add Contact <i className='fa fa-plus-circle'></i></Link>
                </div>
                <hr className='mx-auto' style={{ width: "85%" }} />
            </nav>
            <div className="container d-flex flex-wrap justify-content-around gap-5">
                {contacts.map((user) => (
                    <div className="card" style={{ width: "18rem" }} key={user.id}>
                        <img src={user.profileImage} style={{ height: "18rem" }} className="card-img-top p-3 rounded-3" alt="" />
                        <div className="card-body" key={user.id}>
                            <h5 className="card-title mx-2">{user.firstName} {user.lastName}</h5>
                            <p className="card-title mx-2">{user.email}</p>
                            <p className='card-text mx-2'>{user.numberCode} {user.number}</p>
                            <div className="d-flex justify-content-around">
                                <Link to={`/viewcontact/${user.id}`} className="btn btn-success"><i className='fa fa-eye'></i></Link>
                                <Link to={`/editcontact/${user.id}`} className="btn btn-warning"><i className='fa fa-edit'></i></Link>
                                <Link onClick={()=>deleteUser(user.id)} className="btn btn-danger"><i className='fa fa-delete-left'></i></Link>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )
}

export default ContactList