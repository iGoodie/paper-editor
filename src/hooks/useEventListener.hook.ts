import React from "react";

export function useEventListener<
  K extends keyof HTMLElementEventMap,
  E extends HTMLElement
>(
  ref: React.RefObject<E>,
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void
) {
  // Create a ref that stores handler
  const savedHandler = React.useRef<(event: HTMLElementEventMap[K]) => void>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(
    () => {
      const targetElement: E | Window = ref?.current || window;
      if (!(targetElement && targetElement.addEventListener)) {
        return;
      }

      // Create event listener that calls handler function stored in ref
      const eventListener: typeof handler = (event) =>
        savedHandler.current?.(event);

      // Add event listener
      targetElement.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        targetElement.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, ref] // Re-run if eventName or element changes
  );
}
