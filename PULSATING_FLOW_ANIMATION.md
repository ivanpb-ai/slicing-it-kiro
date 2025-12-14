# Pulsating Flow Animation System

## Feature Overview
Implemented a sophisticated pulsating animation that flows from default 5QI nodes up to the network node when both conditions are met:
1. **DNN node is activated** (checkbox checked)
2. **5QI node is marked as default** (checkbox checked)

## How It Works

### Trigger Conditions
The pulsating animation only activates when **BOTH** conditions are true:
- ✅ A 5QI node has its "Default" checkbox checked
- ✅ The parent DNN node in the hierarchy has its "Activate" checkbox checked

### Animation Flow
1. **Path Discovery**: Traverses from 5QI node up through the hierarchy
   - 5QI → QoS Flow → DNN → S-NSSAI → Network
2. **DNN Validation**: Checks if the DNN in the path is activated
3. **Visual Animation**: Creates pulsating effect on all edges in the path

## Implementation Details

### File: `client/src/components/nodes/FiveQiNode.tsx`

#### 1. Animation Logic
```typescript
const checkAndTriggerPulsatingAnimation = useCallback(() => {
  // Only animate if this 5QI is marked as default
  if (!reactFlowInstance || !isDefault) return;
  
  // Traverse hierarchy to find path to network
  // Check if parent DNN is activated
  // Apply pulsating animation to entire path
}, [reactFlowInstance, isDefault, data.nodeId]);
```

#### 2. Hierarchy Traversal
- Starts from the 5QI node
- Follows outgoing edges up the hierarchy
- Validates that parent DNN is activated
- Collects all edge IDs in the path

#### 3. Visual Effects
```typescript
// Pulsating edge styling
{
  animated: true,
  stroke: '#f59e0b',        // Orange color
  strokeWidth: 5,           // Thicker edges
  strokeDasharray: '10,5',  // Dashed pattern
  className: 'pulsating-edge'
}
```

#### 4. CSS Animation
```css
@keyframes pulse-flow {
  0% { opacity: 0.6; stroke-width: 3px; }
  50% { opacity: 1; stroke-width: 6px; }
  100% { opacity: 0.6; stroke-width: 3px; }
}

.pulsating-edge {
  animation: pulse-flow 2s ease-in-out infinite;
}
```

## Visual Behavior

### When Animation Triggers:
- **Color**: Edges turn orange (#f59e0b)
- **Width**: Edges become thicker (5px → 6px pulsing)
- **Pattern**: Dashed lines (10px dash, 5px gap)
- **Animation**: Smooth pulsing effect (2-second cycle)
- **Opacity**: Pulses between 60% and 100%

### Animation Path:
```
[5QI Default ✓] 
    ↓ (pulsating orange)
[QoS Flow]
    ↓ (pulsating orange)
[DNN Activated ✓]
    ↓ (pulsating orange)
[S-NSSAI]
    ↓ (pulsating orange)
[Network]
```

## Trigger Events

### 1. Checkbox Changes
- When 5QI "Default" checkbox is checked → triggers animation check
- When DNN "Activate" checkbox is checked → enables animation for connected default 5QIs

### 2. Component Mount
- When 5QI node loads with default=true → checks for animation conditions
- 500ms delay ensures all nodes are rendered before animation starts

### 3. Data Sync
- When node data changes → re-evaluates animation conditions

## Smart Validation

### DNN Activation Check
```typescript
if (currentNode.data?.type === 'dnn' && !currentNode.data?.dnnActive) {
  console.log('Parent DNN not activated, skipping animation');
  return; // No animation if DNN not activated
}
```

### Path Validation
- Only animates complete paths from 5QI to network
- Stops animation if any required node is missing
- Prevents infinite loops with visited node tracking

## Use Cases

1. **Network Traffic Visualization**: Shows active data flows in real-time
2. **Configuration Validation**: Visual confirmation that default 5QIs are properly connected to activated DNNs
3. **Network Planning**: Helps identify which paths will carry default traffic
4. **Troubleshooting**: Quickly see if default flows are properly configured

## Performance Considerations

- **Efficient Path Finding**: Uses Set for visited nodes to prevent loops
- **Conditional Animation**: Only runs when both conditions are met
- **CSS Animations**: Uses hardware-accelerated CSS for smooth performance
- **Single Style Injection**: Reuses CSS styles across multiple animations

## Build Status
✅ Build successful - no errors or warnings

## Testing Scenarios

### Scenario 1: Full Animation
1. Create hierarchy: Network → S-NSSAI → DNN → QoS Flow → 5QI
2. Check DNN "Activate" checkbox ✅
3. Check 5QI "Default" checkbox ✅
4. **Result**: Pulsating orange animation from 5QI to Network

### Scenario 2: No Animation (DNN Not Activated)
1. Same hierarchy as above
2. DNN "Activate" checkbox unchecked ❌
3. Check 5QI "Default" checkbox ✅
4. **Result**: No animation (DNN validation fails)

### Scenario 3: No Animation (5QI Not Default)
1. Same hierarchy as above
2. Check DNN "Activate" checkbox ✅
3. 5QI "Default" checkbox unchecked ❌
4. **Result**: No animation (5QI not marked as default)

### Scenario 4: Multiple Default 5QIs
1. Multiple 5QI nodes connected to same activated DNN
2. Mark multiple 5QIs as default ✅
3. **Result**: Multiple pulsating paths from different 5QIs to network

## Future Enhancements

Potential improvements:
- **Staggered Animation**: Delay animation start for multiple 5QIs
- **Color Coding**: Different colors for different service types
- **Speed Control**: Variable animation speed based on priority
- **Traffic Volume**: Thicker pulses for higher priority 5QIs