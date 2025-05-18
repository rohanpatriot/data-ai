import React, { useEffect, useState } from "react";
import {
  List,
  Typography,
  Box,
  Drawer,
  Button,
  Skeleton,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DataSourceCard from "./DataSourceCard";
import { supabase } from "../../../../supabase-client";

interface DataSource {
  id: string;
  name: string;
  type: string;
  fileType: string;
  size: string;
  addedAt: string;
}

interface DataSourcesSidePanel {
  setDSPanelOpen: (open: boolean) => void;
  DSPanelOpen: boolean;
  dataSources: Array<{
    id: string;
    name: string;
    addedAt: string;
    fileType: string;
    size: string;
  }>;
  setShowAddDataSourceModal: (open: boolean) => void;
}

import { formatRelativeTime } from "../../../../shared/utils/dateUtils";

const DataSourcesSidePanel: React.FC<DataSourcesSidePanel> = ({
  setDSPanelOpen,
  DSPanelOpen,
  dataSources: _initialDataSources,
  setShowAddDataSourceModal,
}) => {
  console.debug('Initial data sources:', _initialDataSources);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Remove the duplicate formatRelativeTime function here

  const fetchDataSources = async () => {
    // Get the project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("projectId");

    if (!projectId) return;

    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("datasources")
        .select("*")
        .eq("project_id", projectId);

      if (error) {
        console.error("Error fetching data sources:", error);
        setError("Failed to load data sources");
        return;
      }

      if (data) {
        // Transform the data to match your DataSource interface
        const formattedSources = data.map((source) => ({
          id: source.id,
          name: source.name,
          type: source.is_link
            ? "URL"
            : source.path.split(".").pop()?.toUpperCase() || "FILE",
          fileType: source.is_link
            ? "URL"
            : `${source.path.split(".").pop()?.toUpperCase() || "FILE"} file`,
          size: source.is_link ? "0" : "2.2 Kb", // You might want to store file size in the database
          addedAt: formatRelativeTime(source.created_at),
        }));

        setDataSources(formattedSources);
      }
    } catch (error) {
      console.error("Exception fetching data sources:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDataSource = async (id: string) => {
    try {
      const { error } = await supabase
        .from("datasources")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting data source:", error);
        return;
      }

      // Refresh the list after deletion
      fetchDataSources();
    } catch (error) {
      console.error("Exception deleting data source:", error);
    }
  };

  const handleEditDataSource = (id: string, newName: string) => {
    // Update the data source name in the database
    supabase
      .from("datasources")
      .update({ name: newName })
      .eq("id", id)
      .then(({ error }) => {
        if (error) {
          console.error("Error updating data source:", error);
          return;
        }
        // Refresh the list after update
        fetchDataSources();
      });
  };

  useEffect(() => {
    if (DSPanelOpen) {
      fetchDataSources();
    }
  }, [DSPanelOpen]);

  return (
    <Drawer
      anchor="right"
      open={DSPanelOpen}
      onClose={() => setDSPanelOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: isMobile ? "90vw" : "45%",
          boxSizing: "border-box",
          borderRadius: "20px 0 0 20px",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          padding: 3,
          bgcolor: "#ffffff",
        }}
      >
        <Box
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
              setDSPanelOpen(false);
              setShowAddDataSourceModal(true);
            }}
            sx={{
              bgcolor: "#A224F0", //again, var doesn't work? This is just the --primary color
              color: "white",
              "&:hover": { bgcolor: "#A224F0" },
              borderRadius: 2,
              px: 1.5,
              fontWeight: 550,
            }}
          >
            Add a data source
          </Button>
        </Box>

        {loading ? (
          <Stack spacing={2}>
            {new Array(3).fill(null).map((_, index) => (
              <Skeleton key={index} animation="wave" height={78} />
            ))}
          </Stack>
        ) : error ? (
          <Typography color="error" sx={{ p: 2 }}>
            {error}
          </Typography>
        ) : dataSources.length === 0 ? (
          <Typography sx={{ p: 2, textAlign: "center" }}>
            No data sources found. Add your first data source!
          </Typography>
        ) : (
          <List>
            {dataSources.map((source) => (
              <React.Fragment key={source.id}>
                <DataSourceCard
                  source={source}
                  handleDeleteDataSource={() =>
                    handleDeleteDataSource(source.id)
                  }
                  handleEditDataSource={handleEditDataSource}
                />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
};

export default DataSourcesSidePanel;
