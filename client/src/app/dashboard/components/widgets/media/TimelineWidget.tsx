import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import WidgetBase from '../WidgetBase';

interface TimelineWidgetProps {
  data: {
    events: { date: string; label: string }[];
  };
}

const TimelineWidget: React.FC<TimelineWidgetProps> = ({ data }) => {
  return (
    <WidgetBase>
      <Timeline>
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
    </WidgetBase>
  );
};

export default TimelineWidget;
