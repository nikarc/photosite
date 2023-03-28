import { ReactNode, useContext } from "react";
import ModalContext from "src/contexts/modal";
import { WithChildren } from "src/types";
import styles from "./light-box.module.scss";

type Props = WithChildren & {
  fullSizeImage: ReactNode;
  style?: React.CSSProperties;
};

export default function LightBox({ children, fullSizeImage, style }: Props) {
  const { setModalActive, setModalChildren } = useContext(ModalContext);

  const lightBoxClick = () => {
    setModalActive?.(true);
    setModalChildren?.(fullSizeImage);
  };

  return (
    <div className={styles.light_box} onClick={lightBoxClick} style={style}>
      {children}
    </div>
  );
}
