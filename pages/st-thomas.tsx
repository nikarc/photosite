import { FragmentType, graphql, useFragment } from "src/gql";
import client from "graphql-client";
import { SttPageQuery } from "src/gql/graphql";
import { GetStaticProps } from "next";
import { Marsonry } from "components/masonry";
import { ImageFragment } from "components/image-asset";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Page from "components/page";

const sttPage = graphql(/* GraphQL */ `
  query sttPage($slug: String!) {
    pages(first: 1, where: { seo: { slug: $slug } }) {
      seo {
        ...HeadItems
      }
      images(first: 35) {
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

const STTImage: React.FC<{ image: FragmentType<typeof ImageFragment> }> = ({
  image,
}) => {
  const imageFragment = useFragment(ImageFragment, image);
  const { data } = useQuery([`asset-${imageFragment.file?.id}`], () => {
    if (!imageFragment.file) return null;

    return client.request(assetQuery, {
      id: imageFragment.file.id,
    });
  });

  if (!data?.asset?.url) return null;

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: `${data.asset.width} / ${data.asset.height}`,
      }}
    >
      <a href={data?.asset?.url} rel="noopener noreferrer" target="_blank">
        <Image
          src={data?.asset?.thumbnail}
          alt={data.asset.description ?? ""}
          layout="fill"
        />
      </a>
    </div>
  );
};

export default function SttPage({ data }: PageProps) {
  const page = data.pages[0];

  return (
    <Page seo={page.seo} hideNavigation>
      <Marsonry>
        {page.images.map((image, idx) => (
          <STTImage key={idx} image={image} />
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
