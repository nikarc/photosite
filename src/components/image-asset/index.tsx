import Asset, { ImageSize } from "components/asset";
import LightBox from "components/light-box";
import { FragmentType, graphql, useFragment } from "src/gql";
import styles from "./image-asset.module.scss";

export const ImageFragment = graphql(/* GraphQL */ `
  fragment ImageFragment on Image {
    tag
    file {
      id
      updatedAt
    }
  }
`);

export type ImageAssetProps = { image: FragmentType<typeof ImageFragment> };

export default function ImageAsset({ image }: ImageAssetProps) {
  return (
    <div className={styles.image_asset}>
      <LightBox
        fullSizeImage={<Asset image={image} imageSize={ImageSize.Large} />}
      >
        <Asset image={image} />
      </LightBox>
    </div>
  );
}
