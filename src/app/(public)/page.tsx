'use client';

import axios from 'axios';
import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import { ITrain } from '@/types/train.interface';
import { TrainService } from '@/services/train.service';

export default function PublicHome() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [trains, setTrains] = useState<ITrain[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = await TrainService.findTrainsByCity(fromCity, toCity);
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
          <TextField
            label="From"
            variant="outlined"
            fullWidth
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            placeholder="Enter departure city"
          />
          <TextField
            label="To"
            variant="outlined"
            fullWidth
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            placeholder="Enter destination city"
          />
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
                <ListItem key={train.id} divider>
                  <ListItemText
                    primary={`From: ${train.from} To: ${train.to}`}
                    secondary={`Departure: ${train.departure} Arrival: ${train.arrival}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Container>
  );
}
