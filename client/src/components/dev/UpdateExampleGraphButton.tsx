import { useReactFlow } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { updateExampleGraphFromCurrent } from '@/utils/updateExampleGraph';

/**
 * Developer utility component to update the example graph
 * This button will generate the new example graph content based on current canvas
 */
export const UpdateExampleGraphButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleUpdateExample = () => {
    const nodes = getNodes();
    const edges = getEdges();
    
    if (nodes.length === 0) {
      alert('No nodes on canvas. Please load the graph you want to set as example first.');
      return;
    }
    
    // Generate the new example graph content
    const content = updateExampleGraphFromCurrent(nodes, edges);
    
    if (content) {
      // Also try to copy to clipboard if possible
      if (navigator.clipboard) {
        navigator.clipboard.writeText(content).then(() => {
          alert(`Example graph content generated and copied to clipboard!\n\nNodes: ${nodes.length}\nEdges: ${edges.length}\n\nReplace the content in client/src/data/exampleGraph.ts`);
        }).catch(() => {
          alert(`Example graph content generated (check console)!\n\nNodes: ${nodes.length}\nEdges: ${edges.length}\n\nReplace the content in client/src/data/exampleGraph.ts`);
        });
      } else {
        alert(`Example graph content generated (check console)!\n\nNodes: ${nodes.length}\nEdges: ${edges.length}\n\nReplace the content in client/src/data/exampleGraph.ts`);
      }
    }
  };

  return (
    <Button 
      onClick={handleUpdateExample}
      variant="outline"
      size="sm"
      className="bg-yellow-50 border-yellow-300 text-yellow-800 hover:bg-yellow-100"
    >
      🔧 Update Example Graph
    </Button>
  );
};

export default UpdateExampleGraphButton;