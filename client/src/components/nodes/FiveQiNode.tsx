import { useEffect, useState, useRef, memo, useCallback } from "react";
import { NodeData } from "../../types/nodeTypes";
import { Badge } from "../../components/ui/badge";
import { getFiveQIValueById } from "../../utils/flowData/utils/fiveQIUtils";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useNodeEditorContext } from "../../contexts/NodeEditorContext";


interface FiveQiNodeProps {
  id: string;
  data: NodeData;
}

const FiveQiNode = memo(({ id, data }: FiveQiNodeProps) => {
  // Use state to track the actual QoS values we should display
  const [qosValues, setQosValues] = useState(data.qosValues);
  const [isDefault, setIsDefault] = useState(data.fiveQiDefault !== undefined ? data.fiveQiDefault : false);
  
  // Use ref to track previous fiveQIId to prevent unnecessary updates
  const previousFiveQIIdRef = useRef(data.fiveQIId);
  
  // Get node editor context for updating node data
  const { updateNodeData } = useNodeEditorContext();
  const reactFlowInstance = useReactFlow();
  
  // Extract fiveQIId correctly - always ensure it's a string
  const fiveQIId = data.fiveQIId ? String(data.fiveQIId) : undefined;
  
  console.log("5QI Node rendering with data:", data);
  console.log("5QI Node fiveQIId:", fiveQIId);

  // Function to check if parent DNN is activated and trigger pulsating animation
  const checkAndTriggerPulsatingAnimation = useCallback(() => {
    console.log('5QI Pulsating Animation: Function called', { 
      hasReactFlow: !!reactFlowInstance, 
      isDefault, 
      nodeId: data.nodeId 
    });
    
    if (!reactFlowInstance || !isDefault) {
      console.log('5QI Pulsating Animation: Early return - missing reactFlow or not default');
      return;
    }
    
    const edges = reactFlowInstance.getEdges();
    const nodes = reactFlowInstance.getNodes();
    
    console.log('5QI Pulsating Animation: Graph state', { 
      totalEdges: edges.length, 
      totalNodes: nodes.length 
    });
    
    // Find ALL paths from this 5QI node up to the network node
    const pathToNetwork = new Set<string>();
    let dnnFound = false;
    let dnnActivated = false;
    
    console.log('5QI Pulsating Animation: Starting traversal from node:', data.nodeId);
    
    // Use breadth-first search to find all paths
    const queue = [data.nodeId || ''];
    const visitedNodes = new Set<string>();
    
    while (queue.length > 0) {
      const currentNodeId = queue.shift()!;
      
      if (visitedNodes.has(currentNodeId)) continue;
      visitedNodes.add(currentNodeId);
      
      // Find the current node
      const currentNode = nodes.find(n => n.id === currentNodeId);
      if (!currentNode) {
        console.log('5QI Pulsating Animation: Node not found:', currentNodeId);
        continue;
      }
      
      console.log('5QI Pulsating Animation: Processing node:', {
        id: currentNode.id,
        type: currentNode.data?.type,
        dnnActive: currentNode.data?.dnnActive
      });
      
      // If this is a DNN node, check if it's activated
      if (currentNode.data?.type === 'dnn') {
        dnnFound = true;
        dnnActivated = currentNode.data?.dnnActive === true;
        console.log('5QI Pulsating Animation: Found DNN node', {
          id: currentNode.id,
          activated: dnnActivated
        });
        
        if (!dnnActivated) {
          console.log('5QI Pulsating Animation: Parent DNN not activated, skipping animation');
          return; // DNN not activated, don't animate
        }
      }
      
      // Find ALL incoming edges (going up the hierarchy from 5QI to Network)
      const incomingEdges = edges.filter(edge => edge.target === currentNodeId);
      
      if (incomingEdges.length > 0) {
        incomingEdges.forEach(incomingEdge => {
          pathToNetwork.add(incomingEdge.id);
          console.log('5QI Pulsating Animation: Added edge to path:', incomingEdge.id);
          
          // Add source node to queue for further processing
          if (!visitedNodes.has(incomingEdge.source)) {
            queue.push(incomingEdge.source);
          }
        });
      } else {
        console.log('5QI Pulsating Animation: No incoming edges found for node:', currentNodeId);
      }
    }
    
    const pathEdgesArray = Array.from(pathToNetwork);
    
    console.log('5QI Pulsating Animation: Path analysis', {
      pathLength: pathEdgesArray.length,
      dnnFound,
      dnnActivated,
      pathEdges: pathEdgesArray
    });
    
    if (pathEdgesArray.length === 0) {
      console.log('5QI Pulsating Animation: No path found, returning');
      return;
    }
    
    if (!dnnFound) {
      console.log('5QI Pulsating Animation: No DNN found in path, continuing anyway');
    }
    
    // Create pulsating animation effect with more aggressive styling
    const animateEdgesPulsating = (edgeIds: string[], shouldPulse: boolean) => {
      console.log('5QI Pulsating Animation: Updating edges', { edgeIds, shouldPulse });
      
      const updatedEdges = edges.map(edge => {
        if (edgeIds.includes(edge.id)) {
          const newEdge = {
            ...edge,
            animated: shouldPulse,
            style: {
              stroke: shouldPulse ? '#f59e0b' : '#2563eb', // Orange for pulsating, blue for normal
              strokeWidth: shouldPulse ? 6 : 3,
              strokeDasharray: shouldPulse ? '15,10' : undefined,
              opacity: shouldPulse ? 0.9 : 1,
            },
            className: shouldPulse ? 'pulsating-edge' : '',
            data: {
              ...edge.data,
              isPulsating: shouldPulse
            }
          };
          console.log('5QI Pulsating Animation: Updated edge', { 
            id: edge.id, 
            newStyle: newEdge.style,
            animated: newEdge.animated 
          });
          return newEdge;
        }
        return edge;
      });
      
      // Force ReactFlow to update
      reactFlowInstance.setEdges(updatedEdges);
      
      // Also try direct DOM manipulation as backup
      setTimeout(() => {
        edgeIds.forEach(edgeId => {
          const edgeElement = document.querySelector(`[data-id="${edgeId}"]`);
          if (edgeElement) {
            if (shouldPulse) {
              // Add pulsating data attribute
              edgeElement.setAttribute('data-ispulsating', 'true');
              edgeElement.classList.add('pulsating-edge');
            } else {
              edgeElement.removeAttribute('data-ispulsating');
              edgeElement.classList.remove('pulsating-edge');
            }
            
            const pathElement = edgeElement.querySelector('path');
            if (pathElement && shouldPulse) {
              pathElement.style.stroke = '#f59e0b';
              pathElement.style.strokeWidth = '6px';
              pathElement.style.strokeDasharray = '20,15';
              pathElement.style.animation = 'pulse-flow 1.2s ease-in-out infinite';
              pathElement.style.strokeLinecap = 'round';
              pathElement.style.vectorEffect = 'non-scaling-stroke';
              pathElement.style.opacity = '0.9';
              console.log('5QI Pulsating Animation: Applied direct DOM styling to', edgeId);
            }
          }
        });
      }, 100);
    };
    
    // Start pulsating animation
    animateEdgesPulsating(pathEdgesArray, true);
    
    console.log(`5QI Pulsating Animation: Started for ${pathEdgesArray.length} edges from 5QI to network`);
    
    // Add enhanced CSS for pulsating effect with zoom-independent animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-flow {
        0% { 
          opacity: 0.7;
          stroke: #f59e0b !important;
          stroke-width: 5px !important;
        }
        25% { 
          opacity: 0.85;
          stroke: #ff8c42 !important;
          stroke-width: 7px !important;
        }
        50% { 
          opacity: 1;
          stroke: #ff6b35 !important;
          stroke-width: 9px !important;
        }
        75% { 
          opacity: 0.85;
          stroke: #ff8c42 !important;
          stroke-width: 7px !important;
        }
        100% { 
          opacity: 0.7;
          stroke: #f59e0b !important;
          stroke-width: 5px !important;
        }
      }
      
      @keyframes pulse-glow {
        0% { 
          filter: drop-shadow(0 0 3px #f59e0b);
        }
        50% { 
          filter: drop-shadow(0 0 8px #ff6b35);
        }
        100% { 
          filter: drop-shadow(0 0 3px #f59e0b);
        }
      }
      
      /* Target ReactFlow edges with pulsating class - zoom independent */
      .react-flow__edge.pulsating-edge path,
      .react-flow__edges .pulsating-edge path,
      .pulsating-edge path {
        stroke: #f59e0b !important;
        stroke-width: 6px !important;
        stroke-dasharray: 20,15 !important;
        animation: pulse-flow 1.2s ease-in-out infinite !important;
        stroke-linecap: round !important;
        vector-effect: non-scaling-stroke !important;
      }
      
      /* Add glow effect separately to avoid zoom issues */
      .react-flow__edge.pulsating-edge,
      .react-flow__edges .pulsating-edge,
      .pulsating-edge {
        animation: pulse-glow 1.2s ease-in-out infinite !important;
      }
      
      /* Force animation on any edge with pulsating data */
      [data-id*="pulsating"] path,
      .react-flow__edge[data-ispulsating="true"] path {
        stroke: #f59e0b !important;
        stroke-width: 6px !important;
        stroke-dasharray: 20,15 !important;
        animation: pulse-flow 1.2s ease-in-out infinite !important;
        stroke-linecap: round !important;
        vector-effect: non-scaling-stroke !important;
      }
      
      /* Ensure visibility at all zoom levels */
      .react-flow__viewport .pulsating-edge path {
        stroke: #f59e0b !important;
        stroke-width: 6px !important;
        stroke-dasharray: 20,15 !important;
        animation: pulse-flow 1.2s ease-in-out infinite !important;
        stroke-linecap: round !important;
        vector-effect: non-scaling-stroke !important;
        opacity: 0.9 !important;
      }
    `;
    
    // Remove existing styles first
    const existingStyle = document.querySelector('#pulsating-animation-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.id = 'pulsating-animation-styles';
    document.head.appendChild(style);
    console.log('5QI Pulsating Animation: Added enhanced CSS styles with !important');
    
  }, [reactFlowInstance, isDefault, data.nodeId]);

  // Handle default checkbox change
  const handleDefaultChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsDefault(newValue);
    
    // Trigger pulsating animation check
    if (newValue) {
      setTimeout(() => checkAndTriggerPulsatingAnimation(), 100);
    }
    
    // Use updateNodeData to properly persist the change
    updateNodeData(data.nodeId || '', { ...data, fiveQiDefault: newValue });
  }, [data, updateNodeData, checkAndTriggerPulsatingAnimation]);

  // Sync isDefault state with data changes
  useEffect(() => {
    if (data.fiveQiDefault !== undefined && data.fiveQiDefault !== isDefault) {
      setIsDefault(data.fiveQiDefault);
    }
  }, [data.fiveQiDefault, isDefault]);

  // Check for pulsating animation when component mounts or when default state changes
  useEffect(() => {
    if (isDefault && reactFlowInstance) {
      // Small delay to ensure all nodes are rendered
      setTimeout(() => checkAndTriggerPulsatingAnimation(), 500);
    }
  }, [isDefault, reactFlowInstance, checkAndTriggerPulsatingAnimation]);
  
  // Use effect to load QoS values if we have a fiveQIId
  useEffect(() => {
    // Skip if fiveQIId hasn't changed
    if (fiveQIId === previousFiveQIIdRef.current) return;
    
    // Update the ref
    previousFiveQIIdRef.current = fiveQIId as any;
    
    if (fiveQIId) {
      console.log("FiveQiNode: Loading QoS values for ID:", fiveQIId);
      const fetchedValues = getFiveQIValueById(fiveQIId);
      
      if (fetchedValues) {
        console.log("FiveQiNode: Found QoS values:", fetchedValues);
        setQosValues(fetchedValues);
        
        // Update the node data for persistence
        if (!data.qosValues || data.qosValues.value !== fiveQIId) {
          data.qosValues = fetchedValues;
        }
      } else {
        console.warn(`FiveQiNode: Could not find QoS data for ID: ${fiveQIId}`);
        // Even if we couldn't find values in the function, make one more direct attempt
        try {
          const { fiveQIValues } = require('@/utils/flowData/data/fiveQIData');
          const directMatch = fiveQIValues.find((q: any) => String(q.value) === String(fiveQIId));
          
          if (directMatch) {
            const valuesCopy = JSON.parse(JSON.stringify(directMatch));
            console.log("FiveQiNode: Found QoS values via direct lookup:", valuesCopy);
            setQosValues(valuesCopy);
            data.qosValues = valuesCopy;
          }
        } catch (error) {
          console.error("Error loading fiveQIValues:", error);
        }
      }
    }
  }, [fiveQIId, data]);
  
  
  // If we still don't have values, try one more approach - direct access to data
  const displayValues = qosValues || 
    (fiveQIId ? getFiveQIValueById(fiveQIId) : null);
  
  // If we still don't have values, show error state
  if (!displayValues) {
    return (
      <div className="text-xl text-gray-900 mt-1 text-center">
        {/* Header */}
        <div className="w-full bg-purple-300 border-b border-purple-400 px-4 py-3 mb-4 rounded-t">
          <div className="text-xl font-bold text-white text-center">5QI</div>
        </div>
        
        <Badge className="bg-red-600 text-white hover:bg-red-700 mb-4 px-5 py-2 text-xl font-bold rounded-full">
          Invalid 5QI: {fiveQIId || "Unknown"}
        </Badge>
        <div className="mt-4 text-xl font-semibold text-gray-900">
          Could not load QoS values
        </div>
      </div>
    );
  }
  
  console.log("Final QoS values for rendering:", displayValues);
  
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

      <div className="text-xl text-gray-900 mt-3 text-center">

      {/* Header */}
      <div className="w-full bg-purple-300 border-b border-purple-400 px-4 py-3 mb-4 rounded-t">
        <div className="text-xl font-bold text-white text-center">5QI</div>
      </div>


      {/* Display prominent badge with 5QI value */}
      <Badge className="bg-purple-500 text-white hover:bg-purple-600 mb-4 px-5 py-2 text-xl font-bold rounded-full">
        5QI: {fiveQIId || displayValues.value}
      </Badge>
      
      {/* Display QoS service/description */}
      <div className="mt-4 text-xl font-semibold text-gray-900">
        {displayValues.service}
      </div>
      
      {/* Display QoS parameters in a more visible format */}
      <div className="mt-4 text-xl bg-white/70 p-3 rounded shadow-sm">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
          <span className="font-semibold text-gray-900">Type:</span>
          <span className="text-gray-900">{displayValues.resourceType}</span>
          
          <span className="font-semibold text-gray-900">Priority:</span>
          <span className="text-gray-900">{displayValues.priority}</span>
          
          <span className="font-semibold text-gray-900">Delay:</span>
          <span className="text-gray-900">{displayValues.packetDelay}</span>
        </div>
      </div>

      {/* Default checkbox */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <input
          type="checkbox"
          id={`fiveqi-default-${data.nodeId}`}
          checked={isDefault}
          onChange={handleDefaultChange}
          className="w-5 h-5 cursor-pointer"
        />
        <label 
          htmlFor={`fiveqi-default-${data.nodeId}`}
          className="text-lg font-medium text-gray-700 cursor-pointer select-none"
        >
          Default
        </label>
      </div>
      

          </div>

    </div>
  );
});

export default FiveQiNode;


