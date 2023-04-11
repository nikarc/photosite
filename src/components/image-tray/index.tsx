import Asset, { ImageSize } from "components/asset";
import { ImageFragment } from "components/image-asset";
import { FragmentType } from "src/gql";
import { motion } from "framer-motion";

import styles from "./image-tray.module.scss";

type Props = {
  imageFragments: FragmentType<typeof ImageFragment>[];
};

const tray = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

export default function ImageTray({ imageFragments }: Props) {
  return (
    <motion.div className={styles.image_tray}>
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <div className={styles.image_tray__track}>
          {imageFragments.map((imageFragment, idx) => (
            <div className={styles.image_wrap} key={idx}>
              <Asset imageSize={ImageSize.Thumbnail} image={imageFragment} />
            </div>
          ))}
        </div>
        <div className={styles.image_tray__tab}>
          <i
            className="pi pi-chevron-up"
            style={{ display: "block", fontSize: "0.8rem" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
