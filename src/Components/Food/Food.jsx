import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

import { Chip } from "@mui/material";

function Food(props) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 5, marginBottom: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={props.restaurant.image_url}
        alt={props.restaurant.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.restaurant.name}
        </Typography>
        <Typography>
          {props.restaurant.rating}
          <StarIcon />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.restaurant.location.display_address[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.restaurant.location.city}
        </Typography>
        <Chip
          label={props.restaurant && props.restaurant.categories[0].title}
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => props.getRestaurantDetail(props.restaurant.id)}
        >
          Details
        </Button>
        <Button size="small">Book Now</Button>
        <Button size="small">Save</Button>
      </CardActions>
    </Card>
  );
}

export default Food;
