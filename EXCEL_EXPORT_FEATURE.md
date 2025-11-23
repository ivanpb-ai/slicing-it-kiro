# Excel Export Feature

## Overview
The Excel export feature allows users to export their graph data (nodes and edges) to an Excel (.xlsx) file with comprehensive data in a structured format.

## Implementation Details

### Files Modified/Created

1. **`client/src/utils/excelExport.ts`** (NEW)
   - Core export function using the `xlsx` library
   - Exports two worksheets: Nodes and Edges
   - Handles all node types and their specific properties

2. **`client/src/components/NodeEditor.tsx`** (MODIFIED)
   - Added `handleExportToExcel` function
   - Uses dynamic import to avoid bundling xlsx in main bundle
   - Integrated with ReactFlow instance for data access
   - Passes handler to FlowInstance component

3. **`client/src/components/flow/FlowInstance.tsx`** (ALREADY CONFIGURED)
   - Accepts `onExportToExcel` prop
   - Passes it to EditorPanels component

4. **`client/src/components/flow/EditorPanels.tsx`** (ALREADY CONFIGURED)
   - Accepts `onExportToExcel` prop
   - Passes it to SaveLoadMenu component

5. **`client/src/components/saveLoad/SaveLoadMenu.tsx`** (ALREADY CONFIGURED)
   - Displays Excel export button (📊 icon)
   - Conditionally renders when `onExportToExcel` is provided

## Excel File Structure

### Nodes Worksheet
Contains the following columns:
- Node ID
- Type
- Label
- Position X
- Position Y
- Width
- Height
- Network
- Cell Area
- RRP
- RRP Member
- PLMN
- S-NSSAI
- SD
- SST
- DNN
- DNN Name
- QoS Flow
- 5QI
- Description

### Edges Worksheet
Contains the following columns:
- Edge ID
- Source
- Target
- Source Handle
- Target Handle
- Type

## Usage

1. Create or load a graph with nodes and edges
2. Click the **📊 Export Excel** button in the top-right menu
3. The Excel file will automatically download with a timestamped filename

## Technical Features

- **Dynamic Import**: The xlsx library is loaded on-demand to keep the main bundle small
- **Code Splitting**: Build output shows xlsx is in a separate chunk (~284 KB)
- **Error Handling**: Comprehensive error handling with user-friendly toast messages
- **Type Safety**: Full TypeScript support with proper typing
- **Automatic Filename**: Generates filename with timestamp (e.g., `graph_export_1732377600000.xlsx`)

## Dependencies

- `xlsx@0.18.5` - Already installed in package.json

## Build Output

The feature successfully builds with code splitting:
```
../dist/public/assets/excelExport-Bgb3pXsa.js  284.43 kB │ gzip:  95.72 kB
../dist/public/assets/index-C-EoV05S.js        705.34 kB │ gzip: 216.88 kB
```

## Status

✅ **COMPLETE** - All components are wired up and the feature is ready to use.
