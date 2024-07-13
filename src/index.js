// import { setupServer } from './server.js';
// setupServer();
// import { initMongoConnection } from './db/initMongoConnection.js';

// const bootstrap = async () => {
//   await initMongoConnection();
//   await setupServer();


// };

// bootstrap();
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    console.log('Mongo connection successfully established!');
    await setupServer(); // Запуск сервера після успішного з'єднання
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
};

bootstrap(); 
