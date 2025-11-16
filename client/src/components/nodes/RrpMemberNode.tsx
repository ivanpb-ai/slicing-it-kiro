
import { memo } from "react";
import { NodeData } from "../../types/nodeTypes";
import { Handle, Position } from "@xyflow/react";


interface RrpMemberNodeProps {
  data: NodeData;
}

const RrpMemberNode = memo(({ data }: RrpMemberNodeProps) => {
  return (
    <div className="text-base text-gray-900 text-center">
      {/* Header */}
      <div className="w-full bg-teal-300 border-b border-teal-400 px-4 py-3 mb-4 rounded-t">
        <div className="text-lg font-bold text-white text-center">RRP Member</div>
      </div>
    
      {/* Input handle at the top */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        className="!w-4 !h-4 !border-[3px] !rounded-full !border-white !bg-blue-500 !opacity-100 !z-50"
        style={{ top: -8 }}
        isConnectable={true}
      />
      <div className="text-base font-semibold text-gray-900">
        PLMN: {data.plmnValue || 'Unknown'}
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

RrpMemberNode.displayName = 'RrpMemberNode';

export default RrpMemberNode;