
import { Node, Edge } from '@xyflow/react';

interface BalancedTreeOptions {
  nodeWidth?: number;
  nodeHeight?: number;
  horizontalSpacing?: number;
  verticalSpacing?: number;
  marginX?: number;
  marginY?: number;
}

// Helper function to get actual node width based on type (matching real rendered widths)
// Now uses actual measured dimensions from React Flow when available
const getNodeWidth = (nodeId: string, nodeType?: string, nodes?: Node[]): number => {
  // First, try to get actual measured width from React Flow
  if (nodes) {
    const node = nodes.find(n => n.id === nodeId);
    if (node && node.measured?.width) {
      console.log(`📏 Using measured width for ${nodeId}: ${node.measured.width}px`);
      return node.measured.width;
    }
  }
  
  // Fallback to estimated widths based on type
  const type = nodeType || (
    nodeId.includes('s-nssai') ? 's-nssai' :
    nodeId.includes('dnn') ? 'dnn' :
    nodeId.includes('rrpmember') ? 'rrpmember' :
    nodeId.includes('rrp') ? 'rrp' :
    nodeId.includes('qosflow') ? 'qosflow' :
    nodeId.includes('fiveqi') ? 'fiveqi' :
    nodeId.includes('network') ? 'network' :
    nodeId.includes('cell-area') ? 'cell-area' :
    'default'
  );
  
  // Real rendered widths based on CSS and content - INCREASED SIZES (matching CSS min-w values)
  switch (type) {
    case 's-nssai': return 300; // S-NSSAI nodes
    case 'dnn': return 320; // DNN nodes
    case 'rrp': return 320; // RRP nodes
    case 'rrpmember': return 240; // RRP Member nodes
    case 'qosflow': return 280; // QoS Flow nodes
    case 'fiveqi': return 300; // 5QI nodes
    case 'network': return 320; // Network nodes
    case 'cell-area': return 280; // Cell Area nodes
    default: return 280; // Default fallback
  }
};

// Helper function to get actual node height based on type (matching real rendered heights)
const getNodeHeight = (nodeId: string, nodeType?: string): number => {
  // Use node type if provided, otherwise infer from ID
  const type = nodeType || (
    nodeId.includes('network') ? 'network' :
    nodeId.includes('cell-area') ? 'cell-area' :
    nodeId.includes('s-nssai') ? 's-nssai' :
    nodeId.includes('dnn') ? 'dnn' :
    nodeId.includes('rrpmember') ? 'rrpmember' :
    nodeId.includes('rrp') ? 'rrp' :
    nodeId.includes('qosflow') ? 'qosflow' :
    nodeId.includes('fiveqi') ? 'fiveqi' :
    'default'
  );
  
  // Real rendered heights based on CSS and content - RRP nodes are notably taller
  // Heights increased to account for padding and borders
  switch (type) {
    case 'network': return 160; // Network nodes
    case 'cell-area': return 160; // Cell Area nodes
    case 'rrp': return 380; // RRP nodes are significantly taller due to complex content
    case 's-nssai': return 180; // S-NSSAI nodes have medium height (increased for safety)
    case 'dnn': return 180; // DNN nodes have medium height (increased for safety)
    case 'qosflow': return 160; // QoS Flow nodes
    case 'rrpmember': return 140; // RRP Member nodes are shorter
    case 'fiveqi': return 160; // 5QI nodes are compact
    default: return 120; // Default fallback
  }
};

// Helper function to get parent center X position
const getParentCenterX = (parentPos: { x: number; y: number }, parentId: string, subtreeWidths?: Map<string, number>): number => {
  const parentWidth = subtreeWidths?.get(parentId) || getNodeWidth(parentId);
  return parentPos.x + parentWidth / 2;
};

// Calculate subtree widths (required width including all descendants)
const calculateSubtreeWidths = (
  childrenMap: Record<string, string[]>,
  allParentsMap: Record<string, string[]>,
  nodesByLevel: Map<number, string[]>,
  maxLevel: number,
  horizontalSpacing: number,
  nodes: Node[]
): Map<string, number> => {
  const subtreeWidths = new Map<string, number>();
  const gutter = horizontalSpacing; // Use provided horizontal spacing
  
  // Process levels bottom-up to calculate subtree widths
  for (let level = maxLevel; level >= 0; level--) {
    const nodesAtLevel = nodesByLevel.get(level) || [];
    
    nodesAtLevel.forEach(nodeId => {
      const children = childrenMap[nodeId] || [];
      const nodeWidth = getNodeWidth(nodeId, undefined, nodes);
      
      if (children.length === 0) {
        // Leaf node: subtree width = own width
        subtreeWidths.set(nodeId, nodeWidth);
      } else {
        // Group children by type and calculate required width for each group
        const childGroups = new Map<string, string[]>();
        children.forEach(childId => {
          const childType = getNodeType(childId);
          if (!childGroups.has(childType)) {
            childGroups.set(childType, []);
          }
          childGroups.get(childType)!.push(childId);
        });
        
        let maxChildGroupWidth = 0;
        childGroups.forEach(typeChildren => {
          // Calculate total width for this type group
          const totalChildWidth = typeChildren.reduce((sum, childId) => {
            return sum + (subtreeWidths.get(childId) || getNodeWidth(childId, undefined, nodes));
          }, 0);
          const totalGutterWidth = (typeChildren.length - 1) * gutter;
          const groupWidth = totalChildWidth + totalGutterWidth;
          maxChildGroupWidth = Math.max(maxChildGroupWidth, groupWidth);
        });
        
        // Subtree width = max(own width, widest child group)
        const requiredWidth = Math.max(nodeWidth, maxChildGroupWidth);
        subtreeWidths.set(nodeId, requiredWidth);
      }
    });
  }
  
  return subtreeWidths;
};

// Helper function to get node type from ID
const getNodeType = (nodeId: string): string => {
  if (nodeId.includes('s-nssai')) return 's-nssai';
  if (nodeId.includes('dnn')) return 'dnn';
  if (nodeId.includes('rrpmember')) return 'rrpmember';
  if (nodeId.includes('rrp-')) return 'rrp';
  if (nodeId.includes('cell-area')) return 'cell-area';
  if (nodeId.includes('network')) return 'network';
  if (nodeId.includes('qosflow')) return 'qosflow';
  if (nodeId.includes('fiveqi')) return 'fiveqi';
  return 'default';
};

interface TreeNode {
  id: string;
  node: Node;
  children: TreeNode[];
  parent?: TreeNode;
  level: number;
  subtreeWidth: number;
  position: { x: number; y: number };
}

/**
 * Creates a perfectly balanced symmetrical hierarchical tree layout
 */
export const arrangeNodesInBalancedTree = (
  nodes: Node[],
  edges: Edge[],
  options: BalancedTreeOptions = {}
): { nodes: Node[], cleanedEdges: Edge[] } => {
  // Store nodes reference for width measurements
  const nodesRef = nodes;
  console.log('🚀 arrangeNodesInBalancedTree CALLED! This confirms we are running the correct algorithm');
  console.log('🔧 Received options:', options);
  console.log('🔧 Input nodes count:', nodes.length, 'edges count:', edges?.length || 0);
  
  if (nodes.length === 0) return { nodes, cleanedEdges: edges || [] };
  
  // Safety check: ensure edges is defined
  if (!edges) {
    console.warn('arrangeNodesInBalancedTree: edges parameter is undefined, using empty array');
    edges = [];
  }

  const {
    nodeWidth = 280,
    nodeHeight = 120,
    horizontalSpacing = 150,  // Increased spacing to prevent overlaps
    verticalSpacing = 160,   // Adequate vertical separation
    marginX = 96,            // Compact margin for better viewport usage
    marginY = 100
  } = options;

  // Starting balanced hierarchical arrangement

  // Create node ID set for validation
  const nodeIds = new Set(nodes.map(node => node.id));

  // Filter edges to only include those with valid nodes and clean up invalid ones
  const validEdges = edges.filter(edge => {
    const sourceExists = nodeIds.has(edge.source);
    const targetExists = nodeIds.has(edge.target);
    
    if (!sourceExists || !targetExists) {
      console.log(`🧹 CLEANED: Removing invalid edge ${edge.source} -> ${edge.target} (source: ${sourceExists}, target: ${targetExists})`);
      return false;
    }
    
    return true;
  });


  // Build parent-child relationships with multiple parent support using only valid edges
  const childrenMap: Record<string, string[]> = {};
  const allParentsMap: Record<string, string[]> = {};
  const primaryParentMap: Record<string, string> = {};
  
  console.log('🔍 Processing edges for layout:', validEdges.length, 'valid edges');
  
  validEdges.forEach(edge => {
    console.log(`🔗 Processing edge: ${edge.source} -> ${edge.target}`);
    
    // Track all children
    if (!childrenMap[edge.source]) {
      childrenMap[edge.source] = [];
    }
    childrenMap[edge.source].push(edge.target);
    
    // Track all parents
    if (!allParentsMap[edge.target]) {
      allParentsMap[edge.target] = [];
    }
    allParentsMap[edge.target].push(edge.source);
    
    // Set primary parent (first one encountered, or prefer based on node type)
    if (!primaryParentMap[edge.target]) {
      primaryParentMap[edge.target] = edge.source;
    }
  });
  
  // FALLBACK: Use parentId from node data for nodes without edges (handles timing issues)
  nodes.forEach(node => {
    if (node.data?.parentId && typeof node.data.parentId === 'string' && !allParentsMap[node.id]) {
      const parentId = node.data.parentId as string;
      console.log(`🔗 Using parentId fallback for ${node.id} -> parent: ${parentId}`);
      
      // Add to children map
      if (!childrenMap[parentId]) {
        childrenMap[parentId] = [];
      }
      if (!childrenMap[parentId].includes(node.id)) {
        childrenMap[parentId].push(node.id);
      }
      
      // Add to parents map
      if (!allParentsMap[node.id]) {
        allParentsMap[node.id] = [];
      }
      if (!allParentsMap[node.id].includes(parentId)) {
        allParentsMap[node.id].push(parentId);
      }
      
      // Set primary parent
      if (!primaryParentMap[node.id]) {
        primaryParentMap[node.id] = parentId;
      }
    }
  });

  // Find root nodes (nodes with no parents)
  const rootNodes = nodes.filter(node => !allParentsMap[node.id] || allParentsMap[node.id].length === 0);
  
  // If no root nodes found, treat the first node as root
  if (rootNodes.length === 0 && nodes.length > 0) {
    rootNodes.push(nodes[0]);
  }


  // Build hierarchical levels for DAG layout (handles multiple parents properly)
  const nodesByLevel: Record<number, string[]> = {};
  const nodePositions: Record<string, { level: number; orderInLevel: number }> = {};
  
  // Assign levels based on longest path from root
  const assignLevels = (nodeId: string, level: number, visited: Set<string> = new Set()) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    // Only assign level if it's deeper than current level (handles multiple parents)
    if (!nodePositions[nodeId] || nodePositions[nodeId].level < level) {
      // Remove from old level if reassigning
      if (nodePositions[nodeId]) {
        const oldLevel = nodePositions[nodeId].level;
        nodesByLevel[oldLevel] = nodesByLevel[oldLevel]?.filter(id => id !== nodeId) || [];
      }
      
      nodePositions[nodeId] = { level, orderInLevel: 0 };
      
      if (!nodesByLevel[level]) nodesByLevel[level] = [];
      if (!nodesByLevel[level].includes(nodeId)) {
        nodesByLevel[level].push(nodeId);
      }
    }
    
    // Process children
    const children = childrenMap[nodeId] || [];
    children.forEach(childId => assignLevels(childId, level + 1, visited));
  };
  
  // Start from root nodes
  rootNodes.forEach(rootNode => assignLevels(rootNode.id, 0));
  
  // Assign order within each level for symmetry
  Object.keys(nodesByLevel).forEach(levelStr => {
    const level = parseInt(levelStr);
    const nodesInLevel = nodesByLevel[level];
    nodesInLevel.forEach((nodeId, index) => {
      nodePositions[nodeId].orderInLevel = index;
    });
  });
  
  console.log('Level assignments:', nodePositions);
  console.log('Parent-child relationships:', allParentsMap);
  
  // Calculate subtree widths for proper spacing to prevent overlaps
  const maxLevel = Math.max(...Object.keys(nodesByLevel).map(k => parseInt(k)));
  const nodesByLevelMap = new Map<number, string[]>();
  Object.keys(nodesByLevel).forEach(levelStr => {
    const level = parseInt(levelStr);
    nodesByLevelMap.set(level, nodesByLevel[level]);
  });
  
  console.log('🔧 Calculating subtree widths for overlap prevention...');
  const subtreeWidths = calculateSubtreeWidths(childrenMap, allParentsMap, nodesByLevelMap, maxLevel, horizontalSpacing, nodesRef);
  console.log('🔧 Subtree widths calculated:', Object.fromEntries(Array.from(subtreeWidths.entries()).slice(0, 5)));
  
  // Calculate height-aware level Y positions to prevent overlaps
  console.log('🔧 Calculating height-aware Y positions for each level...');
  const levelHeights = new Map<number, number>();
  const levelY = new Map<number, number>();
  
  // Calculate maximum height for each level
  for (let level = 0; level <= maxLevel; level++) {
    const nodesAtLevel = nodesByLevel[level] || [];
    const maxHeightAtLevel = Math.max(
      ...nodesAtLevel.map(nodeId => getNodeHeight(nodeId)),
      120 // minimum height fallback
    );
    levelHeights.set(level, maxHeightAtLevel);
    console.log(`🔧 Level ${level}: max height = ${maxHeightAtLevel}px`);
  }
  
  // Calculate cumulative Y positions with adequate gaps
  const minGap = Math.max(verticalSpacing, 220); // Use verticalSpacing or minimum 220px to prevent overlaps
  levelY.set(0, marginY); // Root level starts at marginY
  
  for (let level = 1; level <= maxLevel; level++) {
    const prevLevelY = levelY.get(level - 1) || marginY;
    const prevLevelHeight = levelHeights.get(level - 1) || 120;
    const newY = prevLevelY + prevLevelHeight + minGap;
    levelY.set(level, newY);
    console.log(`🔧 Level ${level}: Y position = ${newY} (prev Y: ${prevLevelY} + prev height: ${prevLevelHeight} + gap: ${minGap})`);
  }
  
  // BOTTOM-UP BALANCED TREE LAYOUT for true symmetry
  console.log('🎯 Starting bottom-up balanced positioning with height-aware spacing...');
  
  // Position nodes using bottom-up approach for balanced layout
  const nodePositionMap: Record<string, { x: number; y: number }> = {};
  
  // Track which nodes have been positioned to handle DAG (nodes with multiple parents)
  const positionedNodes = new Set<string>();
  
  // Function to recursively position subtrees from leaves up to parents
  const positionSubtreeBottomUp = (nodeId: string, level: number): { leftX: number; rightX: number; centerX: number } => {
    // If node already positioned (has multiple parents), return its existing bounds
    if (positionedNodes.has(nodeId) && nodePositionMap[nodeId]) {
      const pos = nodePositionMap[nodeId];
      const width = getNodeWidth(nodeId, undefined, nodesRef);
      console.log(`⚠️ Node ${nodeId} already positioned at (${pos.x}, ${pos.y}) - skipping (multiple parents)`);
      return {
        leftX: pos.x,
        rightX: pos.x + width,
        centerX: pos.x + width / 2
      };
    }
    
    const children = childrenMap[nodeId] || [];
    
    // FIXED: Use height-aware Y positioning based on actual level heights
    const y = levelY.get(level) || marginY;
    console.log(`📍 Level ${level} Y position: ${y} (height-aware positioning)`);
    
    if (children.length === 0) {
      // Leaf node: return bounds centered at 0 (fixed for bottom-up algorithm)
      const nodeWidth = getNodeWidth(nodeId, undefined, nodesRef);
      
      // CRITICAL FIX: Return relative bounds centered at 0 for proper bottom-up positioning
      // Position will be finalized when parent applies shift
      const centerX = 0;
      const leftX = centerX - nodeWidth / 2;
      const rightX = centerX + nodeWidth / 2;
      
      nodePositionMap[nodeId] = { x: leftX, y };
      positionedNodes.add(nodeId);
      console.log(`✓ Leaf ${nodeId} positioned at (${leftX}, ${y}) - will be adjusted by parent`);
      
      return { leftX, rightX, centerX };
    } else {
      // Internal node: position children first, then center parent over them
      const childBounds: { leftX: number; rightX: number; centerX: number }[] = [];
      
      // Use consistent spacing across all levels to prevent overlaps
      const baseGutter = horizontalSpacing;
      
      // Calculate average subtree width of children to adjust spacing dynamically
      const childSubtreeWidths = children.map(childId => {
        const subtreeWidth = subtreeWidths.get(childId) || getNodeWidth(childId, undefined, nodesRef);
        return subtreeWidth;
      });
      const avgChildSubtreeWidth = childSubtreeWidths.length > 0 
        ? childSubtreeWidths.reduce((sum, w) => sum + w, 0) / childSubtreeWidths.length 
        : 200;
      
      // More conservative spacing - ensure adequate gaps
      // For complex graphs with large subtrees, use smaller gutters
      const subtreeWidthFactor = Math.max(0.5, Math.min(1.0, Math.sqrt(avgChildSubtreeWidth / 1000)));
      const gutter = Math.max(50, Math.round(baseGutter * subtreeWidthFactor)); // Minimum 50px gutter
      
      console.log(`✓ Level ${level} spacing: base=${baseGutter}, factor=${subtreeWidthFactor.toFixed(2)}, final=${gutter}`);
      
      // First pass: position all children and collect their bounds
      const tempChildBounds: { leftX: number; rightX: number; centerX: number }[] = [];
      children.forEach((childId) => {
        const childLevel = level + 1;
        const bounds = positionSubtreeBottomUp(childId, childLevel);
        tempChildBounds.push(bounds);
      });
      
      // For compact layout with varying subtree widths, use adaptive spacing
      // Calculate average subtree width for more balanced spacing
      const subtreeWidthsList = tempChildBounds.map(b => b.rightX - b.leftX);
      const avgSubtreeWidth = subtreeWidthsList.reduce((sum, w) => sum + w, 0) / subtreeWidthsList.length;
      const maxSubtreeWidth = Math.max(...subtreeWidthsList);
      
      // Use a more balanced approach: average of (avg and max) to prevent both overlaps and excessive spacing
      // This gives us spacing that's between the average and maximum, providing good balance
      const balancedWidth = (avgSubtreeWidth + maxSubtreeWidth) / 2;
      const baseSpacing = balancedWidth * 0.65; // Use 65% of balanced width for tighter but safe spacing
      
      // Add extra spacing if any children have multiple parents (will be shifted later)
      // This prevents overlaps when nodes get centered between parents
      const hasMultiParentChildren = children.some(childId => {
        const parents = allParentsMap[childId] || [];
        return parents.length > 1;
      });
      
      // If children have multiple parents, add 20% extra spacing as safety margin
      const spacingMultiplier = hasMultiParentChildren ? 1.2 : 1.0;
      const childCenterSpacing = (baseSpacing + gutter) * spacingMultiplier;
      
      console.log(`🎯 ADAPTIVE SPACING: Parent ${nodeId} has ${children.length} children`);
      console.log(`   - Subtree widths: ${subtreeWidthsList.map(w => w.toFixed(0)).join(', ')}`);
      console.log(`   - Avg: ${avgSubtreeWidth.toFixed(0)}, Max: ${maxSubtreeWidth.toFixed(0)}, Spacing: ${childCenterSpacing.toFixed(0)}`);
      
      // Calculate total span of child centers
      const totalCenterSpan = (children.length - 1) * childCenterSpacing;
      
      // Start from center and position children symmetrically
      const startCenterX = -totalCenterSpan / 2;
      
      // Helper function to find all descendants
      const findAllDescendants = (parentId: string): string[] => {
        const directChildren = childrenMap[parentId] || [];
        const allDescendants = [...directChildren];
        directChildren.forEach(childId => {
          allDescendants.push(...findAllDescendants(childId));
        });
        return allDescendants;
      };
      
      // Second pass: position each child so its center is at the calculated position
      children.forEach((childId, index) => {
        const bounds = tempChildBounds[index];
        const targetCenterX = startCenterX + (index * childCenterSpacing);
        
        // Calculate shift needed to move child's center to target position
        const childShift = targetCenterX - bounds.centerX;
        
        console.log(`🎯 Child ${index} (${childId}): originalCenter=${bounds.centerX.toFixed(1)}, targetCenter=${targetCenterX.toFixed(1)}, shift=${childShift.toFixed(1)}`);
        
        // Apply shift to child and all its descendants
        if (childShift !== 0) {
          console.log(`🔧 Shifting child ${childId} subtree by ${childShift}px to center at ${targetCenterX}`);
          
          const nodesToShift = [childId, ...findAllDescendants(childId)];
          nodesToShift.forEach(nodeId => {
            if (nodePositionMap[nodeId]) {
              nodePositionMap[nodeId].x += childShift;
            }
          });
        }
        
        // Update bounds with shifted position
        const shiftedBounds = {
          leftX: bounds.leftX + childShift,
          rightX: bounds.rightX + childShift,
          centerX: targetCenterX  // Use exact target center
        };
        
        childBounds.push(shiftedBounds);
      });
      
      // Calculate parent bounds based on children
      const leftmostChild = childBounds[0];
      const rightmostChild = childBounds[childBounds.length - 1];
      const subtreeLeftX = leftmostChild.leftX;
      const subtreeRightX = rightmostChild.rightX;
      
      // FIXED: Parent should be centered at the midpoint of child CENTERS
      // Calculate the actual center based on first and last child positions
      const firstChildCenter = childBounds[0].centerX;
      const lastChildCenter = childBounds[childBounds.length - 1].centerX;
      const subtreeCenterX = (firstChildCenter + lastChildCenter) / 2;
      
      // Position parent centered over children
      const nodeWidth = getNodeWidth(nodeId, undefined, nodesRef);
      const parentX = subtreeCenterX - nodeWidth / 2;
      
      nodePositionMap[nodeId] = { x: parentX, y };
      positionedNodes.add(nodeId);
      console.log(`✓ Parent ${nodeId} centered over children at (${Math.round(parentX)}, ${y})`);
      
      return { 
        leftX: Math.min(subtreeLeftX, parentX), 
        rightX: Math.max(subtreeRightX, parentX + nodeWidth), 
        centerX: subtreeCenterX 
      };
    }
  };

  // ANCHOR ROOT NODES: Position each root subtree and anchor to actual root position
  const rootNodeIds = nodesByLevel[0] || [];
  
  if (rootNodeIds.length === 0) {
    console.warn('⚠️ No root nodes found for layout');
    return { nodes, cleanedEdges: validEdges };
  }
  
  // Process each root node separately - anchor to current position
  rootNodeIds.forEach(rootId => {
    const rootNode = nodes.find(n => n.id === rootId);
    if (!rootNode) {
      console.warn(`⚠️ Root node ${rootId} not found in nodes array`);
      return;
    }
    
    console.log(`🌟 Anchoring root subtree for ${rootId} at position (${rootNode.position.x}, ${rootNode.position.y})`);
    
    // Compute subtree layout with root at level 0
    positionSubtreeBottomUp(rootId, 0);
    
    // Get the computed position for this root
    const computedRootPos = nodePositionMap[rootId];
    if (!computedRootPos) {
      console.warn(`⚠️ No computed position for root ${rootId}`);
      return;
    }
    
    // Calculate shift needed to anchor root to its actual position
    const dx = rootNode.position.x - computedRootPos.x;
    const dy = rootNode.position.y - computedRootPos.y;
    
    console.log(`🎯 Anchoring shift: dx=${dx.toFixed(1)}, dy=${dy.toFixed(1)} for root ${rootId}`);
    
    // Find all descendants of this root for anchoring
    const findAllDescendants = (parentId: string): string[] => {
      const directChildren = childrenMap[parentId] || [];
      const allDescendants = [...directChildren];
      directChildren.forEach(childId => {
        allDescendants.push(...findAllDescendants(childId));
      });
      return allDescendants;
    };
    
    // Apply anchor shift to root and all its descendants
    // Track anchored nodes to avoid anchoring nodes with multiple parents twice
    const anchoredNodes = new Set<string>();
    const nodesToShift = [rootId, ...findAllDescendants(rootId)];
    nodesToShift.forEach(nodeId => {
      if (nodePositionMap[nodeId] && !anchoredNodes.has(nodeId)) {
        nodePositionMap[nodeId].x += dx;
        nodePositionMap[nodeId].y += dy;
        anchoredNodes.add(nodeId);
        console.log(`📍 Anchored ${nodeId} to (${nodePositionMap[nodeId].x.toFixed(1)}, ${nodePositionMap[nodeId].y.toFixed(1)})`);
      }
    });
    
    console.log(`✅ Root ${rootId} subtree anchored - root stays at user position, children arranged relative to it`);
  });

  console.log(`🎯 Layout completed with anchored roots - network nodes stay fixed, children arranged relative to them`);

  // CRITICAL FIX: Reposition nodes with multiple parents to be centered between all parents
  console.log(`🔧 Repositioning nodes with multiple parents to center them...`);
  
  // Helper to find all descendants
  const findAllDescendantsForShift = (parentId: string): string[] => {
    const directChildren = childrenMap[parentId] || [];
    const allDescendants = [...directChildren];
    directChildren.forEach(childId => {
      allDescendants.push(...findAllDescendantsForShift(childId));
    });
    return allDescendants;
  };
  
  Object.keys(allParentsMap).forEach(nodeId => {
    const parents = allParentsMap[nodeId];
    if (parents && parents.length > 1 && nodePositionMap[nodeId]) {
      // Calculate center X position of all parents
      const parentCenters = parents.map(parentId => {
        const parentPos = nodePositionMap[parentId];
        if (parentPos) {
          const parentWidth = getNodeWidth(parentId, undefined, nodesRef);
          return parentPos.x + parentWidth / 2;
        }
        return null;
      }).filter(x => x !== null) as number[];
      
      if (parentCenters.length > 1) {
        const avgParentCenterX = parentCenters.reduce((sum, x) => sum + x, 0) / parentCenters.length;
        const nodeWidth = getNodeWidth(nodeId, undefined, nodesRef);
        const newX = avgParentCenterX - nodeWidth / 2;
        const oldX = nodePositionMap[nodeId].x;
        const shiftX = newX - oldX;
        
        console.log(`🎯 Centering ${nodeId} between ${parents.length} parents: ${parentCenters.map(x => x.toFixed(0)).join(', ')} → center at ${avgParentCenterX.toFixed(0)}, shift=${shiftX.toFixed(1)}`);
        
        // Shift the node and all its descendants
        const nodesToShift = [nodeId, ...findAllDescendantsForShift(nodeId)];
        nodesToShift.forEach(id => {
          if (nodePositionMap[id]) {
            nodePositionMap[id].x += shiftX;
            console.log(`  📍 Shifted ${id} by ${shiftX.toFixed(1)} to x=${nodePositionMap[id].x.toFixed(1)}`);
          }
        });
      }
    }
  });

  // FIXED: Ensure all nodes get positioned and validate completeness
  const positionedCount = Object.keys(nodePositionMap).length;
  const expectedCount = nodes.length;
  
  console.log(`📊 Positioned ${positionedCount} out of ${expectedCount} nodes`);
  
  // Handle any unpositioned nodes (isolated/disconnected)
  let fallbackX = marginX;
  nodes.forEach(node => {
    if (!nodePositionMap[node.id]) {
      console.warn(`⚠️ Node ${node.id} was not positioned by layout, placing as fallback`);
      nodePositionMap[node.id] = { x: fallbackX, y: marginY };
      fallbackX += 200; // Space them out horizontally
    }
  });

  // Update original nodes with normalized positions (NO DOUBLE CENTERING)
  const updatedNodes = nodes.map(node => {
    const position = nodePositionMap[node.id];
    if (position) {
      return {
        ...node,
        position: position
      };
    }
    return node;
  });

  console.log('🎯 BALANCED TREE LAYOUT COMPLETED. Positioned', updatedNodes.length, 'nodes');
  console.log('🎯 Height-aware Y positioning used with minimum gap:', minGap, 'px');
  console.log('🎯 Level heights:', Object.fromEntries(Array.from(levelHeights.entries())));
  console.log('🎯 Level Y positions:', Object.fromEntries(Array.from(levelY.entries())));
  console.log('🎯 Final calculated positions:', updatedNodes.slice(0, 5).map(n => ({ id: n.id, x: n.position.x, y: n.position.y })));
  console.log(`🧹 Cleaned ${edges.length - validEdges.length} invalid edges`);

  return { nodes: updatedNodes, cleanedEdges: validEdges };
};
