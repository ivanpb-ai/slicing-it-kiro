# DNN Activate Checkbox with Flow Animation

## Issue
The activate checkbox had disappeared from DNN nodes, and there was no visual feedback showing the flow path when a DNN is activated.

## Solution
Restored the activate checkbox to the DNN node component with full state management AND implemented animated flow visualization that shows the entire path from 5QI nodes up to the network node.

## Changes Made

### File: `client/src/components/nodes/DnnNode.tsx`

#### 1. Added State Management
```typescript
const [isActive, setIsActive] = useState(data.dnnActive !== undefined ? data.dnnActive : true);
const reactFlowInstance = useReactFlow();
```
- Defaults to `true` if not specified
- Syncs with `data.dnnActive` property
- Access to ReactFlow instance for edge manipulation

#### 2. Added Flow Animation Logic
```typescript
const animateFlowPath = useCallback((nodeId: string, shouldAnimate: boolean) => {
  // Traverses the entire graph hierarchy
  // Finds all connected edges (5QI → QoS Flow → DNN → S-NSSAI → Network)
  // Animates edges with green color and increased width
  // Updates edge animation state
}, [reactFlowInstance]);
```

**How it works:**
- Starts from the DNN node
- Traverses both up and down the hierarchy
- Finds all connected edges in the path
- Animates edges when activated (green, thicker, animated)
- Deanimates when deactivated (blue, normal width, static)

#### 3. Enhanced Change Handler
```typescript
const handleActiveChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.checked;
  setIsActive(newValue);
  
  // Trigger flow animation
  animateFlowPath(data.nodeId || '', newValue);
  
  // Persist state
  updateNodeData(data.nodeId || '', { ...data, dnnActive: newValue });
}, [data, updateNodeData, animateFlowPath]);
```

#### 4. Added Sync Effect
```typescript
// Sync isActive state when data changes
if (data.dnnActive !== undefined && data.dnnActive !== isActive) {
  setIsActive(data.dnnActive);
}
```

#### 5. Added UI Component
```tsx
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
```

## Features

### Checkbox Features:
- ✅ Checkbox appears below the "Drag QoS Flow nodes" text
- ✅ State persists when node is updated
- ✅ Defaults to checked (active) for new nodes
- ✅ Syncs with data prop changes
- ✅ Accessible with proper label association
- ✅ Styled consistently with the rest of the UI

### Animation Features:
- ✅ **Animated Flow Path** - Shows moving dashes along edges when activated
- ✅ **Color Change** - Edges turn green (#10b981) when activated, blue (#2563eb) when deactivated
- ✅ **Width Change** - Edges become thicker (4px) when activated, normal (3px) when deactivated
- ✅ **Full Path Traversal** - Animates ALL connected edges from 5QI nodes up to the network node
- ✅ **Bidirectional** - Finds edges both upstream and downstream from the DNN
- ✅ **Real-time** - Animation triggers immediately when checkbox is toggled

## Visual Behavior

**When Activated (Checked):**
- All edges in the flow path animate with moving dashes
- Edges turn green and become thicker
- Shows the complete data flow from 5QI → QoS Flow → DNN → S-NSSAI → Network

**When Deactivated (Unchecked):**
- Animation stops
- Edges return to blue color
- Edges return to normal width

## Data Structure

The activate state is stored in the node's data object as:
```typescript
{
  ...nodeData,
  dnnActive: boolean  // true = activated, false = deactivated
}
```

## Build Status
✅ Build successful - no errors or warnings

## Testing

To test the feature:
1. Create a complete flow: Network → Cell Area → RRP → S-NSSAI → DNN → QoS Flow → 5QI
2. Check the "Activate" checkbox on a DNN node
3. ✅ All edges in the path should animate with green color
4. Uncheck the "Activate" checkbox
5. ✅ Animation should stop and edges return to blue
6. Save and reload the graph
7. ✅ Checkbox state and animation should be preserved
