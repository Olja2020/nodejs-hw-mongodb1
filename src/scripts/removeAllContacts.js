import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const removeAllContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf8');
    const contacts = JSON.parse(data);
    contacts.splice(0, contacts.length);
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2));
    console.log(
      `Контакти успішно видалені з масиву у файлі ${PATH_DB} `,
      contacts,
    );
  } catch (error) {
    console.error('Помилка під час видалення контактів з масиву:', error);
  }
};

removeAllContacts();
