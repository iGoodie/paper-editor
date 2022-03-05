import React from "react";

export function useFullscreen() {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const handler = function () {
      setActive(document.fullscreenElement != null);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return { active };
}
