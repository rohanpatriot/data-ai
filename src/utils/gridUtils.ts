
export const GRID_SIZE = 32; // Base grid unit size in pixels
export const MIN_WIDTH_UNITS = 8; // Minimum 8 grid units wide (256px)
export const MIN_HEIGHT_UNITS = 6; // Minimum 6 grid units tall (192px)

export const snapToGrid = (value: number): number => {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
};

export const calculateGridPosition = (x: number, y: number) => ({
  x: snapToGrid(x),
  y: snapToGrid(y),
});

export const hasOverlap = (
  nodeA: { position: { x: number; y: number }; width: number; height: number },
  nodeB: { position: { x: number; y: number }; width: number; height: number }
): boolean => {
  return !(
    nodeA.position.x + nodeA.width <= nodeB.position.x ||
    nodeA.position.x >= nodeB.position.x + nodeB.width ||
    nodeA.position.y + nodeA.height <= nodeB.position.y ||
    nodeA.position.y >= nodeB.position.y + nodeB.height
  );
};

export const findAvailableSpace = (
  currentNode: { id: string; position: { x: number; y: number }; width: number; height: number },
  allNodes: Array<{ id: string; position: { x: number; y: number }; width: number; height: number }>,
): { x: number; y: number } => {
  // Initial position snapped to grid
  const initialPosition = {
    x: snapToGrid(currentNode.position.x),
    y: snapToGrid(currentNode.position.y)
  };
  
  // Check if the current position is available
  const nodesWithoutCurrent = allNodes.filter(node => node.id !== currentNode.id);
  let testNode = {
    ...currentNode,
    position: initialPosition
  };
  
  let hasCollision = nodesWithoutCurrent.some(node => hasOverlap(testNode, node));
  if (!hasCollision) {
    return initialPosition;
  }
  
  // Define a spiral pattern to check positions
  // This will look outward from the original position in a spiral
  const searchRadius = Math.max(5, Math.ceil(Math.max(currentNode.width, currentNode.height) / GRID_SIZE));
  
  for (let layer = 1; layer <= searchRadius; layer++) {
    // Check positions in a square pattern around the initial position
    const layerSize = layer * 2;
    
    // Top edge (left to right)
    for (let i = 0; i < layerSize; i++) {
      const x = initialPosition.x - layer * GRID_SIZE + i * GRID_SIZE;
      const y = initialPosition.y - layer * GRID_SIZE;
      testNode.position = { x, y };
      if (!nodesWithoutCurrent.some(node => hasOverlap(testNode, node))) {
        return { x, y };
      }
    }
    
    // Right edge (top to bottom)
    for (let i = 0; i < layerSize; i++) {
      const x = initialPosition.x + layer * GRID_SIZE;
      const y = initialPosition.y - layer * GRID_SIZE + i * GRID_SIZE;
      testNode.position = { x, y };
      if (!nodesWithoutCurrent.some(node => hasOverlap(testNode, node))) {
        return { x, y };
      }
    }
    
    // Bottom edge (right to left)
    for (let i = 0; i < layerSize; i++) {
      const x = initialPosition.x + layer * GRID_SIZE - i * GRID_SIZE;
      const y = initialPosition.y + layer * GRID_SIZE;
      testNode.position = { x, y };
      if (!nodesWithoutCurrent.some(node => hasOverlap(testNode, node))) {
        return { x, y };
      }
    }
    
    // Left edge (bottom to top)
    for (let i = 0; i < layerSize; i++) {
      const x = initialPosition.x - layer * GRID_SIZE;
      const y = initialPosition.y + layer * GRID_SIZE - i * GRID_SIZE;
      testNode.position = { x, y };
      if (!nodesWithoutCurrent.some(node => hasOverlap(testNode, node))) {
        return { x, y };
      }
    }
  }
  
  // If no position is found, as a fallback, place it at a distant position
  return {
    x: initialPosition.x + searchRadius * GRID_SIZE * 2,
    y: initialPosition.y + searchRadius * GRID_SIZE * 2
  };
};
