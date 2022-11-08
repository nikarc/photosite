import { useQuery } from "@tanstack/react-query";
import { graphql } from "src/gql";
import NavLink from "./link";
import client from "graphql-client";
import { NavigationQuery } from "src/gql/graphql";
import styles from "./navigation.module.css";

const navigation = graphql(/* GraphQL */ `
  query Navigation {
    navigations(first: 1) {
      links(first: 5) {
        ...LinkItem
      }
    }
  }
`);

export default function() {
  const { data } = useQuery(["navigation"], async () =>
    client.request<NavigationQuery | undefined>(navigation)
  );

  return (
    <div className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {data &&
          data.navigations[0].links.map((link, idx) => (
            <NavLink link={link} key={`${link.__typename}-${idx}`} />
          ))}
      </ul>
    </div>
  );
}
