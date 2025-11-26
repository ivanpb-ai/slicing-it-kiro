
import { useState, useCallback, memo, useRef, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { NodeData } from "../../types/nodeTypes";
import { useNodeEditorContext } from "../../contexts/NodeEditorContext";

interface DnnNodeProps {
  data: NodeData;
}

const DnnNode = memo(({ data }: DnnNodeProps) => {
  const { updateNodeData } = useNodeEditorContext();
  const reactFlowInstance = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [customName, setCustomName] = useState(data.dnnCustomName || '');
  const [isActive, setIsActive] = useState(data.dnnActive !== undefined ? data.dnnActive : true);
  
  // Use a ref to store the previous custom name to avoid unnecessary updates
  const prevCustomNameRef = useRef(data.dnnCustomName);
  
  // Update local state when the prop changes (but not on every render)
  useEffect(() => {
    console.log('DNN useEffect dnnCustomName:', { 
      dataDnnCustomName: data.dnnCustomName, 
      prevName: prevCustomNameRef.current, 
      currentLocalState: customName 
    });
    if (data.dnnCustomName !== prevCustomNameRef.current) {
      console.log('DNN: Setting customName from data:', data.dnnCustomName);
      setCustomName(data.dnnCustomName || '');
      prevCustomNameRef.current = data.dnnCustomName;
    }
  }, [data.dnnCustomName]);
  
  // Additional effect to ensure sync on component mount/data object changes
  useEffect(() => {
    console.log('DNN useEffect data object changed:', { 
      dnnCustomName: data.dnnCustomName, 
      currentCustomName: customName,
      nodeId: data.nodeId 
    });
    if (data.dnnCustomName && customName !== data.dnnCustomName) {
      console.log('DNN: Force syncing customName to:', data.dnnCustomName);
      setCustomName(data.dnnCustomName);
    }
    // Sync isActive state
    if (data.dnnActive !== undefined && data.dnnActive !== isActive) {
      setIsActive(data.dnnActive);
    }
  }, [data, customName, isActive]);

  const handleCustomNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomName(newValue);
    
    // Use updateNodeData to properly persist the change
    updateNodeData(data.nodeId || '', { ...data, dnnCustomName: newValue });
  }, [data, updateNodeData]);

  const animateFlowPath = useCallback((nodeId: string, shouldAnimate: boolean) => {
    if (!reactFlowInstance) return;
    
    const edges = reactFlowInstance.getEdges();
    const nodes = reactFlowInstance.getNodes();
    
    // Find all edges in the path from 5QI nodes up to the network
    const pathEdges = new Set<string>();
    const nodesToProcess = [nodeId];
    const processedNodes = new Set<string>();
    
    // Traverse up the hierarchy
    while (nodesToProcess.length > 0) {
      const currentNodeId = nodesToProcess.shift()!;
      if (processedNodes.has(currentNodeId)) continue;
      processedNodes.add(currentNodeId);
      
      // Find edges connected to this node (both incoming and outgoing)
      const connectedEdges = edges.filter(edge => 
        edge.source === currentNodeId || edge.target === currentNodeId
      );
      
      connectedEdges.forEach(edge => {
        pathEdges.add(edge.id);
        // Add connected nodes to process
        if (edge.source !== currentNodeId) nodesToProcess.push(edge.source);
        if (edge.target !== currentNodeId) nodesToProcess.push(edge.target);
      });
    }
    
    // Update edges with animation
    const updatedEdges = edges.map(edge => ({
      ...edge,
      animated: pathEdges.has(edge.id) && shouldAnimate,
      style: {
        ...edge.style,
        stroke: pathEdges.has(edge.id) && shouldAnimate ? '#10b981' : '#2563eb',
        strokeWidth: pathEdges.has(edge.id) && shouldAnimate ? 4 : 3,
      }
    }));
    
    reactFlowInstance.setEdges(updatedEdges);
    
    console.log(`DNN Flow Animation: ${shouldAnimate ? 'Activated' : 'Deactivated'} for ${pathEdges.size} edges`);
  }, [reactFlowInstance]);

  const handleActiveChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsActive(newValue);
    
    // Trigger flow animation
    animateFlowPath(data.nodeId || '', newValue);
    
    // Use updateNodeData to properly persist the change
    updateNodeData(data.nodeId || '', { ...data, dnnActive: newValue });
  }, [data, updateNodeData, animateFlowPath]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  // Format the DNN ID properly - ensure it shows a number
  const displayId = data.dnnId !== undefined && data.dnnId !== null ? data.dnnId : 1;

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
      
      {/* Header */}
      <div className="w-full bg-orange-300 border-b border-orange-400 px-4 py-3 mb-4 rounded-t">
        <div className="text-xl font-bold text-white text-center">DNN#{displayId}</div>
      </div>
      
      {data.description && (
        <div className="text-xl text-gray-900 mt-3 text-center">{data.description}</div>
      )}
      <div className="mt-4 mb-3 w-full">
        {isEditing ? (
          <input
            type="text"
            value={customName}
            onChange={handleCustomNameChange}
            onBlur={handleBlur}
            placeholder="Add custom name..."
            className="text-xl p-1 w-full border border-gray-300 rounded"
            autoFocus
          />
        ) : (
          <div 
            className="text-xl text-gray-900 text-center cursor-pointer hover:bg-gray-100/50 p-1 rounded"
            onClick={handleClick}
          >
            {customName ? customName : "Click to add custom name..."}
          </div>
        )}
      </div>
      <div className="text-xl text-center text-gray-800 mt-3">
        Connect top handle to multiple S-NSSAI bottom handles
      </div>
      <div className="text-xl text-center text-gray-800 mt-3 font-semibold">
        Drag QoS Flow nodes onto this DNN to connect them
      </div>

      {/* Activate checkbox */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <input
          type="checkbox"
          id={`dnn-active-${data.nodeId}`}
          checked={isActive}
          onChange={handleActiveChange}
          className="w-5 h-5 cursor-pointer"
        />
        <label 
          htmlFor={`dnn-active-${data.nodeId}`}
          className="text-lg font-medium text-gray-700 cursor-pointer select-none"
        >
          Activate
        </label>
      </div>
      
      {/* Output handle at the bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        className="!w-4 !h-4 !border-[3px] !rounded-full !border-white !bg-blue-500 !opacity-100 !z-50"
        style={{ bottom: -8 }}
        isConnectable={true}
      />
    </div>
  );
});

export default DnnNode;


