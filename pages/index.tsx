import { useQuery } from "@tanstack/react-query";
import client from "graphql-client";
import { graphql } from "src/gql";
import styles from "styles/pages/home.module.scss";
import Page from "components/page";
import { GetStaticProps } from "next";
import { HomepageQuery } from "src/gql/graphql";
import Asset, { ImageSize } from "components/asset";

const homepage = graphql(/* GraphQL */ `
  query homepage($slug: String!) {
    pages(first: 1, where: { seo: { slug: $slug } }) {
      seo {
        ...HeadItems
      }
      images {
        ...ImageFragment
      }
    }
  }
`);

const getHomepage = () =>
  client.request(homepage, {
    slug: "home",
  });

type PageProps = {
  page: HomepageQuery;
};

export default function Home({ page }: PageProps) {
  const { data } = useQuery(["homepage"], getHomepage, {
    initialData: page,
  });

  const pageData = data?.pages?.[0];
  if (!pageData) return null;

  const heroImage = pageData.images[0];

  return (
    <Page
      hero={<Asset imageSize={ImageSize.Large} image={heroImage} />}
      fullWidthChildren={
        <>
          {pageData.images.map((image, idx) => (
            <div className={styles.image_wrap} key={idx}>
              <Asset imageSize={ImageSize.Large} image={image} />
            </div>
          ))}
        </>
      }
      seo={pageData.seo}
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getHomepage();

  return {
    props: { page },
  };
};
