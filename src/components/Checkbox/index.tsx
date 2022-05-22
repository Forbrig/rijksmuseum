import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";

interface CheckboxProps {
  checked: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  label: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <div className={styles.checkbox}>
      <div
        className={styles.checkboxIndicator}
        onClick={() => onChange(!checked)}
      >
        <div className={checked ? styles.active : ""} />
      </div>
      <span className={styles.checkboxLabel}>{label}</span>
    </div>
  );
}
