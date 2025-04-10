import React from "react";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";



import {
  Card,
  CardContent,

  Typography,
  Box,
  

} from "@mui/material";

const CarCard = ({ car, toggleWishlist, isInWishlist }) => {
  const {
    make,
    model,
    fuel_type,
    engine,
    cylinders,
    year,
  } = car;



  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
        <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  height={150}
  bgcolor="grey.100"
>
  <DirectionsCarIcon sx={{ fontSize: 60, color: 'primary.main' }} />
</Box>

      <CardContent>
        <Typography variant="h6">{make} {model}</Typography>
        <IconButton onClick={() => toggleWishlist(car)}>
  {isInWishlist(car.id) ? (
    <FavoriteIcon color="error" />
  ) : (
    <FavoriteBorderIcon />
  )}
</IconButton>

        <Box display="flex" flexDirection="column" mt={1}>
          <Typography variant="body2">Fuel: {fuel_type || "N/A"}</Typography>
          <Typography variant="body2">Engine: {engine || "N/A"}</Typography>
          <Typography variant="body2">Cylinders: {cylinders || "N/A"}</Typography>
          <Typography variant="body2">Year: {year || "N/A"}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarCard;
