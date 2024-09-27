import { ICityOption } from "@/types/city.interface";
import { Autocomplete, Paper, TextField } from "@mui/material";

type Props = {
  cityOptions: ICityOption[];
  city: string | null;
  onCityInputChange: (
    event: React.SyntheticEvent<Element, Event>, 
    value: string,
  ) => void
}

export const CityTextFild: React.FC<Props> = ({ cityOptions, city, onCityInputChange }) => {
  return (
    <Autocomplete
              options={cityOptions}
              getOptionLabel={(option) => option.city}
              value={cityOptions.find((option) => option.city === city) || null}
              onInputChange={onCityInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter departure city"
                  InputProps={{
                    ...params.InputProps,
                    style: { color: 'white' },
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  sx={{
                    width: '100%',
                    color: 'white',
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
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                />
              )}
              PaperComponent={({ children }) => (
                <Paper
                  sx={{
                    backgroundColor: 'rgba(74,78,80 0.8)',
                    color: 'black',
                  }}
                >
                  {children}
                </Paper>
              )}
              sx={{
                '& .MuiAutocomplete-option': {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              }}
            />
  )
}