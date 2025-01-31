import colors from 'colors';
import express from 'express';
import  expressLoader  from './loaders/expressLoader';
import  dbLoader  from './loaders/dbLoader';

import { PORT } from './config';
const terminalColors = colors;

async function startServer () {
  const app = express();
  await dbLoader()
  await expressLoader(app);
  console.log(terminalColors.magenta('Express loaded'))
  app.listen(PORT, () => {
    console.log(
      terminalColors.yellow(`App listening at http://localhost:${PORT}`),
    );
  }).on('error', error => {
    console.log(error.message)
    process.exit(1)
  })
}

startServer()
 

