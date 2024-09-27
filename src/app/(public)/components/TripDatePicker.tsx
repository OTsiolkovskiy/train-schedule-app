import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, {Dayjs} from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type Props = {
  departure: Dayjs | null;
  setDeparture: (value: Dayjs | null) => void;
  textLable: string;
}

export const TripDatePicker: React.FC<Props> = ({ departure, setDeparture, textLable }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label={textLable}
      value={departure}
      onChange={(newValue) => {
        if (newValue && newValue.isAfter(dayjs())) {
          setDeparture(newValue);
        }
      }}
      minDate={dayjs()}
      slotProps={{
        textField: {
          variant: 'outlined',
          sx: {
            flex: 1,
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          },
        },
      }}
    />
  </LocalizationProvider>
  )
}