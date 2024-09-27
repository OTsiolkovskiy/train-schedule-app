'use client';

import { useRouter } from "next/navigation";
import { AdminRoutes } from "../auth/shared/routes";

type Props = {
  isLoading: boolean;
  isAuth: boolean;
  children: React.ReactNode;
}

const LoadingProvider: React.FC<Props> = ({ children, isLoading, isAuth }) => {
  const router = useRouter();

  if (isLoading) {
    return;
  }

  if (!isLoading && !isAuth) {
    router.push(AdminRoutes.signUp);
  }
  
  return (
    <>
      {children}
    </>
  )
}

export default LoadingProvider;