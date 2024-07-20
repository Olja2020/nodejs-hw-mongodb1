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

async function  changeContact(contactId, payload, options = {}) {
  // return ContactsCollection.findOneAndUpdate( { _id: contactId },
  //   payload,
  //   {
  //     new: true,
  //     includeResultMetadata: true,
  //     ...options,
  //   },);
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
}

export {
  getContacts, getContactById, createContact, deleteContact, changeContact,
};
