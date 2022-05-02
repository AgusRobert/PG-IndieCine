import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getMoviesByCountry, getCountries} from "../../redux/actions/index";
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

export default function FilterMovieByCountry(){

    const dispatch = useDispatch();

    const countries = useSelector((state) => state.countries);

    function handleChange(e) {
        dispatch(getMoviesByCountry(e.target.value))
    };

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);

    let key = 1;

    return (
        <Box>
             <SelectStyle 
   name="select"
   onChange = {(e) => handleChange(e)}
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
                        {countries ? countries.map((e) => (
                            <MenuItemStyle key ={key++} value={e.name}>{e.name}</MenuItemStyle>
                        )) : null}
                    </SelectStyle>
                   
        </Box>
    )
}
