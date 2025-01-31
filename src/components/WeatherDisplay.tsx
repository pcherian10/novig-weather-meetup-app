import React from 'react';
import { Box, Typography } from '@mui/material';
import { WeatherData } from '../types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherDisplayProps {
  weatherData?: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No weather data available</Typography>
      </Box>
    );
  }

  const data = {
    labels: ['11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
    datasets: [
      {
        label: 'Temperature (°F)',
        data: Array(9).fill(weatherData.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Wind Speed (mph)',
        data: Array(9).fill(weatherData.windSpeed),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Humidity (%)',
        data: Array(9).fill(weatherData.humidity),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Precipitation Chance (%)',
        data: Array(9).fill(weatherData.precipitationChance),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weather Forecast',
      },
    },
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Line options={options} data={data} />
    </Box>
  );
};

export default WeatherDisplay;
