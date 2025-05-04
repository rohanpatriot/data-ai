import React from 'react';
import { Button, Typography } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, List } from "@mui/material";
import DataSourceCard from './DataSourceCard';

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

    return (
        <Dialog 
            open={showDataSourcesModal} 
            onClose={() => setShowDataSourcesModal(false)}
            fullWidth
            maxWidth="sm"
            PaperProps={{ sx: { borderRadius: 4 } }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
            <Typography variant="h5" component="div">Data Sources</Typography>
            <Button 
                variant="contained"
                onClick={() => {
                setShowDataSourcesModal(false);
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
            </DialogTitle>
            <DialogContent sx={{ p:1, border: 'none' }}>
            <List>
                {dataSources.map((source, index) => (
                <React.Fragment key={source.id + index}>
                    <DataSourceCard source={source} handleDeleteDataSource={() => {}} handleEditDataSource={() => {}}/>
                </React.Fragment>
                ))}
            </List>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
            <Button 
                onClick={() => setShowDataSourcesModal(false)}
                variant="outlined"
                sx={{ borderRadius: 3, color: '#293133', borderColor: '#E6EEF4', '&:hover': { borderColor: '#E6EEF4' } }}
            >
                Close
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DataSourcesModal;