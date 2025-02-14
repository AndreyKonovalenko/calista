import colors from 'colors';
import express from 'express';
import expressLoader from './loaders/express-loader';
import dbLoader from './loaders/db-loader';

import config from './config';
const terminalColors = colors;

async function startServer() {
  const app = express();
  await dbLoader();
  await expressLoader(app);
  console.log(terminalColors.magenta('Express loaded'));
  app
    .listen(config.app.port, () => {
      console.log(
        terminalColors.yellow(`App listening at http://localhost:${config.app.port}`),
      );
    })
    .on('error', error => {
      console.log(error.message);
      process.exit(1);
    });
}

startServer();
