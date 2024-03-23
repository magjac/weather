import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    min: {
      main: '#4e79a7',
    },
    mean: {
      main: "#59a14f",
    },
    max: {
      main: "#e15759",
    },
  },
});

export default theme;
