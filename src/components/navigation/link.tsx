import { FragmentType, graphql, useFragment } from "src/gql";
import styles from "./link.module.css";

export const LinkFragment = graphql(/* GraphQL */ `
  fragment LinkItem on Link {
    text
    url
    id
  }
`);

type Props = {
  link: FragmentType<typeof LinkFragment>;
  isMini?: boolean;
};

const NavLink = (props: Props) => {
  const link = useFragment(LinkFragment, props.link);

  return (
    <a href={link.url} className={styles.link}>
      {props.isMini
        ? link.text
          .replace(/and/g, "&")
          .toUpperCase()
          .split(" ")
          .map((word) => word.charAt(0))
          .join(" ")
        : link.text}
    </a>
  );
};

export default NavLink;
