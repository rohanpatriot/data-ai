import React from "react";
import { Button, Typography, useMediaQuery } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
} from "@mui/material";
import DataSourceCard from "./DataSourceCard";
import theme from "../../../../theme/theme";

interface DataSourcesModalProps {
  showDataSourcesModal: boolean;
  setShowDataSourcesModal: (open: boolean) => void;
  setShowAddDataSourceModal: (open: boolean) => void;
  dataSources: Array<{
    id: string;
    name: string;
    addedAt: string;
    fileType: string;
    size: string;
  }>;
}

const DataSourcesModal: React.FC<DataSourcesModalProps> = ({
  showDataSourcesModal,
  setShowDataSourcesModal,
  setShowAddDataSourceModal,
  dataSources,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      open={showDataSourcesModal}
      onClose={() => setShowDataSourcesModal(false)}
      fullWidth
      maxWidth="sm"
      sx={{
        borderRadius: isMobile ? "16px 16px 0 0" : 12,
        "& .MuiDrawer-paper": {
          width: isMobile ? "100%" : "450px",
          borderRadius: isMobile
            ? "16px 16px 0 0 !important"
            : "12px !important",
          maxHeight: isMobile ? "90vh" : "100%",
          boxSizing: "border-box", // Ensure padding is included in width calculation
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="h5" component="div">
          Data Sources
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setShowDataSourcesModal(false);
            setShowAddDataSourceModal(true);
          }}
        >
          Add a data source
        </Button>
      </DialogTitle>
      <DialogContent sx={{ p: 1, border: "none" }}>
        <List>
          {dataSources.map((source, index) => (
            <React.Fragment key={source.id + index}>
              <DataSourceCard
                source={source}
                handleDeleteDataSource={() => {}}
                handleEditDataSource={() => {}}
              />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={() => setShowDataSourcesModal(false)}
          variant="outlined"
          color="secondary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataSourcesModal;
