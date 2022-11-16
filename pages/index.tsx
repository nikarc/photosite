import { useQuery } from "@tanstack/react-query";
import client from "graphql-client";
import { graphql } from "src/gql";
import ImageAsset from "components/image-asset";
import styles from "styles/pages/home.module.scss";
import Page from "components/page";
import { GetStaticProps } from "next";
import { HomepageQuery } from "src/gql/graphql";

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

  return (
    <Page seo={pageData.seo}>
      <div className={styles.image_wrap}>
        {pageData.images.map((image, idx) => (
          <ImageAsset image={image} key={idx} />
        ))}
      </div>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getHomepage();

  return {
    props: { page },
  };
};
