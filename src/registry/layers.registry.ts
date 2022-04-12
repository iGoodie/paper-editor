import { Layer } from "../editor/base/Layer";

const registry = new Map<string, Class<Layer>>();

export function register(layerType: Class<Layer>) {
  const sample = new layerType();
  registry.set(sample.getType(), layerType);
  return [sample.getType(), layerType] as [string, Class<Layer>];
}

export function getLayerType(typeName: string) {
  return registry.get(typeName);
}

export function getLayerTypes() {
  return Array.from(registry.values());
}
