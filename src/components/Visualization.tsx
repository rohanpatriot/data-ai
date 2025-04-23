
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { X } from "lucide-react";
import useBubbleStore from "../store/bubbleStore";
import { useMemo } from "react";
import { GRID_SIZE, MIN_WIDTH_UNITS, MIN_HEIGHT_UNITS } from "../utils/gridUtils";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, ScatterChart, Scatter, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

const COLORS = ['#9b87f5', '#7E69AB', '#D6BCFA', '#8E9196', '#F1F0FB', '#6B46C1'];

interface VisualizationProps {
  id: string;
  data: any;
  selected?: boolean;
}

const Visualization = ({ id, data, selected }: VisualizationProps) => {
  const { removeBubble, updateBubbleSize } = useBubbleStore();

  const minWidth = GRID_SIZE * MIN_WIDTH_UNITS;
  const minHeight = GRID_SIZE * MIN_HEIGHT_UNITS;

  const onResize = (_: any, params: { width: number; height: number }) => {
    const snappedWidth = Math.max(Math.round(params.width / GRID_SIZE) * GRID_SIZE, minWidth);
    const snappedHeight = Math.max(Math.round(params.height / GRID_SIZE) * GRID_SIZE, minHeight);
    updateBubbleSize(id, snappedWidth, snappedHeight);
  };

  const renderContent = useMemo(() => {
    switch (data.chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#9b87f5" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#9b87f5"
                dataKey="value"
              >
                {data.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#9b87f5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="number" name="x" />
              <YAxis dataKey="y" type="number" name="y" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Data Points" data={data.chartData} fill="#9b87f5" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      case 'bubble':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="value" type="number" name="value" />
              <YAxis dataKey="size" type="number" name="size" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter 
                name="Bubble Size" 
                data={data.chartData} 
                fill="#9b87f5"
                shape="circle"
              >
                {data.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="h-full w-full flex items-center justify-center">Unsupported chart type</div>;
    }
  }, [data]);

  return (
    <div 
      className={`visualization-container bg-card border ${selected ? 'border-primary shadow-lg' : 'border-border'} rounded-lg relative transition-shadow`} 
      style={{ 
        minWidth: minWidth, 
        minHeight: minHeight,
        opacity: selected ? 1 : 0.95
      }}
    >
      <NodeResizer 
        minWidth={minWidth}
        minHeight={minHeight}
        isVisible={selected}
        keepAspectRatio={false}
        onResize={onResize}
      />
      <div className="flex justify-between items-center p-4">
        <div className="text-sm font-medium">{data.message}</div>
        <button 
          onClick={() => removeBubble(id)}
          className="p-1 hover:bg-muted rounded text-destructive"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground px-4 mb-4">{data.response}</p>
      {data.chartType && data.chartData && (
        <div className="h-60 w-full p-4">
          <div className="w-full h-full">
            {renderContent}
          </div>
        </div>
      )}
      {/* Adding handles to ensure the node is properly connected to the graph */}
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
    </div>
  );
};

export default Visualization;
