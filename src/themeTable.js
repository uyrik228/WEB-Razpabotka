import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FE6B8B',
    },
    secondary: {
      main: '#FF8E53',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: '#f2f2f2',
          padding: '12px 15px',
          borderBottom: '2px solid #ddd',
        },
        body: {
          padding: '12px 15px',
          borderBottom: '1px solid #ddd',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#f9f9f9',
          },
          '&:hover': {
            backgroundColor: '#f1f1f1',
          },
        },
      },
    },
  },
});


export default theme;
