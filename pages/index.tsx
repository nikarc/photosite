import { useQuery } from "@tanstack/react-query";
import client from "graphql-client";
import { graphql } from "src/gql";
import ImageAsset from "components/image-asset";
import styles from "styles/pages/home.module.css";
import Page from "components/page";

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

export default function Home() {
  const { data } = useQuery(["homepage"], async () =>
    client.request(homepage, {
      slug: "home",
    })
  );

  const page = data?.pages?.[0];
  if (!page) return (location.href = "/404");

  return (
    <Page seo={page.seo}>
      <div className={styles.image_wrap}>
        {page.images.map((image) => (
          <ImageAsset image={image} />
        ))}
      </div>
    </Page>
  );
}
