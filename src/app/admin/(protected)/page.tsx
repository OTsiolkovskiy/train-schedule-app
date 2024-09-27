"use client";

import { TrainService } from "@/services/train.service";
import { ITrain } from "@/types/train.interface";
import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, List, Button, Box } from "@mui/material";
import TrainCard from "../components/TrainCard";
import AddTrainModal from "../components/AddTrainModal";
import EditTrainModal from "../components/EditTrainModal";
import { IUser } from "@/types/user.interface";
import { AuthService } from "@/services/auth.service";
import { NavBar } from "../components/NavBar";

export default function Home() {
  const [trains, setTrains] = useState<ITrain[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedTrain, setSelectedTrain] = useState<ITrain | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await AuthService.getUserSessionInfo();
      setUser(user);
    };
    getUser();
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
    <Container sx={{ padding: "24px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <NavBar userName={user ? user.name : ''} />

      <Box 
    display="flex" 
    justifyContent="space-between" 
    alignItems="center" 
    mt={5}
    mb={3}
    ml={1}
    mr={1}
  >
    
    <Typography 
      variant="h4" 
      fontWeight="bold" 
      sx={{ color: "#333", textAlign: "center", flexGrow: 1 }}
    >
      Train List
    </Typography>

    <Button 
      variant="contained" 
      color="primary" 
      size="large" 
      sx={{ textTransform: "none", padding: "10px 20px", borderRadius: "8px" }} 
      onClick={handleOpen}
    >
      Add Train
    </Button>
  </Box>
      <List>
        {trains.map((train) => (
          <>
            <TrainCard 
              key={train.id} 
              train={train} 
              handleDeleteTrain={handleDeleteTrain}
              handleEditOpen={handleEditOpen}
              showActions={true}
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
