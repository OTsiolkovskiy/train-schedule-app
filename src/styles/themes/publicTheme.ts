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
            color: "#FFFFFF", // Лейбл текст колір білий
            "&.Mui-focused": {
              color: "#FFFFFF", // Лейбл текст колір білий при фокусі
            },
            "&.MuiFormLabel-filled": {
              color: "#FFFFFF", // Лейбл текст колір білий коли поле заповнене
            },
          },
          "& .MuiOutlinedInput-root": {
            color: "#FFFFFF", // Інпут текст колір білий
            "& fieldset": {
              borderColor: "#FFFFFF", // Рамка колір білий
            },
            "&:hover fieldset": {
              borderColor: "#FFFFFF", // Рамка колір на hover білий
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFFFFF", // Рамка колір при фокусі білий
            },
            "& input::placeholder": {
              color: "#8F9EA5", // Колір підказки
            },
          },
          "&:hover": {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Фоновий колір на hover
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiAutocomplete-option": {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Опція фон колір
            color: "#FFFFFF", // Опція текст колір білий
            "&:hover": {
              backgroundColor: 'rgba(255, 255, 255, 0.5)', // Фоновий колір на hover
            },
          },
        },
        paper: {
          backgroundColor: 'rgba(74, 78, 80, 0.8)', // Фоновий колір паперу
          color: "#FFFFFF", // Текст колір паперу білий
        },
        clearIndicator: {
          color: "#FFFFFF", // Колір іконки закриття білий
          "&:hover": {
            color: "#FFFFFF", // Колір іконки закриття на hover білий
          },
        },
      }
    }
  }
});

export default publicTheme;
