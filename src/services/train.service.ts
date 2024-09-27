import { ITrain } from "@/types/train.interface";
import axios from "axios";
import { Dayjs } from 'dayjs';

const BASE_URL = process.env.NEXT_PUBLIC_API

export const TrainService = {
  getAllTrains: async (): Promise<ITrain[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/train`, {
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
      await axios.post(`${BASE_URL}/train`, newTrain);
    } catch (error) {
      console.error('Error adding train:', error);
      throw error;
    }
  },

  deleteTrain: async (trainId: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/train/${trainId}`);
    } catch (error) {
      console.error('Error deleting train:', error);
      throw error;
    }
  },

  updateTrain: async (trainId: string, updatedTrainData: Partial<ITrain>): Promise<void> => {
    try {
      await axios.patch(`${BASE_URL}/train/${trainId}`, updatedTrainData);
    } catch (error) {
      console.error('Error editing train:', error);
      throw error;
    }
  },

  findTrainsByCity: async (from: string, to: string, departureFrom?: Dayjs | null, departureUntil?: Dayjs | null): Promise<ITrain[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/train/search`, {
        params: {
          from,
          to,
          departureFrom: departureFrom ? departureFrom.toISOString() : undefined,
          departureUntil: departureUntil ? departureUntil.toISOString() : undefined,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching trains by city:", error);
      throw error;
    }
  },

}
