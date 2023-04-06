import { FragmentType, graphql, useFragment } from "src/gql";
import "primeicons/primeicons.css";
import client from "graphql-client";
import { SttPageQuery } from "src/gql/graphql";
import { GetStaticProps } from "next";
import { Marsonry } from "components/masonry";
import { ImageFragment } from "components/image-asset";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Page from "components/page";
import LightBox from "components/light-box";
import styles from "styles/pages/st-thomas.module.scss";

const sttPage = graphql(/* GraphQL */ `
  query sttPage($slug: String!) {
    pages(first: 1, where: { seo: { slug: $slug } }) {
      seo {
        ...HeadItems
      }
      images(first: 40) {
        ... on Image {
          file {
            updatedAt
          }
        }
        ...ImageFragment
      }
    }
  }
`);

const getSttPage = () =>
  client.request(sttPage, {
    slug: "st-thomas",
  });

type PageProps = {
  data: SttPageQuery;
};

const assetQuery = graphql(`
  query sttImageAsset($id: ID!) {
    asset(where: { id: $id }) {
      url(transformation: { image: { resize: { width: 6000 } } })
      thumbnail: url(transformation: { image: { resize: { width: 1000 } } })
      description
      width
      height
    }
  }
`);

const STTImage: React.FC<{
  image: FragmentType<typeof ImageFragment>;
  idx: number;
}> = ({ image, idx }) => {
  const imageFragment = useFragment(ImageFragment, image);
  const { data } = useQuery([`asset-${imageFragment.file?.id}`], () => {
    if (!imageFragment.file) return null;

    return client.request(assetQuery, {
      id: imageFragment.file.id,
    });
  });

  if (!data?.asset?.url) return null;

  return (
    <>
      <div
        style={{
          aspectRatio: `${data.asset.width} / ${data.asset.height}`,
          display: "flex",
          paddingBottom: 50,
        }}
      >
        <p
          style={{
            color: "white",
            marginTop: 16,
            marginBottom: 16,
            marginRight: 4,
            paddingRight: 8,
            borderRight: "1px solid white",
          }}
        >
          {idx + 1}
        </p>
        <LightBox
          style={{ width: "100%" }}
          fullSizeImage={
            <div
              className={styles.modal__image_wrap}
              style={{
                aspectRatio: `${data.asset.width} / ${data.asset.height}`,
              }}
            >
              <Image
                className={styles.modal__image}
                src={data?.asset?.url}
                alt={data.asset.description ?? ""}
                layout="fill"
              />
            </div>
          }
        >
          <Image
            src={data?.asset?.thumbnail}
            alt={data.asset.description ?? ""}
            layout="fill"
          />
        </LightBox>
      </div>
    </>
  );
};

export default function SttPage({ data }: PageProps) {
  const page = data.pages[0];

  return (
    <Page seo={page.seo} hideNavigation>
      <Marsonry>
        {page.images
          .sort((a, b) =>
            new Date(a.file?.updatedAt) < new Date(b.file?.updatedAt) ? 1 : -1
          )
          .map((image, idx) => (
            <STTImage key={idx} idx={idx} image={image} />
          ))}
      </Marsonry>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getSttPage();

  return {
    props: { data },
  };
};
