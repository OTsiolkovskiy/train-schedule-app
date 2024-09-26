"use client";

import React, { useState } from "react";
import { Modal, Button, TextField, Typography, Autocomplete } from "@mui/material";
import { TrainService } from "@/services/train.service";
import { ITrain } from "@/types/train.interface";
import { fetchCities } from "@/app/utils/fetchCities";
import { ICityOption } from "@/types/city.interface";

type Props = {
  open: boolean;
  handleClose: () => void;
  refreshTrains: () => void;
}

const AddTrainModal: React.FC<Props> = ({ open, handleClose, refreshTrains }) => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const [fromCity, setFromCity] = useState<string>('');
  const [toCity, setToCity] = useState<string>('');
  const [fromCityOptions, setFromCityOptions] = useState<ICityOption[]>([]);
  const [toCityOptions, setToCityOptions] = useState<ICityOption[]>([]);

  const handleAddTrain = async () => {
    const newTrain: ITrain = { 
      from: fromCity, 
      to: toCity, 
      departure: departure + ":00Z",
      arrival: arrival + ":00Z"
    };
    
    try {
      await TrainService.addTrain(newTrain);
      refreshTrains(); 

      setFromCity("");
      setToCity("");
      setDeparture('');
      setArrival('');

      handleClose();
    } catch (error) {
      console.error("Error adding train:", error);
    }
  };

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

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ padding: 20, backgroundColor: "white", borderRadius: 5 }}>
        <Typography variant="h6">Add New Train</Typography>

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
                margin="normal"
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
                margin="normal"
              />
            )}
          />

        <TextField
          label="Departure"
          type="datetime-local"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Arrival"
          type="datetime-local"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button onClick={handleAddTrain} variant="contained" color="primary">
          Add Train
        </Button>
      </div>
    </Modal>
  );
};

export default AddTrainModal;
