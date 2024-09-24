import { ITrain } from "@/types/train.interface";
import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API

export const TrainService = {
  getAllTrains: async (): Promise<ITrain[]> => {
    try {
      const response = await axios.get(`http://localhost:5050/train`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  addTrain: async (newTrain: ITrain): Promise<void> => {
    try {
      await axios.post(`http://localhost:5050/train`, newTrain);
    } catch (error) {
      console.error('Error adding train:', error);
      throw error;
    }
  },

  deleteTrain: async (trainId: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5050/train/${trainId}`);
    } catch (error) {
      console.error('Error deleting train:', error);
      throw error;
    }
  },

  updateTrain: async (trainId: string, updatedTrainData: Partial<ITrain>): Promise<void> => {
    try {
      await axios.patch(`http://localhost:5050/train/${trainId}`, updatedTrainData);
    } catch (error) {
      console.error('Error editing train:', error);
      throw error;
    }
  }
}
