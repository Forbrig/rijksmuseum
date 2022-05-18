import { useState } from "react";

export const useRijksmuseum = () => {
  const [data, setData] = useState<any[]>([]);

  const getRijksmuseum = async () => {
    const response = await fetch(
      `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.API_KEY_RIJKMUSEUM}&involvedMaker=Rembrandt+van+Rijn`
    );

    const data = await response.json();

    console.log(data);

    await setData(data.artObjects);
  };

  return { getRijksmuseum, data };
};
