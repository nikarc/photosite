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
  const { data } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepage,
    initialData: page,
  });

  const pageData = data?.pages?.[0];
  if (!pageData) return null;

  return (
    <Page
      fullWidthChildren={
        <div className={styles.image_wrap}>
          <Asset
            assetUrl="https://media.graphassets.com/drAQuAqiQNiMsXhrCjpm"
            objectFit="contain"
            imageSize={ImageSize.Large}
          />
        </div>
      }
      hideNavigation
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
