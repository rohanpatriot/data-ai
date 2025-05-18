import React from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  Skeleton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { useDataSources } from "../../hooks/useDataSources";
import { useDataSourceDialogs } from "../hooks/useDataSourceDialogs";
import DataSourceCard from "./DataSourceCard";
import AddDataSourceDialog from "./AddDataSourceDialog";
import DeleteDataSourceDailog from "./DeleteDataSourceDialog";
import { EmptyState } from "../../../../shared/components/EmptyState";
import { Add } from "@mui/icons-material";

// === Props ===
interface Props {
  DSPanelOpen: boolean;
  setDSPanelOpen: (open: boolean) => void;
}

// === Styles ===
const styles = {
  drawerPaper: (isMobile: boolean) => ({
    width: isMobile ? "90vw" : "45%",
    boxSizing: "border-box",
    borderRadius: "20px 0 0 20px",
  }),
  drawerBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    height: "100%",
    padding: 3,
    bgcolor: "#ffffff",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pb: 2,
  },
  addButton: {
    bgcolor: "#A224F0",
    color: "white",
    "&:hover": { bgcolor: "#A224F0" },
    borderRadius: 2,
    px: 1.5,
    fontWeight: 550,
  },
};

// === Component ===
const DataSourcesSidePanel: React.FC<Props> = ({
  DSPanelOpen,
  setDSPanelOpen,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const projectId = new URLSearchParams(window.location.search).get(
    "projectId"
  )!;
  const { dataSources, isLoading, refresh } = useDataSources(projectId);
  const { add, del } = useDataSourceDialogs({ projectId, refresh });

  const renderDataSources = () => {
    if (isLoading) {
      return (
        <Stack spacing={2}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} animation="wave" height={78} />
          ))}
        </Stack>
      );
    }

    if (!dataSources?.length) {
      return (
        <EmptyState
          message="No data sources found. Add your first data source!"
          icon={<Add color="disabled" sx={{ fontSize: 40 }} />}
        />
      );
    }

    return (
      <List>
        {dataSources.map((source) => (
          <DataSourceCard
            key={source.id}
            source={source}
            onDeleteClick={() => del.open(source.id)}
            onEditConfirm={async () => {
              await refresh();
            }}
          />
        ))}
      </List>
    );
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={DSPanelOpen}
        onClose={() => setDSPanelOpen(false)}
        sx={{
          "& .MuiDrawer-paper": styles.drawerPaper(isMobile),
          "& .MuiBackdrop-root": styles.drawerBackdrop,
        }}
      >
        <Box sx={styles.container}>
          <Box sx={styles.headerRow}>
            <Typography variant="h5">Data Sources</Typography>
            <Button
              variant="contained"
              onClick={add.open}
              sx={styles.addButton}
            >
              Add a data source
            </Button>
          </Box>
          {renderDataSources()}
        </Box>
      </Drawer>

      {/* Dialogs */}
      <AddDataSourceDialog
        open={add.isOpen}
        onClose={add.close}
        onConfirm={add.confirm}
        name={add.name}
        onChangeName={add.setName}
        file={add.file}
        onChangeFile={add.setFile}
        url={add.url}
        onChangeUrl={add.setUrl}
        sourceType={add.sourceType}
        onChangeSourceType={add.setSourceType}
        error={add.error}
        loading={add.loading}
      />

      <DeleteDataSourceDailog
        open={del.isOpen}
        onDelete={del.confirm}
        onClose={del.close}
      />
    </>
  );
};

export default DataSourcesSidePanel;
