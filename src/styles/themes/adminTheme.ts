/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createTheme, Theme } from "@mui/material";
import { Roboto } from "next/font/google";
import "./../globals.css";

interface CustomPalette {
  textColors: {
    white: string,
    medium: string,
    placeholder: string,
    error: string
  },
}

declare module '@mui/material/styles' {
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    regular1: true;
  }
}

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});

const adminTheme = createTheme({
  palette: {
    primary: {
      main: "#2D383D",
      dark: "#2D383D"
    },
    textColors: {
      white: "#FFFFFF",
      medium: "#C3D1D8",
      placeholder: "#8F9EA5",
      error: "#C02539"
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          "&.subvariant-hovered": {
            "& fieldset": {
              border: `1px solid ${theme.palette.primary.main}`,
            },
            "& .MuiInputBase-input:hover + fieldset": {
              border: `1px solid ${theme.palette.primary.dark}`,
            },
            "& .MuiInputBase-input:focus + fieldset": {
              border: `1px solid ${theme.palette.primary.dark}`,
            },
            "& input": {
              color: theme.palette.primary.main,
              padding: "13px 15px"
            },
            "& input::placeholder": {
              color: theme.palette.textColors.placeholder
            },
            "&.subvariant-without-padding": {
              "& fieldset": {
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "9px",
              },
              "& input": {
                borderRadius: "9px",
                padding: "0px 10px"
              }
            },
            "&.subvariant-smaller-padding": {
              "& fieldset": {
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "9px",
              },
              "& input": {
                borderRadius: "9px",
                padding: "9px 12px"
              }
            },
            "&.subvariant-medium-padding": {
              "& fieldset": {
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "6px",
              },
              "& input": {
                borderRadius: "6px",
                padding: "12px 15px 12px 0"
              }
            }
          }
        }),
      }
    }
  }
});

export default adminTheme;