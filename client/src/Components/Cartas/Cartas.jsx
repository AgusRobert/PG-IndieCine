import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cartas({
  title,
  poster,
  genres,
  rating,
  synopsis,
  year,
  country,
  duration,
  director,
  id,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{  padding:0, minWidth: 300, maxWidth: 300, backgroundColor: "#1F271B" }}>
      <Link variant="button" underline="none" to={`/detail/${id}`}>
        <CardMedia
          component="img"
          height="350"
          image={poster}
          alt="img not found"
        />
        </Link>
        <CardContent>
          {/* Estrellitas favoritos */}
          <Link variant="button"  text-decoration="none" underline="none" to={`/detail/${id}`}>
            <Typography variant="h6" style={{ color: "#FFBE0B" }}>
              {title}
            </Typography>{" "}
          </Link>
          <Typography variant="h6" style={{ color: "#f1c232" }}>
            {year}
          </Typography>
          {/* <Rating
            name="half-rating-read"
            precision={0.5}
            sx={{
              "& .MuiRating-iconFilled": { color: "#f1c232" },
            }}
            value={rating}
            readOnly
          /> */}
          {/* Estrellitas favoritos */}
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            
          >
            <ExpandMoreIcon style={{ color: '#651fff', backgroundColor:'#f1c232', borderRadius:20 }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph style={{ color: "#bdbdbd",fontWeight: 'bold' }}>
              Dirección: {director}{" "}
            </Typography>
            <Typography paragraph style={{ color: "#bdbdbd",fontWeight: 'bold' }}>
              {genres}{" "}
            </Typography>
            <Typography paragraph style={{ color: "#bdbdbd",fontWeight: 'bold' }}>
              {" "}
              País: {country}
            </Typography>
            <Typography paragraph style={{ color: "#bdbdbd",fontWeight: 'bold' }}>
              Duración: {duration}{" "}
            </Typography>
            <Typography paragraph  style={{ color: "#bdbdbd" ,fontWeight: 'bold' }}>Sinopsis: </Typography>
            <Typography paragraph  style={{ color: "#bdbdbd" }}> {synopsis}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
