import React from "react";
import Head from "components/head";
import Navigation from "components/navigation";
import PageContainer from "components/page-container";
import { SeoFragment } from "components/head";
import { WithChildren } from "src/types";
import { FragmentType } from "src/gql";
import styles from "./page.module.scss";

type Props = {
  seo: FragmentType<typeof SeoFragment>;
  hideNavigation?: boolean;
  fullWidthChildren?: React.ReactNode;
  hero?: React.ReactNode;
} & WithChildren;

const Page = ({
  children,
  fullWidthChildren,
  hero,
  hideNavigation = false,
  seo,
}: Props) => {
  return (
    <>
      <Head seo={seo} />
      {!hideNavigation && (
        <div className={styles.hero__wrap}>
          <Navigation />
          {hero}
        </div>
      )}
      {React.Children.count(children) > 0 && (
        <PageContainer>{children}</PageContainer>
      )}
      {fullWidthChildren}
    </>
  );
};

export default Page;
