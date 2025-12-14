# 5QI Default Checkbox Implementation

## Feature
Added a "Default" checkbox to 5QI nodes to mark which 5QI should be used as the default for flow processing.

## Implementation

### File: `client/src/components/nodes/FiveQiNode.tsx`

#### 1. Added State Management
```typescript
const [isDefault, setIsDefault] = useState(data.fiveQiDefault !== undefined ? data.fiveQiDefault : false);
```
- Defaults to `false` if not specified
- Syncs with `data.fiveQiDefault` property

#### 2. Added Change Handler
```typescript
const handleDefaultChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.checked;
  setIsDefault(newValue);
  updateNodeData(data.nodeId || '', { ...data, fiveQiDefault: newValue });
}, [data, updateNodeData]);
```
- Updates local state
- Persists to node data via `updateNodeData`

#### 3. Added Sync Effect
```typescript
useEffect(() => {
  if (data.fiveQiDefault !== undefined && data.fiveQiDefault !== isDefault) {
    setIsDefault(data.fiveQiDefault);
  }
}, [data.fiveQiDefault, isDefault]);
```
- Ensures state stays in sync with data prop changes

#### 4. Added UI Component
```tsx
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
```

## Features

- ✅ Checkbox appears below the QoS parameters grid
- ✅ State persists when node is updated
- ✅ Defaults to unchecked for new nodes
- ✅ Syncs with data prop changes
- ✅ Accessible with proper label association
- ✅ Styled consistently with DNN activate checkbox

## Data Structure

The default state is stored in the node's data object as:
```typescript
{
  ...nodeData,
  fiveQiDefault: boolean  // true = default 5QI, false = not default
}
```

## Use Cases

1. **Flow Processing** - Mark which 5QI should be used as the default when processing network flows
2. **Configuration Management** - Identify the primary 5QI in a QoS Flow configuration
3. **Network Planning** - Designate the standard 5QI for specific service types
4. **Flow Animation** - Could be used to determine which 5QI triggers flow animations

## Visual Placement

The checkbox appears at the bottom of the 5QI node, below the QoS parameters grid:
- 5QI Badge (purple)
- Service Description
- QoS Parameters Grid (Type, Priority, Delay)
- **Default Checkbox** ← New addition

## Build Status
✅ Build successful - no errors or warnings

## Testing

To test the default checkbox:
1. Create or load a 5QI node
2. The "Default" checkbox should appear at the bottom of the node
3. Toggle the checkbox - state should persist
4. Save and reload the graph - checkbox state should be preserved
5. Multiple 5QI nodes can have different default states

## Future Enhancements

Potential future features that could use this default flag:
- Auto-select default 5QI when creating QoS Flows
- Highlight default 5QI nodes with special styling
- Use default 5QI for flow animation starting points
- Export/import default 5QI configurations