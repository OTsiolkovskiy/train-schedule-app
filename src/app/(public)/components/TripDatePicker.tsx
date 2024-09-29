import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, {Dayjs} from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

type Props = {
  departure: Dayjs | null;
  setDeparture: (value: Dayjs | null) => void;
  textLable: string;
  minDate?: Dayjs | null; 
}

export const TripDatePicker: React.FC<Props> = ({ departure, setDeparture, textLable, minDate }) => {
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
        minDate={minDate || dayjs()}
        slots={{
          openPickerIcon: CalendarTodayIcon,
        }}
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
              '& .Mui-focused': {
                color: 'white !important', 
              },
              '& input': {
                color: 'white',
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            },
            InputLabelProps: {
              sx: {
                color: 'white',
                '&.Mui-focused': {
                  color: 'white',
                },
              },
            },
          },
          openPickerIcon: {
            sx: {
              color: 'white',
            },
          },
        }}
      />
    </LocalizationProvider>
  )
}