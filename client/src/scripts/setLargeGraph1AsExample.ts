/**
 * Script to automatically set "large-graph1" as the example graph
 * This script can be run to update the example graph with the saved "large-graph1" data
 */

import { GraphLocalStorageService } from '@/services/storage/GraphLocalStorageService';

export async function setLargeGraph1AsExample(): Promise<string | null> {
  try {
    console.log('🔄 Loading "large-graph1" from localStorage...');
    
    // Load the saved graph from localStorage
    const graphData = GraphLocalStorageService.loadFromLocalStorage('large-graph1');
    
    if (!graphData) {
      console.error('❌ Graph "large-graph1" not found in localStorage');
      console.log('Available graphs:', GraphLocalStorageService.getLocalGraphs().map(g => g.name));
      return null;
    }
    
    console.log(`✅ Loaded "large-graph1" with ${graphData.nodes.length} nodes and ${graphData.edges.length} edges`);
    
    // Generate the new example graph content
    const exampleGraphContent = `export const EXAMPLE_GRAPH = {
"nodes": ${JSON.stringify(graphData.nodes, null, 2)},
"edges": ${JSON.stringify(graphData.edges, null, 2)},
"timestamp": ${Date.now()}
};`;
    
    console.log('\n📋 NEW EXAMPLE GRAPH CONTENT:');
    console.log('='.repeat(50));
    console.log(exampleGraphContent);
    console.log('='.repeat(50));
    
    console.log('\n📝 INSTRUCTIONS:');
    console.log('1. Copy the content above');
    console.log('2. Replace the entire content in: client/src/data/exampleGraph.ts');
    console.log('3. Save the file');
    console.log('4. The example button will now load this graph');
    
    // Try to copy to clipboard if available
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(exampleGraphContent);
        console.log('✅ Content copied to clipboard!');
      } catch (e) {
        console.log('⚠️  Could not copy to clipboard, please copy manually');
      }
    }
    
    return exampleGraphContent;
  } catch (error) {
    console.error('❌ Error setting large-graph1 as example:', error);
    return null;
  }
}

// Make function available globally for console access
if (typeof window !== 'undefined') {
  (window as any).setLargeGraph1AsExample = setLargeGraph1AsExample;
}

// Auto-run if this script is imported directly
if (typeof window !== 'undefined' && window.location.search.includes('updateExample=true')) {
  console.log('🚀 Auto-running setLargeGraph1AsExample...');
  setLargeGraph1AsExample();
}