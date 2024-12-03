import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
    listBackground: Palette['primary'];
  }
  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
    listBackground?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Chakra Petch',
  },
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
    listBackground: {
      main: '#F1F2F4',
    },
  },
});

console.log(theme);
