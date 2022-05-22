import { ActiveLink } from "../ActiveLink";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <span>Rijksmuseum</span>
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink
            href="/collection"
            activeClassName={styles.active}
            prefetch
          >
            <a>Collection</a>
          </ActiveLink>
        </nav>
      </div>
    </header>
  );
}
