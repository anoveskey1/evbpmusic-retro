import { createContext, ReactNode, useContext } from "react";
import { AlertType } from "@/types";

type ModalContextType = {
  showModal: (alertType: AlertType, content: ReactNode) => void;
  hideModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  showModal: (alertType: AlertType, content: ReactNode) => {},
  hideModal: () => {},
});

export const useModal = () => useContext(ModalContext);
