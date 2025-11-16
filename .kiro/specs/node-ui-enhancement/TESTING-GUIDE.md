# Node UI Enhancement - Visual Testing Guide

## Overview

This guide provides step-by-step instructions for testing the node UI enhancements. All previous implementation tasks (1-6) have been completed, and this testing phase verifies that all requirements have been met.

## Prerequisites

1. Development server is running (`npm run dev`)
2. Browser DevTools are available (Chrome/Edge recommended for best contrast checking tools)
3. Test graph file is available: `attached_assets/ui-enhancement-test-graph.json`

## Quick Start

### Step 1: Load the Test Graph

1. Open the application in your browser
2. Click the **Import** button in the toolbar (or File menu)
3. Navigate to and select: `attached_assets/ui-enhancement-test-graph.json`
4. The graph will load with 20 nodes representing all 8 node types

### Step 2: Initial Visual Inspection

Take a moment to observe the overall appearance:
- Nodes should appear larger and more prominent than before
- Text should be immediately readable without zooming
- Colors should be richer and more saturated
- Shadows should create visible depth
- The graph should look modern and professional

### Step 3: Follow the Testing Checklist

Open `.kiro/specs/node-ui-enhancement/visual-testing-checklist.md` and work through each section systematically.

## Detailed Testing Instructions

### Typography Testing (Task 7.2)

**Objective**: Verify all text is readable and meets size requirements

#### Visual Check
1. **At 100% zoom**: Read text in each node type
   - Headers should be large and bold
   - Body text should be comfortable to read
   - No text should appear small or strained

2. **At 80% zoom** (Ctrl/Cmd + Minus):
   - Text should still be readable
   - Headers should remain clear
   - Body text should not be too small

3. **At 120% zoom** (Ctrl/Cmd + Plus):
   - Text should scale appropriately
   - No layout breaking or overflow

#### DevTools Verification
For each node type, verify font sizes:

1. Right-click on header text → **Inspect**
2. In **Computed** tab, find `font-size`
3. Verify:
   - Headers: **18px** (text-lg)
   - Body text: **16px** (text-base)
   - 5QI badge: **20px** (text-xl)

**Example nodes to check**:
- Network node header
- Cell Area long description
- RRP extended name
- DNN custom name input
- 5QI service description
- QoS Flow parameters

### Spacing and Layout Testing (Task 7.3)

**Objective**: Verify adequate spacing and no overlaps

#### Auto-Arrange Test
1. Click the **Arrange** button in the toolbar
2. Observe the layout:
   - No nodes should overlap
   - Spacing should feel balanced
   - Hierarchy should be clear (top to bottom)

#### Spacing Measurements
Use DevTools to verify padding:

1. Right-click on a node → **Inspect**
2. In **Computed** tab, check:
   - Node padding: **20-24px**
   - Header padding: **16px horizontal, 12px vertical**
   - Content spacing: **12-16px** between elements

#### Content Fit Check
Verify these specific nodes:
- **Cell Area 1**: Long description should wrap without truncation
- **RRP 1**: Extended name "Premium Resource Profile with Extended Name" should display fully
- **DNN 1**: Very long custom name should wrap properly
- **5QI 1**: Long service description should wrap and remain readable

### Visual Depth Testing (Task 7.4)

**Objective**: Verify shadows, hover states, and selection states

#### Shadow Verification
1. Look at nodes from a slight angle or adjust monitor brightness
2. All nodes should have visible shadows creating depth
3. Shadows should be subtle but noticeable

#### Hover State Test
For each node type:
1. Move mouse over the node
2. Observe:
   - Shadow should intensify
   - Node should appear to lift slightly
   - Transition should be smooth (not instant)
3. Move mouse away - node should return to normal state

#### Selection State Test
1. Click on different nodes to select them
2. Selected nodes should have:
   - Enhanced shadow
   - Visible ring or border enhancement
   - Clear visual distinction from unselected nodes
3. Try selecting multiple nodes (Ctrl/Cmd + Click)
4. All selected nodes should show selection state

#### Border Check
1. Inspect node borders - should be clearly visible
2. Borders should be **3px wide** (border-3)
3. Selected nodes may have **4px borders** or enhanced styling

### Color Contrast Testing (Task 7.5)

**Objective**: Verify WCAG AA compliance (4.5:1 for normal text)

#### Using Chrome/Edge DevTools
1. Right-click on text → **Inspect**
2. In **Styles** tab, find the `color` property
3. Click the **color swatch** (colored square)
4. Color picker opens showing contrast ratio
5. Verify ratio is **≥ 4.5:1** (or ≥ 3:1 for large text ≥18px)

#### Header Text Checks
Test white text on -300 backgrounds:
- Network header (indigo-300)
- Cell Area header (blue-300)
- RRP header (green-300)
- RRP Member header (teal-300)
- S-NSSAI header (violet-300)
- DNN header (orange-300)
- 5QI header (purple-300)
- QoS Flow header (cyan-300)

All should show **≥ 4.5:1** contrast ratio.

#### Body Text Checks
Test gray-900 text on -200 backgrounds:
- Check body text in each node type
- All should show **≥ 4.5:1** contrast ratio

#### Alternative: Online Contrast Checker
If DevTools contrast checker is not available:
1. Use https://webaim.org/resources/contrastchecker/
2. Get background color from DevTools (e.g., `#c7d2fe` for indigo-200)
3. Get text color (e.g., `#111827` for gray-900)
4. Enter both colors and verify ratio

### Handle Usability Testing (Task 7.6)

**Objective**: Verify connection handles are visible and easy to use

#### Visual Check
1. Zoom to 100%
2. Look at connection handles on nodes
3. Handles should be:
   - Clearly visible (16px diameter)
   - Have visible borders (3px)
   - Have subtle shadows

#### Interaction Test
1. Try clicking on handles - should be easy to target
2. Try dragging from a handle to create a connection
3. Handles should be easy to grab (not too small)

#### Hover Test
1. Hover over handles on different nodes
2. Handles should:
   - Increase in size (to 20px)
   - Show enhanced shadow
   - Provide immediate visual feedback

#### Connection Creation
1. Create a new connection between two nodes
2. Verify:
   - Handle targeting is precise
   - Connection snaps to handle correctly
   - Visual feedback is clear during dragging

## Common Issues and Solutions

### Issue: Text appears too small
- **Check**: Browser zoom level (should be 100%)
- **Check**: Font size in DevTools (should be 16px minimum)
- **Solution**: If sizes are correct but appear small, may need to adjust monitor display scaling

### Issue: Nodes overlap after arrange
- **Check**: Spacing constants in `client/src/utils/flowData/layouts/constants.ts`
- **Expected**: VERTICAL_SPACING = 200, HORIZONTAL_SPACING = 240
- **Solution**: Re-run arrange after verifying constants

### Issue: Contrast ratio fails
- **Check**: Actual color values in DevTools
- **Expected**: Headers use -300 variants, body uses -200 variants
- **Solution**: Verify color classes in node components

### Issue: Shadows not visible
- **Check**: Monitor brightness and viewing angle
- **Check**: CSS in `.node-wrapper` class in `client/src/index.css`
- **Expected**: Multi-layered box-shadow with rgba values
- **Solution**: Adjust monitor or verify CSS

### Issue: Hover states not working
- **Check**: CSS transitions in `client/src/index.css`
- **Check**: Browser console for errors
- **Solution**: Verify hover pseudo-class styles are present

## Reporting Results

### Document Findings
Use the checklist in `visual-testing-checklist.md` to:
1. Check off completed items
2. Document any issues found
3. Note any recommendations for improvements

### Pass Criteria
All tests should pass with:
- ✅ All text readable at 100% and 80% zoom
- ✅ Font sizes meet minimum requirements (16px body, 18px headers)
- ✅ No node overlaps after auto-arrange
- ✅ All spacing requirements met
- ✅ Shadows visible and hover states working
- ✅ All contrast ratios ≥ 4.5:1 (WCAG AA)
- ✅ Handles visible and easy to use

### Minor Issues Acceptable
- Slight variations in spacing (±2px)
- Contrast ratios slightly below 4.5:1 but above 4.0:1 (still readable)
- Minor visual glitches that don't affect usability

### Fail Criteria
- Text too small to read comfortably
- Nodes overlapping significantly
- Contrast ratios below 3.0:1
- Hover states not working
- Handles difficult to target

## Next Steps

After completing all tests:

1. **If all tests pass**: Mark task 7 as complete and document success
2. **If minor issues found**: Document issues and create follow-up tasks if needed
3. **If major issues found**: Review implementation and fix issues before proceeding

## Additional Resources

- **WCAG Contrast Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- **Chrome DevTools Contrast Checker**: https://developer.chrome.com/docs/devtools/accessibility/contrast/
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Tailwind CSS Color Reference**: https://tailwindcss.com/docs/customizing-colors

## Questions or Issues?

If you encounter any issues during testing or have questions about the requirements, refer to:
- **Requirements**: `.kiro/specs/node-ui-enhancement/requirements.md`
- **Design Document**: `.kiro/specs/node-ui-enhancement/design.md`
- **Implementation Tasks**: `.kiro/specs/node-ui-enhancement/tasks.md`
