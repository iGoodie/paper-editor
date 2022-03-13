// Measurement Units
export * from "./util/units.util";

// Configurations & Registries
export { configure } from "./registry/configurations";
import * as LayersRegistry from "./registry/layers.registry";
import * as RootActionsRegistry from "./registry/root-actions.registry";
export const registries = {
  LayersRegistry,
  RootActionsRegistry,
};

// Internationalization
export { setIntlMessages } from "./registry/intl/intl";
export { messagesEn } from "./registry/intl/intl.en";
export { messagesTr } from "./registry/intl/intl.tr";

// Theming
export { Theme } from "./styles/Theme";

// Components
export { Editor } from "./editor/Editor";
export { Layer, SerializedLayer } from "./editor/base/Layer";

// ---- Built-in Registrations ---- //

import { EnterFullscreenRootAction } from "./built-in/root-action/EnterFullscreenRootAction";
import { ExitFullscreenRootAction } from "./built-in/root-action/ExitFullscreenRootAction";
import { ZoomCenterRootAction } from "./built-in/root-action/ZoomCenterRootAction";
import { ZoomOutRootAction } from "./built-in/root-action/ZoomOutRootAction";
import { ZoomInRootAction } from "./built-in/root-action/ZoomInRootAction";
RootActionsRegistry.register(new EnterFullscreenRootAction());
RootActionsRegistry.register(new ExitFullscreenRootAction());
RootActionsRegistry.register(new ZoomCenterRootAction());
RootActionsRegistry.register(new ZoomOutRootAction());
RootActionsRegistry.register(new ZoomInRootAction());
