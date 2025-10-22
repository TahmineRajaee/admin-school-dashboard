"use client";

import React, { useState, useCallback, useMemo } from "react";
import { teachersData } from "@/data/data";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchBar from "@/components/SearchBar";
import useSearch from "@/hooks/useSearch";

export default function Teachers() {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 6,
  });

  const [data, setData] = useState(teachersData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const { searchTerm, setSearchTerm, filteredData } = useSearch(data, [
    "name",
    "teacherId",
    "email",
  ]);

  const handleDelete = useCallback((id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setSnackbar({ open: true, message: "Teacher successfully deleted." });
  }, []);

  const handleEdit = useCallback((row) => {
    setCurrentRow(row);
    setEditedData(row);
    setEditModalOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    setData((prev) =>
      prev.map((item) =>
        item.id === currentRow.id ? { ...item, ...editedData } : item
      )
    );
    setEditModalOpen(false);
    setSnackbar({ open: true, message: "Changes saved successfully" });
  }, [currentRow, editedData]);

  const handleCloseModal = useCallback(() => {
    setEditModalOpen(false);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ open: false, message: "" });
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "teacherId",
      headerName: "Teacher ID",
      width: 130,
    },
    {
      field: "subjects",
      headerName: "Subjects",
      width: 180,
      renderCell: (params) => (
        <div className="text-sm">{params.row.subjects.join(" / ")}</div>
      ),
    },
    {
      field: "classes",
      headerName: "Classes",
      width: 150,
      renderCell: (params) => (
        <div className="text-sm">{params.row.classes.join(" / ")}</div>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  function CustomPagination(props) {
    const { paginationModel, pageCount, onPaginationModelChange } = props;

    return (
      <Box display="flex" alignItems="center" justifyContent="center" p={1}>
        <IconButton
          disabled={paginationModel.page === 0}
          onClick={() =>
            onPaginationModelChange({
              ...paginationModel,
              page: paginationModel.page - 1,
            })
          }
        >
          ←
        </IconButton>

        <Typography variant="body2" mx={2}>
          page {paginationModel.page + 1} of {pageCount}
        </Typography>

        <IconButton
          disabled={paginationModel.page >= pageCount - 1}
          onClick={() =>
            onPaginationModelChange({
              ...paginationModel,
              page: paginationModel.page + 1,
            })
          }
        >
          →
        </IconButton>
      </Box>
    );
  }

  return (
    <div className="w-[98%] mx-auto bg-white rounded-lg shadow mt-[75px] px-3 py-5">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <h2 className="text-base md:text-lg lg:text-xl font-semibold">
          All Teachers
        </h2>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search teachers..."
        />
      </Box>

      <DataGrid
        rows={filteredData}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[6]}
        disableRowSelectionOnClick
        slots={{
          pagination: CustomPagination,
        }}
        slotProps={{
          pagination: {
            paginationModel,
            pageCount: Math.ceil(
              filteredData.length / paginationModel.pageSize
            ),
            onPaginationModelChange: setPaginationModel,
          },
        }}
        sx={{
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f3f4f6",
          },
        }}
      />

      <Dialog
        open={editModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Teacher Data</DialogTitle>
        <DialogContent>
          {currentRow && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <TextField
                label="Name"
                value={editedData.name || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Teacher ID"
                value={editedData.teacherId || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, teacherId: e.target.value })
                }
                fullWidth
              />

              <TextField
                label="Subjects"
                value={
                  editedData.subjects ? editedData.subjects.join(", ") : ""
                }
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    subjects: e.target.value
                      .split(",")
                      .map((item) => item.trim()),
                  })
                }
                fullWidth
              />
              <TextField
                label="Classes"
                value={editedData.classes ? editedData.classes.join(", ") : ""}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    classes: e.target.value
                      .split(",")
                      .map((item) => item.trim()),
                  })
                }
                fullWidth
              />

              <TextField
                label="Phone"
                value={editedData.phone || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, phone: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Email"
                value={editedData.email || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, email: e.target.value })
                }
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>cancel</Button>
          <Button onClick={handleSave} variant="contained">
            save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
