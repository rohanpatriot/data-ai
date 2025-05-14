import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";


interface DeleteDataSourceProps {
    open: boolean;
    dataSourceName: string;
    onDelete: (id: string) => void;
    onCancel: () => void;
}

const DeleteDataSource: React.FC<DeleteDataSourceProps> = ({
    open,
    dataSourceName,
    onDelete,
    onCancel,
}) => {

    const handleDelete = () => {
        onDelete(dataSourceName);
        onCancel();
    };

    return (
        <Dialog 
            open={open}
            onClose={onCancel}
            maxWidth="sm"
            fullWidth
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: 6,
                    padding: 1,
                },
            }}
        >
          <DialogContent>
            <DialogTitle sx={{padding: 0}}>Confirm Delete</DialogTitle>
            <Typography>Are you sure you want to delete <strong>{dataSourceName}</strong>?</Typography>
            <DialogActions sx={{ mt: 2 }}>
                <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
                <Button variant="contained" onClick={handleDelete}>Delete</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      );
};

export default DeleteDataSource;