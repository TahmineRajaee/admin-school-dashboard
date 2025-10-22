"use client";

import React, { useState, useCallback, useMemo } from "react";
import { examsData } from "@/data/data";
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
import useSearch from "@/hooks/useSearch";
import SearchBar from "@/components/SearchBar";

export default function Exams() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 6,
  });

  const [data, setData] = useState(examsData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const { searchTerm, setSearchTerm, filteredData } = useSearch(data, [
    "subject",
    "class",
    "teacher",
  ]);

  const handleDelete = useCallback((id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setSnackbar({ open: true, message: "Exam successfully deleted." });
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
      field: "subject",
      headerName: "Subject",
      width: 200,
    },
    {
      field: "class",
      headerName: "Class",
      width: 130,
    },
    {
      field: "teacher",
      headerName: "Teacher",
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
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
          All Exams
        </h2>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search exams..."
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
        <DialogTitle>Edit Exam Data</DialogTitle>
        <DialogContent>
          {currentRow && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <TextField
                label="Subject"
                value={editedData.subject || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, subject: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Class"
                value={editedData.class || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, class: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Teacher"
                value={editedData.teacher || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, teacher: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Date"
                value={editedData.date || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, date: e.target.value })
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
