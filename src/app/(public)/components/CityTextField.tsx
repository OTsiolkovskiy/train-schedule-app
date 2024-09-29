import { ICityOption } from "@/types/city.interface";
import { Autocomplete, TextField } from "@mui/material";

type Props = {
  cityOptions: ICityOption[];
  city: string | null;
  onCityInputChange: (
    event: React.SyntheticEvent<Element, Event>, 
    value: string,
  ) => void;
  lable: string;
}

export const CityTextFild: React.FC<Props> = ({ cityOptions, city, onCityInputChange, lable }) => {
  return (
    <Autocomplete
      options={cityOptions}
      getOptionLabel={(option) => option.city}
      value={cityOptions.find((option) => option.city === city) || null}
      onInputChange={onCityInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={lable}
          variant="outlined"
          fullWidth
          placeholder="Enter departure city"
        />
      )}
    />
  )
}