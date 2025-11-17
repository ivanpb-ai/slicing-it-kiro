
import { LayoutOptions } from './LayoutTypes';

export const getDefaultLayoutOptions: LayoutOptions = {
  type: 'balanced-tree',
  nodeWidth: 280,          // match your node size
  nodeHeight: 120,
  horizontalSpacing: 150,  // increased spacing to prevent overlaps
  verticalSpacing: 150,    // much shorter for compact edges
  marginX: 400,            // wider margins for better balanced tree centering
  marginY: 100,            // optimal top margin for balanced tree
  preventOverlap: true,
  edgeShortenFactor: 0.95,
  minNodeDistance: 10,     // minimum gap between nodes
  levelHeight: 200,
  maxIterations: 100
};
