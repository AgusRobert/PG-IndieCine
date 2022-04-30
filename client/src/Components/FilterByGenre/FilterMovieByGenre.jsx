import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getMoviesByGenre, getGenres} from "../../redux/actions/index";

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

export default function FilterMoviesByGenre(){

    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genres);

    const [genre, setGenre] = useState('');

    function handleChange(e) {
        setGenre(e.target.value)
        dispatch(getMoviesByGenre(e.target.value))
    };

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    let key = 1

    return (
        <div sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-customized-select-label">Géneros</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={genre}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {genres ? genres.map((e) => (
                    <MenuItem key ={key++} value={e.name}>{e.name}</MenuItem>
                )) : null}
        </Select>
      </FormControl>
    </div>
)
}