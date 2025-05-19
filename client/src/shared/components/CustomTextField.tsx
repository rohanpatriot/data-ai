import React from "react";
import {
  Box,
  Typography,
  TextField,
  TextFieldProps,
} from "@mui/material";

interface CustomTextFieldProps extends Omit<TextFieldProps, "variant"> {
  label?: string;
  helperLink?: React.ReactNode;
  showError?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  helperLink,
  id,
  error,
  showError,
  ...textFieldProps
}) => {
  return (
    <Box sx={{ mb: 2.5 }}>
      {label && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="body1"
            component="label"
            htmlFor={id}
            sx={{ display: "block", fontWeight: 500 }}
          >
            {label}
          </Typography>
          {helperLink}
        </Box>
      )}
      <TextField
        fullWidth
        id={id}
        variant="outlined"
        error={showError}
        helperText={showError && error ? error : undefined}
        {...textFieldProps}
      />
    </Box>
  );
};

export default CustomTextField;