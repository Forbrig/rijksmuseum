import styles from "./styles.module.scss";

interface ArtPieceProps {
  imgUrl: string;
  title: string;
  subtitle: string;
}

export function ArtPiece({ imgUrl, title, subtitle }: ArtPieceProps) {
  return (
    <div className={styles.artpiece}>
      <div
        style={{
          background: `url(${imgUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3>{title}</h3>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
