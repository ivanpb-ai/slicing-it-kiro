import { useState, memo, useCallback, useEffect } from "react";
import { NodeData } from "../../types/nodeTypes";
import { Badge } from "../../components/ui/badge";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useNodeEditorContext } from "../../contexts/NodeEditorContext";

interface QoSFlowNodeProps {
  id: string;
  data: NodeData;
}

const QoSFlowNode = memo(({ id, data }: QoSFlowNodeProps) => {
  // Use state to track name and default checkbox
  const [qosFlowName, setQosFlowName] = useState(data.qosFlowName || '');
  const [isDefault, setIsDefault] = useState(data.isDefault || false);

  // Get node editor context for updating node data
  const { updateNodeData } = useNodeEditorContext();
  const reactFlowInstance = useReactFlow();

  // Handle name change
  const handleNameChange = (newName: string) => {
    setQosFlowName(newName);
    if (updateNodeData && id) {
      updateNodeData(id, { ...data, qosFlowName: newName });
    }
  };

  // Function to trigger pulsating animation on connected 5QI nodes
  const triggerPulsatingAnimation = useCallback(() => {
    if (!reactFlowInstance) {
      return;
    }

    const edges = reactFlowInstance.getEdges();
    const nodes = reactFlowInstance.getNodes();
    
    // Find 5QI nodes connected to this QoS Flow node
    const connectedFiveQINodes = edges
      .filter(edge => edge.source === id)
      .map(edge => nodes.find(n => n.id === edge.target))
      .filter(node => node?.data?.type === 'fiveqi');
    
    // Trigger animation check on each connected 5QI node (both enable and disable)
    connectedFiveQINodes.forEach(fiveQINode => {
      if (fiveQINode) {
        // Find the 5QI node component and trigger its animation
        const fiveQIElement = document.querySelector(`[data-id="${fiveQINode.id}"]`);
        if (fiveQIElement) {
          // Dispatch a custom event to trigger animation check
          const animationEvent = new CustomEvent('triggerPulsatingAnimation', {
            detail: { nodeId: fiveQINode.id, shouldCheck: true }
          });
          fiveQIElement.dispatchEvent(animationEvent);
        }
      }
    });
  }, [reactFlowInstance, id]);

  // Handle default checkbox change
  const handleDefaultChange = useCallback((checked: boolean) => {
    setIsDefault(checked);
    if (updateNodeData && id) {
      updateNodeData(id, { ...data, isDefault: checked });
    }
    
    // Trigger pulsating animation check after state update (both on and off)
    setTimeout(() => triggerPulsatingAnimation(), 100);
  }, [data, updateNodeData, id, triggerPulsatingAnimation]);

  // Extract QoS flow ID for display
  const qosFlowId = data.qosFlowId || data.id;

  // Sync isDefault state with data changes
  useEffect(() => {
    if (data.isDefault !== undefined && data.isDefault !== isDefault) {
      setIsDefault(data.isDefault);
    }
  }, [data.isDefault, isDefault]);

  // Trigger animation when component mounts with default checked or when default state changes
  useEffect(() => {
    if (isDefault && reactFlowInstance) {
      setTimeout(() => triggerPulsatingAnimation(), 500);
    }
  }, [isDefault, reactFlowInstance, triggerPulsatingAnimation]);

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      {/* Input handle at the top */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        className="!w-4 !h-4 !border-[3px] !rounded-full !border-white !bg-blue-500 !opacity-100 !z-50"
        style={{ top: -8 }}
        isConnectable={true}
      />

      {/* Output handle at the bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        className="!w-4 !h-4 !border-[3px] !rounded-full !border-white !bg-blue-500 !opacity-100 !z-50"
        style={{ bottom: -8 }}
        isConnectable={true}
      />

      <div className="text-xl text-gray-900 mt-3 text-center">
        {/* Header */}
        <div className="w-full bg-cyan-300 border-b border-cyan-400 px-4 py-3 mb-4 rounded-t">
          <div className="text-xl font-bold text-white text-center">QoS Flow</div>
        </div>

        {/* Display QoS Flow ID badge */}
        <Badge className="bg-cyan-500 text-white hover:bg-cyan-600 mb-4 px-4 py-2 text-xl font-semibold rounded-full">
          QoS Flow: {qosFlowId}
        </Badge>
        
        {/* Editable name field */}
        <div className="mt-4 mb-3">
          <label className="text-xl font-semibold text-gray-900 block mb-1">Name</label>
          <input
            type="text"
            value={qosFlowName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Enter QoS Flow name"
            className="w-full px-2 py-1 text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
        
        {/* Default checkbox */}
        <div className="mt-3 flex items-center justify-center">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => handleDefaultChange(e.target.checked)}
              className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
            />
            <span className="text-xl font-semibold text-gray-900">Default</span>
          </label>
        </div>
      </div>
    </div>
  );
});

export default QoSFlowNode;

