import { styled } from '@mui/material';

export const CardNameTextAreaStyled = styled('textarea')(({ theme }) => ({
  backgroundColor: theme.palette.listBackground.main,
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h4.fontWeight,
  lineHeight: theme.typography.h4.lineHeight,
  fontFamily: theme.typography.h4.fontFamily,
  border: `2px solid ${theme.palette.primary.dark}`,
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  overflowWrap: 'anywhere',
  resize: 'none',
  '&:focus': {
    backgroundColor: theme.palette.background.default,
    userSelect: 'all',
  },
  '&:focus-visible': { outline: 'none' },
})); 

export const CardChecklistTextAreaStyled = styled('textarea')(({ theme }) => ({
  fontSize: theme.typography.subtitle1.fontSize,
  fontWeight: theme.typography.subtitle1.fontWeight,
  lineHeight: theme.typography.subtitle1.lineHeight,
  fontFamily: theme.typography.subtitle1.fontFamily,
  width: '100%',
  border: `2px solid ${theme.palette.primary.dark}`,
  overflow: 'hidden',
  overflowWrap: 'anywhere',
  resize: 'none',
  '&:focus': {
    userSelect: 'all',
  },
  '&:focus-visible': { outline: 'none' },
}));


export const CardChecklistNameTextAreaStyled = styled('textarea')(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  lineHeight: theme.typography.body1.lineHeight,
  fontFamily: theme.typography.body1.fontFamily,
  width: '100%',
  border: `2px solid ${theme.palette.primary.dark}`,
  overflow: 'hidden',
  overflowWrap: 'anywhere',
  resize: 'none',
  '&:focus': {
    userSelect: 'all',
  },
  '&:focus-visible': { outline: 'none' },
}));
