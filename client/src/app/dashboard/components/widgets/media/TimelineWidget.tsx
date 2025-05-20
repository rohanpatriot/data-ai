import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import WidgetBase from "../WidgetBase";
import { Box } from "@mui/material";

interface TimelineWidgetProps {
  data: {
    title: string;
    events: { date: string; label: string }[];
  };
}

const TimelineWidget: React.FC<TimelineWidgetProps> = ({ data }) => {
  return (
    <WidgetBase title={data.title}>
      <Box sx={{ ml: -2 }}>  {/* Negative margin to offset Timeline's default padding */}
        <Timeline
          sx={{
            padding: 0,
            margin: 0,
            [`& .MuiTimelineItem-root`]: {
              minHeight: 'auto',
              '&:before': {
                display: 'none', // Removes the left padding/spacing
              },
            },
            [`& .MuiTimelineContent-root`]: {
              padding: '0 8px 8px 8px', // Minimal padding for content
            },
          }}
          position="left"
        >
          {data.events.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot />
                {index < data.events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <strong>{event.date}</strong>
                <div>{event.label}</div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </WidgetBase>
  );
};

export default TimelineWidget;
