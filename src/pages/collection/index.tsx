import { useEffect, useState } from "react";
import type { NextPage } from "next";
// import Image from "next/image";

import { useRijksmuseum } from "../../hooks/useRijksmuseum";
import { Checkbox } from "../../components/Checkbox";

import styles from "./styles.module.scss";
import { Tag } from "../../components/Tag";
import { ArtPiece } from "./components/ArtPiece";

const Collection: NextPage = () => {
  const { result, getRijksmuseum } = useRijksmuseum();
  const [currentPage, setCurrentPage] = useState(1);

  const [imagesOnly, setImagesOnly] = useState(true);
  const [topPieces, setTopPieces] = useState(true);
  const [searchColor, setSearchColor] = useState(false);
  const [term, setTerm] = useState("rembrandt");
  const [color, setColor] = useState("");

  const onSubmit = async () => {
    console.log(imagesOnly, topPieces, term, color, currentPage);

    await getRijksmuseum({
      imagesOnly,
      topPieces,
      term,
      color,
      currentPage,
    });
  };

  useEffect(() => {
    getRijksmuseum({
      imagesOnly,
      topPieces,
      term,
      currentPage,
    });
  }, [currentPage]);

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
                value={term}
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
            {result && (
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

            <div className={styles.pagination}>
              {currentPage !== 1 && (
                <button
                  onClick={async () => {
                    await setCurrentPage(currentPage - 1);
                  }}
                >
                  Prev
                </button>
              )}

              <div className={styles.paginationNumber}>{currentPage}</div>

              <button
                onClick={async () => {
                  await setCurrentPage(currentPage + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
