import { useState } from "react";

interface getRijksmuseumProps {
  imagesOnly: boolean;
  topPieces: boolean;
  term: string;
  color?: string;
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

  const getRijksmuseum = async ({
    imagesOnly,
    topPieces,
    term,
    color,
    currentPage,
  }: getRijksmuseumProps) => {
    const query = {
      p: currentPage.toString(),
      ps: "6",
      key: "c4ULvZBV",
      q: term,
      imgonly: imagesOnly.toString(),
      toppieces: topPieces.toString(),
    };
    // "f.normalized32Colors.hex": color,
    // color && query["f.normalized32Colors.hex"] = color;

    await fetch(
      "https://www.rijksmuseum.nl/api/nl/collection?" +
        new URLSearchParams(query),
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
      }
    )
      .then((res) => res.json())
      .then((res) => setResult(res.artObjects));
    // url: "https://www.rijksmuseum.nl/api/nl/collection",
    // `https://www.rijksmuseum.nl/api/nl/collection?key=c4ULvZBV&involvedMaker=Rembrandt+van+Rijn`
  };

  return { getRijksmuseum, result, currentPage, currentQuery };
};
