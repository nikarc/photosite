import { ReactNode, useContext } from "react";
import ModalContext from "src/contexts/modal";
import { WithChildren } from "src/types";

type Props = WithChildren & {
  fullSizeImage: ReactNode;
};

export default function LightBox({ children, fullSizeImage }: Props) {
  const { setModalActive, setModalChildren } = useContext(ModalContext);

  const lightBoxClick = () => {
    setModalActive?.(true);
    setModalChildren?.(fullSizeImage);
  };

  return (
    <div data-click-me onClick={lightBoxClick}>
      {children}
    </div>
  );
}
