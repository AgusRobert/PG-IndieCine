import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { yellow100 } from "material-ui/styles/colors";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cartas({ title, poster, genres, rating, synopsis, year, country, duration }) {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, backgroundColor: "#674ea7", }}>
        <CardMedia
          component="img"
          height="194"
          image=/* "https://images-na.ssl-images-amazon.com/images/I/71A0Ls9QIML._RI_.jpg" */ {poster}
          alt="img not found"
        />
        <CardContent>
          {/* Estrellitas favoritos */}
          <Rating
            name="half-rating-read"
            precision={0.5}
            sx=
            {
              {
                "& .MuiRating-iconFilled":
                  { color: "#f1c232" }
              }
            }
            value={rating}
            readOnly
          />
          {/* Estrellitas favoritos */}

          <h4 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
            {title} {year}
          </h4>
          <h4 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
            {genres}
          </h4>
          <h4 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
            {country}
          </h4>
          <h4 style={{ color: "#f1c232", textShadow: " 0 0 3px #351c75, 0 0 5px #351c75" }}>
            {duration}
          </h4>
        </CardContent>
        <CardActions disableSpacing>

          <ExpandMore
            expand={expanded}
            onMouseOver={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Sinopsis:</Typography>
            <Typography paragraph>
              {synopsis}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>

    </>
  )
}
