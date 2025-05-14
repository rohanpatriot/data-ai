import { Box, Typography, Container } from "@mui/material";
import { motion } from "motion/react";

const LoadingPage = () => {
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

export default LoadingPage;
