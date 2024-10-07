import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#4CAF50',
    },
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '1rem',
          border: '1px solid #c68282',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#aa2222',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #2196F3 60%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: '0.1rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '1rem',
          marginRight: '1rem',
          backgroundColor: '#f0f0ff', // Добавлен цвет фона
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          marginRight: '0.5rem',
          color: '#333', // Добавлен цвет текста
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          maxWidth: '80%',
          margin: '0 auto',
          padding: '1rem',
          border: '1px solid #c68282',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff', // Изменен цвет фона
        },
      },
    },
  },
});

export default theme;
