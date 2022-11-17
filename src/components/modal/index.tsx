import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ModalContext from "src/contexts/modal";

import styles from "./modal.module.scss";

export default function Modal() {
  const {
    modalActive = false,
    setModalActive,
    children,
    setModalChildren,
  } = useContext(ModalContext);

  const onOverlayClick = () => {
    setModalChildren?.(null);
    setModalActive?.(false);
  };

  return (
    <AnimatePresence>
      {modalActive && (
        <div className={styles.modal__wrap}>
          <div
            className={styles.modal__click_wrap}
            onClick={onOverlayClick}
          ></div>
          <motion.div
            initial={{ opacity: 0, translateY: "-25%" }}
            animate={{ opacity: 1, translateY: "0%" }}
            exit={{ opacity: 0 }}
            className={styles.modal__inner_wrap}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
