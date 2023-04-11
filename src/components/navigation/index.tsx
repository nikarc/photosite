import { useQuery } from "@tanstack/react-query";
import { graphql } from "src/gql";
import NavLink from "./link";
import client from "graphql-client";
import { NavigationQuery } from "src/gql/graphql";
import styles from "./navigation.module.scss";
import { SITE_TITLE } from "src/constants";
import { useEffect, useRef, useState } from "react";
import { Variant } from "framer-motion";

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
  const previousScroll = useRef(0);
  const [isMiniNav, setIsMiniNav] = useState(false);

  const { data } = useQuery(["navigation"], async () =>
    client.request<NavigationQuery | undefined>(navigation)
  );

  const year = new Date().getFullYear();

  const navVariant = {
    full: {
      width: "300px",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    mini: {
      width: "50px",
      transition: {
        when: "afterChildren",
      },
    },
  };

  const linkVariant = {
    full: {
      opacity: 1,
    },
    mini: {
      opacity: 0,
    },
  };

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const scrollEl = document.querySelector("#__next") as HTMLElement;

    const onScroll = () => {
      const { scrollTop } = scrollEl;

      if (scrollTop > previousScroll.current && scrollTop >= 0) {
        // Scrolling down
        document.documentElement.style.setProperty("--nav-width", "50px");
        setIsMiniNav(true);
      } else if (scrollTop < windowHeight - 50) {
        // Scrolling up
        document.documentElement.style.setProperty("--nav-width", "300px");
        setIsMiniNav(false);
      }

      previousScroll.current = scrollTop;
    };

    scrollEl.addEventListener("scroll", onScroll);

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={styles.navigation}>
      <h1 className={styles.page_title}>{SITE_TITLE}</h1>
      <ul className={styles.navigation__list}>
        {data &&
          data.navigations[0].links.map((link, idx) => (
            <NavLink
              isMini={isMiniNav}
              link={link}
              key={`${link.__typename}-${idx}`}
            />
          ))}
      </ul>
      <div className={styles.copyright}>
        ©{year} {SITE_TITLE}
      </div>
    </header>
  );
}
