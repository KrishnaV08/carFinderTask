import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";

const Filters = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        setFilters({ ...filters, brand: e.target.value.trim() });
      };
      
  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
      <TextField
        label="Search Brand"
        variant="outlined"
        value={filters.brand}
        onChange={(e) => handleChange(e)}
      />

      <TextField
        select
        label="Fuel Type"
        value={filters.fuel}
        onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Gasoline">Petrol</MenuItem>
        <MenuItem value="Diesel">Diesel</MenuItem>
        <MenuItem value="Electric">Electric</MenuItem>
      </TextField>
    </Box>
  );
};

export default Filters;

