import React from "react";
import { Card, Box, Skeleton, Stack } from "@mui/material";

interface Props {
  count?: number;
}

const DataSourceCardSkeleton: React.FC<Props> = ({ count = 1 }) => {
  const renderSkeleton = () => (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          minHeight: 72, // Match the height of the actual card
        }}
      >
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Stack spacing={0.5} width="100%">
            <Skeleton variant="text" width="60%" height={28} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="text" width={60} sx={{ ml: 0.5 }} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="text" width={100} sx={{ ml: 0.5 }} />
              </Box>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Skeleton
            variant="rectangular"
            width={28}
            height={28}
            sx={{
              borderRadius: 2,
              mr: 0.5,
            }}
          />
          <Skeleton
            variant="rectangular"
            width={28}
            height={28}
            sx={{
              borderRadius: 2,
            }}
          />
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

export default DataSourceCardSkeleton;
