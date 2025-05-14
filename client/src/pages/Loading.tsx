import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Loading = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4, display: "flex", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 1, textAlign: "center" }}
          >
            Loading...
          </Typography>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Loading;
