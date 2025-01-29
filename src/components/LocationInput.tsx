import React from 'react';
import { TextField, Box } from '@mui/material';

interface LocationInputProps {
  value: string;
  onChange: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ value, onChange }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Event Location"
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter location (e.g., Central Park, New York)"
      />
    </Box>
  );
};

export default LocationInput;
