import Head from "components/head";
import Navigation from "components/navigation";
import PageContainer from "components/page-container";
import { SeoFragment } from "components/head";
import { WithChildren } from "src/types";
import { FragmentType } from "src/gql";

type Props = { seo: FragmentType<typeof SeoFragment> } & WithChildren;

const Page = (props: Props) => {
  return (
    <PageContainer>
      <Navigation />
      <Head seo={props.seo} />
      {props.children}
    </PageContainer>
  );
};

export default Page;
