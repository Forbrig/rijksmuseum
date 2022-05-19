import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./styles.module.scss";

export function Header() {
  const { asPath } = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <span>Rijksmuseum</span>
        <nav>
          <Link href="/">
            <a className={asPath === "/" ? styles.active : ""}>Home</a>
          </Link>
          <Link href="/collection" prefetch>
            <a className={asPath === "/collection" ? styles.active : ""}>
              Collection
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
