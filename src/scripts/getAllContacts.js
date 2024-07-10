import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const getAllContacts = async () => {
  try {
    
    const data = await fs.readFile(PATH_DB, 'utf8');
    const contacts = JSON.parse(data);
    console.log(`Успішно прочитано масив контактів з файлу ${PATH_DB}`);
    return contacts
  } catch (error) {
    console.error('Помилка під час зчитування файлу:', error);
  }
};
console.log(await getAllContacts());