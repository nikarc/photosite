import { FragmentType, graphql, useFragment } from "src/gql";
import styles from "./link.module.css";

export const LinkFragment = graphql(/* GraphQL */ `
  fragment LinkItem on Link {
    text
    url
    id
  }
`);

const NavLink = (props: { link: FragmentType<typeof LinkFragment> }) => {
  const link = useFragment(LinkFragment, props.link);
  return (
    <a href={link.url} className={styles.link}>
      {link.text}
    </a>
  );
};

export default NavLink;
