import styles from "./page-container.module.css";

const PageContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <div className={styles.pageContainer}>{children}</div>;

export default PageContainer;
