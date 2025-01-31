import React from 'react';
import { Box, Typography } from '@mui/material';
import { WeatherData, TimeOfDay } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface WeatherDisplayProps {
  weatherData: WeatherData[];
  selectedDay: string;
  timeOfDay: TimeOfDay;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  selectedDay,
  timeOfDay,
}) => {
  const selectedDayData = weatherData?.find(
    (day) => new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }) === selectedDay
  );

  if (!selectedDayData) {
    return <Typography>No data available for {selectedDay}</Typography>;
  }

  const getTimeRangeData = () => {
    switch (timeOfDay) {
      case 'morning':
        return selectedDayData.morningData || [];
      case 'afternoon':
        return selectedDayData.afternoonData || [];
      case 'evening':
        return selectedDayData.eveningData || [];
      default:
        return [];
    }
  };

  const hourlyData = getTimeRangeData();

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Typography variant="h6" gutterBottom>
        {selectedDay} - {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Weather
      </Typography>
      <ResponsiveContainer>
        <LineChart data={hourlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="hour" 
            tickFormatter={(hour: string) => hour.split(':')[0] + ':00'}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            name="Temperature (°F)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="humidity"
            stroke="#82ca9d"
            name="Humidity (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WeatherDisplay;
