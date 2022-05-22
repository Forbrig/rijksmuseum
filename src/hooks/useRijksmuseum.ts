import { useState } from "react";

interface getRijksmuseumProps {
  imagesOnly: boolean;
  topPieces: boolean;
  term: string;
  color?: string;
  currentPage: number;
}

export const useRijksmuseum = () => {
  const [data, setData] = useState<any[]>([]);

  const getRijksmuseum = async ({
    imagesOnly,
    topPieces,
    term,
    color,
    currentPage,
  }: getRijksmuseumProps) => {
    const query = {
      p: currentPage.toString(),
      ps: "4",
      key: "c4ULvZBV",
      q: term,
      imgonly: imagesOnly.toString(),
      toppieces: topPieces.toString(),
    };
    // "f.normalized32Colors.hex": color,
    // color && query["f.normalized32Colors.hex"] = color;

    const response = await fetch(
      "https://www.rijksmuseum.nl/api/nl/collection?" +
        new URLSearchParams(query),
      {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache",
      }
    );
    // url: "https://www.rijksmuseum.nl/api/nl/collection",
    // `https://www.rijksmuseum.nl/api/nl/collection?key=c4ULvZBV&involvedMaker=Rembrandt+van+Rijn`

    const data = await response.json();

    await setData(data.artObjects);
  };

  return { getRijksmuseum, data };
};
