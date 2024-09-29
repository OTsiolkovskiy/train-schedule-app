import { formatDate } from "@/app/utils/formatDateTime";
import { ITrain } from "@/types/train.interface"
import { Box, Card, CardContent, Typography } from "@mui/material"

type Props = {
  train: ITrain,
  handleDeleteTrain?: (trainId: number) => void,
  handleEditOpen?: (train: ITrain) => void;
  showActions: boolean
}

const TrainCard: React.FC<Props> = ({ train }) => {

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        margin: "10px", 
        boxShadow: 3, 
        borderRadius: 2,
        padding: '16px',
        backgroundColor: 'background.paper',
      }}
    >
      <CardContent 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start', 
          justifyContent: 'space-between', 
          gap: '20px' 
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between', 
            width: '100%', 
            gap: '10px'
          }}
        >
          <Box 
            sx={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold', 
                color: '#1976d2',
              }}
            >
              {`${train.from} to ${train.to}`}
            </Typography>
          </Box>

          <Box 
            sx={{ 
              flex: 0.5, 
              textAlign: 'center', 
              fontWeight: '500', 
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {`Train ID: ${train.id}`}
          </Box>
          <Box 
            sx={{ 
              flex: 1, 
              textAlign: 'center', 
              fontWeight: '500', 
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {`Departure: ${formatDate(train.departure)}`}
          </Box>
          <Box 
            sx={{ 
              flex: 1, 
              textAlign: 'center', 
              fontWeight: '500', 
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {`Arrival: ${formatDate(train.arrival)}`}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
};

export default TrainCard;