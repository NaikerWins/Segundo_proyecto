// theme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1e1e1e'
        },
        primary: {
            main: '#a0522d'
        },
        secondary: {
            main: '#b22222'
        },
        text: {
            primary: '#f5f5f5',
            secondary: '#ccc'
        }
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2c2c2c',
                    borderRadius: '16px',
                    padding: '16px'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none'
                }
            }
        }
    }
});

export default darkTheme;
