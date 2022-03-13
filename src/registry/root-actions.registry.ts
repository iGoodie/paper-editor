import { RootAction } from "../editor/base/RootAction";
import { Transformations } from "../hooks/useTransformation.hook";

const registry: RootAction[] = [];

export function register(rootAction: RootAction) {
  registry.push(rootAction);
}

export function mapRootActions(
  transformations: Transformations,
  mapper: Parameters<typeof registry.map>[0]
) {
  return registry
    .filter((rootAction) => rootAction.isVisible(transformations))
    .map(mapper);
}
