
export const getBgColor = (nodeType: string): string => {
  switch (nodeType) {
    case "network":
      return "bg-indigo-200";
    case "cell-area":
      return "bg-blue-200";
    case "rrp":
      return "bg-green-200";
    case "rrpmember":
      return "bg-teal-200";
    case "s-nssai":
      return "bg-violet-200";
    case "dnn":
      return "bg-orange-200";
    case "fiveqi":
      return "bg-purple-200";
    case "qosflow":
      return "bg-cyan-200";
    default:
      return "bg-gray-200";
  }
};

export const getBorderColor = (nodeType: string): string => {
  switch (nodeType) {
    case "network":
      return "border-indigo-500 border-[3px]";
    case "cell-area":
      return "border-blue-500 border-[3px]";
    case "rrp":
      return "border-green-500 border-[3px]";
    case "rrpmember":
      return "border-teal-500 border-[3px]";
    case "s-nssai":
      return "border-violet-500 border-[3px]";
    case "dnn":
      return "border-orange-500 border-[3px]";
    case "fiveqi":
      return "border-purple-500 border-[3px]";
    default:
      return "border-gray-200 border-[3px]";
  }
};

export const getNodeShape = (nodeType: string): string => {
  switch (nodeType) {
    case "network":
      return "rounded-xl"; // Rectangle with rounded corners
    case "cell-area":
      return ""; // Hexagon shape (handled by CSS clip-path)
    case "rrp":
      return ""; // Pentagon shape (handled by CSS clip-path)
    case "rrpmember":
      return "rounded-full"; // Circle
    case "s-nssai":
      return ""; // Hexagon shape (handled by CSS clip-path)
    case "dnn":
      return ""; // Diamond shape (handled by CSS clip-path)
    case "fiveqi":
      return ""; // Octagon shape (handled by CSS clip-path)
    default:
      return "rounded-lg";
  }
};

export const getPadding = (nodeType: string): string => {
  switch (nodeType) {
    case "network":
      return "p-6";
    case "cell-area":
      return "p-5";
    case "rrp":
      return "p-6";
    case "rrpmember":
      return "p-6";
    case "s-nssai":
      return "p-6";
    case "dnn":
      return "p-6";
    case "fiveqi":
      return "p-6";
    default:
      return "p-5";
  }
};

export const getWidth = (nodeType: string, rrpPercentage?: number): string => {
  switch (nodeType) {
    case "network":
      return "min-w-[240px]";
    case "cell-area":
      return "min-w-[200px]";
    case "rrp":
      const baseWidth = 240; 
      const percentage = rrpPercentage || 100;
      const scaledWidth = Math.max(baseWidth * (percentage / 100), 180);
      return `min-w-[${scaledWidth}px]`;
    case "rrpmember":
      return "min-w-[180px]";
    case "s-nssai":
      return "min-w-[220px]";
    case "dnn":
      return "min-w-[240px]";
    case "fiveqi":
      return "min-w-[220px]";
    case "qosflow":
      return "min-w-[200px]";
    default:
      return "min-w-[200px]";
  }
};

// Additional utility for special shapes that need clip-path
export const getClipPath = (nodeType: string): string => {
  // Removed infinite loop console.log
  switch (nodeType) {
    case "network":         // Rectangle with rounded corners (approximation; adjust radius as needed)
      return "inset(0% round 16px)";
    case "cell-area":
      return "circle(50%)"; // Circle shape
    case "s-nssai":
      return "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"; // Octagon
    case "rrp":
      return "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"; // Pentagon
    case "dnn":
      return "polygon(50% 0%, 100% 50%, 100% 50%, 50%)"; // Diamond
    case "fiveqi":
      return "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"; // Octagon
    default:
      return "none";
  }
};
