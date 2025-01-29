import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import LocationInput from './components/LocationInput';
import TimeRangePicker from './components/TimeRangePicker';
import WeatherDisplay from './components/WeatherDisplay';
import { WeatherData, WeatherMessage } from './types';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState<string>('');
  const [dayOfWeek, setDayOfWeek] = useState<string>('friday');
  const [startTime, setStartTime] = useState<string>('14:00');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [weatherMessage, setWeatherMessage] = useState<WeatherMessage>({
    type: 'success',
    message: 'Enter a location to see the weather forecast',
  });

  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  const fetchWeatherData = async () => {
    if (!location) return;

    try {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          location
        )}/next7days?unitGroup=us&key=${API_KEY}`
      );

      const processedData: WeatherData[] = response.data.days.map((day: any) => ({
        temp: day.temp,
        humidity: day.humidity,
        description: day.conditions,
        windSpeed: day.windspeed,
        datetime: day.datetime,
      }));

      setWeatherData(processedData);
      
      // Generate weather message based on conditions
      const nextFridayData = processedData.find(
        (data) => new Date(data.datetime).getDay() === 5
      );

      if (nextFridayData) {
        if (nextFridayData.temp >= 60 && nextFridayData.temp <= 75) {
          setWeatherMessage({
            type: 'success',
            message: 'Nice day for a meetup! Temperature is perfect.',
          });
        } else if (nextFridayData.humidity > 75) {
          setWeatherMessage({
            type: 'warning',
            message: 'High chance of rain. Consider indoor backup plans.',
          });
        } else if (nextFridayData.windSpeed > 15) {
          setWeatherMessage({
            type: 'warning',
            message: 'Windy conditions expected. Some activities might be affected.',
          });
        } else {
          setWeatherMessage({
            type: 'success',
            message: 'Weather looks acceptable for outdoor activities.',
          });
        }
      }
    } catch (error) {
      setWeatherMessage({
        type: 'error',
        message: 'Error fetching weather data. Please try again.',
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Weather Meetup Planner
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <LocationInput value={location} onChange={setLocation} />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Day of Week</InputLabel>
            <Select
              value={dayOfWeek}
              label="Day of Week"
              onChange={(e) => setDayOfWeek(e.target.value)}
            >
              {daysOfWeek.map((day) => (
                <MenuItem key={day} value={day} sx={{ textTransform: 'capitalize' }}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TimeRangePicker
            startTime={startTime}
            endTime={endTime}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={fetchWeatherData}
            disabled={!location}
          >
            Check Weather
          </Button>
        </Paper>

        {weatherData.length > 0 && (
          <WeatherDisplay
            weatherData={weatherData}
            message={weatherMessage}
          />
        )}
      </Box>
    </Container>
  );
}

export default App;
