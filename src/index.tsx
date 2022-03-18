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
export { IEditorContext } from "./context/EditorContext";
export { Editor } from "./editor/Editor";
export { Layers } from "./hooks/useLayers.hook";
export { Transformations } from "./hooks/useTransformation.hook";
export { Layer, SerializedLayer } from "./editor/base/Layer";

// Controls
export { AccordionControl } from "./editor/controls/AccordionControl";
export { AlignControls } from "./editor/controls/AlignControls";
export * as ButtonStripeControl from "./editor/controls/ButtonStripeControl";

// ---- Built-in Registrations ---- //

import { EnterFullscreenRootAction } from "./built-in/root-actions/EnterFullscreenRootAction";
import { ExitFullscreenRootAction } from "./built-in/root-actions/ExitFullscreenRootAction";
import { ZoomCenterRootAction } from "./built-in/root-actions/ZoomCenterRootAction";
import { ZoomOutRootAction } from "./built-in/root-actions/ZoomOutRootAction";
import { ZoomInRootAction } from "./built-in/root-actions/ZoomInRootAction";
RootActionsRegistry.register(new EnterFullscreenRootAction());
RootActionsRegistry.register(new ExitFullscreenRootAction());
RootActionsRegistry.register(new ZoomCenterRootAction());
RootActionsRegistry.register(new ZoomOutRootAction());
RootActionsRegistry.register(new ZoomInRootAction());
