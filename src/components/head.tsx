import NextHead from "next/head";
import { FragmentType, graphql, useFragment } from "src/gql";

export const SeoFragment = graphql(/* GraphQL */ `
  fragment HeadItems on Seo {
    id
    metaTitle
    metaDescription
    noIndex
    slug
    ogImage {
      id
      url
      description
    }
  }
`);

const Head = (props: { seo: FragmentType<typeof SeoFragment> }) => {
  const seo = useFragment(SeoFragment, props.seo);

  return (
    <>
      <NextHead>
        <title>{seo.metaTitle}</title>
        <meta name="description" content={seo.metaDescription ?? ""} />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_SITE_DOMAIN ?? ""}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`Nick Arcuri Photo | ${seo.metaTitle}`}
        />
        <meta property="og:description" content={seo.metaDescription ?? ""} />
        <meta property="og:image" content={seo.ogImage?.url} />
      </NextHead>
    </>
  );
};

export default Head;
