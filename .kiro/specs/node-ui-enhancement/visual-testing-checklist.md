# Visual Testing and Verification Checklist

## Test Graph Information

**Test Graph File**: `attached_assets/ui-enhancement-test-graph.json`

This test graph contains all 8 node types with comprehensive test data:
- 1 Network node
- 2 Cell Area nodes (one with long description text)
- 2 RRP nodes (one with extended name and multiple bands)
- 3 RRP Member nodes
- 3 S-NSSAI nodes (with various SD values including max length)
- 3 DNN nodes (including very long custom name)
- 3 5QI nodes (with varying service descriptions, including very long text)
- 3 QoS Flow nodes

Total: 20 nodes with 18 edges forming a complete hierarchy

## How to Import Test Graph

1. Open the application
2. Click the "Import" button in the toolbar
3. Select the file: `attached_assets/ui-enhancement-test-graph.json`
4. The graph will load with all node types displayed

## Testing Checklist

### ✅ Task 7.1: Test Graph Creation
- [x] Created comprehensive test graph with all 8 node types
- [x] Added sample content with varying text lengths
- [x] Included maximum content length scenarios
- [x] Graph saved to `attached_assets/ui-enhancement-test-graph.json`

### Task 7.2: Typography Improvements Verification

**Requirements**: 1.1, 1.2, 1.3, 1.4

#### At 100% Zoom
- [ ] All header text is clearly readable (should be 18px / text-lg)
- [ ] All body text is clearly readable (should be 16px / text-base)
- [ ] All helper text is clearly readable (should be 16px / text-base)
- [ ] Font weights are appropriately bold (headers: font-bold, labels: font-semibold)

#### At 80% Zoom
- [ ] Header text remains readable
- [ ] Body text remains readable
- [ ] No text appears too small or strained

#### Font Size Verification (Use Browser DevTools)
- [ ] Network node header: 18px (text-lg)
- [ ] Cell Area node header: 18px (text-lg)
- [ ] RRP node header: 18px (text-lg)
- [ ] RRP Member node header: 18px (text-lg)
- [ ] S-NSSAI node header: 18px (text-lg)
- [ ] DNN node header: 18px (text-lg)
- [ ] 5QI node header: 18px (text-lg)
- [ ] 5QI badge text: 20px (text-xl)
- [ ] QoS Flow node header: 18px (text-lg)
- [ ] All body text: minimum 16px (text-base)

#### Specific Node Checks
- [ ] **Network Node**: Header and description text are large and clear
- [ ] **Cell Area Node**: Long description text wraps properly and is readable
- [ ] **RRP Node**: Extended name, band information, and percentage display clearly
- [ ] **RRP Member Node**: PLMN value is clearly visible
- [ ] **S-NSSAI Node**: SD and SST labels and values are readable
- [ ] **DNN Node**: Long custom name wraps properly and input field text is large
- [ ] **5QI Node**: Badge number is prominent, service description is readable, QoS parameters are clear
- [ ] **QoS Flow Node**: QFI, GFBR, and MFBR values are clearly displayed

### Task 7.3: Spacing and Layout Verification

**Requirements**: 2.1, 2.2, 2.3, 2.4, 5.1, 5.3, 5.4

#### After Auto-Arrange
- [ ] Click the "Arrange" button
- [ ] No nodes overlap after arrangement
- [ ] Vertical spacing between levels is adequate (200px default)
- [ ] Horizontal spacing between siblings is adequate (240px)
- [ ] Graph layout appears balanced and professional

#### Node Spacing
- [ ] All nodes have adequate internal padding (20-24px)
- [ ] Headers have proper padding (16px horizontal, 12px vertical)
- [ ] Content elements have proper spacing (12-16px between elements)
- [ ] No text is cramped or touching borders

#### Content Fit
- [ ] Long text in Cell Area node fits without truncation
- [ ] Extended RRP name displays completely
- [ ] Long DNN custom name wraps properly
- [ ] Long 5QI service description wraps properly
- [ ] All content is contained within node boundaries

#### Node Widths (Use Browser DevTools to measure)
- [ ] Network: 240px minimum
- [ ] Cell Area: 200px minimum
- [ ] RRP: 240px minimum (scales with percentage)
- [ ] RRP Member: 180px minimum
- [ ] S-NSSAI: 220px minimum
- [ ] DNN: 240px minimum
- [ ] 5QI: 220px minimum
- [ ] QoS Flow: 200px minimum

### Task 7.4: Visual Depth and Prominence Verification

**Requirements**: 3.1, 3.2, 3.3, 3.5

#### Shadow Effects
- [ ] All nodes have visible base shadow creating depth
- [ ] Shadows are subtle but noticeable
- [ ] Shadow creates clear elevation from canvas

#### Hover States
- [ ] Hover over each node type
- [ ] Shadow intensifies on hover
- [ ] Node appears to lift slightly (2px translateY)
- [ ] Transition is smooth (0.2s)
- [ ] Hover feedback is immediate and clear

#### Selection States
- [ ] Click to select each node type
- [ ] Selected nodes have enhanced shadow
- [ ] Selected nodes have visible ring/border enhancement
- [ ] Selection state is visually distinct from unselected
- [ ] Multiple selections are clearly indicated

#### Border Prominence
- [ ] All nodes have 3px borders (border-3)
- [ ] Borders are clearly visible
- [ ] Border colors match node type color scheme
- [ ] Selected nodes have 4px borders or enhanced border styling

#### Shape Clarity (Custom Shapes)
- [ ] Network node (hexagon) maintains clear shape
- [ ] Cell Area node (diamond) maintains clear shape
- [ ] RRP node (pentagon) maintains clear shape
- [ ] 5QI node (octagon) maintains clear shape
- [ ] All custom shapes have consistent visual weight

### Task 7.5: Color Contrast Verification

**Requirements**: 4.1, 4.2, 4.3, 4.4, 4.5

#### WCAG AA Compliance (Use Contrast Checker Tool)
Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text (≥18px)

#### Header Text on -300 Backgrounds
- [ ] Network header (white on indigo-300): ≥ 4.5:1
- [ ] Cell Area header (white on blue-300): ≥ 4.5:1
- [ ] RRP header (white on green-300): ≥ 4.5:1
- [ ] RRP Member header (white on teal-300): ≥ 4.5:1
- [ ] S-NSSAI header (white on violet-300): ≥ 4.5:1
- [ ] DNN header (white on orange-300): ≥ 4.5:1
- [ ] 5QI header (white on purple-300): ≥ 4.5:1
- [ ] QoS Flow header (white on cyan-300): ≥ 4.5:1

#### Body Text on -200 Backgrounds
- [ ] Network body (gray-900 on indigo-200): ≥ 4.5:1
- [ ] Cell Area body (gray-900 on blue-200): ≥ 4.5:1
- [ ] RRP body (gray-900 on green-200): ≥ 4.5:1
- [ ] RRP Member body (gray-900 on teal-200): ≥ 4.5:1
- [ ] S-NSSAI body (gray-900 on violet-200): ≥ 4.5:1
- [ ] DNN body (gray-900 on orange-200): ≥ 4.5:1
- [ ] 5QI body (gray-900 on purple-200): ≥ 4.5:1
- [ ] QoS Flow body (gray-900 on cyan-200): ≥ 4.5:1

#### Helper Text
- [ ] All helper text (gray-800) has adequate contrast
- [ ] Helper text is distinguishable from body text
- [ ] Information hierarchy is clear

#### Badge and Accent Colors
- [ ] 5QI badge (white text on purple-500): ≥ 4.5:1
- [ ] All colored text elements meet contrast requirements
- [ ] Status indicators are clearly visible

#### Visual Distinction
- [ ] All 8 node types are visually distinct by color
- [ ] Color brightness is consistent across node types
- [ ] No colors are overly saturated or harsh

### Task 7.6: Handle Usability Verification

**Requirements**: 3.4

#### Handle Visibility
- [ ] All connection handles are clearly visible
- [ ] Handles are 16px diameter (w-4 h-4)
- [ ] Handle borders are 3px wide
- [ ] Handles have visible shadows for depth

#### Handle Interaction
- [ ] Handles are easy to click (16px target size)
- [ ] Handles are easy to drag for creating connections
- [ ] No difficulty targeting handles

#### Hover States
- [ ] Hover over handles on each node type
- [ ] Handles increase to 20px on hover
- [ ] Shadow intensifies on hover
- [ ] Hover feedback is immediate

#### Connection Creation
- [ ] Create a new connection between nodes
- [ ] Handle targeting is precise
- [ ] Connection snaps to handle correctly
- [ ] Visual feedback during connection creation is clear

## Browser DevTools Tips

### Measuring Font Sizes
1. Right-click on text element → Inspect
2. Check Computed tab → font-size value
3. Verify against requirements (16px body, 18px headers, 20px badges)

### Checking Contrast Ratios
1. Right-click on text → Inspect
2. In Styles tab, click the color swatch next to color property
3. Color picker shows contrast ratio
4. Verify ≥ 4.5:1 for normal text, ≥ 3:1 for large text

### Measuring Dimensions
1. Right-click on element → Inspect
2. Check Computed tab → width, height, padding values
3. Verify against requirements

### Testing at Different Zoom Levels
1. Use Ctrl/Cmd + Plus/Minus to zoom
2. Or use browser zoom dropdown
3. Test at 80%, 100%, 120%

## Test Results Summary

### Overall Assessment
- [ ] All typography improvements verified
- [ ] All spacing and layout requirements met
- [ ] All visual depth effects working correctly
- [ ] All color contrast requirements met (WCAG AA)
- [ ] All handle usability requirements met

### Issues Found
(Document any issues discovered during testing)

### Recommendations
(Document any suggestions for further improvements)

## Sign-off

**Tested By**: _________________
**Date**: _________________
**Status**: ☐ Pass ☐ Pass with Minor Issues ☐ Fail

**Notes**:
