import 'dotenv/config';

import express from 'express';

import { initMongoConnection } from './db/initMongoConnection.js';

import { newContact } from './models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await newContact.find();
  return contacts;
};

export function setupServer() {
  const app = express();
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await newContact.find();

      res.send({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;

      const user = await newContact.findById(contactId);

      if (user === null) {
        return res
          .status(404)
          .send({ status: 404, message: 'Contact not found' });
      }

      res.send({
        status: 200,
        message: `Successfully found contact with id **${contactId}**!`,
        data: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
    next();
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
    next();
  });
  try {
    initMongoConnection();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
setupServer();



// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import pino from 'pino';
// import { initMongoConnection } from './db/initMongoConnection.js';
// import { getAllContacts, getContactById } from './models/contacts.js';

// export async function setupServer() {
//   const app = express();

//   // Налаштування CORS
//   app.use(cors());

//   // Налаштування логгера Pino
//   const logger = pino();
//   app.use(pino.http({ logger }));

//   // GET /contacts
//   app.get('/contacts', async (req, res) => {
//     try {
//       const contacts = await getAllContacts();
//       res.status(200).json({
//         status: 200,
//         message: 'Successfully found contacts!',
//         data: contacts,
//       });
//     } catch (error) {
//       logger.error(error); // Логування помилки
//       res.status(500).send('Internal Server Error');
//     }
//   });

//   // GET /contacts/:contactId
//   app.get('/contacts/:contactId', async (req, res) => {
//     try {
//       const { contactId } = req.params;
//       const contact = await getContactById(contactId);
//       if (contact) {
//         res.status(200).json({
//           status: 200,
//           message: `Successfully found contact with id ${contactId}!`,
//           data: contact,
//         });
//       } else {
//         res.status(404).send({ status: 404, message: 'Contact not found' });
//       }
//     } catch (error) {
//       logger.error(error); // Логування помилки
//       res.status(500).send('Internal Server Error');
//     }
//   });

//   // Обробка неіснуючих роутів
//   app.use('*', (req, res, next) => {
//     res.status(404).json({
//       message: 'Not found',
//     });
//     next();
//   });

//   // Обробка помилок
//   app.use((err, req, res, next) => {
//     logger.error(err); // Логування помилки
//     res.status(500).json({
//       message: 'Something went wrong',
//       error: err.message,
//     });
//     next();
//   });

//   try {
//     await initMongoConnection();
//     console.log('Mongo connection successfully established!');
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log('Server is running on port', PORT);
//     });
//   } catch (error) {
//     logger.error(error);
//     console.error('Error while setting up server:', error);
//   }
// }
