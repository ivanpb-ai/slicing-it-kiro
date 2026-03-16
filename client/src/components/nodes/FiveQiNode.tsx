import { useEffect, useState, useRef, memo, useCallback } from "react";
import { NodeData } from "../../types/nodeTypes";
import { Badge } from "../../components/ui/badge";
import { getFiveQIValueById, getAnimationParamsFromQoS } from "../../utils/flowData/utils/fiveQIUtils";
import type { AnimationParams } from "../../utils/flowData/utils/fiveQIUtils";
import { Handle, Position, useReactFlow } from "@xyflow/react";
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
  const reactFlowInstance = useReactFlow();
  
  // Extract fiveQIId correctly - always ensure it's a string
  const fiveQIId = data.fiveQIId ? String(data.fiveQIId) : undefined;
  
  console.log("5QI Node rendering with data:", data);
  console.log("5QI Node fiveQIId:", fiveQIId);

  // Function to clear all pulsating animations
  const clearAllPulsatingAnimations = useCallback(() => {
    if (!reactFlowInstance) return;
    
    const edges = reactFlowInstance.getEdges();
    const allEdgeIds = edges.map(edge => edge.id);
    
    // Remove pulsating styles from all edges
    const updatedEdges = edges.map(edge => ({
      ...edge,
      animated: false,
      style: {
        stroke: '#2563eb',
        strokeWidth: 3,
        strokeDasharray: undefined,
        opacity: 1,
      },
      className: '',
      data: {
        ...edge.data,
        isPulsating: false
      }
    }));
    
    reactFlowInstance.setEdges(updatedEdges);
    
    // Also clear DOM styles
    setTimeout(() => {
      allEdgeIds.forEach(edgeId => {
        const edgeElement = document.querySelector(`[data-id="${edgeId}"]`);
        if (edgeElement) {
          edgeElement.removeAttribute('data-ispulsating');
          edgeElement.classList.remove('pulsating-edge');
          
          const pathElement = edgeElement.querySelector('path');
          if (pathElement) {
            pathElement.style.stroke = '#2563eb';
            pathElement.style.strokeWidth = '3px';
            pathElement.style.strokeDasharray = '';
            pathElement.style.animation = '';
            pathElement.style.strokeLinecap = '';
            pathElement.style.vectorEffect = '';
            pathElement.style.opacity = '1';
          }
        }
      });
    }, 50);
    
    console.log('5QI Pulsating Animation: Cleared all animations');
  }, [reactFlowInstance]);

  // Function to check if parent DNN is activated and child QoS Flow is default, then trigger pulsating animation
  const checkAndTriggerPulsatingAnimation = useCallback(() => {
    if (!reactFlowInstance) return;

    const edges = reactFlowInstance.getEdges();
    const nodes = reactFlowInstance.getNodes();

    // Check if there are any default QoS Flow nodes connected to this 5QI node
    const connectedQoSFlows = edges.filter(edge => edge.target === (data.nodeId || ''));
    const hasDefaultQoSFlow = connectedQoSFlows.some(edge => {
      const qosFlowNode = nodes.find(n => n.id === edge.source);
      return qosFlowNode?.data?.type === 'qosflow' && qosFlowNode?.data?.isDefault === true;
    });

    if (!hasDefaultQoSFlow) {
      clearAllPulsatingAnimations();
      return;
    }

    // Find ALL paths from this 5QI node up to the network node
    const pathToNetwork = new Set<string>();
    let dnnFound = false;
    let dnnActivated = false;

    const queue = [data.nodeId || ''];
    const visitedNodes = new Set<string>();

    while (queue.length > 0) {
      const currentNodeId = queue.shift()!;
      if (visitedNodes.has(currentNodeId)) continue;
      visitedNodes.add(currentNodeId);

      const currentNode = nodes.find(n => n.id === currentNodeId);
      if (!currentNode) continue;

      if (currentNode.data?.type === 'dnn') {
        dnnFound = true;
        dnnActivated = currentNode.data?.dnnActive === true;
        if (!dnnActivated) {
          clearAllPulsatingAnimations();
          return;
        }
      }

      const incomingEdges = edges.filter(edge => edge.target === currentNodeId);
      incomingEdges.forEach(incomingEdge => {
        pathToNetwork.add(incomingEdge.id);
        if (!visitedNodes.has(incomingEdge.source)) {
          queue.push(incomingEdge.source);
        }
      });
    }

    const pathEdgesArray = Array.from(pathToNetwork);

    if (!dnnFound) {
      console.log('5QI Pulsating Animation: No DNN found in path, continuing anyway');
    }

    // --- Derive animation params from this node's 5QI values ---
    const currentQoS = qosValues || (fiveQIId ? getFiveQIValueById(fiveQIId) : null);
    const animParams: AnimationParams | null = currentQoS ? getAnimationParamsFromQoS(currentQoS) : null;

    // Fallback defaults if we somehow can't resolve 5QI data
    const p = animParams ?? {
      strokeWidth: 6, strokeWidthPulse: 9, animationDuration: 1.2,
      primaryColor: '#f59e0b', secondaryColor: '#ff8c42', tertiaryColor: '#ff6b35',
      dashArray: '15,10', glowColor: '#f59e0b', glowSize: 5, categoryLabel: 'Standard',
    };

    // Apply pulsating animation to path edges
    const animateEdgesPulsating = (edgeIds: string[], shouldPulse: boolean) => {
      const updatedEdges = edges.map(edge => {
        if (edgeIds.includes(edge.id)) {
          return {
            ...edge,
            animated: shouldPulse,
            style: {
              stroke: shouldPulse ? p.primaryColor : '#2563eb',
              strokeWidth: shouldPulse ? p.strokeWidth : 3,
              strokeDasharray: shouldPulse ? p.dashArray : undefined,
              opacity: shouldPulse ? 0.9 : 1,
            },
            className: shouldPulse ? 'pulsating-edge' : '',
            data: { ...edge.data, isPulsating: shouldPulse },
          };
        }
        return edge;
      });

      reactFlowInstance.setEdges(updatedEdges);

      // DOM fallback for zoom-resilience
      setTimeout(() => {
        edgeIds.forEach(edgeId => {
          const edgeElement = document.querySelector(`[data-id="${edgeId}"]`);
          if (!edgeElement) return;
          if (shouldPulse) {
            edgeElement.setAttribute('data-ispulsating', 'true');
            edgeElement.classList.add('pulsating-edge');
          } else {
            edgeElement.removeAttribute('data-ispulsating');
            edgeElement.classList.remove('pulsating-edge');
          }
          const pathEl = edgeElement.querySelector('path');
          if (!pathEl) return;
          if (shouldPulse) {
            pathEl.style.stroke = p.primaryColor;
            pathEl.style.strokeWidth = `${p.strokeWidth}px`;
            pathEl.style.strokeDasharray = p.dashArray;
            pathEl.style.animation = `pulse-flow ${p.animationDuration}s ease-in-out infinite`;
            pathEl.style.strokeLinecap = 'round';
            pathEl.style.vectorEffect = 'non-scaling-stroke';
            pathEl.style.opacity = '0.9';
          } else {
            pathEl.style.stroke = '#2563eb';
            pathEl.style.strokeWidth = '3px';
            pathEl.style.strokeDasharray = '';
            pathEl.style.animation = '';
            pathEl.style.strokeLinecap = '';
            pathEl.style.vectorEffect = '';
            pathEl.style.opacity = '1';
          }
        });
      }, 100);
    };

    const shouldAnimate = hasDefaultQoSFlow && dnnActivated && pathEdgesArray.length > 0;

    if (pathEdgesArray.length === 0) {
      const allEdgeIds = edges.map(edge => edge.id);
      animateEdgesPulsating(allEdgeIds, false);
    } else {
      animateEdgesPulsating(pathEdgesArray, shouldAnimate);
    }

    console.log(`5QI Pulsating Animation: ${shouldAnimate ? 'Started' : 'Stopped'} – ${p.categoryLabel}, duration=${p.animationDuration}s, width=${p.strokeWidth}px`);

    // --- Inject dynamic CSS keyframes driven by 5QI parameters ---
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-flow {
        0% {
          opacity: 0.7;
          stroke: ${p.primaryColor} !important;
          stroke-width: ${p.strokeWidth}px !important;
        }
        25% {
          opacity: 0.85;
          stroke: ${p.secondaryColor} !important;
          stroke-width: ${Math.round((p.strokeWidth + p.strokeWidthPulse) / 2)}px !important;
        }
        50% {
          opacity: 1;
          stroke: ${p.tertiaryColor} !important;
          stroke-width: ${p.strokeWidthPulse}px !important;
        }
        75% {
          opacity: 0.85;
          stroke: ${p.secondaryColor} !important;
          stroke-width: ${Math.round((p.strokeWidth + p.strokeWidthPulse) / 2)}px !important;
        }
        100% {
          opacity: 0.7;
          stroke: ${p.primaryColor} !important;
          stroke-width: ${p.strokeWidth}px !important;
        }
      }

      @keyframes pulse-glow {
        0%   { filter: drop-shadow(0 0 ${Math.round(p.glowSize * 0.4)}px ${p.glowColor}); }
        50%  { filter: drop-shadow(0 0 ${p.glowSize}px ${p.glowColor}); }
        100% { filter: drop-shadow(0 0 ${Math.round(p.glowSize * 0.4)}px ${p.glowColor}); }
      }

      .react-flow__edge.pulsating-edge path,
      .react-flow__edges .pulsating-edge path,
      .pulsating-edge path {
        stroke: ${p.primaryColor} !important;
        stroke-width: ${p.strokeWidth}px !important;
        stroke-dasharray: ${p.dashArray} !important;
        animation: pulse-flow ${p.animationDuration}s ease-in-out infinite !important;
        stroke-linecap: round !important;
        vector-effect: non-scaling-stroke !important;
      }

      .react-flow__edge.pulsating-edge,
      .react-flow__edges .pulsating-edge,
      .pulsating-edge {
        animation: pulse-glow ${p.animationDuration}s ease-in-out infinite !important;
      }

      .react-flow__edge[data-ispulsating="true"] path {
        stroke: ${p.primaryColor} !important;
        stroke-width: ${p.strokeWidth}px !important;
        stroke-dasharray: ${p.dashArray} !important;
        animation: pulse-flow ${p.animationDuration}s ease-in-out infinite !important;
        stroke-linecap: round !important;
        vector-effect: non-scaling-stroke !important;
      }

      .react-flow__viewport .pulsating-edge path {
        stroke: ${p.primaryColor} !important;
        stroke-width: ${p.strokeWidth}px !important;
        stroke-dasharray: ${p.dashArray} !important;
        animation: pulse-flow ${p.animationDuration}s ease-in-out infinite !important;
        stroke-linecap: round !important;
        vector-effect: non-scaling-stroke !important;
        opacity: 0.9 !important;
      }
    `;

    const existingStyle = document.querySelector('#pulsating-animation-styles');
    if (existingStyle) existingStyle.remove();

    style.id = 'pulsating-animation-styles';
    document.head.appendChild(style);

  }, [reactFlowInstance, data.nodeId, clearAllPulsatingAnimations, qosValues, fiveQIId]);

  // Check for pulsating animation when component mounts or when QoS Flow nodes change
  useEffect(() => {
    if (reactFlowInstance) {
      // Small delay to ensure all nodes are rendered
      setTimeout(() => checkAndTriggerPulsatingAnimation(), 500);
    }
  }, [reactFlowInstance, checkAndTriggerPulsatingAnimation]);

  // Listen for custom events from QoS Flow nodes
  useEffect(() => {
    const handleAnimationTrigger = (event: CustomEvent) => {
      if (event.detail?.nodeId === data.nodeId) {
        setTimeout(() => checkAndTriggerPulsatingAnimation(), 100);
      }
    };

    const nodeElement = document.querySelector(`[data-id="${data.nodeId}"]`);
    if (nodeElement) {
      nodeElement.addEventListener('triggerPulsatingAnimation', handleAnimationTrigger as EventListener);
      
      return () => {
        nodeElement.removeEventListener('triggerPulsatingAnimation', handleAnimationTrigger as EventListener);
      };
    }
  }, [data.nodeId, checkAndTriggerPulsatingAnimation]);

  // Periodically check for animation conditions (as a fallback)
  useEffect(() => {
    if (reactFlowInstance) {
      const interval = setInterval(() => {
        checkAndTriggerPulsatingAnimation();
      }, 2000); // Check every 2 seconds

      return () => clearInterval(interval);
    }
  }, [reactFlowInstance, checkAndTriggerPulsatingAnimation]);
  
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
      
      {/* Display QoS parameters with visual indicators */}
      <div className="mt-4 text-xl bg-white/70 p-3 rounded shadow-sm">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
          <span className="font-semibold text-gray-900">Type:</span>
          <span className={`font-medium ${displayValues.resourceType === 'GBR' ? 'text-blue-700' : 'text-purple-700'}`}>
            {displayValues.resourceType}
          </span>

          <span className="font-semibold text-gray-900">Priority:</span>
          <span className="text-gray-900">{displayValues.priority}</span>

          <span className="font-semibold text-gray-900">Delay:</span>
          <span className="text-gray-900">{displayValues.packetDelay}</span>
        </div>

        {/* Visual throughput / latency indicators */}
        {(() => {
          const ap = getAnimationParamsFromQoS(displayValues);
          const delayMs = parseInt(displayValues.packetDelay) || 100;
          // Latency bar: lower delay → more filled (inverted)
          const latencyPct = Math.max(5, Math.min(100, Math.round(100 - (delayMs / 5))));
          // Throughput bar: GBR with low priority → high throughput
          const pri = parseInt(displayValues.priority) || 50;
          const throughputPct = Math.max(10, Math.min(100, Math.round(100 - pri)));
          return (
            <div className="col-span-2 mt-2 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-600 w-[70px]">Latency</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${latencyPct}%`, backgroundColor: ap.primaryColor }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-[45px] text-right">{displayValues.packetDelay}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-600 w-[70px]">Throughput</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${throughputPct}%`, backgroundColor: ap.primaryColor }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-[45px] text-right">P{displayValues.priority}</span>
              </div>
              <div className="text-center mt-1">
                <span
                  className="inline-block text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: ap.primaryColor }}
                >
                  {ap.categoryLabel}
                </span>
              </div>
            </div>
          );
        })()}
      </div>


      

          </div>

    </div>
  );
});

export default FiveQiNode;


