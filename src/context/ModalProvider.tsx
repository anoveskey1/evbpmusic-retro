import React, { ReactNode, useState } from "react";
import { ModalContext } from "./ModalContext";
import Modal from "@components/Modal";
import { AlertType } from "@/types";

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [alertType, setAlertType] = useState<AlertType>("INFO");
  const [modalContent, setModalContent] = useState<null | ReactNode>(null);

  const showModal = (alertType: AlertType, content: ReactNode) => {
    setAlertType(alertType);
    setModalContent(content);
  };
  const hideModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent && (
        <Modal alertType={alertType} onClose={hideModal}>
          {modalContent}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
