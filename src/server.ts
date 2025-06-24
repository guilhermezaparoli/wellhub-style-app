/* eslint-disable no-console */
import { app } from './app.js';
import { env } from './env/index.js';

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    	console.log(`Server is running at port ${env.PORT}`);
  });
