import React, { useState, useEffect } from "react";
import { RATING_ASC, RATING_DES } from '../../redux/reducer/Ordercosntants';
import { useDispatch } from "react-redux";
import { orderByRating } from '../../redux/actions/index';

import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(1),
  },
  '& .MuiInputBase-input': {
    color: "#D892FD",
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}));

export default function OrderRating (){

    let dispatch = useDispatch()

    const [rating, setRating] = useState('');
  
  function onSelectChange(e) {
    setRating(e.target.value) && dispatch(orderByRating(e.target.value));
  }

    return (
      <div sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-customized-select-label">Rating</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={rating}
          onChange={onSelectChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={RATING_ASC}>Peor al Mejor</MenuItem>
          <MenuItem value={RATING_DES}>Mejor al Peor</MenuItem>
        </Select>
      </FormControl>
    </div>
    )
}