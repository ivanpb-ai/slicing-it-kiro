
import { useState, useCallback, memo, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import { NodeData } from "../../types/nodeTypes";
import { useNodeEditorContext } from "../../contexts/NodeEditorContext";

interface SnssaiNodeProps {
  data: NodeData;
}

const SnssaiNode = memo(({ data }: SnssaiNodeProps) => {
  const { updateNodeData } = useNodeEditorContext();
  const [sd, setSd] = useState(data.sd || '');
  const [sst, setSst] = useState(data.sst || '');
  
  // Use refs to track previous values and sync with loaded data
  const prevSdRef = useRef(data.sd);
  const prevSstRef = useRef(data.sst);
  
  // Update local state when the data props change (e.g., after loading)
  useEffect(() => {
    if (data.sd !== prevSdRef.current) {
      setSd(data.sd || '');
      prevSdRef.current = data.sd;
    }
  }, [data.sd]);
  
  useEffect(() => {
    if (data.sst !== prevSstRef.current) {
      setSst(data.sst || '');
      prevSstRef.current = data.sst;
    }
  }, [data.sst]);

  const handleSdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSd(newValue);
    updateNodeData(data.nodeId, { ...data, sd: newValue });
  }, [data, updateNodeData]);

  const handleSstChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSst(newValue);
    updateNodeData(data.nodeId, { ...data, sst: newValue });
  }, [data, updateNodeData]);

  // Format the S-NSSAI ID properly - ensure it shows a number
  const displayId = data.snssaiId !== undefined && data.snssaiId !== null ? data.snssaiId : 1;

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
      <div className="w-full bg-violet-300 border-b border-violet-400 px-4 py-3 mb-4 rounded-t">
        <div className="text-lg font-bold text-white text-center">S-NSSAI#{displayId}</div>
      </div>
      
      {data.description && (
        <div className="text-lg text-gray-900 mt-3 text-center">{data.description}</div>
      )}
      
      <div className="mt-4 mb-3 w-full space-y-2">
        <div className="flex flex-col">
          <label className="text-lg text-gray-900 mb-3 font-semibold">SD:</label>
          <input
            type="text"
            value={sd}
            onChange={handleSdChange}
            placeholder="Service Differentiator"
            className="text-lg p-1 w-full border border-gray-300 rounded"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-lg text-gray-900 mb-3 font-semibold">SST:</label>
          <input
            type="text"
            value={sst}
            onChange={handleSstChange}
            placeholder="Slice/Service Type"
            className="text-lg p-1 w-full border border-gray-300 rounded"
          />
        </div>
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

export default SnssaiNode;

