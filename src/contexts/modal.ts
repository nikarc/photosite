import { createContext } from "react";
import { ModalProps } from "src/types";

const ModalContext = createContext<ModalProps>({
  modalActive: false,
});

export default ModalContext;
