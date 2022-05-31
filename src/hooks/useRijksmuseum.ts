import { useState } from "react";

interface getCollectionProps {
  imagesOnly: boolean;
  topPieces: boolean;
  term: string;
  searchColor: boolean;
  color: string;
  currentPage: number;
}

export const useRijksmuseum = () => {
  const [result, setResult] = useState<any[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [principalMakers, setPrincipalMakers] = useState<string[]>([]);

  const getCollection = async ({
    imagesOnly,
    topPieces,
    term,
    searchColor,
    color,
    currentPage,
  }: getCollectionProps) => {
    const query = {
      p: currentPage.toString(),
      ps: "6",
      key: process.env.NEXT_PUBLIC_RIJKMUSEUM_API_KEY as string,
      q: term,
      imgonly: imagesOnly.toString(),
      toppieces: topPieces.toString(),
    };

    if (searchColor) {
      Object.assign(query, { "f.normalized32Colors.hex": color });
    }

    await fetch(
      "https://www.rijksmuseum.nl/api/en/collection?" +
        new URLSearchParams(query),
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setResult(res.artObjects);
      });
  };

  const getFilterOptions = async () => {
    const query = {
      p: "0",
      ps: "0",
      field: "qualification",
      key: process.env.NEXT_PUBLIC_RIJKMUSEUM_API_KEY as string,
    };

    await fetch(
      "https://www.rijksmuseum.nl/api/en/collection?" +
        new URLSearchParams(query),
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setPrincipalMakers(
          res.facets[0].facets.map((makers: any) => makers.key)
        );
        setColors(res.facets[6].facets.map((color: any) => color.key.trim("")));
      });
  };

  return {
    getCollection,
    getFilterOptions,
    result,
    colors,
    principalMakers,
  };
};
