import { useState } from 'react';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { AdminRoutes } from '../shared/routes';

interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signUp = async (values: SignUpValues) => {
    setLoading(true);
    setError(null);

    try {
      await AuthService.sign_up(values);
      router.push(`/${AdminRoutes.default}`);
    } catch (err) {
      const error = err as { response?: { status: number } };
      
      if (error.response?.status === 409) {
        setError('User already exists with this email address.');
      } else {
        setError('Failed to sign up. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    } 
  };

  return { signUp, loading, error };
};
