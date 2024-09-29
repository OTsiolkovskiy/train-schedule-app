import ThemeRegistry from "@/styles/createEmotionCache";

const PublicLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeRegistry options={{ key: "mui" }} isAdmin={false}>
      {children}
    </ThemeRegistry>
  )
}

export default PublicLayout;