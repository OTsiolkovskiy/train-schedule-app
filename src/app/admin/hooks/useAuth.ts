'use client';

import { AuthService } from '@/services/auth.service';
import { IUser } from '@/types/user.interface';
import { useEffect, useState } from 'react';

const useAuthStatus = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const userInfo = await AuthService.getUserSessionInfo();
        setUser(userInfo);
        setIsLoggedIn(true);
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  return {
    user,
    isLoggedIn,
    loading,
  };
};

export default useAuthStatus;
