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
  const [debouncedLocation, setDebouncedLocation] = useState(location);

  useEffect(() => {
    setDebouncedLocation(location);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedLocation.trim().length >= 3) {
        onLocationSubmit(debouncedLocation);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [debouncedLocation, onLocationSubmit]);

  return (
    <Box>
      <TextField
        label="Event Location"
        variant="outlined"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        placeholder="Enter location (e.g., Central Park, New York)"
        fullWidth
      />
    </Box>
  );
};

export default LocationInput;
