import React from "react";
import { Typography } from "@mui/material";
import WidgetBase from "../WidgetBase";

interface TextWidgetProps {
  data: {
    title: string;
    content: string;
  };
  id: string;
  refresh?: () => void;
  onReference?: (widgetId: string) => void;
}

const TextWidget: React.FC<TextWidgetProps> = ({
  data,
  id,
  refresh,
  onReference,
}) => {
  return (
    <WidgetBase
      widgetId={id}
      title={data.title}
      refresh={refresh}
      onReference={onReference}
    >
      <Typography
        sx={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "100%",
          maxWidth: "100%",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0, 0, 0, 0.08) transparent",
        }}
      >
        {data.content}
      </Typography>
    </WidgetBase>
  );
};

export default TextWidget;
