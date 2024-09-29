'use client';

import ThemeRegistry from "@/styles/createEmotionCache";

const AdminLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeRegistry options={{ key: "mui" }} isAdmin={true}>
      {children}
    </ThemeRegistry>
  )
}

export default AdminLayout;