
export const HIERARCHY_LEVELS: { [key: string]: number } = {
  'network': 0,
  'cell-area': 1,
  'rrp': 2,
  'rrpmember': 3,  // One level below RRP (as children)
  's-nssai': 4,
  'dnn': 5,
  'fiveqi': 6
};

export const VERTICAL_SPACING = 200;
export const HORIZONTAL_SPACING = 150;
export const INITIAL_Y_OFFSET = 80;
export const INITIAL_X_OFFSET = 80;

// Add the missing VERTICAL_LEVEL_SPACINGS export
export const VERTICAL_LEVEL_SPACINGS: { [key: string]: number } = {
  'default': 200,
  'rrpmember-s-nssai': 200, // Consistent spacing for all connections
  's-nssai-dnn': 200, // Consistent spacing for all connections
  'rrp-rrpmember': 180, // Slightly tighter for parent-child relationship
  'network-cell-area': 200,
  'cell-area-rrp': 200,
  'dnn-fiveqi': 180 // Slightly tighter for tight coupling
};
