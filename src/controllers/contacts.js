import createHttpError from "http-errors";
import {ContactsCollection} from "../models/contacts.js";
import {createContact, updateContact, deleteContact} from "../server.js";



async function getContacts (req, res) {
  const contacts = await ContactsCollection.find();
  res.send ({status: 200, contacts});

  };
async function getContactById (req, res, next){
  const {contactId} = req.params;
  const user = await ContactsCollection.findById(contactId);
  if (user===null) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.send({status: 200, message: `Successfully found contact with id **${contactId}**!`, data: user});
}
const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

 const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.student,
  });
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const student = await deleteContact(contactId);

  if (!student) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
export {getContacts, getContactById, createContactController, patchContactController,deleteContactController };
