import { useParams } from 'react-router-dom';
import axios from 'axios';
import React from 'react'

function Delete() {
    const { contactId } = useParams();
    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (!confirmDelete) return;
        await axiosInstance.delete(`/contacts/${id}`)
        setContacts(contacts.filter((user) => user.id !== id))
    }
  return (
    <div>Delete</div>
  )
}

export default Delete