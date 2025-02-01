import React, { useState } from 'react';
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import LocationInput from './components/LocationInput';
import WeatherDisplay from './components/WeatherDisplay';
import { WeatherData,TimeOfDay, TIME_RANGES } from './types';
import axios from 'axios';
import './App.scss';

function App() {
  const [location, setLocation] = useState<string>('');
  const [dayOfWeek, setDayOfWeek] = useState<string>(new Date().toLocaleString('en-US', { weekday: 'long' }));
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('afternoon');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);


  const [availableDates] = useState<DayDate[]>(generateNext7Days());

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
        humidity: hour.humidity,
      }));
  };

  const handleLocationSubmit = async (submittedLocation: string) => {
    try {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          submittedLocation
        )}/next14days?unitGroup=us&include=hours&key=${API_KEY}`
      );

      if (!response.data || !response.data.days) {
        throw new Error('Invalid response data');
      }

      const processedData: WeatherData[] = response.data.days.map((day: any) => ({
        date: day.datetime,
        temperature: day.temp,
        conditions: day.conditions,
        humidity: day.humidity,
        icon: day.icon,
        morningData: getHourlyDataForTimeRange(day.hours, TIME_RANGES.morning.start, TIME_RANGES.morning.end),
        afternoonData: getHourlyDataForTimeRange(day.hours, TIME_RANGES.afternoon.start, TIME_RANGES.afternoon.end),
        eveningData: getHourlyDataForTimeRange(day.hours, TIME_RANGES.evening.start, TIME_RANGES.evening.end)
      }));

      setWeatherData(processedData);
      setLocation(response?.data?.resolvedAddress || submittedLocation);
    } catch (error) {
      console.error('Error fetching weather data:', error);

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
              {availableDates.map((dayDate) => (
                <MenuItem key={dayDate.day} value={dayDate.day}>
                  Every {dayDate.day}
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
      {weatherData.length > 0 && (          
      <div className="charts-container">
        <div className="chart-section">
          <div className="chart-header">
            <Typography variant="h6">This {dayOfWeek} {timeOfDay}</Typography>
          </div>
          <WeatherDisplay
            weatherData={weatherData} 
            selectedDate={availableDates.findIndex(d => d.day === dayOfWeek).toString()}
            timeOfDay={timeOfDay}
          />
        </div>

        <div className="chart-section">
          <div className="chart-header">
            <Typography variant="h6">Next {dayOfWeek} {timeOfDay}</Typography>
          </div>
          <WeatherDisplay 
            weatherData={weatherData}
            selectedDate={(availableDates.findIndex(d => d.day === dayOfWeek) + 7).toString()}
            timeOfDay={timeOfDay}
          />
        </div>
      </div>)}
    </div>
  );
}

interface DayDate {
  day: string;
}

const generateNext7Days = (): DayDate[] => {
  const days: DayDate[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    days.push({
      day: date.toLocaleString('en-US', { weekday: 'long' }),
    });
  }
  
  return days;
};

export default App;
