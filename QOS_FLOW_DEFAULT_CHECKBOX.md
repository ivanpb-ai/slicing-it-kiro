# QoS Flow Default Checkbox Implementation

## Summary
Moved the "Default" checkbox from 5QI nodes to QoS Flow nodes as requested by the user.

## Changes Made

### 1. Removed Default Checkbox from 5QI Node (`client/src/components/nodes/FiveQiNode.tsx`)
- Removed `isDefault` state variable
- Removed `handleDefaultChange` function
- Removed default checkbox UI elements
- Updated pulsating animation logic to check for default QoS Flow nodes instead of 5QI default state

### 2. Enhanced QoS Flow Node (`client/src/components/nodes/QoSFlowNode.tsx`)
- Added React Flow instance import and usage
- Added `triggerPulsatingAnimation` function to communicate with connected 5QI nodes
- Enhanced `handleDefaultChange` to trigger pulsating animation when checkbox is checked
- Added effects to sync state and trigger animation on mount

### 3. Updated Animation Logic
- **Previous**: Animation triggered when both DNN "Activate" and 5QI "Default" checkboxes were checked
- **Current**: Animation triggered when both DNN "Activate" and QoS Flow "Default" checkboxes are checked
- The 5QI node now checks for connected QoS Flow nodes with `isDefault: true` before starting animation
- Animation traverses the full path from QoS Flow → 5QI → S-NSSAI → DNN → Network

## How It Works

1. **QoS Flow Node**: When the "Default" checkbox is checked:
   - Updates node data with `isDefault: true`
   - Triggers `triggerPulsatingAnimation()` function
   - Dispatches custom events to connected 5QI nodes

2. **5QI Node**: 
   - Listens for custom events from QoS Flow nodes
   - Checks if any connected QoS Flow nodes have `isDefault: true`
   - Verifies that parent DNN nodes have `dnnActive: true`
   - If both conditions are met, starts pulsating animation on all edges in the path to network

3. **Animation Path**: QoS Flow (default) → 5QI → S-NSSAI → DNN (activated) → Network

## Animation Features
- Zoom-independent styling using `vector-effect: non-scaling-stroke`
- Color progression: Orange → Bright Orange → Red-Orange
- Width pulsing: 5px → 9px
- 1.2-second animation cycle
- Traverses ALL paths including multiple S-NSSAI branches

## Usage
1. Create a graph with: Network → DNN → S-NSSAI → 5QI → QoS Flow
2. Check the "Activate" checkbox on the DNN node
3. Check the "Default" checkbox on the QoS Flow node
4. Observe pulsating animation from QoS Flow all the way to Network node

## Status: ✅ COMPLETED
The default checkbox has been successfully moved from 5QI nodes to QoS Flow nodes with full pulsating animation functionality.