import Link from "next/link";
import Image from "next/image";

import styles from "./styles.module.scss";

interface ArtPieceProps {
  imgUrl: string;
  title: string;
  subtitle: string;
  objectNumber: string;
}

export function ArtPiece({
  imgUrl,
  title,
  subtitle,
  objectNumber,
}: ArtPieceProps) {
  return (
    <Link href={`art/${objectNumber}`}>
      <div className={styles.artpiece}>
        <Image
          className={styles.image}
          quality={25}
          src={`https://res.cloudinary.com/demo/image/fetch/${imgUrl}`}
          alt={title}
          loading="lazy"
          layout="fill"
          objectFit="cover"
          width={960}
          height={230}
        />
        <div className={styles.content}>
          <h3>{title}</h3>
          <span>{subtitle}</span>
        </div>
      </div>
    </Link>
  );
}
