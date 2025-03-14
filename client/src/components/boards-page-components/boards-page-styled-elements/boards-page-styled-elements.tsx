import { styled } from '@mui/material';
import { drawerWidth } from '../../../layout/config-layout';
import MuiPaper, { PaperProps as MuiPaperProps } from '@mui/material/Paper';

interface PaperProps extends MuiPaperProps {
  open?: boolean;
}

export const TitleTextAreaStyled = styled('textarea')(({ theme }) => ({
  backgroundColor: theme.palette.listBackground.main,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  lineHeight: theme.typography.h6.lineHeight,
  fontFamily: theme.typography.h6.fontFamily,
  border: `2px solid ${theme.palette.primary.dark}`,
  borderRadius: theme.spacing(1),
  resize: 'none',
  '&:focus': {
    backgroundColor: theme.palette.background.default,
    userSelect: 'all',
  },
  '&:focus-visible': { outline: 'none' },
}));

export const BoardsPageContent = styled('div', {
  shouldForwardProp: prop => prop !== 'open',
})<PaperProps>(({ theme, open }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const BoardsPageContentPaperBar = styled(MuiPaper, {
  shouldForwardProp: prop => prop !== 'open',
})<PaperProps>(({ theme, open }) => ({
  width: '100%',
  position: 'absolute',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
