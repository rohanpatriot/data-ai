import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { ListItem, ListItemText, IconButton } from "@mui/material";

interface DataSourceCardProps {
  source: {
    id: string;
    name: string;
    addedAt: string;
    fileType: string;
    size: string;
  };
  handleDeleteDataSource: (id: string) => void;
  handleEditDataSource: (id: string) => void;
}

const DataSourceCard: React.FC<DataSourceCardProps> = ({
  source,
  handleDeleteDataSource,
  handleEditDataSource,
}) => {
  return (
    <Card
      sx={{
        p: 0,
        mb: 1,
      }}
    >
      <ListItem>
        <ListItemText
          primary={
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {source.name}
            </Typography>
          }
          secondary={
            <Box
              sx={{ display: "flex", alignItems: "center", mt: 0.5, gap: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="span"
                  sx={{
                    mr: 0.75,
                    display: "flex",
                    alignItems: "center",
                    height: 12,
                    width: 12,
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 10.5C8.76142 10.5 11 8.26142 11 5.5C11 2.73858 8.76142 0.5 6 0.5C3.23858 0.5 1 2.73858 1 5.5C1 8.26142 3.23858 10.5 6 10.5Z"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 3V5.5L7.5 7"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Added {source.addedAt}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="span"
                  sx={{
                    mr: 0.5,
                    display: "flex",
                    alignItems: "center",
                    height: 12,
                    width: 12,
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 10 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 2.75V10.2464"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                    />
                    <path
                      d="M9.5 5V10.25"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 1.25H5.75"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 11.75H8"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                    />
                    <path
                      d="M9.5 10.25C9.5041 10.9991 8.75 11.75 8 11.75"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M0.5 10.25C0.5 11 1.25 11.75 2 11.75"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M0.5 2.74892C0.5 2 1.25 1.26671 2 1.25"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.4959 5.00336L5.75 1.25"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.75 3.5C5.75231 4.24592 6.50302 5 7.25 5"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.75 3.5V1.25"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.25 5H9.5"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-width="0.9995"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 9.5H6.5"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 8H6.5"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.75 7.25V10.25"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.25 7.25V10.25"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.75 7.25V10.25"
                      stroke="#666666"
                      stroke-opacity="0.77"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {source.fileType}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="span"
                  sx={{
                    mr: 0.75,
                    display: "flex",
                    alignItems: "center",
                    height: 12,
                    width: 12,
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 8 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.01 4.00501C5.12533 4.00501 6.07067 3.83467 6.846 3.49401C7.62167 3.15367 8.0095 2.74051 8.0095 2.25451C8.0095 1.76851 7.62167 1.35534 6.846 1.01501C6.07033 0.674672 5.125 0.504672 4.01 0.505005C2.895 0.505339 1.94783 0.675339 1.1685 1.01501C0.389167 1.35467 -0.00033312 1.76801 2.13767e-07 2.25501C0.000333547 2.74201 0.389834 3.15501 1.1685 3.49401C1.94717 3.83301 2.89417 4.00317 4.0095 4.00451M4 4.77401C4.40567 4.77401 4.81833 4.74167 5.238 4.67701C5.65767 4.61267 6.052 4.51734 6.421 4.39101C6.79 4.26467 7.115 4.10817 7.396 3.92151C7.677 3.73484 7.8815 3.51901 8.0095 3.27401V4.75451C7.8815 4.99951 7.677 5.21534 7.396 5.40201C7.11533 5.58901 6.79033 5.74567 6.421 5.87201C6.052 5.99834 5.65767 6.09367 5.238 6.15801C4.81833 6.22234 4.40567 6.25451 4 6.25451C3.59433 6.25451 3.18167 6.22234 2.762 6.15801C2.34233 6.09367 1.9495 5.99834 1.5835 5.87201C1.2175 5.74567 0.894167 5.58901 0.6135 5.40201C0.332834 5.21501 0.128334 4.99934 2.13767e-07 4.75501V3.27401C0.128 3.51867 0.3325 3.73451 0.6135 3.92151C0.894167 4.10817 1.2175 4.26484 1.5835 4.39151C1.9495 4.51751 2.34233 4.61284 2.762 4.67751C3.18167 4.74217 3.59433 4.77434 4 4.77401ZM4 7.02401C4.40567 7.02401 4.81833 6.99184 5.238 6.92751C5.65733 6.86284 6.05167 6.76734 6.421 6.64101C6.79033 6.51467 7.11533 6.35817 7.396 6.17151C7.67667 5.98484 7.88117 5.76901 8.0095 5.52401V6.99501C7.8815 7.24001 7.677 7.45584 7.396 7.64251C7.11533 7.82917 6.79033 7.98584 6.421 8.11251C6.052 8.23884 5.65767 8.33417 5.238 8.39851C4.81833 8.46284 4.40567 8.49501 4 8.49501C3.59433 8.49501 3.18167 8.46284 2.762 8.39851C2.34233 8.33417 1.9495 8.23884 1.5835 8.11251C1.2175 7.98617 0.894167 7.82951 0.6135 7.64251C0.332834 7.45551 0.128334 7.23967 2.13767e-07 6.99501V5.52401C0.128334 5.76867 0.332834 5.98451 0.6135 6.17151C0.894167 6.35851 1.2175 6.51517 1.5835 6.64151C1.9495 6.76784 2.34233 6.86317 2.762 6.92751C3.18167 6.99184 3.59433 7.02401 4 7.02401Z"
                      fill="#666666"
                      fill-opacity="0.77"
                    />
                  </svg>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {source.size}
                </Typography>
              </Box>
            </Box>
          }
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => handleEditDataSource(source.id)}
            sx={{ borderRadius: 2, border: "1px solid #E6EEF4", padding: 0.75 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3077 2.9775C11.5453 2.73984 11.5453 2.34375 11.3077 2.11828L9.88172 0.692341C9.65625 0.454685 9.26016 0.454685 9.0225 0.692341L7.90125 1.8075L10.1864 4.09265M0.515625 9.19921V11.4844H2.80078L9.54047 4.73859L7.25531 2.45343L0.515625 9.19921Z"
                fill="black"
              />
            </svg>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDeleteDataSource(source.id)}
            sx={{ borderRadius: 2, border: "1px solid #E6EEF4", padding: 0.75 }}
          >
            <svg
              width="16"
              height="18"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.08317 1.33333H7.0415L6.45817 0.75H3.5415L2.95817 1.33333H0.916504V2.5H9.08317M1.49984 10.0833C1.49984 10.3928 1.62275 10.6895 1.84155 10.9083C2.06034 11.1271 2.35708 11.25 2.6665 11.25H7.33317C7.64259 11.25 7.93934 11.1271 8.15813 10.9083C8.37692 10.6895 8.49984 10.3928 8.49984 10.0833V3.08333H1.49984V10.0833Z"
                fill="black"
              />
            </svg>
          </IconButton>
        </Box>
      </ListItem>
    </Card>
  );
};

export default DataSourceCard;
