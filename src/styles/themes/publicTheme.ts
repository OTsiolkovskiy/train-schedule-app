/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createTheme } from "@mui/material";
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
})

const publicTheme = createTheme({
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
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#FFFFFF",
            "&.Mui-focused": {
              color: "#FFFFFF",
            },
            "&.MuiFormLabel-filled": {
              color: "#FFFFFF",
            },
          },
          "& .MuiOutlinedInput-root": {
            color: "#FFFFFF",
            "& fieldset": {
              borderColor: "#FFFFFF",
            },
            "&:hover fieldset": {
              borderColor: "#FFFFFF",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFFFFF",
            },
            "& input::placeholder": {
              color: "#8F9EA5",
            },
          },
          "&:hover": {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiAutocomplete-option": {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            },
          },
        },
        paper: {
          backgroundColor: 'rgba(74, 78, 80, 0.8)',
          color: "#FFFFFF",
        },
        clearIndicator: {
          color: "#FFFFFF",
          "&:hover": {
            color: "#FFFFFF",
          },
        },
      }
    }
  }
});

export default publicTheme;
