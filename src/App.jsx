import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Pagination,
  Stack,
  Button,
} from "@mui/material";
import Filters from "./components/Filters";
import CarCard from "./components/CarCard";
import mockCars from "./data/cars";

const App = () => {
  const [filters, setFilters] = useState({ brand: "", fuel: "" });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });
  const [showWishlist, setShowWishlist] = useState(false);

  const carsPerPage = 10;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (id) => wishlist.some((car) => car.id === id);

  const toggleWishlist = (car) => {
    const inList = isInWishlist(car.id);
    const updatedWishlist = inList
      ? wishlist.filter((item) => item.id !== car.id)
      : [...wishlist, car];

    setWishlist(updatedWishlist);

    // Snackbar reset and show
    setSnackbar((prev) => ({ ...prev, open: false }));
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `${car.make} ${inList ? "removed from" : "added to"} wishlist`,
        severity: inList ? "error" : "success",
      });
    }, 100);
  };

  const fetchCars = async () => {
    setLoading(true);
    try {
      let result = [...mockCars];
      const brand = filters.brand?.toLowerCase().trim();
      if (brand) {
        result = result.filter((car) => car.make.toLowerCase().includes(brand));
      }
      if (filters.fuel) {
        result = result.filter((car) =>
          car.fuel_type?.toLowerCase().includes(filters.fuel.toLowerCase())
        );
      }
      setCars(result);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching cars", err);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showWishlist) fetchCars();
  }, [filters, showWishlist]);

  const visibleCars = showWishlist ? wishlist : currentCars;
  const noDataText = showWishlist
    ? "Your wishlist is empty."
    : "No cars found.";

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Car Finder App 🚗
      </Typography>

      <Button
        variant="contained"
        onClick={() => setShowWishlist((prev) => !prev)}
        sx={{ mb: 2 }}
      >
        {showWishlist ? "Back to Search" : "View Wishlist ❤️"}
      </Button>
      {showWishlist && wishlist.length!==0? (
        <Button
          variant="contained"
          onClick={() => setWishlist([])
          }
          sx={{ mb: 2, marginLeft: 2 }}
        >
          Clear Wishlist
        </Button>
      ) : (
        <></>
      )}

      {!showWishlist && <Filters filters={filters} setFilters={setFilters} />}

      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={2}
          justifyContent="center"
        >
          {visibleCars.length === 0 ? (
            <Typography
              variant="h6"
              mt={4}
              textAlign="center"
              color="text.secondary"
            >
              {noDataText}
            </Typography>
          ) : (
            visibleCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                toggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            ))
          )}
          <Button> </Button>
        </Box>
      )}

      {!showWishlist && cars.length > carsPerPage && (
        <Stack spacing={2} mt={4} alignItems="center">
          <Pagination
            count={Math.ceil(cars.length / carsPerPage)}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
          />
        </Stack>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
