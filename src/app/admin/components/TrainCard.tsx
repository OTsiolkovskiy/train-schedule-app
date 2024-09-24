import { ITrain } from "@/types/train.interface"
import { Button, Card, CardContent, Typography } from "@mui/material"

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
    <Card variant="outlined" style={{ margin: "10px" }}>
      <CardContent>
      <Typography variant="h6">{`${train.from} to ${train.to}`}</Typography>
        <Typography color="textSecondary">{`Train ID: ${train.id}`}</Typography>
        <Typography color="textSecondary">{`Departure: ${train.departure}`}</Typography>
        <Typography color="textSecondary">{`Arrival: ${train.arrival}`}</Typography>
        
        <Button
          variant="contained"
          color="secondary"
          onClick={() => train.id && handleDeleteTrain(train.id)}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditOpen(train)}
        >
          Edit
        </Button>
      </CardContent>
    </Card>
  )
};

export default TrainCard;