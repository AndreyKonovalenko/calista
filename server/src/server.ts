import colors from 'colors';
import app from './app';

import { connectDB } from './db';

import { port } from './config';

const terminalColors = colors;

connectDB().then(() =>
  app.listen(port, () => {
    console.log(
      terminalColors.yellow(`App listening at http://localhost:${port}`),
    );
  }),
);
