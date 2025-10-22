import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  width = 200,
}) => {
  return (
    <Box>
      <TextField
        placeholder={placeholder}
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width }}
      />
    </Box>
  );
};

export default SearchBar;
