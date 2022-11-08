import { FragmentType, graphql, useFragment } from "src/gql";

export const HeadFragment = graphql(/* GraphQL */ `
  fragment HeadFragment on Seo {
    metaTitle
    metaDescription
    noIndex
    slug
    ogImage {
      url
      description
    }
  }
`);

const Head = (props: { head: FragmentType<typeof HeadFragment}) => {
  const headProps = useFragment(HeadFragment, props.head);

  return <></>
}

export default Head;
