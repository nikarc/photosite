import { useQuery } from "@tanstack/react-query";
import client from "graphql-client";
import Image from "next/image";
import { graphql } from "src/gql";

export enum ImageSize {
  Thumbnail = 375,
  Large = 5000,
}

type Props = {
  imageSize?: ImageSize;
  imageId: string;
};

const assetQuery = graphql(`
  query imageAsset($id: ID!, $size: Int!) {
    asset(where: { id: $id }) {
      url(transformation: { image: { resize: { width: $size } } })
      description
    }
  }
`);

export default function Asset({
  imageSize = ImageSize.Thumbnail,
  imageId,
}: Props) {
  const { data } = useQuery([`asset-${imageId}`], () =>
    client.request(assetQuery, {
      id: imageId,
      size: imageSize,
    })
  );

  const { asset } = data ?? {};

  if (!asset?.url) return null;

  if (imageSize === ImageSize.Large) {
    return <img src={asset.url} alt={asset.description ?? ""} />;
  }

  return (
    <Image
      src={asset.url}
      alt={asset.description ?? ""}
      layout="fill"
      objectFit="cover"
    />
  );
}
