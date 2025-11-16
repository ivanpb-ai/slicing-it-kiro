import { useEffect, useState, useRef, memo } from "react";
import { NodeData } from "../../types/nodeTypes";
import { Badge } from "../../components/ui/badge";
import { getFiveQIValueById } from "../../utils/flowData/utils/fiveQIUtils";
import { Handle, Position } from "@xyflow/react";
import { useNodeEditorContext } from "../../contexts/NodeEditorContext";


interface FiveQiNodeProps {
  id: string;
  data: NodeData;
}

const FiveQiNode = memo(({ id, data }: FiveQiNodeProps) => {
  // Use state to track the actual QoS values we should display
  const [qosValues, setQosValues] = useState(data.qosValues);
  
  
  // Use ref to track previous fiveQIId to prevent unnecessary updates
  const previousFiveQIIdRef = useRef(data.fiveQIId);
  
  // Get node editor context for updating node data
  const { updateNodeData } = useNodeEditorContext();
  
  // Extract fiveQIId correctly - always ensure it's a string
  const fiveQIId = data.fiveQIId ? String(data.fiveQIId) : undefined;
  
  console.log("5QI Node rendering with data:", data);
  console.log("5QI Node fiveQIId:", fiveQIId);
  
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
      <div className="text-base text-gray-900 mt-1 text-center">
        {/* Header */}
        <div className="w-full bg-purple-300 border-b border-purple-400 px-4 py-3 mb-4 rounded-t">
          <div className="text-lg font-bold text-white text-center">5QI</div>
        </div>
        
        <Badge className="bg-red-600 text-white hover:bg-red-700 mb-4 px-5 py-2 text-xl font-bold rounded-full">
          Invalid 5QI: {fiveQIId || "Unknown"}
        </Badge>
        <div className="mt-4 text-base font-semibold text-gray-900">
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

      <div className="text-base text-gray-900 mt-3 text-center">

      {/* Header */}
      <div className="w-full bg-purple-300 border-b border-purple-400 px-4 py-3 mb-4 rounded-t">
        <div className="text-lg font-bold text-white text-center">5QI</div>
      </div>


      {/* Display prominent badge with 5QI value */}
      <Badge className="bg-purple-500 text-white hover:bg-purple-600 mb-4 px-5 py-2 text-xl font-bold rounded-full">
        5QI: {fiveQIId || displayValues.value}
      </Badge>
      
      {/* Display QoS service/description */}
      <div className="mt-4 text-base font-semibold text-gray-900">
        {displayValues.service}
      </div>
      
      {/* Display QoS parameters in a more visible format */}
      <div className="mt-4 text-base bg-white/70 p-3 rounded shadow-sm">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
          <span className="font-semibold text-gray-900">Type:</span>
          <span className="text-gray-900">{displayValues.resourceType}</span>
          
          <span className="font-semibold text-gray-900">Priority:</span>
          <span className="text-gray-900">{displayValues.priority}</span>
          
          <span className="font-semibold text-gray-900">Delay:</span>
          <span className="text-gray-900">{displayValues.packetDelay}</span>
        </div>
      </div>
      

          </div>

    </div>
  );
});

export default FiveQiNode;
