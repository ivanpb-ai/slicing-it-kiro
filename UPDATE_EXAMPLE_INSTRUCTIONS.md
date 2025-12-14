# Update Example Graph Instructions

## Method 1: Using the Developer Button (Recommended)

1. **Load the desired graph**: Make sure "large-graph1" is currently loaded on the canvas
2. **Find the developer button**: Look for the "🔧 Update Example Graph" button in the save/load menu (only visible in development mode)
3. **Click the button**: This will generate the new example graph content and copy it to clipboard
4. **Replace the content**: Paste the generated content into `client/src/data/exampleGraph.ts`

## Method 2: Using Browser Console

1. **Load the desired graph**: Make sure "large-graph1" is currently loaded on the canvas
2. **Open browser console**: Press F12 and go to Console tab
3. **Run the command**: 
   ```javascript
   // If the graph is currently on canvas:
   updateExampleGraphFromCurrent(window.reactFlowInstance.getNodes(), window.reactFlowInstance.getEdges())
   
   // OR if you want to load from localStorage:
   updateExampleGraphFromSaved('large-graph1')
   ```
4. **Copy the output**: The console will show the new example graph content
5. **Replace the content**: Paste it into `client/src/data/exampleGraph.ts`

## Method 3: Manual Process

1. **Load "large-graph1"** on the canvas
2. **Export the graph** using the Export JSON button
3. **Open the exported JSON file**
4. **Copy the nodes and edges arrays**
5. **Replace the content** in `client/src/data/exampleGraph.ts` with this format:

```typescript
export const EXAMPLE_GRAPH = {
"nodes": [/* paste nodes array here */],
"edges": [/* paste edges array here */],
"timestamp": /* current timestamp */
};
```

## What This Does

- Sets the current graph as the default example that appears when users click the "Example" button
- The example graph will be automatically arranged when loaded
- Users will see this graph as a starting point or demonstration

## Files Modified

- `client/src/data/exampleGraph.ts` - Contains the example graph data
- `client/src/utils/updateExampleGraph.ts` - Utility functions (created)
- `client/src/components/dev/UpdateExampleGraphButton.tsx` - Developer button (created)
- `client/src/components/saveLoad/SaveLoadMenu.tsx` - Added developer button
- `client/src/App.tsx` - Imported utility functions

## Note

The developer button only appears in development mode (`NODE_ENV === 'development'`) to avoid confusion in production.