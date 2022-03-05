import React from "react";

export function useInlineStyle(
  factory: () => React.CSSProperties & object,
  depts: React.DependencyList
) {
  return React.useMemo(factory, depts);
}
