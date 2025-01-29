import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface TimeRangePickerProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Start Time</InputLabel>
        <Select
          value={startTime}
          label="Start Time"
          onChange={(e) => onStartTimeChange(e.target.value)}
        >
          {timeOptions.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>End Time</InputLabel>
        <Select
          value={endTime}
          label="End Time"
          onChange={(e) => onEndTimeChange(e.target.value)}
        >
          {timeOptions.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TimeRangePicker;
