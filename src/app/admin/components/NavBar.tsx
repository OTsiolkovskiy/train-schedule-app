import { AuthService } from "@/services/auth.service";
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material"
import { AdminRoutes } from "../auth/shared/routes";
import { useRouter } from "next/navigation";

type Props = {
  userName: string;
}

export const NavBar: React.FC<Props> = ({ userName }) => {

  const router = useRouter();
  
  function stringAvatar(name: string) {
    const nameParts = name.split(' ');

    return {
      children: `${nameParts[0][0]}${nameParts[1] ? nameParts[1][0] : ''}`,
    };
  };

  const handleLogOut = async () => {
    await AuthService.log_out();
    router.push(`${AdminRoutes.signIn}`);
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          {userName}
        </Typography>
        <Avatar {...stringAvatar(userName)} sx={{ mr: 2 }} />
        <Button 
          variant="contained" 
          color="success" 
          onClick={handleLogOut}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  )
}