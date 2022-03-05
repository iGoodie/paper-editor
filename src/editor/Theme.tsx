export interface Theme {
  font?: {
    header?: string;
    content?: string;
  };

  colors?: {
    headerBg?: string;
    footerBg?: string;
    iconBg?: string;
    headerText?: string;
    layerTextPrimary?: string;
    layerTextSecondary?: string;
  };

  canvas?: {
    backgroundColor?: string;
    backgroundImage?: string;
  };
}

export function themeToCssVars(theme: Theme) {
  return {
    "--header-font": theme.font?.header,
    "--content-font": theme.font?.content,

    "--header-background-color": theme.colors?.headerBg,
    "--footer-background-color": theme.colors?.footerBg,
    "--icon-background-color": theme.colors?.iconBg,
    "--header-text-color": theme.colors?.headerText,
    "--layertext-primary-color": theme.colors?.layerTextPrimary,
    "--layertext-secondary-color": theme.colors?.layerTextSecondary,

    "--canvas-background-color": theme.canvas?.backgroundColor,
    "--canvas-background-image": theme.canvas?.backgroundImage,
  };
}
