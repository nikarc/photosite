import { useQuery } from "@tanstack/react-query";
import { FragmentType, graphql, useFragment } from "src/gql";
import NavLink from "./link";
import client from "graphql-client";
import { NavigationQuery } from "src/gql/graphql";
import styles from "./navigation.module.scss";
import { SeoFragment } from "components/head";
import { SITE_TITLE } from "src/constants";

const navigation = graphql(/* GraphQL */ `
  query Navigation {
    navigations(first: 1) {
      links(first: 5) {
        ...LinkItem
      }
    }
  }
`);

export default function () {
  const { data } = useQuery(["navigation"], async () =>
    client.request<NavigationQuery | undefined>(navigation)
  );

  const year = new Date().getFullYear();

  return (
    <header className={styles.navigation}>
      <h1 className={styles.page_title}>{SITE_TITLE}</h1>
      <ul className={styles.navigation__list}>
        {data &&
          data.navigations[0].links.map((link, idx) => (
            <NavLink link={link} key={`${link.__typename}-${idx}`} />
          ))}
      </ul>
      <div className={styles.copyright}>
        ©{year} {SITE_TITLE}
      </div>
    </header>
  );
}
