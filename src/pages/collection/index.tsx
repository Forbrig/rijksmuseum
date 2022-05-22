import { useEffect, useState } from "react";
import type { NextPage } from "next";
// import Image from "next/image";

import { useRijksmuseum } from "../../hooks/useRijksmuseum";
import { Checkbox } from "../../components/Checkbox";

import styles from "./styles.module.scss";
import { Tag } from "../../components/Tag";
import { ArtPiece } from "./components/ArtPiece";

const Collection: NextPage = () => {
  const { result, currentPage, getRijksmuseum } = useRijksmuseum();

  const [imagesOnly, setImagesOnly] = useState(false);
  const [topPieces, setTopPieces] = useState(false);
  const [searchColor, setSearchColor] = useState(false);
  const [term, setTerm] = useState("");
  const [color, setColor] = useState("");

  const onSubmit = () => {
    console.log("onSubmit", { imagesOnly, topPieces, term, color });
    getRijksmuseum({
      imagesOnly,
      topPieces,
      term,
      color,
      currentPage,
    });
  };

  useEffect(() => {
    getRijksmuseum({
      imagesOnly: true,
      topPieces: true,
      term: "rembrandt",
      currentPage: currentPage,
    });
  }, []);

  console.log(result);

  return (
    <div className={styles.contentContainer}>
      <div>
        <div className={styles.filterContainer}>
          <h2>Options</h2>

          <div className={styles.form}>
            <Checkbox
              label="Images Only"
              checked={imagesOnly}
              onChange={(val) => setImagesOnly(val)}
            />

            <Checkbox
              label="Top Pieces"
              checked={topPieces}
              onChange={(val) => setTopPieces(val)}
            />

            <div>
              <label htmlFor="term">Term</label>
              <input
                onChange={(ev) => {
                  setTerm(ev.target.value);
                }}
                type="input"
                id="term"
                name="term"
              />
            </div>

            <Checkbox
              label="Search by Color"
              checked={searchColor}
              onChange={(val) => setSearchColor(val)}
            />

            {searchColor && (
              <div>
                <label htmlFor="color">Color</label>
                <input
                  onChange={(ev) => {
                    setColor(ev.target.value);
                  }}
                  type="color"
                  id="color"
                  name="color"
                />
              </div>
            )}

            <button onClick={onSubmit} className={styles.searchButton}>
              Apply Filters
            </button>
          </div>
        </div>

        <div className={styles.resultsContainer}>
          <div className={styles.tags}>
            <Tag>Images Only: {imagesOnly.toString()}</Tag>
            <Tag>Top Pieces: {topPieces.toString()}</Tag>
            <Tag>Term: {term}</Tag>
            <Tag>Color: {color}</Tag>
          </div>

          <div className={styles.results}>
            {result && result.length && (
              <>
                {result.map((art) => (
                  <ArtPiece
                    key={art.id}
                    imgUrl={art.webImage?.url}
                    title={art.title}
                    subtitle={art.longTitle}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
