import axios from "axios";

export const fetchCities = async (query: string) => {
  if (!query) return [];

  try {
    const response = await axios.get(`http://localhost:5050/cities`, {
      params: { name: query }
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
};