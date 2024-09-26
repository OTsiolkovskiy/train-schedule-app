'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, List, Autocomplete } from '@mui/material';
import { ITrain } from '@/types/train.interface';
import { TrainService } from '@/services/train.service';
import TrainCard from '../admin/components/TrainCard';

import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ICityOption } from '@/types/city.interface';
import { fetchCities } from '../utils/fetchCities';

export default function PublicHome() {
  const [fromCity, setFromCity] = useState<string | null>('');
  const [toCity, setToCity] = useState<string | null>('');
  const [trains, setTrains] = useState<ITrain[]>([]);
  const [departureFrom, setDepartureFrom] = useState<Dayjs | null>(null);
  const [departureUntil, setDepartureUntil] = useState<Dayjs | null>(null);

  const [fromCityOptions, setFromCityOptions] = useState<ICityOption[]>([]);
  const [toCityOptions, setToCityOptions] = useState<ICityOption[]>([]);

  const handleFromCityInputChange = async (
    event: React.SyntheticEvent<Element, Event>, 
    value: string, 
  ) => {
    setFromCity(value);

    if (value) {
      const cities = await fetchCities(value);
      setFromCityOptions(cities);
    } else {
      setFromCityOptions([]);
    }

  };

  const handleToCityInputChange = async (
    event: React.SyntheticEvent<Element, Event>, 
    value: string,
  ) => {
    setToCity(value);

    if (value) {
      const cities = await fetchCities(value);
      setToCityOptions(cities);
    } else {
      setToCityOptions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromCity || !toCity) {
      console.error("Please provide both 'From' and 'To' cities.");
      return;
    }
  
    try {
      const data = await TrainService.findTrainsByCity(fromCity, toCity, departureFrom, departureUntil );
      setTrains(data);
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      

      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        sx={{ mt: 5, mb: 5 }}
      >
        <Typography variant="h4" gutterBottom>
          Train Search
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
          width="100%"
        >
         <Autocomplete
            options={fromCityOptions}
            getOptionLabel={(option) => option.city}
            value={fromCityOptions.find(option => option.city === fromCity) || null}
            onInputChange={handleFromCityInputChange}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="From" 
                variant="outlined" 
                fullWidth 
                placeholder="Enter departure city"
              />
            )}
          />

          <Autocomplete
            options={toCityOptions}
            getOptionLabel={(option) => option.city}
            value={toCityOptions.find(option => option.city === toCity) || null}
            onInputChange={handleToCityInputChange}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="To" 
                variant="outlined" 
                fullWidth 
                placeholder="Enter destination city"
              />
            )}
          />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Departure From"
              value={departureFrom}
              onChange={(newValue) => {
                if (newValue && newValue.isAfter(dayjs())) {
                  setDepartureFrom(newValue);
                }
              }}
              minDate={dayjs()}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Departure Until"
              value={departureUntil}
              onChange={(newValue) => {
                if (newValue && newValue.isAfter(dayjs())) {
                  setDepartureUntil(newValue);
                }
              }}
              minDate={dayjs()}
            />
          </LocalizationProvider>

          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth
          >
            Search Trains
          </Button>
        </Box>

        {trains.length > 0 && (
          <Box mt={4} width="100%">
            <Typography variant="h5" gutterBottom>
              Available Trains:
            </Typography>
            <List>
              {trains.map((train) => (
                <TrainCard 
                  key={train.id} 
                  train={train} 
                  showActions={false}
                />
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Container>
  );
}
