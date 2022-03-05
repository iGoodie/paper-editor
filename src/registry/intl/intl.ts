import React from "react";
import { messagesEn } from "./intl.en";

type PredefinedIntlKey =
  | "papereditor.title.layers"
  | "papereditor.value.untitled"
  | "papereditor.unit.inches"
  | "papereditor.unit.meters"
  | "papereditor.unit.centimeters"
  | "papereditor.unit.millimeters";

export type IntlMessages = Record<PredefinedIntlKey, React.ReactChild> &
  Record<string, React.ReactChild>;

/* ------------------ */

let messages: IntlMessages = messagesEn;

/* ------------------ */

export function getIntlMessage(key: keyof IntlMessages) {
  return messages[key] ? messages[key] : key;
}

export function setIntlMessages(_messages: Partial<IntlMessages>) {
  messages = Object.assign(messages, _messages);
}
