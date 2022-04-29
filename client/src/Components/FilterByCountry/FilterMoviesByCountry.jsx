import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getMoviesByCountry, getCountries} from "../../redux/actions/index";

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

export default function FilterMovieByCountry(){

    const dispatch = useDispatch();

    const countries = useSelector((state) => state.countries);

    const [country, setCountry] = useState('');

    function handleChange(e) {
        setCountry(e.target.value) && dispatch(getMoviesByCountry(e.target.value))
    };

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);

    let key = 1;

    return (
        <div sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-customized-select-label">Países</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={country}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {countries ? countries.map((e) => (
                    <MenuItem key ={key++} value={e.name}>{e.name}</MenuItem>
                )) : null}
        </Select>
      </FormControl>
    </div>
    )
}
