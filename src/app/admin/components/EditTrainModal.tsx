"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Typography, Autocomplete } from "@mui/material";
import { TrainService } from "@/services/train.service";
import { ITrain } from "@/types/train.interface";
import { fetchCities } from "@/app/utils/fetchCities";
import { ICityOption } from "@/types/city.interface";

type Props = {
  open: boolean;
  handleClose: () => void;
  refreshTrains: () => void;
  train: ITrain;
};

const EditTrainModal: React.FC<Props> = ({ 
  open, 
  handleClose, 
  refreshTrains, 
  train 
}) => {
  const [departure, setDeparture] = useState(train.departure);
  const [arrival, setArrival] = useState(train.arrival);

  const [fromCity, setFromCity] = useState<string>('');
  const [toCity, setToCity] = useState<string>('');
  const [fromCityOptions, setFromCityOptions] = useState<ICityOption[]>([]);
  const [toCityOptions, setToCityOptions] = useState<ICityOption[]>([]);

  useEffect(() => {
    if (train) {
      setFromCity(train.from);
      setToCity(train.to);
      setDeparture(new Date(train.departure).toISOString().slice(0, 16));
      setArrival(new Date(train.arrival).toISOString().slice(0, 16));
    }
  }, [train]);

  const handleEditTrain = async () => {
    if (!train?.id) {
      console.error("Train ID is not defined.");
      return;
    }
  
    const updatedTrain: ITrain = {
      ...train,
      from: fromCity,
      to: toCity,
      departure: new Date(departure).toISOString(),
      arrival: new Date(arrival).toISOString(),
    };

    try {
      await TrainService.updateTrain(train.id.toString(), updatedTrain);
      refreshTrains();
      handleClose();
    } catch (error) {
      console.error("Error updating train:", error);
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
        <Typography variant="h6">Edit Train</Typography>

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
        />
        <TextField
          label="Arrival"
          type="datetime-local"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleEditTrain} variant="contained" color="primary">
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditTrainModal;
