import { GraphLocalStorageService } from '@/services/storage/GraphLocalStorageService';

/**
 * Utility function to update the example graph with data from a saved graph
 * This function should be called from the browser console or a development tool
 * 
 * Usage:
 * 1. Open browser console
 * 2. Call: updateExampleGraphFromSaved('large-graph1')
 * 3. Copy the output and replace the content in client/src/data/exampleGraph.ts
 */
export function updateExampleGraphFromSaved(savedGraphName: string): string | null {
  try {
    // Load the saved graph from localStorage
    const graphData = GraphLocalStorageService.loadFromLocalStorage(savedGraphName);
    
    if (!graphData) {
      console.error(`Graph "${savedGraphName}" not found in localStorage`);
      return null;
    }
    
    // Create the new example graph content
    const exampleGraphContent = `export const EXAMPLE_GRAPH = {
"nodes": ${JSON.stringify(graphData.nodes, null, 2)},
"edges": ${JSON.stringify(graphData.edges, null, 2)},
"timestamp": ${Date.now()}
};`;
    
    console.log('=== NEW EXAMPLE GRAPH CONTENT ===');
    console.log(exampleGraphContent);
    console.log('=== END EXAMPLE GRAPH CONTENT ===');
    console.log(`\nCopy the content above and replace it in client/src/data/exampleGraph.ts`);
    console.log(`Graph loaded with ${graphData.nodes.length} nodes and ${graphData.edges.length} edges`);
    
    return exampleGraphContent;
  } catch (error) {
    console.error('Error updating example graph:', error);
    return null;
  }
}

/**
 * Alternative function to get current graph data from React Flow instance
 * This should be called when the desired graph is currently loaded on the canvas
 */
export function updateExampleGraphFromCurrent(nodes: any[], edges: any[]): string {
  try {
    // Create the new example graph content
    const exampleGraphContent = `export const EXAMPLE_GRAPH = {
"nodes": ${JSON.stringify(nodes, null, 2)},
"edges": ${JSON.stringify(edges, null, 2)},
"timestamp": ${Date.now()}
};`;
    
    console.log('=== NEW EXAMPLE GRAPH CONTENT ===');
    console.log(exampleGraphContent);
    console.log('=== END EXAMPLE GRAPH CONTENT ===');
    console.log(`\nCopy the content above and replace it in client/src/data/exampleGraph.ts`);
    console.log(`Graph contains ${nodes.length} nodes and ${edges.length} edges`);
    
    return exampleGraphContent;
  } catch (error) {
    console.error('Error creating example graph content:', error);
    return '';
  }
}

// Make functions available globally for console access
if (typeof window !== 'undefined') {
  (window as any).updateExampleGraphFromSaved = updateExampleGraphFromSaved;
  (window as any).updateExampleGraphFromCurrent = updateExampleGraphFromCurrent;
}