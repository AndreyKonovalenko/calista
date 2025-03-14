import styled from "@emotion/styled";
import { drawerWidth } from "../../../layout/config-layout";
import MuiPaper, { PaperProps as MuiPaperProps } from '@mui/material/Paper';

interface PaperProps extends MuiPaperProps {
  open?: boolean;
}
const BoardsPageContentPaperBar = styled(MuiPaper, {
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

export default BoardsPageContentPaperBar;