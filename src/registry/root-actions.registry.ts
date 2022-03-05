import { RootAction } from "../editor/RootAction";

const registry: RootAction[] = [];

export function register(rootAction: RootAction) {
  registry.push(rootAction);
}

export function mapRootActions(
  editorRef: React.RefObject<HTMLDivElement>,
  mapper: Parameters<typeof registry.map>[0]
) {
  return registry
    .filter((rootAction) => rootAction.isVisible(editorRef))
    .map(mapper);
}
