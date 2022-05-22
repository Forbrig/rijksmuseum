import styles from "./styles.module.scss";

interface CheckboxProps {
  children: React.ReactNode;
}

export function Tag({ children }: CheckboxProps) {
  return <div className={styles.tag}>{children}</div>;
}
