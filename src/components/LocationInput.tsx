import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';

interface LocationInputProps {
  location: string;
  onLocationChange: (location: string) => void;
  onLocationSubmit: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  location,
  onLocationChange,
  onLocationSubmit,
}) => {
  const handleChange = (value: string) => {
    onLocationChange(value);
    
    if (value.trim().length >= 3) {
      const timer = setTimeout(() => {
        onLocationSubmit(value);
      }, 2000);

      return () => clearTimeout(timer);
    }
  };

  return (
    <Box>
      <TextField
        label="Event Location"
        variant="outlined"
        value={location}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter location (e.g., Central Park, New York)"
        fullWidth
      />
    </Box>
  );
};

export default LocationInput;
