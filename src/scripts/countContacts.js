import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const countContacts = async () => {
    try {
      const data = await fs.readFile(PATH_DB, 'utf8');
      const contacts = JSON.parse(data);
      console.log(contacts);
      const count = contacts.length; 
      console.log(`Кількість контактів в масиві з файлу ${PATH_DB} складає: ${count}`);
      return count;
    } catch (error) {
      console.error('Помилка під час зчитування файлу:', error);
    }
  };
  
  console.log(await countContacts());