import React from "react";
import Head from "components/head";
import Navigation from "components/navigation";
import PageContainer from "components/page-container";
import { SeoFragment } from "components/head";
import { WithChildren } from "src/types";
import { FragmentType } from "src/gql";

type Props = {
  seo: FragmentType<typeof SeoFragment>;
  hideNavigation?: boolean;
  fullWidthChildren?: React.ReactNode;
} & WithChildren;

const Page = ({
  children,
  seo,
  hideNavigation = false,
  fullWidthChildren,
}: Props) => {
  return (
    <>
      <Head seo={seo} />
      {!hideNavigation && (
        <PageContainer>
          <Navigation />
        </PageContainer>
      )}
      {React.Children.count(children) > 0 && (
        <PageContainer>{children}</PageContainer>
      )}
      {fullWidthChildren}
    </>
  );
};

export default Page;
