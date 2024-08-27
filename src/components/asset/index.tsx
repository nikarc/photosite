import { useQuery } from "@tanstack/react-query";
import styles from "./asset.module.scss";
import { ImageAssetProps, ImageFragment } from "components/image-asset";
import client from "graphql-client";
import Image, { ImageProps } from "next/image";
import { graphql, useFragment } from "src/gql";

export enum ImageSize {
  Thumbnail = 375,
  Large = 5000,
}

type Props = {
  imageSize?: ImageSize;
  assetUrl?: string;
  objectFit?: NonNullable<ImageProps["style"]>["objectFit"];
} & Partial<ImageAssetProps>;

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
  assetUrl,
  ...imgProps
}: Props) {
  const imageFragment = useFragment(ImageFragment, image);

  const { data } = useQuery({
    queryKey: [`asset-${imageFragment?.file?.id}`],
    queryFn: () => {
      if (!imageFragment?.file) return null;

      return client.request(assetQuery, {
        id: imageFragment.file.id,
        size: imageSize,
      });
    },
    enabled: !!imageFragment?.file,
  });

  const { asset } = data ?? {};
  const _assetUrl = asset?.url ?? assetUrl;

  if (!_assetUrl) return null;

  return (
    <div className={styles.asset_wrap}>
      <Image
        className={styles.image}
        src={_assetUrl}
        alt={asset?.description ?? ""}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        {...imgProps}
      />
    </div>
  );
}
