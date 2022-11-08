import { useQuery } from "@tanstack/react-query";
import Navigation from "components/navigation";
import client from "graphql-client";
import Head from "components/head";
import { graphql } from "src/gql";
import styles from "styles/pages/home.module.css";
import ImageAsset from "components/image-asset";
import PageContainer from "components/page-container";

const homepage = graphql(/* GraphQL */ `
  query homepage($slug: String!) {
    pages(first: 1, where: { seo: { slug: $slug } }) {
      images {
        ...ImageItem
      }
    }
  }
`);

export default function Home() {
  const { data } = useQuery(["homepage"], async () =>
    client.request(homepage, {
      slug: "home",
    })
  );
  const pageData = data?.pages?.[0];

  if (!pageData) return null;

  return (
    <PageContainer>
      <Navigation />
      {/*<Head head={data} />*/}

      <main>
        {pageData.images && (
          <div className={styles.image_wrap}>
            {pageData.images.map((image, idx) => (
              <ImageAsset image={image} key={`${image.__typename}-${idx}`} />
            ))}
          </div>
        )}
      </main>
    </PageContainer>
  );
}
