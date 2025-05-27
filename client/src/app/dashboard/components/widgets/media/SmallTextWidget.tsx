import React from "react";
import { Typography } from "@mui/material";
import WidgetBase from "../WidgetBase";

interface SmallTextWidgetProps {
  data: {
    title: string;
    content: string;
  };
  id: string;
  refresh?: () => void;
  onReference?: (widgetId: string) => void;
}

const SmallTextWidget: React.FC<SmallTextWidgetProps> = ({ data, id, refresh, onReference }) => {
  return (
    <WidgetBase widgetId={id} title={data.title} refresh={refresh} onReference={onReference}>
      <Typography>{data.content}</Typography>
    </WidgetBase>
  );
};

export default SmallTextWidget;
