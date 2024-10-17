import { createTheme } from '@mui/material/styles';

// Светлая тема
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: '#e0e0e0',
          padding: '12px 15px',
          borderBottom: '2px solid #ccc',
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
            backgroundColor: '#f5f5f5',
          },
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
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
          backgroundColor: '#fafafa',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          marginRight: '0.5rem',
          color: '#333',
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
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        },
      },
    },
  },
});

// Темная тема
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#303030',
      paper: '#424242',
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
          background: '#555',
          padding: '12px 15px',
          borderBottom: '2px solid #777',
        },
        body: {
          padding: '12px 15px',
          borderBottom: '1px solid #666',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#444',
          },
          '&:hover': {
            backgroundColor: '#555',
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '1rem',
          border: '1px solid #666',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#333',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: '0.1rem',
          border: '1px solid #888',
          borderRadius: '5px',
          fontSize: '1rem',
          marginRight: '1rem',
          backgroundColor: '#444',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          marginRight: '0.5rem',
          color: '#ccc',
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
          border: '1px solid #666',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#222',
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
