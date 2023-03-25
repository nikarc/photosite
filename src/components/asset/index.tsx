import { useQuery } from "@tanstack/react-query";
import styles from "./asset.module.scss";
import { ImageAssetProps, ImageFragment } from "components/image-asset";
import client from "graphql-client";
import Image from "next/image";
import { graphql, useFragment } from "src/gql";

export enum ImageSize {
  Thumbnail = 375,
  Large = 5000,
}

type Props = {
  imageSize?: ImageSize;
} & ImageAssetProps;

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
  image,
}: Props) {
  const imageFragment = useFragment(ImageFragment, image);

  const { data } = useQuery([`asset-${imageFragment.file?.id}`], () => {
    if (!imageFragment.file) return null;

    return client.request(assetQuery, {
      id: imageFragment.file.id,
      size: imageSize,
    });
  });

  const { asset } = data ?? {};

  if (!asset?.url) return null;

  return (
    <div className={styles.asset_wrap}>
      <Image
        className={styles.image}
        src={asset.url}
        alt={asset.description ?? ""}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
}
