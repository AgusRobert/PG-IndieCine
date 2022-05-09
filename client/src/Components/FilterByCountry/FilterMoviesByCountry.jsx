import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesByCountry, getCountries } from "../../redux/actions/index";
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

export default function FilterMovieByCountry() {
  let key = 1;
  const dispatch = useDispatch();

  const countries = useSelector(state => state.countries);

  const [country, setCountry] = useState("");

  function handleChange(e) {
    setCountry(e.target.value);
    dispatch(getMoviesByCountry(e.target.value));
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <Box>
      <SelectStyle
        name="select"
        onChange={e => handleChange(e)}
        select
        label="
  País"
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
        {countries
          ? countries.map(e => (
              <MenuItemStyle key={key++} value={e.name}>
                {e.name}
              </MenuItemStyle>
            ))
          : null}
      </SelectStyle>
    </Box>
  );
}
