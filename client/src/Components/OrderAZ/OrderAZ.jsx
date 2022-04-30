import React, { useState, useEffect } from "react";
import { getMovies, sortName } from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { NAME_ASC, NAME_DES } from '../../redux/reducer/Ordercosntants';

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

export default function OrderAZ (){
    
    const dispatch = useDispatch();

    const [ordenAlfabetico, setOrdenAlfabetico] = useState('');

    /* const allMovies = useSelector (state => state.pelisfiltradas); */
    
    /* useEffect(()=>{
        dispatch(getMovies());
    }, [dispatch]) */

    /* const [orden, setOrden] = useState("");

    const [currentPage, setCurrentPage] = useState(1); */

    function handleSort(e){
        e.preventDefault();
        setOrdenAlfabetico(e.target.value)
        dispatch(sortName(e.target.value))
        /* setCurrentPage(1);
        setOrden(e.target.value); */
    }

    return (
    <div sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-customized-select-label">Orden Alfabético</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={ordenAlfabetico}
          onChange={handleSort}
          input={<BootstrapInput />}
        >
          <MenuItem value={NAME_ASC}>A hasta Z</MenuItem>
          <MenuItem value={NAME_DES}>Z hasta A</MenuItem>
        </Select>
      </FormControl>
    </div>
    )
}