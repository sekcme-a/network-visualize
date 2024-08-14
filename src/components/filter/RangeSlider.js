import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function RangeSlider({id, filterEdgeByScore, setFilterEdgeByScore, disabled}) {
  const [value, setValue] = React.useState([0, 1]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilterEdgeByScore(prev => ({
      ...prev,
      [id]: {
        min: newValue[0],
        max: newValue[1]
      }
    }))
  };

  return (
    <Box sx={{ width:100 }}>
      <Slider
        disabled={disabled}
        size="small"
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={0.001}
        min={0}
        max={1}
      />
    </Box>
  );
}
