import { Layer } from "../editor/Layer";

interface Class<T> {
  new (...args: any): T;
}

const registry = new Map<string, Class<Layer>>();

export function register(layerType: Class<Layer>) {
  const sample = new layerType();
  registry.set(sample.getType(), layerType);
}

export function getLayerType(typeName: string) {
  return registry.get(typeName);
}
