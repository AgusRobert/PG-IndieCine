import React, { useState, useEffect } from "react";
import { DATE_ASC, DATE_DES } from '../../redux/reducer/Ordercosntants';
import { useDispatch } from "react-redux";
import { sortDate } from '../../redux/actions/index';
import { styled, Box } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: "black",
  backgroundColor: "#b388ff",
});

const SelectStyle = styled(TextField)({
  borderRadius: 2,
  width: 160,
  padding: 0,
});


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
    setDate(e.target.value)
    dispatch(sortDate(e.target.value));
  }

  return (
   <Box> <SelectStyle 
   name="select"
  onChange={onSelectChange}
  select
  label="
  Antigüedad"
  variant="outlined"
  size="small"
  sx={{
    ":active": {
      color: "black",
      borderColor: deepPurple[600],
    },
    ":focused": {
      borderColor: deepPurple[600],
    },
  }}
  >
      <MenuItemStyle value={DATE_ASC}>Lo nuevo</MenuItemStyle>
      <MenuItemStyle value={DATE_DES}>Lo clásico</MenuItemStyle>
    </SelectStyle></Box>

  );
}

