import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";

import styles from "./styles.module.scss";

const Art: NextPage = ({ art }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <img src={art.webImage.url} alt={art.title} />
        </div>
        <h2>{art.title}</h2>
        <span>{art.plaqueDescriptionEnglish}</span>
      </div>
    </div>
  );
};

export default Art;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;

  if (id) {
    try {
      const res = await fetch(
        `https://www.rijksmuseum.nl/api/en/collection/${id}?key=c4ULvZBV`
      );

      const data = await res.json();

      return {
        props: {
          art: data.artObject,
        },
      };
    } catch (error) {
      return {
        notFound: true,
        props: {},
      };
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
    props: {},
  };
};
