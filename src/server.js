import 'dotenv/config';

import express from 'express';

import { initMongoConnection } from './db/initMongoConnection.js';

//import { newContact } from './models/contacts.js';


export function setupServer() {
  const app = express();
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

  // app.get('/contacts', async (req, res) => {
  //   try {
  //     const contacts = await newContact.find();

  //     res.send({
  //       status: 200,
  //       message: 'Successfully found contacts!',
  //       data: contacts,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });

  // app.get('/contacts/:contactId', async (req, res) => {
  //   try {
  //     const { contactId } = req.params;

  //     const user = await newContact.findById(contactId);

  //     if (user === null) {
  //       return res
  //         .status(404)
  //         .send({ status: 404, message: 'Contact not found' });
  //     }

  //     res.send({
  //       status: 200,
  //       message: `Successfully found contact with id **${contactId}**!`,
  //       data: user,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });
}
setupServer();
// async function bootstrap() {
//   try {
//     await initMongoConnection();

//     const PORT = process.env.PORT || 3000;

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// bootstrap();
