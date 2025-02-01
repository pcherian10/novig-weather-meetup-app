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
  today?: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  selectedDay,
  timeOfDay,
  today,
}) => {
  if (!weatherData || weatherData.length === 0) {
    return <Typography>Loading weather data...</Typography>;
  }

  console.log(weatherData);
  const selectedDayData = today ? weatherData[0] : weatherData[7]

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
            tickFormatter={(hour: string) => {
              const hourNum = parseInt(hour.split(':')[0]);
              const period = hourNum >= 12 ? 'pm' : 'am';
              const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
              return `${hour12}${period}`;
            }}
          />
          <YAxis yAxisId="left" dataKey="temperature" />
          <YAxis yAxisId="right" orientation="right" dataKey="humidity" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#f44336"
            name="Temperature (°F)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="humidity"
            stroke="#43d1f4"
            name="Humidity (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WeatherDisplay;
