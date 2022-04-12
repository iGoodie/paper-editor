import { messagesEn } from "./intl.en";

type PredefinedIntlKey =
  | "papereditor.title.background"
  | "papereditor.title.preview-element"
  | "papereditor.title.layers"
  | "papereditor.title.new-layer"
  | "papereditor.title.selected-layer"
  | "papereditor.title.selected-layers"
  | "papereditor.title.layer-count"
  | "papereditor.value.untitled-layer"
  | "papereditor.value.untitled-document"
  | "papereditor.btn.delete-layer"
  | "papereditor.btn.delete-selected-layers"
  | "papereditor.btn.confirm-deletion"
  | "papereditor.info.background"
  | "papereditor.unit.inches"
  | "papereditor.unit.points"
  | "papereditor.unit.meters"
  | "papereditor.unit.centimeters"
  | "papereditor.unit.millimeters"
  | "papereditor.picker.loading"
  | "papereditor.picker.no-image"
  | "papereditor.picker.drag-drop-here"
  | "papereditor.picker.or"
  | "papereditor.picker.click-here"
  | "papereditor.picker.upload-again"
  | "papereditor.picker.clear";

export type IntlMessages = Record<PredefinedIntlKey, string>;

/* ------------------ */

let messages: IntlMessages = messagesEn;

/* ------------------ */

export function formatIntlMessage(key: keyof IntlMessages, ...args: any[]) {
  let message = messages[key] ? messages[key] : key;
  return args == null
    ? message
    : args.reduce<string>(
        (formatted, msg, index) =>
          formatted.replaceAll(`$${index + 1}`, args[index]),
        message
      );
}

export function setIntlMessages(_messages: Partial<IntlMessages>) {
  messages = Object.assign(messages, _messages);
}
