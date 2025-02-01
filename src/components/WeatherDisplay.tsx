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
  selectedDate: string;
  timeOfDay: TimeOfDay;
  today?: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  selectedDate,
  timeOfDay,
}) => {
  if (!weatherData || weatherData.length === 0) {
    return <Typography>Loading weather data...</Typography>;
  }

  const selectedDateData = weatherData[parseInt(selectedDate)];

  if (!selectedDateData) {
    return <Typography>No data available for selected date</Typography>;
  }

  const getTimeRangeData = () => {
    switch (timeOfDay) {
      case 'morning':
        return selectedDateData.morningData || [];
      case 'afternoon':
        return selectedDateData.afternoonData || [];
      case 'evening':
        return selectedDateData.eveningData || [];
      default:
        return [];
    }
  };

  const hourlyData = getTimeRangeData();

  return (
    <Box sx={{ width: '100%', height: 400 }}>
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
