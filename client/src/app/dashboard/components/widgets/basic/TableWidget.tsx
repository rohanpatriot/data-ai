import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import WidgetBase from "../WidgetBase";

interface TableWidgetProps {
  data: {
    title: string;
    columns: string[];
    rows: Record<string, string | number | boolean | null>[];
  };
  id: string;
  refresh?: () => void;
  onReference?: (widgetId: string) => void;
}

const TableWidget: React.FC<TableWidgetProps> = ({
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
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          overflowY: "auto",
          maxWidth: "100%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {data.columns.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {data.columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {String(row[column] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </WidgetBase>
  );
};

export default TableWidget;
