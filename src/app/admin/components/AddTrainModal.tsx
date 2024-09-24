// src/app/admin/components/AddTrainModal.tsx
"use client";

import React, { useState } from "react";
import { Modal, Button, TextField, Typography } from "@mui/material";
import { TrainService } from "@/services/train.service";
import { ITrain } from "@/types/train.interface";

type Props = {
  open: boolean;
  handleClose: () => void;
  refreshTrains: () => void;
}

const AddTrainModal: React.FC<Props> = ({ open, handleClose, refreshTrains }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const handleAddTrain = async () => {
    const newTrain: ITrain = { 
      from, 
      to, 
      departure: departure + ":00Z", // Додаємо секунди та Z для UTC
      arrival: arrival + ":00Z" // Аналогічно для arrival
    };
    
    try {
      await TrainService.addTrain(newTrain);
      refreshTrains(); 

      setFrom("");
      setTo("");
      setDeparture('');  // Можливо, ви хочете знову задати поточний час
      setArrival('');

      handleClose();
    } catch (error) {
      console.error("Error adding train:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ padding: 20, backgroundColor: "white", borderRadius: 5 }}>
        <Typography variant="h6">Add New Train</Typography>
        <TextField
          label="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          fullWidth
          margin="normal"
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
        <Button onClick={handleAddTrain} variant="contained" color="primary">
          Add Train
        </Button>
      </div>
    </Modal>
  );
};

export default AddTrainModal;
