"use client";

import { TrainService } from "@/services/train.service";
import { ITrain } from "@/types/train.interface";
import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, List, Button } from "@mui/material";
import TrainCard from "../components/TrainCard";
import AddTrainModal from "../components/AddTrainModal";
import EditTrainModal from "../components/EditTrainModal";

export default function Home() {
  const [trains, setTrains] = useState<ITrain[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedTrain, setSelectedTrain] = useState<ITrain | null>(null);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const data = await TrainService.getAllTrains();
      setTrains(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching trains:", err);
      setError("Failed to fetch trains");
      setIsLoading(false);
    }
  }

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleEditOpen = (train: ITrain) => {
    setSelectedTrain(train);
    setEditModalOpen(true);
  }

  const handleEditClose = () => setEditModalOpen(false);

  const handleDeleteTrain = async (trainId: number) => {
    if (trainId === undefined) {
      console.error("Train ID is undefined");
      return;
    }
    
    try {
      await TrainService.deleteTrain(trainId);
    } catch (error) {
      console.error("Error deleting train:", error);
    }

    fetchTrains();
  }

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6">Loading trains...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Train List</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Train
      </Button>
      <List>
        {trains.map((train) => (
          <>
            <TrainCard 
              key={train.id} 
              train={train} 
              handleDeleteTrain={handleDeleteTrain}
              handleEditOpen={handleEditOpen}
             />
          </>
        ))}
      </List>
      
      <AddTrainModal open={modalOpen} handleClose={handleClose} refreshTrains={fetchTrains} />
      {selectedTrain && (
        <EditTrainModal 
          open={editModalOpen}
          handleClose={handleEditClose}
          refreshTrains={fetchTrains}
          train={selectedTrain}
        />
      )}
    </Container>
  );
}
