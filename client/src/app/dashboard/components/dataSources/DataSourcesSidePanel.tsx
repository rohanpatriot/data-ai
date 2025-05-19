import React from "react";
import { Button, List, useMediaQuery } from "@mui/material";

import { useDataSources } from "../../hooks/useDataSources";
import { useDataSourceDialogs } from "../hooks/useDataSourceDialogs";
import DataSourceCard from "./DataSourceCard";
import AddDataSourceDialog from "./AddDataSourceDialog";
import DeleteDataSourceDailog from "./DeleteDataSourceDialog";
import { EmptyState } from "../../../../shared/components/EmptyState";
import { Add } from "@mui/icons-material";
import DataSourceCardSkeleton from "./DataSourceCardSkeleton";
import ResponsiveSidePanel from "../../../../shared/components/ResponsiveSidePanel";
import theme from "../../../../theme/theme";

// === Props ===
interface Props {
  DSPanelOpen: boolean;
  setDSPanelOpen: (open: boolean) => void;
}

// === Styles ===
const styles = {
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
  const projectId = new URLSearchParams(window.location.search).get(
    "projectId"
  )!;
  const { dataSources, isLoading, refresh } = useDataSources(projectId);
  const { add, del } = useDataSourceDialogs({ projectId, refresh });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const renderDataSources = () => {
    if (isLoading) {
      return <DataSourceCardSkeleton count={3} />;
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
      <ResponsiveSidePanel
        open={DSPanelOpen}
        onClose={() => setDSPanelOpen(false)}
        title="Data Sources"
        rightSideContent={
          <Button
            variant="contained"
            onClick={add.open}
            sx={styles.addButton}
            startIcon={<Add />}
          >
            {isMobile ? "Add" : "Add a data source"}
          </Button>
        }
      >
        {renderDataSources()}
      </ResponsiveSidePanel>

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
