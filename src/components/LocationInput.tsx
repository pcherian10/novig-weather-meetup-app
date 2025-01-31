import React, { useState } from 'react';
import { TextField, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLocationSubmit(location);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Location"
          variant="outlined"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Enter location (e.g., Central Park, New York)"
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
    </Box>
  );
};

export default LocationInput;
