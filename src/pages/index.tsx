import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = ({ results }: any) => {
  return (
    <div>
      {results && (
        <Image
          src={results.artObjects[0].headerImage.url}
          alt=""
          width={600}
          height={200}
        />
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const response = await fetch(
    `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.API_KEY_RIJKMUSEUM}&involvedMaker=Rembrandt+van+Rijn`
  );

  const data = await response.json();

  console.log(data);

  return {
    props: {
      results: data,
    },
  };
}

export default Home;
