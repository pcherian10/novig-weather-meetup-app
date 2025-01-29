import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { WeatherData, WeatherMessage } from '../types';
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
  weatherData: WeatherData[];
  message: WeatherMessage;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, message }) => {
  const chartData = {
    labels: weatherData.map(data => new Date(data.datetime).toLocaleDateString()),
    datasets: [
      {
        label: 'Temperature (°F)',
        data: weatherData.map(data => data.temp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Humidity (%)',
        data: weatherData.map(data => data.humidity),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography
          variant="h6"
          color={
            message.type === 'success'
              ? 'success.main'
              : message.type === 'warning'
              ? 'warning.main'
              : 'error.main'
          }
        >
          {message.message}
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Line options={options} data={chartData} />
      </Paper>
    </Box>
  );
};

export default WeatherDisplay;
