import React from "react";
import { Box, Card, Skeleton } from "@mui/material";
import {
  TimeIcon,
  SourcesIcon,
  WidgetsIcon,
} from "../../../shared/components/Icons";

interface ProjectCardSkeletonProps {
  count?: number;
}

const ProjectCardSkeleton: React.FC<ProjectCardSkeletonProps> = ({
  count = 1,
}) => {
  const renderSkeleton = () => (
    <Card
      elevation={0}
      sx={{
        p: 1,
        pl: 2,
        mb: 1.25,
        cursor: "default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton variant="text" width={180} height={32} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="span"
            sx={{
              mr: 0.5,
              display: "inline-flex",
              opacity: 0.5,
            }}
          >
            <TimeIcon />
          </Box>
          <Skeleton variant="text" width={40} height={20} />
          <Skeleton variant="circular" width={24} height={24} sx={{ ml: 1 }} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", mt: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
          <Box
            component="span"
            sx={{
              mr: 0.5,
              display: "inline-flex",
              opacity: 0.5,
            }}
          >
            <SourcesIcon />
          </Box>
          <Skeleton variant="text" width={70} height={20} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="span"
            sx={{
              mr: 0.5,
              display: "inline-flex",
              opacity: 0.5,
            }}
          >
            <WidgetsIcon />
          </Box>
          <Skeleton variant="text" width={70} height={20} />
        </Box>
      </Box>
    </Card>
  );

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      ))}
    </>
  );
};

export default ProjectCardSkeleton;
