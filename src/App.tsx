import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import LocationInput from './components/LocationInput';
import WeatherDisplay from './components/WeatherDisplay';
import { WeatherData, WeatherMessage, TimeOfDay, TIME_RANGES } from './types';
import axios from 'axios';
import './App.scss';

function App() {
  const [location, setLocation] = useState<string>('');
  const [dayOfWeek, setDayOfWeek] = useState<string>('Friday');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('afternoon');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [weatherMessage, setWeatherMessage] = useState<WeatherMessage>({
    text: '',
  });

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const timesOfDay: TimeOfDay[] = ['morning', 'afternoon', 'evening'];

  const getHourlyDataForTimeRange = (hours: any[], start: number, end: number) => {
    return hours
      .filter((hour: any) => {
        const hourNum = parseInt(hour.datetime.split(':')[0]);
        return hourNum >= start && hourNum <= end;
      })
      .map((hour: any) => ({
        hour: hour.datetime,
        temperature: hour.temp,
        humidity: hour.humidity
      }));
  };

  const handleLocationSubmit = async (submittedLocation: string) => {
    try {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          submittedLocation
        )}/next7days?unitGroup=us&include=hours&key=${API_KEY}`
      );

      const processedData: WeatherData[] = response.data.days.map((day: any) => ({
        date: day.datetime,
        temperature: day.temp,
        humidity: day.humidity,
        morningData: getHourlyDataForTimeRange(day.hours, TIME_RANGES.morning.start, TIME_RANGES.morning.end),
        afternoonData: getHourlyDataForTimeRange(day.hours, TIME_RANGES.afternoon.start, TIME_RANGES.afternoon.end),
        eveningData: getHourlyDataForTimeRange(day.hours, TIME_RANGES.evening.start, TIME_RANGES.evening.end)
      }));

      setWeatherData(processedData);
      setLocation(submittedLocation);
      setWeatherMessage({
        text: response.data.description || 'Weather data retrieved successfully',
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherMessage({
        text: 'Error fetching weather data. Please try again.',
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
              onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
              displayEmpty
            >
              {timesOfDay.map((time) => (
                <MenuItem key={time} value={time}>
                  {time.charAt(0).toUpperCase() + time.slice(1)}
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
            {/* <div className="weather-icon">
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
            </div> */}
          </div>
          <WeatherDisplay 
            weatherData={weatherData} 
            selectedDay={dayOfWeek}
            timeOfDay={timeOfDay}
          />
        </div>

        <div className="chart-section">
          <div className="chart-header">
            <Typography variant="h6">Next {dayOfWeek}</Typography>
            {/* <div className="weather-icon">
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
            </div> */}
          </div>
          <WeatherDisplay 
            weatherData={weatherData} 
            selectedDay={dayOfWeek}
            timeOfDay={timeOfDay}
          />
        </div>
      </div>

      {weatherMessage.text && (
        <Box mt={2}>
          <Typography>{weatherMessage.text}</Typography>
        </Box>
      )}
    </div>
  );
}

export default App;
