
import { useCallback, useState, useRef, useEffect } from "react";
import { ReactFlow, Background, Controls, Panel, NodeChange, applyNodeChanges, Node, OnNodesChange } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import useBubbleStore from "../store/bubbleStore";
import ChatBubble from "./ChatBubble";
import { X } from "lucide-react";
import Visualization from "./Visualization";
import { calculateGridPosition, findAvailableSpace, GRID_SIZE } from "../utils/gridUtils";

const nodeTypes = {
  visualization: Visualization,
};

export default function GridCanvas() {
  const { bubbles, addBubble, updateBubblePosition, updateBubbleSize, removeBubble } = useBubbleStore();
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isDraggingBubble, setIsDraggingBubble] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  // Update nodes when bubbles change
  useEffect(() => {
    const updatedNodes = bubbles
      .filter(bubble => bubble.response && bubble.chartType && bubble.chartData)
      .map(bubble => ({
        id: bubble.id,
        type: 'visualization',
        position: bubble.position,
        data: {
          chartType: bubble.chartType,
          chartData: bubble.chartData,
          message: bubble.message,
          response: bubble.response
        },
        draggable: true,
        selectable: true,
        selected: selectedNode === bubble.id,
        style: {
          width: bubble.width,
          height: bubble.height,
          opacity: draggedNode === bubble.id ? 0.7 : 1,
        }
      }));
    
    setNodes(updatedNodes);
  }, [bubbles, selectedNode, draggedNode]);

  // Handle node changes (like position, selection)
  const onNodesChange: OnNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeChatId) {
        setActiveChatId(null);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeChatId]);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeChatId && 
          !(e.target as HTMLElement).closest('.chat-bubble-container') && 
          !(e.target as HTMLElement).closest('.visualization-container')) {
        setActiveChatId(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeChatId]);

  const onPaneClick = useCallback(
    (event: React.MouseEvent) => {
      if (!isDraggingBubble && reactFlowWrapper.current) {
        setActiveChatId(null);
        
        const bounds = reactFlowWrapper.current.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        
        const newBubbleId = addBubble(x, y);
        setActiveChatId(newBubbleId);
      }
      setIsDraggingBubble(false);
    },
    [addBubble, isDraggingBubble]
  );

  const onNodeDragStart = useCallback((_: any, node: any) => {
    setDraggedNode(node.id);
  }, []);

  const onNodeDrag = useCallback((_: any, node: any) => {
    // Keep this empty callback or remove it if not needed
  }, []);

  const onNodeDragStop = useCallback((_: any, node: any) => {
    setDraggedNode(null);
    const { bubbles } = useBubbleStore.getState();
    
    const allNodes = bubbles.map(b => ({
      id: b.id,
      position: b.position,
      width: b.width || 0,
      height: b.height || 0
    }));

    const currentNode = {
      id: node.id,
      position: calculateGridPosition(node.position.x, node.position.y),
      width: node.style?.width || bubbles.find(b => b.id === node.id)?.width || 0,
      height: node.style?.height || bubbles.find(b => b.id === node.id)?.height || 0
    };

    const newPosition = findAvailableSpace(currentNode, allNodes);

    updateBubblePosition(node.id, newPosition.x, newPosition.y);
  }, []);

  const handleNodeResize = useCallback((nodeId: string, width: number, height: number) => {
    updateBubbleSize(nodeId, width, height);
  }, [updateBubbleSize]);

  const handleBubbleClose = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeBubble(id);
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  return (
    <div className="w-full h-screen pt-16 cursor-default" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={[]}
        onInit={setReactFlowInstance}
        onPaneClick={onPaneClick}
        onNodesChange={onNodesChange}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onSelectionChange={({ nodes }) => {
          setSelectedNode(nodes.length ? nodes[0].id : null);
        }}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[GRID_SIZE, GRID_SIZE]}
        fitView
        minZoom={0.5}
        maxZoom={2}
        className="bg-background"
        elementsSelectable={true}
      >
        <Background gap={GRID_SIZE} size={1} />
        <Controls />
        <Panel position="bottom-right" className="bg-transparent">
          <div className="text-xs text-muted-foreground p-2 rounded bg-card/50 backdrop-blur-sm flex items-center gap-2">
            <X size={14} className="text-perplexity-purple" /> Click to create a chat bubble
          </div>
        </Panel>
        
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute"
            style={{
              left: bubble.position.x,
              top: bubble.position.y,
              display: (!bubble.response && bubble.id === activeChatId) ? 'block' : 'none'
            }}
          >
            <div className="chat-bubble-container">
              <ChatBubble 
                bubble={bubble}
                isActive={bubble.id === activeChatId} 
                onClose={(e) => handleBubbleClose(bubble.id, e)}
              />
            </div>
          </div>
        ))}
      </ReactFlow>
    </div>
  );
}
