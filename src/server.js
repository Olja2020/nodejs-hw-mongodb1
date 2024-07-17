
    import express from 'express';
    import pino from 'pino-http';
    import cors from 'cors';

    import contactsRouter from './routers/contacts.js'; // Імпортуємо роутер
    import { env } from './utils/env.js';
    import {ContactCollection} from "./models/contacts.js";
    import { errorHandler } from './middlewares/errorHandler.js';
    import { notFoundHandler } from './middlewares/notFoundHandler.js';

    const PORT = Number(env('PORT', '3000'));


    export const setupServer = () => {
      const app = express();

      app.use(express.json());
      app.use(cors());

      app.use(
        pino({
          // transport: {
          //   target: 'pino-pretty',
          // },
        }),
      );

      app.use(contactsRouter);

      app.use('*', notFoundHandler);

      app.use(errorHandler);

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    };


export const createContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};
export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
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
};
