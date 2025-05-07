import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

interface EditProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (projectName: string, projectDescription: string) => void;
    projectName: string;
    projectDescription: string;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
    isOpen,
    onClose,
    onSave,
    projectName,
    projectDescription,
}) => {
    const [name, setName] = React.useState(projectName);
    const [description, setDescription] = React.useState(projectDescription);

    const handleSave = () => {
        onSave(name, description);
        onClose();
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };
    const handleBlur = () => {
        if (name.trim() === "") {
            setName(projectName);
        }
        if (description.trim() === "") {
            setDescription(projectDescription);
        }
    };

    return (
        <Dialog
        open={isOpen}
        onClose={() => onClose()}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4 } }}
        >
        <DialogTitle>
            <Typography variant="h5" component="div">
            Edit {projectName}
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
                    value={name}
                    onChange={(e) => { handleNameChange(e); }}
                    variant="outlined"
                    size="small"
                    required
                    onKeyPress={handleKeyPress}
                    onBlur={handleBlur}
                    onFocus={(e) => e.target.select()}
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Name
                    </Typography>
                    <TextField
                    fullWidth
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => { handleDescriptionChange(e); }}
                    variant="outlined"
                    size="small"
                    required
                    onKeyPress={handleKeyPress}
                    onBlur={handleBlur}
                    onFocus={(e) => e.target.select()}
                    />
                </Box>
            </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: "flex-end" }}>
            <Button
            onClick={() => onClose()}
            variant="outlined"
            color="secondary"
            >
            Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
            Save
            </Button>
        </DialogActions>
        </Dialog>
    );
};
export default EditProjectModal;