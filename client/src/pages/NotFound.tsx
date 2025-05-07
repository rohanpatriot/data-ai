import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const NotFound = () => {
  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: "6rem",
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Oops! Page not found
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Return to Home
          </Button>
        </Box>
      </Container>
    </motion.div>
  );
};

export default NotFound;
