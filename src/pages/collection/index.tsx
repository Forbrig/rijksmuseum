import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

import { Checkbox } from "../../components/Checkbox";

import styles from "./styles.module.scss";

const Collection: NextPage = ({ results }: any) => {
  const [useImages, setUseImages] = useState(false);
  const [useTopPieces, setUseTopPieces] = useState(false);

  return (
    <div className={styles.contentContainer}>
      <div>
        <div className={styles.filterContainer}>
          <h2>Options</h2>

          <form>
            <Checkbox
              label="Images Only"
              checked={useImages}
              onChange={(val) => setUseImages(val)}
            />

            <Checkbox
              label="Top Pieces"
              checked={useTopPieces}
              onChange={(val) => setUseTopPieces(val)}
            />

            <div>
              <label htmlFor="scales">Term</label>
              <input type="input" id="scales" name="scales" />
            </div>

            <div>
              <label htmlFor="body">Color</label>
              <input type="color" id="body" name="body" />
            </div>

            <button type="submit" className={styles.searchButton}>
              Apply Filters
            </button>
          </form>
        </div>

        <div className={styles.resultsContainer}>
          {results && (
            <Image
              src={results.artObjects[0].headerImage.url}
              alt=""
              width={1800}
              height={400}
            />
          )}
          content
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.RIJKMUSEUM_API_KEY}&involvedMaker=Rembrandt+van+Rijn&relevance&ps=1`
  );

  const data = await response.json();

  console.log(data);

  return {
    props: {
      results: data,
    },
  };
};

export default Collection;
