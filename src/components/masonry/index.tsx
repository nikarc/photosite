import React from "react";

import styles from "./masonry.module.scss";

type MasonryProps = {
  children: React.ReactNode;
};

export const Marsonry: React.FC<MasonryProps> = ({ children }) => (
  <div className={styles.masonry_wrap}>
    {React.Children.map(children, (child, index) => (
      <div className={styles.masonry_item} key={index}>
        {child}
      </div>
    ))}
  </div>
);
