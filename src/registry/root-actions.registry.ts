import { IEditorContext } from "../context/EditorContext";
import { RootAction } from "../editor/base/RootAction";

const registry: RootAction[] = [];

export function register(rootAction: RootAction) {
  registry.push(rootAction);
}

export function mapRootActions(
  ctx: IEditorContext,
  mapper: Parameters<typeof registry.map>[0]
) {
  return registry.filter((rootAction) => rootAction.isVisible(ctx)).map(mapper);
}
