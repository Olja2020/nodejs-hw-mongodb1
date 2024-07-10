
import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async () => {
  try {
    
    const data = await fs.readFile(PATH_DB, 'utf8');
    const contacts = JSON.parse(data);
    console.log(contacts);
    contacts.push(createFakeContact());
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2));

    console.log(`Успішно додано  контакт у файл ${PATH_DB}`);
  } catch (error) {
    console.error('Помилка під час зчитування або запису файлу:', error);
  }
};
addOneContact();