import styles from "./page-container.module.scss";

const PageContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <div className={styles.pageContainer}>{children}</div>;

export default PageContainer;
