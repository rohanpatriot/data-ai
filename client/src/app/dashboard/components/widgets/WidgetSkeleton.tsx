import React from "react";
import { Box, Skeleton } from "@mui/material";

interface WidgetSkeletonProps {
  variant?: "chart" | "table" | "stats" | "text";
  count?: number;
}

const WidgetSkeleton: React.FC<WidgetSkeletonProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        // Vary the skeleton types to make it look more realistic

        return (
          <Box
            key={index}
            sx={{
              background: "transparent",
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              p: 2,
            }}
          >
            {/* Widget header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Skeleton
                variant="text"
                width={`${40 + (index % 3) * 10}%`}
                height={24}
              />
              <Skeleton variant="circular" width={24} height={24} />
            </Box>

            {/* Dynamic content based on index */}
            {index % 4 === 0 && (
              // Chart-like skeleton
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            )}

            {index % 4 === 1 && (
              // Table-like skeleton
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Skeleton variant="text" width="25%" height={20} />
                  <Skeleton variant="text" width="25%" height={20} />
                  <Skeleton variant="text" width="25%" height={20} />
                  <Skeleton variant="text" width="25%" height={20} />
                </Box>
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <Box key={rowIndex} sx={{ display: "flex", gap: 1, mb: 0.5 }}>
                    <Skeleton variant="text" width="25%" height={16} />
                    <Skeleton variant="text" width="25%" height={16} />
                    <Skeleton variant="text" width="25%" height={16} />
                    <Skeleton variant="text" width="25%" height={16} />
                  </Box>
                ))}
              </Box>
            )}

            {index % 4 === 2 && (
              // Stats-like skeleton
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Skeleton
                    variant="circular"
                    width={48}
                    height={48}
                    sx={{ mx: "auto", mb: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width={80}
                    height={32}
                    sx={{ mx: "auto" }}
                  />
                </Box>
              </Box>
            )}

            {index % 4 === 3 && (
              // Text-like skeleton
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton
                  variant="text"
                  width="100%"
                  height={16}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={16}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="95%"
                  height={16}
                  sx={{ mb: 1 }}
                />
                <Skeleton variant="text" width="80%" height={16} />
              </Box>
            )}
          </Box>
        );
      })}
    </>
  );
};

export default WidgetSkeleton;
