import React, { useState, useEffect } from "react";
import { DATE_ASC, DATE_DES } from '../../redux/reducer/Ordercosntants';
import { useDispatch } from "react-redux";
import { sortDate } from '../../redux/actions/index';

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

export default function OrderDate() {

   let dispatch = useDispatch()

   const [date, setDate] = useState('');
  
  function onSelectChange(e) {
    e.preventDefault();
    setDate(e.target.value) && dispatch(sortDate(e.target.value));
  }

  return (
    <div sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-customized-select-label">Fecha</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={date}
          onChange={onSelectChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={DATE_ASC}>Lo nuevo</MenuItem>
          <MenuItem value={DATE_DES}>Lo clásico</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

