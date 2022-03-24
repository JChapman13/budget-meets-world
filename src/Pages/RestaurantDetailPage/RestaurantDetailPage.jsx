import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function RestaurantDetailPage(props) {
  const itemData = props.restaurantDetail.photos;

  const dayConvert = (day) => {
    if (day === 0) return "Mon";
    if (day === 1) return "Tue";
    if (day === 2) return "Wed";
    if (day === 3) return "Thu";
    if (day === 4) return "Fri";
    if (day === 5) return "Sat";
    if (day === 6) return "Sun";
  };

  const timeConvert = (time) => {
    if (parseInt(time) >= 1200) {
      const adjust = (parseInt(time) - 1200).toString();
      if (adjust.length < 4) {
        const newTime = adjust[0] + ":" + adjust[1] + adjust[2] + "pm";
        return newTime;
      } else {
        const newTime =
          adjust[0] + adjust[1] + ":" + adjust[2] + adjust[3] + "pm";
        return newTime;
      }
    } else {
      const newTime = time[0] + time[1] + ":" + time[2] + time[3] + "am";
      return newTime;
    }
  };

  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={props.restaurantDetail.image_url}
          alt={props.restaurantDetail.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.restaurantDetail.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {props.restaurantDetail.price} - {props.restaurantDetail.rating}{" "}
            <StarIcon />- {props.restaurantDetail.review_count} reviews
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ textDecoration: "underline" }}
          >
            Location & Hours
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.restaurantDetail.location.display_address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.restaurantDetail.display_phone}
          </Typography>
          {props.restaurantDetail.hours[0].open.map((hours, idx) => {
            return (
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  key={hours + idx}
                >
                  {dayConvert(hours.day)} {hours.start} -{" "}
                  {timeConvert(hours.end)}
                </Typography>
              </>
            );
          })}
        </CardContent>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {itemData.map((item, idx) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={props.restaurantDetail.name + idx}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        );
      </Card>
    </div>
  );
}

export default RestaurantDetailPage;
