import React from "react";
import { List, Typography, Box, Drawer, Button } from "@mui/material";
import DataSourceCard from "./DataSourceCard";


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

const DataSourcesSidePanel: React.FC<DataSourcesSidePanel> = ({ setDSPanelOpen, DSPanelOpen, dataSources, setShowAddDataSourceModal }) => {
  return (
    <Drawer
        anchor="right"
        open={DSPanelOpen}
        onClose={() => setDSPanelOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '45%',
            boxSizing: 'border-box',
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <Box
          sx={{
            height: '100%',
            padding: 3,
            bgcolor: '#ffffff',
          }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
            <Typography variant="h5" component="div">Data Sources</Typography>
            <Button 
                variant="contained"
                onClick={() => {
                setDSPanelOpen(false);
                setShowAddDataSourceModal(true);
                }}
                sx={{ 
                bgcolor: '#A224F0', //again, var doesn't work? This is just the --primary color
                color: 'white',
                '&:hover': { bgcolor: '#A224F0' },
                borderRadius: 2,
                px: 1.5,
                fontWeight: 550,
                }}
            >
                Add a data source
            </Button>
            </Box>
          <List>
                {dataSources.map((source, index) => (
                <React.Fragment key={source.id + index}>
                    <DataSourceCard source={source} handleDeleteDataSource={() => {}} handleEditDataSource={() => {}}/>
                </React.Fragment>
                ))}
            </List>
        </Box>
      </Drawer>
  );
}

export default DataSourcesSidePanel;
