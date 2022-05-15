import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material";
import { amber, deepPurple, grey } from "@material-ui/core/colors";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const AvatarStyle = styled(Avatar)({
  color: amber[200],
  backgroundColor: deepPurple[900],
  height: 80,
  width: 80,
  borderRadius: 40,
  border: `2px solid ${"#FFBE0B"}`,
 /*  borderRight: "4px solid transparent", */
});
const BodyStyle = styled(Box)({
  padding: "10px",
  whiteSpace: "pre-line",
  maxWidth: "500px",
});
const BoxStyle = styled(Box)({
  padding: "20px",
});
const NameStyle = styled(Paper)({
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor:  "#1F271B",
  borderRadius: 20,
  display: "inline-block",
  width: 200
});
const Pgeneral = styled(Paper)({
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: "#1F271B",
  borderRadius: 20,
  display: "inline-block",
});
const BoxGeneral = styled(Box)({
  padding: "10px",
  display: "flex",
  width: 350
});
const userCards = ({ title, poster, country, id }) => {
  return (
    <BoxGeneral>
      <Pgeneral>
        <BoxStyle>
          <BoxGeneral>
            <AvatarStyle src={poster} alt={title} />
            <BodyStyle>
              <NameStyle>
                <Link variant="button"  text-decoration="none" underline="none" to={`/users/${id}`}>
            <Typography variant="h6" style={{ color: "#FFBE0B" }}>
              {title}
            </Typography>{" "}
            <Typography variant="h7" color={"#FFBE0B"} fontFamily="">
                  {country}
                </Typography>
          </Link>
              </NameStyle>
            </BodyStyle>
          </BoxGeneral>
        </BoxStyle>
        <Divider color="#FFBE0B" />
      </Pgeneral>
    </BoxGeneral>
  );
};

export default userCards;
