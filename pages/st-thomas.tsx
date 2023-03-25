import { FragmentType, graphql, useFragment } from "src/gql";
import client from "graphql-client";
import { SttPageQuery } from "src/gql/graphql";
import { GetStaticProps } from "next";
import { Marsonry } from "components/masonry";
import { ImageFragment } from "components/image-asset";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "components/page-container";

const sttPage = graphql(/* GraphQL */ `
  query sttPage($slug: String!) {
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

const getSttPage = () =>
  client.request(sttPage, {
    slug: "st-thomas",
  });

type PageProps = {
  data: SttPageQuery;
};

const assetQuery = graphql(`
  query imageAsset($id: ID!, $size: Int!) {
    asset(where: { id: $id }) {
      url(transformation: { image: { resize: { width: $size } } })
      description
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
      size: 5000,
    });
  });

  if (!data?.asset?.url) return null;

  return <img src={data?.asset?.url} />;
};

export default function SttPage({ data }: PageProps) {
  const page = data.pages[0];

  return (
    <PageContainer>
      <Marsonry>
        {page.images.map((image, idx) => (
          <STTImage key={idx} image={image} />
        ))}
      </Marsonry>
    </PageContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getSttPage();

  return {
    props: { data },
  };
};
