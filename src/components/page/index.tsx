import Head from "components/head";
import Navigation from "components/navigation";
import PageContainer from "components/page-container";
import { SeoFragment } from "components/head";
import { WithChildren } from "src/types";
import { FragmentType } from "src/gql";

type Props = {
  seo: FragmentType<typeof SeoFragment>;
  hideNavigation?: boolean;
} & WithChildren;

const Page = ({ children, seo, hideNavigation = false }: Props) => {
  return (
    <PageContainer>
      {!hideNavigation && <Navigation />}
      <Head seo={seo} />
      {children}
    </PageContainer>
  );
};

export default Page;
