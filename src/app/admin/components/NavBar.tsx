import { AuthService } from "@/services/auth.service";
import { Avatar, Box, Button } from "@mui/material"
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
    <Box>
      <Avatar {...stringAvatar(userName)} />
      <Button 
        variant="contained" 
        color="success" 
        onClick={handleLogOut}>
        Log Out
      </Button>
    </Box>
  )
}