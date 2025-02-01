import React, { useState } from 'react';
import { TextField, Box, Modal, Button, IconButton, Typography } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';

interface LocationInputProps {
  location: string;
  onLocationChange: (location: string) => void;
  onLocationSubmit: (location: string) => void;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%',    // 90% width on extra-small screens
    sm: '400px'   // 400px on small screens and up
  },
  maxWidth: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: { 
    xs: 2,        // Less padding on mobile
    sm: 4         // More padding on larger screens
  },
  borderRadius: 2,
  m: 'auto',      // Center in viewport
  outline: 'none' // Remove default focus outline
};

const LocationInput: React.FC<LocationInputProps> = ({
  location,
  onLocationChange,
  onLocationSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setTempLocation(location); // Reset temp location when closing
  };

  const handleSubmit = () => {
    if (tempLocation.trim().length >= 3) {
      onLocationChange(tempLocation);
      onLocationSubmit(tempLocation);
      handleClose();
    }
  };

  return (
    <Box>
      <IconButton 
        onClick={handleOpen}
        sx={{ 
          color: location ? 'primary.main' : 'text.secondary',
          '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
        }}
      >
        <AddLocationIcon />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {location || 'Add Location'}
        </Typography>
      </IconButton>

      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="location-modal-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={modalStyle}>
          <Typography 
            id="location-modal-title" 
            variant="h6" 
            component="h2" 
            sx={{ 
              mb: 2,
              fontSize: {
                xs: '1.1rem',  // Smaller font on mobile
                sm: '1.25rem'  // Default h6 size on larger screens
              }
            }}
          >
            Enter Location
          </Typography>
          <TextField
            label="Event Location"
            variant="outlined"
            value={tempLocation}
            onChange={(e) => setTempLocation(e.target.value)}
            placeholder="Enter location (e.g., Central Park, New York)"
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="off"
          />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: { 
              xs: 1,  // Smaller gap on mobile
              sm: 2   // Larger gap on desktop
            }
          }}>
            <Button 
              onClick={handleClose}
              sx={{
                minWidth: { xs: '72px', sm: '80px' }  // Ensure buttons don't get too small
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              disabled={tempLocation.trim().length < 3}
              sx={{
                minWidth: { xs: '72px', sm: '80px' }
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default LocationInput;
