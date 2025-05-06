import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

interface AddDataSourceProps {
  showAddDataSourceModal: boolean;
  setShowAddDataSourceModal: (show: boolean) => void;
  newDataSource: {
    name: string;
    type: string;
    sourceType: string;
  };
  setNewDataSource: (dataSource: {
    name: string;
    type: string;
    sourceType: string;
  }) => void;
  handleAddDataSource: () => void;
}

const AddDataSource: React.FC<AddDataSourceProps> = ({
  showAddDataSourceModal,
  setShowAddDataSourceModal,
  newDataSource,
  setNewDataSource,
  handleAddDataSource,
}) => {
  return (
    <Dialog
      open={showAddDataSourceModal}
      onClose={() => setShowAddDataSourceModal(false)}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 4 } }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div">
          Add Data Source
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1, fontWeight: 600 }}
        >
          Add a new data source by uploading a file or providing a URL
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Name
            </Typography>
            <TextField
              fullWidth
              name="name"
              placeholder="Name"
              value={newDataSource.name}
              onChange={(e) =>
                setNewDataSource({ ...newDataSource, name: e.target.value })
              }
              variant="outlined"
              size="small"
              required
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Type of Data Source
            </Typography>
            <ToggleButtonGroup
              fullWidth
              color="primary"
              value={newDataSource.sourceType}
              exclusive
              onChange={(e) =>
                setNewDataSource({
                  ...newDataSource,
                  sourceType: (e.target as HTMLButtonElement)?.value ?? "",
                })
              }
              sx={{
                "& .MuiToggleButton-root": {
                  textTransform: "none",
                  bgcolor: "#f5f5f5",
                  color: "#333",
                  "&.Mui-selected": {
                    bgcolor: "#e0e0e0",
                    color: "#333",
                    fontWeight: 500,
                  },
                },
                border: "1px solid #e0e0e0",
                borderRadius: "5px",
              }}
            >
              <ToggleButton value="File">File</ToggleButton>
              <ToggleButton value="Url">Url</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {newDataSource.sourceType === "File" ? (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                File
              </Typography>
              <FormControl fullWidth>
                <TextField
                  key={Date.now()}
                  type="file"
                  InputProps={{
                    startAdornment: (
                      <Box
                        component="span"
                        sx={{ mr: 2, width: 16, height: 16 }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H12M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                              stroke="#293133"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M17.5 21L17.5 15M17.5 15L20 17.5M17.5 15L15 17.5"
                              stroke="#293133"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </Box>
                    ),
                  }}
                  onChange={() => {}}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#f5f5f5",
                    },
                  }}
                />
              </FormControl>
            </Box>
          ) : (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                URL
              </Typography>
              <TextField
                fullWidth
                name="url"
                placeholder="Enter URL"
                value={""} // Expand the newDataSource object to include URL ?
                onChange={() => {}}
                variant="outlined"
                size="small"
                required
                InputProps={{
                  startAdornment: (
                    <Box component="span" sx={{ mr: 2, width: 16, height: 16 }}>
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M7.05025 1.53553C8.03344 0.552348 9.36692 0 10.7574 0C13.6528 0 16 2.34721 16 5.24264C16 6.63308 15.4477 7.96656 14.4645 8.94975L12.4142 11L11 9.58579L13.0503 7.53553C13.6584 6.92742 14 6.10264 14 5.24264C14 3.45178 12.5482 2 10.7574 2C9.89736 2 9.07258 2.34163 8.46447 2.94975L6.41421 5L5 3.58579L7.05025 1.53553Z"
                            fill="#293133"
                          ></path>{" "}
                          <path
                            d="M7.53553 13.0503L9.58579 11L11 12.4142L8.94975 14.4645C7.96656 15.4477 6.63308 16 5.24264 16C2.34721 16 0 13.6528 0 10.7574C0 9.36693 0.552347 8.03344 1.53553 7.05025L3.58579 5L5 6.41421L2.94975 8.46447C2.34163 9.07258 2 9.89736 2 10.7574C2 12.5482 3.45178 14 5.24264 14C6.10264 14 6.92742 13.6584 7.53553 13.0503Z"
                            fill="#293133"
                          ></path>{" "}
                          <path
                            d="M5.70711 11.7071L11.7071 5.70711L10.2929 4.29289L4.29289 10.2929L5.70711 11.7071Z"
                            fill="#293133"
                          ></path>{" "}
                        </g>
                      </svg>
                    </Box>
                  ),
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, justifyContent: "flex-end" }}>
        <Button
          onClick={() => setShowAddDataSourceModal(false)}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
        <Button onClick={handleAddDataSource} variant="contained">
          Add Data Source
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDataSource;
