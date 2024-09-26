import { formatDate } from "@/app/utils/formatDateTime";
import { ITrain } from "@/types/train.interface"
import { Box, Button, Card, CardContent, Typography } from "@mui/material"

type Props = {
  train: ITrain,
  handleDeleteTrain?: (trainId: number) => void,
  handleEditOpen?: (train: ITrain) => void;
  showActions: boolean
}

const TrainCard: React.FC<Props> = ({ 
  train, 
  handleDeleteTrain,
  handleEditOpen,
  showActions = true,
}) => {

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        margin: "10px", 
        boxShadow: 3, 
        borderRadius: 2,
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'background.paper',

        "@media (max-width: 600px)": {
          padding: "8px",
          flexDirection: "column"
        },
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>{`${train.from} to ${train.to}`}</Typography>
        <Typography color="textSecondary">{`Train ID: ${train.id}`}</Typography>
        <Typography color="textSecondary">{`Departure: ${formatDate(train.departure)}`}</Typography>
        <Typography color="textSecondary">{`Arrival: ${formatDate(train.arrival)}`}</Typography>
      </CardContent>

      {showActions && (
        <Box display="flex" flexDirection="column" gap="15px" sx={{ marginLeft: '16px' }}>
        {handleDeleteTrain && (
          <Button
          variant="contained"
          color="secondary"
          onClick={() => train.id && handleDeleteTrain(train.id)}
          sx={{ width: '100%' }}
        >
          Delete
        </Button>
        )}

        {handleEditOpen && (
          <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditOpen(train)}
          sx={{ width: '100%' }}
        >
          Edit
        </Button>
        )}
      </Box>
      )}
    </Card>
  )
};

export default TrainCard;