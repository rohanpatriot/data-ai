import React from "react";
import { Typography } from "@mui/material";
import WidgetBase from "../WidgetBase";

interface SmallTextWidgetProps {
  data: {
    title: string;
    content: string;
  };
}

const SmallTextWidget: React.FC<SmallTextWidgetProps> = ({ data }) => {
  return (
    <WidgetBase title={data.title}>
      <Typography>{data.content}</Typography>
    </WidgetBase>
  );
};

export default SmallTextWidget;
