'use client';

import { useEffect, useState } from 'react';
import { Button, Box, Typography, Container, List } from '@mui/material';
import { ITrain } from '@/types/train.interface';
import { TrainService } from '@/services/train.service';

import { Dayjs } from 'dayjs';
import { ICityOption } from '@/types/city.interface';

import { CityTextFild } from './components/CityTextField';
import { TripDatePicker } from './components/TripDatePicker';
import TrainCard from './components/TrainCard';
import { CityService } from '@/services/city.service';


export default function PublicHome() {
  const [fromCity, setFromCity] = useState<string | null>('');
  const [toCity, setToCity] = useState<string | null>('');
  const [trains, setTrains] = useState<ITrain[]>([]);
  const [departureFrom, setDepartureFrom] = useState<Dayjs | null>(null);
  const [departureUntil, setDepartureUntil] = useState<Dayjs | null>(null);

  const [fromCityOptions, setFromCityOptions] = useState<ICityOption[]>([]);
  const [toCityOptions, setToCityOptions] = useState<ICityOption[]>([]);

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFromCityInputChange = async (
    event: React.SyntheticEvent<Element, Event>, 
    value: string, 
  ) => {
    setFromCity(value);

    if (value) {
      const cities = await CityService.getCitiesByQuery(value);
      setFromCityOptions(cities);
    } else {
      setFromCityOptions([]);
    }

  };

  const handleToCityInputChange = async (
    event: React.SyntheticEvent<Element, Event>, 
    value: string,
  ) => {
    setToCity(value);

    if (value) {
      const cities = await CityService.getCitiesByQuery(value);
      setToCityOptions(cities);
    } else {
      setToCityOptions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromCity || !toCity) {
      console.error("Please provide both 'From' and 'To' cities.");
      return;
    }
  
    try {
      const data = await TrainService.findTrainsByCity(fromCity, toCity, departureFrom, departureUntil );
      setTrains(data);
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  return (
    <>
      <Container maxWidth={false} 
        disableGutters 
        sx={{
        width: '100vw',
        backgroundColor: '#636e7e',
        minHeight: '100vh',
        margin: 0,
        color: 'white',
      }}>

      <Box
        sx={{
          width: '100%',
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundImage: 'url("/img/railway-1555348.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <Box sx={{ position: 'relative', zIndex: 2, color: 'white' }}>
          <Typography variant="h4">
            
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            sx={{ mt: 5, mb: 5 }}
          >
            <Typography variant="h2" gutterBottom sx={{ mb: 10 }}>
              Train route
            </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
            width="100%"
            mb={5}
            flexGrow={1}
          >

            <Box 
              display="flex" 
              flexDirection={{ xs: 'column', sm: 'row' }} 
              gap="10px"
            >

              <Box flex={1}>
                <CityTextFild 
                  cityOptions={fromCityOptions} 
                  city={fromCity} 
                  onCityInputChange={handleFromCityInputChange} 
                  lable='From' 
                />
              </Box>

              <Box flex={1}>
                <CityTextFild cityOptions={toCityOptions} city={toCity} onCityInputChange={handleToCityInputChange} lable='To' />
              </Box>

              <Box flex={1}>
                <TripDatePicker departure={departureFrom} setDeparture={setDepartureFrom} textLable='Departure From' />
              </Box>

              <Box flex={1}>
                <TripDatePicker departure={departureUntil} setDeparture={setDepartureUntil} textLable='Departure Until' minDate={departureFrom} />
              </Box>

            </Box>

            <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth
            sx={{
              backgroundColor: '#444b51',
              opacity: 0.8,
              '&:hover': {
                backgroundColor: '#444b51',
                opacity: 1,
              }
            }}
          >
            Search Trains
            </Button>

          </Box>
          </Box>
      
          </Typography>
        </Box>
      </Box>

      {trains.length === 0 && (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="200px" 
          sx={{ 
            backgroundColor: '#444b51',
            borderRadius: '8px',
            padding: '20px',
            margin: '20px',
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'white',
              textAlign: 'center',
            }}
          >
            No trains match your search criteria. Please try again.
          </Typography>
        </Box>
      )}

      <Box 
      display="flex"
      padding="20px"
      justifyContent="center"
      >
      {trains.length > 0 && (
          <Box mt={4} width="70%">
             <Typography variant="h5" gutterBottom>
              {`Route from ${fromCity} to ${toCity}:`}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Available Trains:
            </Typography>
            <List>
              {trains.map((train) => (
                <TrainCard 
                  key={train.id} 
                  train={train} 
                  showActions={false}
                />
              ))}
            </List>
          </Box>
        )}
      </Box>

      {showScrollToTop && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={scrollToTop} 
          sx={{
            position: 'fixed', 
            bottom: '20px', 
            right: '20px', 
            backgroundColor: '#444b51',
            '&:hover': {
              backgroundColor: '#555',
            },
          }}
        >
          Scroll to Top
        </Button>
      )}
      
    </Container>
    </>
  );
}
