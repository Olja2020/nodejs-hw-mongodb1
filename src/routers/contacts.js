import express from 'express';
import { isValidID } from '../middlewares/isValidId.js';
import {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();
// const jsonParser = express.json({
//   type: ['application/json', 'application/vnd.api+json'],
//   limit: '100kb',
// });
router.use(authenticate);
router.get('/', authenticate, ctrlWrapper(getContacts));
router.get('/:contactId', authenticate, isValidID, ctrlWrapper(getContactById));
router.post(
  '/contacts',
  authenticate,
  jsonParser,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContact),
);
router.patch(
  '/contacts/:contactId',
  authenticate,
  isValidID,
  jsonParser,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContact),
);
router.delete(
  '/contacts/:contactId',
  authenticate,
  isValidID,
  ctrlWrapper(deleteContact),
);
export default router;
