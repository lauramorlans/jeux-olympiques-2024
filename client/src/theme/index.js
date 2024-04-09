import { paperClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      primary: { main: '#d7c378' },
      secondary: { main: '#111111' },
      default: { main: '#EAEAEA' },
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57
    },
    button: {
      fontWeight: 600
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.57
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase'
    },
    h1: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2
    },
    h2: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2
    },
    h3: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2
    },
    h4: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2
    },
    h5: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.2
    },
    h6: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: 1.2
    }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1536,
      },
    },
    root: {
      fontFamily: ['Poppins', 'Muli', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      fontWeight: 700,
      letterSpacing: 0,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            flexDirection: 'row',
            boxShadow: 'none',
            backgroundColor: 'white',
            padding: '0',
          },
          colorPrimary: {
            backgroundColor: '#EAEAEA',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          sizeSmall: {
            padding: 4
          }
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: '30px',
            color: '#fff',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&::placeholder': {
              opacity: 1
            }
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          input: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '24px'
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            display: 'inline',
          },
        },
      },
      MuiPopover: {
      defaultProps: {
        elevation: 16
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          [`&.${paperClasses.elevation1}`]: {
            boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)'
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px'
          }
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6'
        },
        subheaderTypographyProps: {
          variant: 'body2'
        }
      },
      styleOverrides: {
        root: {
          padding: '32px 24px 16px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          justifyContent: 'space-between',
          backgroundImage: 'none',
        },
      }
    },
      MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none'
        },
        sizeSmall: {
          padding: '6px 16px'
        },
        sizeMedium: {
          padding: '8px 20px'
        },
        sizeLarge: {
          padding: '11px 24px'
        },
        textSizeSmall: {
          padding: '7px 12px'
        },
        textSizeMedium: {
          padding: '9px 16px'
        },
        textSizeLarge: {
          padding: '12px 16px'
        },
      }
    },
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: '#F04438',
            color: 'white'
          }
        },
      },
      'MuiGridRoot.MuiGridItem': {
        padding: 0,
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: '0',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          colorDefault: {
            backgroundColor: '#d2d6dc',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Inter, Arial, Helvetica, sans-serif, sans-serif',
            textTransform: 'uppercase'
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              margin: 0,
              background: 'rgba(17, 25, 39, 0.04)',
            }
          }
        },
      },
    },
  });