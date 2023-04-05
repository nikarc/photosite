import { WithChildren, WithClassName } from "src/types";
import styles from "./page-container.module.scss";

type Props = WithChildren & WithClassName;

const PageContainer: React.FC<Props> = ({ children, className }) => (
  <div className={`${styles.pageContainer} ${className}`}>{children}</div>
);

export default PageContainer;
