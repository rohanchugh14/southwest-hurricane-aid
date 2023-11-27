import { createTheme } from '@mui/material/styles';


const theme = createTheme( {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3C88A6',
    },
    secondary: {
      main: '#9AC7D9',
    },
    divider: '#798C89',
    background: {
      paper: '#0B1C26',
    },
    text: {
      primary: '#D0E9F2',
    },
  },
  typography: {
    fontFamily: 'Lato',
  },
});

export default theme;