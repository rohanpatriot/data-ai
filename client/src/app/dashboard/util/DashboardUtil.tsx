import { Layout } from 'react-grid-layout';

export function removeHorizontalGaps(layout: Layout[]): Layout[] {
    const sorted = [...layout].sort((a, b) => a.y - b.y || a.x - b.x);
  
    for (let i = 0; i < sorted.length; i++) {
      const item = sorted[i];
      while (item.x > 0) {
        const newX = item.x - 1;
  
        const collides = sorted.some((other) =>
          other !== item &&
          other.y < item.y + item.h &&
          other.y + other.h > item.y && // vertical overlap
          other.x < newX + item.w &&
          other.x + other.w > newX // horizontal overlap
        );
  
        if (collides) break;
        item.x = newX;
      }
    }
  
    return sorted;
  }