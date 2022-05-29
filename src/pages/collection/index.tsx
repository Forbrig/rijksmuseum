import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { useRijksmuseum } from "../../hooks/useRijksmuseum";

import { Tag } from "../../components/Tag";
import { ArtPiece } from "../../components/pages/collection/components/ArtPiece";
import { Filter } from "./components/Filter";

import styles from "./styles.module.scss";

export interface FilterFields {
  imagesOnly: boolean;
  topPieces: boolean;
  term: string;
  searchColor: boolean;
  color: string;
}

const Collection: NextPage = () => {
  const { result, getCollection } = useRijksmuseum();
  const [currentPage, setCurrentPage] = useState(1);

  const [filterOptions, setFilterOptions] = useState<FilterFields>({
    imagesOnly: true,
    topPieces: true,
    term: "rembrandt",
    searchColor: false,
    color: "",
  });

  const onSubmit = async () => {
    await getCollection({
      ...filterOptions,
      currentPage,
    });
  };

  useEffect(() => {
    getCollection({
      ...filterOptions,
      currentPage,
    });
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div>
        <Filter
          onSubmit={onSubmit}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />

        <div className={styles.results}>
          <div className={styles.tags}>
            <Tag>Images Only: {filterOptions.imagesOnly.toString()}</Tag>
            <Tag>Top Pieces: {filterOptions.topPieces.toString()}</Tag>
            <Tag>Term: {filterOptions.term}</Tag>
            {filterOptions.searchColor && (
              <Tag>
                Color: {filterOptions.color}{" "}
                <div
                  style={{
                    backgroundColor: `${filterOptions.color}`,
                    height: "20px",
                    width: "20px",
                    marginLeft: "4px",
                  }}
                />
              </Tag>
            )}
          </div>

          <div className={styles.arts}>
            {result && (
              <>
                {result.map((art, index) => (
                  <ArtPiece
                    key={index}
                    objectNumber={art.objectNumber}
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
