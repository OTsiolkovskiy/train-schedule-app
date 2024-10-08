import { IUser } from "@/types/user.interface";
import axios from "axios";

interface BaseAuthData {
  email: string;
  password: string;
}

interface SignUpData extends BaseAuthData {
  name: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API;


export const AuthService = {
  sign_up: async (userData: SignUpData) => {
    return axios.post(`${BASE_URL}/auth/sign-up`, userData, {
      withCredentials: true, 
    });
  },

  sign_in: async (userData: BaseAuthData) => {
    return await axios.post(`${BASE_URL}/auth/sign-in`, userData, {
      withCredentials: true, 
    });
  },

  getUserSessionInfo: async (): Promise<IUser> => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/session`, {}, {
        withCredentials: true,
      });
      return response.data as IUser;
    } catch (error) {
      console.error('Error fetching user session data:', error);
      throw error;
    }
  },

  log_out: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-out`, {}, {
        withCredentials: true, 
      });
      return response;
    } catch (error) {
      console.error('Error sign-out', error);
      throw error;
    }
  },
};