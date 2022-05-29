import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterFields } from "../..";

import { Checkbox } from "../../../../components/Checkbox";
import { useRijksmuseum } from "../../../../hooks/useRijksmuseum";

import styles from "./styles.module.scss";

interface FilterProps {
  onSubmit: () => void;
  filterOptions: FilterFields;
  setFilterOptions: Dispatch<SetStateAction<FilterFields>>;
}

export function Filter({
  onSubmit,
  filterOptions,
  setFilterOptions,
}: FilterProps) {
  const { colors, getFilterOptions } = useRijksmuseum();

  useEffect(() => {
    getFilterOptions();
  }, []);

  return (
    <div className={styles.filter}>
      <h2>Options</h2>

      <div className={styles.form}>
        <Checkbox
          label="Images Only"
          checked={filterOptions.imagesOnly}
          onChange={(val) =>
            setFilterOptions((prevState) => ({
              ...prevState,
              imagesOnly: val,
            }))
          }
        />

        <Checkbox
          label="Top Pieces"
          checked={filterOptions.topPieces}
          onChange={(val) =>
            setFilterOptions((prevState) => ({
              ...prevState,
              topPieces: val,
            }))
          }
        />

        <div>
          <label htmlFor="term">Term</label>
          <input
            onChange={(ev) => {
              setFilterOptions((prevState) => ({
                ...prevState,
                term: ev.target.value,
              }));
            }}
            value={filterOptions.term}
            type="input"
            id="term"
            name="term"
          />
        </div>

        {/* {principalMakers && (
              <div>
                <label htmlFor="maker">Maker</label>

                <select id="maker" name="maker">
                  <option>-- Select a Maker --</option>

                  {principalMakers.map((maker, index) => (
                    <option key={index}>{maker}</option>
                  ))}
                </select>
              </div>
            )} */}

        <Checkbox
          label="Search by Color"
          checked={filterOptions.searchColor}
          onChange={(val) =>
            setFilterOptions((prevState) => ({
              ...prevState,
              searchColor: val,
            }))
          }
        />

        {filterOptions.searchColor && (
          <div>
            <label htmlFor="color">Color</label>
            <div className={styles.colors}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={styles.color}
                  onClick={() =>
                    setFilterOptions((prevState) => ({
                      ...prevState,
                      color: color,
                    }))
                  }
                  style={{
                    backgroundColor: `${color}`,
                    height: "20px",
                    width: "20px",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <button onClick={onSubmit} className={styles.searchButton}>
          Apply Filters
        </button>
      </div>
    </div>
  );
}
