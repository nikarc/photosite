import Image from "next/image";
import { FragmentType, graphql, useFragment } from "src/gql";
import styles from "./image-asset.module.css";

export const ImageFragment = graphql(/* GraphQL */ `
  fragment ImageFragment on Image {
    tag
    file {
      url
      description
    }
  }
`);

const ImageAsset = (props: { image: FragmentType<typeof ImageFragment> }) => {
  const image = useFragment(ImageFragment, props.image);
  const { url, description } = image.file ?? {};

  return (
    <div className={styles.image_asset}>
      {url && (
        <Image
          src={url}
          alt={description ?? ""}
          layout="fill"
          objectFit="cover"
        />
      )}
    </div>
  );
};

export default ImageAsset;
