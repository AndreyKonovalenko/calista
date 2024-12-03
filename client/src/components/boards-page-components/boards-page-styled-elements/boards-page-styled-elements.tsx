import { styled } from '@mui/material';

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
