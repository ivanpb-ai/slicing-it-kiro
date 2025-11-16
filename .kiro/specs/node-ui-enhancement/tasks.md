# Implementation Plan

- [x] 1. Update typography system for larger, more readable text





  - Update font size classes from `text-xs/text-sm` to `text-base/text-lg/text-xl` across all node components
  - Update font weight classes to use bolder weights (`font-semibold` → `font-bold`, `font-medium` → `font-semibold`)
  - Ensure minimum text size is 16px (text-base) for all body text
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.1 Update NetworkNode typography


  - Change header text from `text-sm` to `text-lg` and `font-semibold` to `font-bold`
  - Change description text from `text-xs` to `text-base`
  - Change helper text from `text-xs` to `text-base`
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 1.2 Update DnnNode typography


  - Change header text from `text-sm` to `text-lg` and `font-semibold` to `font-bold`
  - Change description text from `text-xs` to `text-base`
  - Change input field text from `text-xs` to `text-base`
  - Change helper text from `text-xs` to `text-base`
  - _Requirements: 1.1, 1.2, 1.3, 1.5_

- [x] 1.3 Update SnssaiNode typography


  - Change header text from `text-sm` to `text-lg` and `font-semibold` to `font-bold`
  - Change label text from `text-xs` to `text-base` and `text-gray-700` to `text-gray-900`
  - Change input field text from `text-xs` to `text-base`
  - Change description text from `text-xs` to `text-base`
  - _Requirements: 1.1, 1.2, 1.3, 1.5_

- [x] 1.4 Update FiveQiNode typography


  - Change header text from `text-sm` to `text-lg` and `font-semibold` to `font-bold`
  - Change badge text from `text-sm` to `text-xl` and `font-semibold` to `font-bold`
  - Change service description from `text-sm` to `text-base` and `font-medium` to `font-semibold`
  - Change QoS parameters text from `text-xs` to `text-base`
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 1.5 Update remaining node components typography (CellAreaNode, RrpNode, RrpMemberNode, QoSFlowNode)


  - Apply same typography scale updates as above nodes
  - Ensure all headers use `text-lg` and `font-bold`
  - Ensure all body text uses `text-base` minimum
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Enhance spacing and padding system





  - Update padding values in `nodeStyles.ts` getPadding function
  - Update minimum widths in `nodeStyles.ts` getWidth function
  - Update spacing classes in all node components
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2.1 Update nodeStyles.ts padding function


  - Change all `p-3` returns to `p-5` (12px → 20px)
  - Change all `p-4` returns to `p-6` (16px → 24px)
  - Ensure adequate padding for larger text
  - _Requirements: 2.1_

- [x] 2.2 Update nodeStyles.ts width function


  - Increase network width from 200px to 240px
  - Increase cell-area width from 150px to 200px
  - Increase rrp base width from 200px to 240px
  - Increase rrpmember width from 120px to 180px
  - Increase s-nssai width from 180px to 220px
  - Increase dnn width from 200px to 240px
  - Increase fiveqi width from 160px to 220px
  - Increase qosflow width from 150px to 200px
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 2.3 Update header padding in all node components


  - Change header padding from `px-2 py-1` to `px-4 py-3` (8px/4px → 16px/12px)
  - Update in NetworkNode, DnnNode, SnssaiNode, FiveQiNode, and all other node components
  - _Requirements: 2.2_

- [x] 2.4 Update content spacing in all node components


  - Change `mt-1` to `mt-3` (4px → 12px)
  - Change `mt-2` to `mt-4` (8px → 16px)
  - Change `mb-2` to `mb-4` (8px → 16px)
  - Change `mb-1` to `mb-3` (4px → 12px)
  - Apply to all node components
  - _Requirements: 2.3_

- [x] 2.5 Update input field spacing in editable nodes


  - Update spacing in DnnNode custom name input
  - Update spacing in SnssaiNode SD and SST inputs
  - Ensure consistent spacing with read-only elements
  - _Requirements: 2.3, 2.5_

- [x] 3. Implement visual depth system with shadows and borders





  - Add multi-layered shadow system to node wrappers
  - Enhance border widths for stronger visual presence
  - Add hover state animations
  - Add selection state enhancements
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [x] 3.1 Add shadow system to index.css


  - Add base shadow to `.node-wrapper` class (multi-layered: 0 4px 12px + 0 2px 4px)
  - Add hover shadow with transform animation
  - Add selected state shadow with ring
  - Add transition properties for smooth animations
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 3.2 Update border widths in nodeStyles.ts


  - Update getBorderColor function to return `border-3` classes instead of default border
  - Ensure all node types have 3px borders
  - Add selected state with `border-4` in index.css
  - _Requirements: 3.5_

- [x] 3.3 Add gradient overlay for depth (optional enhancement)


  - Add pseudo-element with gradient overlay to `.node-wrapper::before`
  - Ensure gradient doesn't interfere with text readability
  - Make gradient subtle and enhance depth perception
  - _Requirements: 3.1_

- [x] 4. Enhance connection handles for better visibility and usability




  - Increase handle size from 12px to 16px
  - Add stronger shadows to handles
  - Add hover state for handles
  - _Requirements: 3.4_

- [x] 4.1 Update handle styles in index.css


  - Change `.react-flow__handle` width and height from 12px to 16px
  - Change border width from 2px to 3px
  - Add box-shadow for depth
  - Add hover state with size increase to 20px and enhanced shadow
  - Update all inline handle styles in node components to use `!w-4 !h-4` (16px)
  - _Requirements: 3.4_

- [x] 5. Optimize color contrast and backgrounds





  - Update background colors in nodeStyles.ts for stronger visual presence
  - Update header background colors for better separation
  - Update text colors for maximum contrast
  - Ensure WCAG AA compliance
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 5.1 Update nodeStyles.ts background colors


  - Change all `-50` variants to `-200` variants in getBgColor function
  - network: `bg-indigo-50` → `bg-indigo-200`
  - cell-area: `bg-blue-50` → `bg-blue-200`
  - rrp: `bg-green-50` → `bg-green-200`
  - rrpmember: `bg-teal-50` → `bg-teal-200`
  - s-nssai: `bg-violet-50` → `bg-violet-200`
  - dnn: `bg-orange-50` → `bg-orange-200`
  - fiveqi: `bg-purple-50` → `bg-purple-200`
  - qosflow: `bg-cyan-50` → `bg-cyan-200` (if exists)
  - _Requirements: 4.2, 4.3_

- [x] 5.2 Update header backgrounds in all node components


  - Change header backgrounds from `-100` to `-300` variants
  - network: `bg-indigo-100` → `bg-indigo-300`
  - cell-area: `bg-blue-100` → `bg-blue-300`
  - rrp: `bg-green-100` → `bg-green-300`
  - rrpmember: `bg-teal-100` → `bg-teal-300`
  - s-nssai: `bg-violet-100` → `bg-violet-300`
  - dnn: `bg-orange-100` → `bg-orange-300`
  - fiveqi: `bg-purple-100` → `bg-purple-300`
  - qosflow: `bg-cyan-100` → `bg-cyan-300` (if exists)
  - _Requirements: 4.2, 4.3_

- [x] 5.3 Update header text colors for contrast


  - Change header text from `text-{color}-800` to `text-white` for better contrast on `-300` backgrounds
  - Apply to all node component headers
  - _Requirements: 4.1, 4.4_

- [x] 5.4 Update body text colors for maximum contrast


  - Change body text from `text-gray-600` to `text-gray-900`
  - Change helper text from `text-gray-600` to `text-gray-800`
  - Change label text from `text-gray-700` to `text-gray-900`
  - Apply to all node components
  - _Requirements: 4.1, 4.4_

- [x] 5.5 Update accent colors in FiveQiNode and badges


  - Ensure badge backgrounds provide adequate contrast with white text
  - Update any colored text to ensure WCAG AA compliance
  - _Requirements: 4.1, 4.5_
-

- [x] 6. Optimize layout spacing for larger nodes




  - Update spacing constants in layout configuration
  - Ensure balanced graph layout with adequate spacing
  - _Requirements: 5.1, 5.3, 5.4, 5.5_

- [x] 6.1 Update layout spacing constants


  - Open `client/src/utils/flowData/layouts/constants.ts`
  - Change `VERTICAL_SPACING` from 150 to 200
  - Change `HORIZONTAL_SPACING` from 200 to 240
  - Change `INITIAL_Y_OFFSET` from 50 to 80
  - Change `INITIAL_X_OFFSET` from 50 to 80
  - _Requirements: 5.1, 5.3_

- [x] 6.2 Update level-specific spacing constants

  - Update all values in `VERTICAL_LEVEL_SPACINGS` object
  - Change 'default' from 150 to 200
  - Change 'rrpmember-s-nssai' from 150 to 200
  - Change 's-nssai-dnn' from 150 to 200
  - Change 'rrp-rrpmember' from 150 to 180
  - Change 'network-cell-area' from 150 to 200
  - Change 'cell-area-rrp' from 150 to 200
  - Change 'dnn-fiveqi' from 150 to 180
  - _Requirements: 5.1, 5.4, 5.5_

- [x] 7. Visual testing and refinement








  - Test all node types with new styling
  - Verify text readability at different zoom levels
  - Verify adequate spacing and no overlaps
  - Verify color contrast meets WCAG AA standards
  - Test hover and selection states
  - Test auto-arrange with new spacing
  - _Requirements: All requirements_


- [x] 7.1 Create test graph with all node types

  - Create a graph containing all 8 node types
  - Add sample content to test text wrapping and sizing
  - Test with maximum content length
  - _Requirements: All requirements_

- [ ] 7.2 Verify typography improvements








  - Check that all text is readable at 100% zoom
  - Check that text remains readable at 80% zoom
  - Verify font sizes meet minimum requirements (16px body, 18px headers)
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 7.3 Verify spacing and layout


  - Check that nodes don't overlap after auto-arrange
  - Verify adequate spacing between nodes
  - Check that content fits within nodes without truncation
  - Verify padding provides adequate breathing room
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 5.1, 5.3, 5.4_


- [ ] 7.4 Verify visual depth and prominence

  - Check that shadows are visible and create depth
  - Verify hover states provide clear feedback
  - Verify selection states are visually distinct
  - Check that borders are prominent
  - _Requirements: 3.1, 3.2, 3.3, 3.5_


- [-] 7.5 Verify color contrast

  - Use browser DevTools or contrast checker to verify all text meets WCAG AA (4.5:1 for normal text)
  - Check header text on `-300` backgrounds
  - Check body text on `-200` backgrounds
  - Verify helper text contrast
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
x

- [ ] 7.6 Verify handle usability


  - Check that handles are easily visible
  - Verify handles are easy to click and drag
  - Test hover states on handles
  - _Requirements: 3.4_
