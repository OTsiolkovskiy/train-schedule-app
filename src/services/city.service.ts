import { ICityOption } from "@/types/city.interface";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API;

export const CityService = {
  getCitiesByQuery: async (query: string): Promise<ICityOption[]> => {
    if (!query) return [];

    try {
      const response = await axios.get(`${BASE_URL}/cities`, {
        params: { name: query },
        withCredentials: true,
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching cities:', error.response?.status, error.response?.statusText);
      } else {
        console.error('Error fetching cities:', error);
      }
      return [];
    }
  },
};
