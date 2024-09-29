'use client';

import useAuthStatus from "../hooks/useAuth";
import LoadingProvider from "../providers/loading.provider"

const PrivateLayout = ({ children }: React.PropsWithChildren) => {
  const { isLoggedIn, loading} = useAuthStatus();
  return (
    <LoadingProvider isLoading={loading} isAuth={isLoggedIn}>
      {children}
    </LoadingProvider>
  )
}

export default PrivateLayout;