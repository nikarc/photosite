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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.modal__wrap}>
            <div
              className={styles.modal__click_wrap}
              onClick={onOverlayClick}
            ></div>
            <span
              className={`pi pi-plus ${styles.modal__close_button}`}
              style={{ color: "white" }}
              onClick={onOverlayClick}
            />

            <i
              className={`pi pi-spin pi-spinner ${styles.modal__loading_icon}`}
              style={{ fontSize: "2rem", color: "white" }}
            />

            <motion.div
              initial={{ translateY: "-25%" }}
              animate={{ translateY: "0%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.modal__inner_wrap}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
