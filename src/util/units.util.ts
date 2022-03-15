import { configurations } from "../registry/configurations";

export class MeasurementUnit {
  constructor(
    public readonly name: string,
    public readonly abbr: string,
    public readonly ratio: number
  ) {}

  toMillimeters(value: number) {
    return value * this.ratio;
  }

  fromMillimeters(millimeterValue: number) {
    return millimeterValue / this.ratio;
  }

  toPixels(value: number) {
    return this.toMillimeters(value) * configurations.millimeterToPixelRatio;
  }

  fromPixels(pixelValue: number) {
    return this.fromMillimeters(
      pixelValue / configurations.millimeterToPixelRatio
    );
  }
}

const unitsByName = new Map<string, MeasurementUnit>();
const unitsByAbbr = new Map<string, MeasurementUnit>();

function registerUnit(unit: MeasurementUnit) {
  unitsByName.set(unit.name, unit);
}

const defaultUnit = new MeasurementUnit("millimeters", "mm", 1);

registerUnit(defaultUnit);
registerUnit(new MeasurementUnit("centimeters", "cm", 10));
registerUnit(new MeasurementUnit("meters", "m", 1000));
registerUnit(new MeasurementUnit("inches", "inch", 25.4));
registerUnit(new MeasurementUnit("points", "pt", 0.352778));

export function getUnitByName(name: string) {
  return unitsByName.get(name) ?? defaultUnit;
}

export function getUnitByAbbr(name: string) {
  return unitsByAbbr.get(name) ?? defaultUnit;
}
