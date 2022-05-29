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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentQuery, setCurrentQuery] = useState({
    imagesOnly: false,
    topPieces: false,
    term: "",
    color: "",
  });

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
      key: "c4ULvZBV",
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
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        setResult(res.artObjects);
      });
    // url: "https://www.rijksmuseum.nl/api/nl/collection",
    // `https://www.rijksmuseum.nl/api/nl/collection?key=c4ULvZBV&involvedMaker=Rembrandt+van+Rijn`
  };

  const getFilterOptions = async () => {
    const query = {
      q: "",
      field: "qualification",
      key: "c4ULvZBV",
    };

    //www.rijksmuseum.nl/en/search/advanced/terms?field=qualification&q=
    await fetch(
      "https://www.rijksmuseum.nl/api/en/collection?" +
        new URLSearchParams(query),
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        setPrincipalMakers(
          res.facets[0].facets.map((makers: any) => makers.key)
        );
        setColors(res.facets[6].facets.map((color: any) => color.key.trim("")));

        // setResult(res.artObjects);
      });
    // url: "https://www.rijksmuseum.nl/api/nl/collection",
    // `https://www.rijksmuseum.nl/api/nl/collection?key=c4ULvZBV&involvedMaker=Rembrandt+van+Rijn`
  };

  return {
    getCollection,
    getFilterOptions,
    result,
    colors,
    principalMakers,
    currentPage,
    currentQuery,
  };
};
