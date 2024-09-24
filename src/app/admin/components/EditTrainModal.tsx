"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Typography } from "@mui/material";
import { TrainService } from "@/services/train.service";
import { ITrain } from "@/types/train.interface";

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
  const [from, setFrom] = useState(train.from);
  const [to, setTo] = useState(train.to);
  const [departure, setDeparture] = useState(train.departure);
  const [arrival, setArrival] = useState(train.arrival);

  useEffect(() => {
    if (train) {
      setFrom(train.from);
      setTo(train.to);
      setDeparture(new Date(train.departure).toISOString().slice(0, 16)); // YYYY-MM-DDTHH:MM
      setArrival(new Date(train.arrival).toISOString().slice(0, 16)); // YYYY-MM-DDTHH:MM
    }
  }, [train]);

  const handleEditTrain = async () => {
    if (!train?.id) {
      console.error("Train ID is not defined.");
      return;
    }
  
    const updatedTrain: ITrain = {
      ...train,
      from,
      to,
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

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ padding: 20, backgroundColor: "white", borderRadius: 5 }}>
        <Typography variant="h6">Edit Train</Typography>
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
        <Button onClick={handleEditTrain} variant="contained" color="primary">
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditTrainModal;
