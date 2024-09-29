import { formatDate } from "@/app/utils/formatDateTime";
import { ITrain } from "@/types/train.interface"
import { Box, Button, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

type Props = {
  train: ITrain,
  handleDeleteTrain: (trainId: number) => void,
  handleEditOpen: (train: ITrain) => void;
}

const TrainCard: React.FC<Props> = ({ 
  train, 
  handleDeleteTrain,
  handleEditOpen,
}) => {

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        margin: "10px", 
        boxShadow: 3, 
        borderRadius: 2,
        padding: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'background.paper',

        "@media (max-width: 600px)": {
          flexDirection: "column"
        },
      }}
    >
        <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'center'}}>
          <Box flex={1}>
            <Typography variant="h6" >{`${train.from} to ${train.to}`}</Typography>
          </Box>
          
          <Box flex={2}>
          <TableContainer component={Paper} sx={{  marginTop: '20px', backgroundColor: '#f5f5f5' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold', padding: '16px' }}>Train ID</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', padding: '16px' }}>Departure</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', padding: '16px' }}>Arrival</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" sx={{ padding: '16px' }}>{train.id}</TableCell>
                  <TableCell align="center" sx={{ padding: '16px' }}>{formatDate(train.departure)}</TableCell>
                  <TableCell align="center" sx={{ padding: '16px' }}>{formatDate(train.arrival)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </Box>

          <Box flex={1} display="flex" flexDirection="column" gap="15px" width="100%" alignItems="center" >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => train.id && handleDeleteTrain(train.id)}
              sx={{ width: '100%', maxWidth: '400px' }}
            >
              Delete
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditOpen(train)}
              sx={{ width: '100%', maxWidth: '400px' }}
            >
            Edit
            </Button>
          </Box>

        </CardContent>
    </Card>
  )
};

export default TrainCard;