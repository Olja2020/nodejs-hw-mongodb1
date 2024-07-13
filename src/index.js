import { setupServer } from './server.js';
setupServer();
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  await initMongoConnection();
  await setupServer();


};

bootstrap();
