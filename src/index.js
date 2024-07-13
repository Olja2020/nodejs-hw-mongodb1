import { setupServer } from './server';
setupServer();
import { initMongoConnection } from './db/initMongoDB.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
