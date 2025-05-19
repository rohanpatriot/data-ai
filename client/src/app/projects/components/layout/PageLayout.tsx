import React from "react";
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  useTheme,
  Card,
} from "@mui/material";
import { motion } from "motion/react";
import Logo from "../../../../shared/components/Logo";
import UserMenu from "../../../../shared/components/UserMenu";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  actions,
  children,
}) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
              <Logo />
              <UserMenu />
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Container maxWidth="md" sx={{ mt: 6, pb: 8 }}>
        <Card
          sx={{
            p: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h4" component="h1">
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body1" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            {actions}
          </Box>
          {children}
        </Card>
      </Container>
    </motion.div>
  );
};
