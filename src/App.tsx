import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import LocationInput from './components/LocationInput';
import TimeRangePicker from './components/TimeRangePicker';
import WeatherDisplay from './components/WeatherDisplay';
import { WeatherData, WeatherMessage } from './types';
import axios from 'axios';
import './App.scss';

function App() {
  const [location, setLocation] = useState<string>('');
  const [dayOfWeek, setDayOfWeek] = useState<string>('friday');
  const [timeOfDay, setTimeOfDay] = useState<string>('afternoon');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [weatherMessage, setWeatherMessage] = useState<WeatherMessage>({
    type: 'success',
    message: 'Enter a location to see the weather forecast',
  });

  const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const timesOfDay = [
    { value: 'morning', label: 'Morning (9-12)', range: { start: '09:00', end: '12:00' } },
    { value: 'afternoon', label: 'Afternoon (12-5)', range: { start: '12:00', end: '17:00' } },
    { value: 'evening', label: 'Evening (5-8)', range: { start: '17:00', end: '20:00' } },
  ];

  const handleLocationSubmit = async (submittedLocation: string) => {
    if (!submittedLocation) return;
    
    try {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          submittedLocation
        )}/next7days?unitGroup=us&key=${API_KEY}`
      );

      const processedData: WeatherData[] = response.data.days.map((day: any) => ({
        date: day.datetime,
        temperature: day.temp,
        conditions: day.conditions,
        icon: day.icon,
        precipitationChance: day.precipprob || 0,
        humidity: day.humidity || 0,
      }));

      setWeatherData(processedData);
      setWeatherMessage({
        type: 'success',
        message: 'Weather data loaded successfully',
      });
    } catch (error) {
      setWeatherMessage({
        type: 'error',
        message: 'Failed to fetch weather data. Please try again.',
      });
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="location-picker">
          <LocationInput
            location={location}
            onLocationChange={setLocation}
            onLocationSubmit={handleLocationSubmit}
          />
        </div>
        <div className="datetime-picker">
          <FormControl>
            <Select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              displayEmpty
            >
              {daysOfWeek.map((day) => (
                <MenuItem key={day} value={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
              displayEmpty
            >
              {timesOfDay.map((time) => (
                <MenuItem key={time.value} value={time.value}>
                  {time.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </header>

      <div className="charts-container">
        <div className="chart-section">
          <div className="chart-header">
            <Typography variant="h6">This {dayOfWeek}</Typography>
            <div className="weather-icon">
              {weatherData[0] && (
                <>
                  <img
                    src={`/weather-icons/${weatherData[0].icon}.svg`}
                    alt={weatherData[0].conditions}
                    width="24"
                    height="24"
                  />
                  <Typography>{weatherData[0].temperature}°F</Typography>
                </>
              )}
            </div>
          </div>
          <WeatherDisplay weatherData={weatherData[0]} />
        </div>

        <div className="chart-section">
          <div className="chart-header">
            <Typography variant="h6">Next {dayOfWeek}</Typography>
            <div className="weather-icon">
              {weatherData[7] && (
                <>
                  <img
                    src={`/weather-icons/${weatherData[7].icon}.svg`}
                    alt={weatherData[7].conditions}
                    width="24"
                    height="24"
                  />
                  <Typography>{weatherData[7].temperature}°F</Typography>
                </>
              )}
            </div>
          </div>
          <WeatherDisplay weatherData={weatherData[7]} />
        </div>
      </div>

      {weatherMessage.type === 'error' && (
        <Box mt={2}>
          <Typography color="error">{weatherMessage.message}</Typography>
        </Box>
      )}
    </div>
  );
}

export default App;
