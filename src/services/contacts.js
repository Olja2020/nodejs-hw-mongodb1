import { ContactsCollection } from '../models/contacts.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

async function getContacts({ page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  // const [contacts, count] = await Promise.all([
  //   contactQuery
  //     .sort({ [sortBy]: sortOrder })
  //     .skip(skip)
  //     .limit(limit)
  //     .exec(),
  //     ContactsCollection.countDocuments(contactQuery),
  // ]);

    // return {
  //   contacts,
  //   page,
  //   perPage,
  //   totalItems: count,
  //   hasNextPage: totalPages - page > 0,
  //   hasPreviousPage: page > 1,
  // };
  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

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
export const updateContact = async (studentId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: studentId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
export {
  getContacts, getContactById, createContact, deleteContact, changeContact,
};





