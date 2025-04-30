import { createTheme } from '@mui/material';
import { Theme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
    listBackground: Palette['primary'];
    dropGuideColor: Palette['primary'];
  }
  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
    listBackground?: PaletteOptions['primary'];
    dropGuideColor?: PaletteOptions['primary'];
  }
}

export const theme: Theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
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
    dropGuideColor: {
      main: '#A8A9AA',
    },
  },
});
