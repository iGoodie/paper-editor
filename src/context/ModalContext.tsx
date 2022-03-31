import React from "react";

export interface IModalContext {
  dialog: React.ReactNode;
  setDialog: (node: React.ReactNode) => void;
  closeDialog: () => void;
}

const ModalContext = React.createContext<IModalContext | undefined>(undefined);

/* ----------------------- */

interface Props {}

export const ModalContextProvider: React.FC<Props> = (props) => {
  const [dialog, setDialog] = React.useState<React.ReactNode>(null);

  const closeDialog = () => {
    setDialog(null);
  };

  const ctx: IModalContext = {
    dialog,
    setDialog,
    closeDialog,
  };

  return (
    <ModalContext.Provider value={ctx}>{props.children}</ModalContext.Provider>
  );
};

export function useModalContext() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error(
      "No <ModalContextProvider> found when calling useModalContext"
    );
  }
  return context;
}
