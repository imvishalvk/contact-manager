import './App.css'
import AddContact from './Components/Contacts/Add Contact/AddContact'
import ContactList from './Components/Contacts/Contact List/ContactList'
import Delete from './Components/Contacts/Delete Confirmation/Delete'
import EditContact from './Components/Contacts/Edit Contact/EditContact'
import ViewContact from './Components/Contacts/View Contact/ViewContact'
import Navbar from './Components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<ContactList/>}/>
      <Route path='/addcontact' element={<AddContact/>}/>
      <Route path='/viewcontact/:contactId' element={<ViewContact/>}/>
      <Route path='/editcontact/:contactId' element={<EditContact/>}/>
      <Route path='/deletecontact/:contactId' element={<Delete/>}/>
    </Routes>
    </>
  )
}

export default App