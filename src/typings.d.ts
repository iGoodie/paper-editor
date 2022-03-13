/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

/**
 * Default SCSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module "*.svg" {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

declare interface Class<T> {
  new (...args: any): T;
}

declare type PropertiesOnly<T> = Partial<
  Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>
>;

declare type Supplier<T> = () => T;
