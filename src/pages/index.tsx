import type { NextPage } from "next";
import Image from "next/image";

import styles from "./styles.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Rijksmuseum</h1>

        <span>
          This website is a showcase to demonstrate what can be done with the{" "}
          <a
            href="https://data.rijksmuseum.nl/object-metadata/api/"
            target="_blank"
            rel="noreferrer"
          >
            Rijksmuseum API
          </a>{" "}
          and{" "}
          <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
            NextJS
          </a>
          .
        </span>

        <div className={styles.image}>
          <div className={styles.imageContainer}>
            <Image
              alt="Rijksmuseum picture by Sten Rademaker"
              src="/rijksmuseum.jpg"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span>Rijksmuseum picture by Sten Rademaker.</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
