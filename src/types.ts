import { SetStateAction, Dispatch, ReactNode } from "react";

export type WithClassName = {
  className?: string;
};

export type WithChildren = {
  children?: React.ReactNode;
};

/**
 * Components
 **/

export type ModalProps = {
  modalActive?: boolean;
  setModalActive?: Dispatch<SetStateAction<boolean>>;
  setModalChildren?(val: ReactNode): void;
} & WithChildren;
