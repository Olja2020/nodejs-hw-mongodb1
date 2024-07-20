import createHttpError from "http-errors";
import * as ContactService from '../services/contacts.js';

async function getContacts (req, res) {
  const contacts = await ContactService.getContacts();
  res.send ({status: 200, data: contacts});

  };


async function getContactById (req, res, next){
  const {contactId} = req.params;

  const user = await ContactService.getContactById(contactId);
  if (user===null) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.send({status: 200, message: `Successfully found contact with id **${contactId}**!`, data: user});
}


async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType
  };
  const createdContact = await ContactService.createContact(contact);

  res.status(201).send({
    status: 201,
    message: `Successfully created a contact!`,
    data: createdContact,
  });
};

async function patchContact (req, res, next)  {
  const { contactId } = req.params;
  const payload = req.body;
  // const contact = {
  //  name: req.body.name,
  //   phoneNumber: req.body.phoneNumber,
  //   email: req.body.email,
  //   isFavourite: req.body.isFavourite,
  //   contactType: req.body.contactType
  // };
  // const fild = req.body;
  // const result = await ContactService.updateContact(contactId, fild);

  // if (!result) {
  //   return next(createHttpError(404, 'Contact not found'));

  // }

  // res.status(200).send({status:200, message: `Successfully patched a contact!`,
  //   data: fild});
  try {
    const result = await ContactService.updateContact(contactId, payload);

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).send({
      data: { contact: result },
      message: 'Successfully patched a contact!'
    });
  } catch (error) {
    next(error);
  }
  }


async function deleteContact (req, res, next)  {
  const { contactId } = req.params;

  const result = await ContactService.deleteContact(contactId);

  if (!result) {
    return next(createHttpError(404, 'Contact not found'));

  }

  res.status(204).send();
};
export {getContacts,getContactById,createContact, deleteContact,patchContact
};
