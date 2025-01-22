import colors from 'colors';
import app from './app';

import { connectDB } from './db';

import { PORT } from './config';

const terminalColors = colors;

connectDB()
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        terminalColors.yellow(`App listening at http://localhost:${PORT}`),
      );
    }),
  )
  .catch(error => console.log('in server', error));
