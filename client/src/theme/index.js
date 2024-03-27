import { inputLabelClasses, paperClasses, backdropClasses, filledInputClasses, outlinedInputClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { createPalette } from './create-palette';

// Used only to create transitions
const muiTheme = createTheme();
const palette = createPalette();

export const theme = createTheme({
    palette: {
      primary: { main: '#6366F1' },
      secondary: { main: '#6C737F' },
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
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '10px',
            fontFamily: 'Inter',
            background: palette.text.secondary,
          },
          arrow: {
            color: palette.text.secondary,
          },
        },
      },
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
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '1.7rem',
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
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            borderRadius: 8,
            borderStyle: 'solid',
            borderWidth: 1,
            overflow: 'hidden',
            borderColor: palette.neutral[200],
            '&:hover': {
              backgroundColor: palette.action.hover
            },
            [`&.${filledInputClasses.disabled}`]: {
              backgroundColor: 'transparent'
            },
            [`&.${filledInputClasses.focused}`]: {
              backgroundColor: 'transparent',
              borderColor: palette.primary,
              boxShadow: `${palette.primary} 0 0 0 2px`
            },
            [`&.${filledInputClasses.error}`]: {
              borderColor: palette.error.main,
              boxShadow: `${palette.error.main} 0 0 0 2px`
            },
            transition: muiTheme.transitions.create([
              'border-color',
              'box-shadow'
            ]),
            '&:before': {
              display: 'none'
            },
            '&:after': {
              display: 'none'
            }
          },
          input: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '24px'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '24px'
          },
          notchedOutline: {
            transition: muiTheme.transitions.create([
              'border-color',
              'box-shadow'
            ]),
            borderColor: palette.neutral[200]
          },
          root: {
            '&:hover': {
              backgroundColor: palette.action.hover,
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: palette.neutral[200]
              }
            },
            [`&.${outlinedInputClasses.focused}`]: {
              backgroundColor: 'transparent',
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: palette.primary,
                boxShadow: `${palette.primary} 0 0 0 2px`
              }
            },
            [`&.${filledInputClasses.error}`]: {
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: palette.error.main,
                boxShadow: `${palette.error.main} 0 0 0 2px`
              }
            }
          },
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontWeight: 500,
            [`&.${inputLabelClasses.filled}`]: {
              transform: 'translate(12px, 18px) scale(1)'
            },
            [`&.${inputLabelClasses.shrink}`]: {
              [`&.${inputLabelClasses.standard}`]: {
                transform: 'translate(0, -1.5px) scale(0.85)'
              },
              [`&.${inputLabelClasses.filled}`]: {
                transform: 'translate(12px, 6px) scale(0.85)'
              },
              [`&.${inputLabelClasses.outlined}`]: {
                transform: 'translate(14px, -9px) scale(0.85)'
              }
            }
          }
        }
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
      MuiSwitch: {
        defaultProps: {
          color: 'primary'
        },
        switchBase: {
          color: palette.neutral[500]
        },
        track: {
          backgroundColor: palette.neutral[400],
          opacity: 1
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            padding: '25px',
            background: '#FFFFFF',
            boxShadow: '0px 9px 46px rgba(0, 0, 0, 0.08)',
            borderRadius: '20px'
          },
        },
      },
      MuiDialogContentText: {
        styleOverrides: {
          root: {
            color: '#6C737F',
            fontFamily: 'Inter',
            fontSize: '14px'
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            minWidth: '450px'
          }
        }
      },
      '.MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)': {
        marginTop: '8px',
      },
      MuiDropzoneArea: {
        styleOverrides: {
          textContainer: {
            padding: '24px',
          },
        },
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
        }
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
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderColor: palette.neutral[200],
            border: '1px solid #6366F1',
            color: '#6366F1',
          },
          deleteIcon: {
            color: '#6366F1',
          },
          icon: {
            color: palette.action.active
          },
          colorPrimary: {
            borderColor: palette.divider,
            backgroundColor: 'white',
            color: palette.text.primary,
          },
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
      MuiAutocomplete: {
        styleOverrides: {
          option: {
            "&.Mui-focused": {
              backgroundColor: 'rgba(99, 102, 241, 0.08) !important',
            }
          },
        }
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            [`&:not(.${backdropClasses.invisible})`]: {
              backgroundColor: alpha(palette.neutral[900], 0.75)
            }
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          '#nprogress .bar': {
            backgroundColor: palette.primary
          },
          '.slick-dots li button': {
            '&:before': {
              fontSize: 10,
              color: palette.primary
            }
          },
          '.slick-dots li.slick-active button': {
            '&:before': {
              color: palette.primary
            }
          }
        }
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: '#F2F4F7',
          }
        }
      },
      MuiTimelineConnector: {
        styleOverrides: {
          root: {
            backgroundColor: palette.divider
          }
        }
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
      MuiDataGrid: {
        styleOverrides: {
          main: {
            background: '#FFFFFF',
            boxShadow: '0px 0px 0px 0.5px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04)',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
          },
          footerContainer: {
            border: 'none',
          },
          row: {
            backgroundColor: 'white',
            borderRadius: '0px',
            color: '#111927',
            '& .Mui-selected': {
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
            },
            '&:hover': {
              backgroundColor: '#F6F6F6',
            },
            '&:selected': {
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
            },
          },
          columnHeader: {
            borderRadius: '0px',
            border: 'none',
            padding: '16px',
            '&:focus-within': {
              border: 'none',
              outline: 'none',
            },
            '&:focus': {
              border: 'none',
              outline: 'none',
            },
          },
          columnHeaders: {
            padding: '0px',
            background: '#F8F9FA',
            border: 'none',
          },
          virtualScroller: {
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
          },
          cell: {
            padding: '8px 16px',
            border: 'none',
            wordBreak: 'break-word',
            '&:focus-within': {
              outline: 'none',
            },
            whiteSpace: 'unset !important',
          },
          cellCheckbox: {
            justifyContent: 'center !important',
          },
          columnHeaderTitle: {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '12px',
            lineHeight: '100%',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            color: '#111927',
          },
          virtualScrollerRenderZone: {
            background: '#F2F4F7',
          },
          cellContent: {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontweight: '400',
            fontSize: '14px',
            lineHeight: '157%',
          },
          '& .MuiDataGrid-cell--withRenderer': {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontweight: '400',
            fontSize: '14px',
            lineHeight: '157%',
          },
          columnHeaderTitleContainerContent: {
            display: 'flex',
            justifyContent: 'center',
          },
          columnSeparator: {
            visibility: 'hidden',
          },
          root: {
            border: 'none',
          },
          menuIcon: {
            display: 'none',
          },
          columnHeaderDraggableContainer: {
            height: '40px'
          },
          columnHeaderCheckbox: {
            padding: '0px'
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: '#F8F9FA',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: '#F2F4F7',
          },
          head: {
            fontFamily: 'Inter',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            lineHeight: '100%',
          }
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: '#6366F1',
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            padding: '0px',
            margin: '0 16px',
            minWidth: 'auto',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '157%',
            textTransform: 'unset'
          }
        }
      },
    },
  });