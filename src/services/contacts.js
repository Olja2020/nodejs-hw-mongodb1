import { ContactsCollection } from '../models/contacts.js';

function getContacts() {
  return ContactsCollection.find();
}

 function getContactById(contactId) {
  return ContactsCollection.findById(contactId);
 }

function createContact(contact) {
  return ContactsCollection.create(contact);
}

function deleteContact(contactId) {
  return ContactsCollection.findByIdAndDelete(contactId);
}

async function  changeContact(contactId, name) {

  return  ContactsCollection.findByIdAndUpdate(contactId,{name},{ new: true});

}

export {
  getContacts, getContactById, createContact, deleteContact, changeContact,
};
