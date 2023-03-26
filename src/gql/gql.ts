/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query homepage($slug: String!) {\n    pages(first: 1, where: { seo: { slug: $slug } }) {\n      seo {\n        ...HeadItems\n      }\n      images {\n        ...ImageFragment\n      }\n    }\n  }\n": types.HomepageDocument,
    "\n  query sttPage($slug: String!) {\n    pages(first: 1, where: { seo: { slug: $slug } }) {\n      seo {\n        ...HeadItems\n      }\n      images(first: 35) {\n        ...ImageFragment\n      }\n    }\n  }\n": types.SttPageDocument,
    "\n  query sttImageAsset($id: ID!) {\n    asset(where: { id: $id }) {\n      url(transformation: { image: { resize: { width: 6000 } } })\n      thumbnail: url(transformation: { image: { resize: { width: 1000 } } })\n      description\n      width\n      height\n    }\n  }\n": types.SttImageAssetDocument,
    "\n  query imageAsset($id: ID!, $size: Int!) {\n    asset(where: { id: $id }) {\n      url(transformation: { image: { resize: { width: $size } } })\n      description\n    }\n  }\n": types.ImageAssetDocument,
    "\n  fragment HeadItems on Seo {\n    id\n    metaTitle\n    metaDescription\n    noIndex\n    slug\n    ogImage {\n      id\n      url\n      description\n    }\n  }\n": types.HeadItemsFragmentDoc,
    "\n  fragment ImageFragment on Image {\n    tag\n    file {\n      id\n    }\n  }\n": types.ImageFragmentFragmentDoc,
    "\n  query Navigation {\n    navigations(first: 1) {\n      links(first: 5) {\n        ...LinkItem\n      }\n    }\n  }\n": types.NavigationDocument,
    "\n  fragment LinkItem on Link {\n    text\n    url\n    id\n  }\n": types.LinkItemFragmentDoc,
};

export function graphql(source: "\n  query homepage($slug: String!) {\n    pages(first: 1, where: { seo: { slug: $slug } }) {\n      seo {\n        ...HeadItems\n      }\n      images {\n        ...ImageFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query homepage($slug: String!) {\n    pages(first: 1, where: { seo: { slug: $slug } }) {\n      seo {\n        ...HeadItems\n      }\n      images {\n        ...ImageFragment\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query sttPage($slug: String!) {\n    pages(first: 1, where: { seo: { slug: $slug } }) {\n      seo {\n        ...HeadItems\n      }\n      images(first: 35) {\n        ...ImageFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query sttPage($slug: String!) {\n    pages(first: 1, where: { seo: { slug: $slug } }) {\n      seo {\n        ...HeadItems\n      }\n      images(first: 35) {\n        ...ImageFragment\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query sttImageAsset($id: ID!) {\n    asset(where: { id: $id }) {\n      url(transformation: { image: { resize: { width: 6000 } } })\n      thumbnail: url(transformation: { image: { resize: { width: 1000 } } })\n      description\n      width\n      height\n    }\n  }\n"): (typeof documents)["\n  query sttImageAsset($id: ID!) {\n    asset(where: { id: $id }) {\n      url(transformation: { image: { resize: { width: 6000 } } })\n      thumbnail: url(transformation: { image: { resize: { width: 1000 } } })\n      description\n      width\n      height\n    }\n  }\n"];
export function graphql(source: "\n  query imageAsset($id: ID!, $size: Int!) {\n    asset(where: { id: $id }) {\n      url(transformation: { image: { resize: { width: $size } } })\n      description\n    }\n  }\n"): (typeof documents)["\n  query imageAsset($id: ID!, $size: Int!) {\n    asset(where: { id: $id }) {\n      url(transformation: { image: { resize: { width: $size } } })\n      description\n    }\n  }\n"];
export function graphql(source: "\n  fragment HeadItems on Seo {\n    id\n    metaTitle\n    metaDescription\n    noIndex\n    slug\n    ogImage {\n      id\n      url\n      description\n    }\n  }\n"): (typeof documents)["\n  fragment HeadItems on Seo {\n    id\n    metaTitle\n    metaDescription\n    noIndex\n    slug\n    ogImage {\n      id\n      url\n      description\n    }\n  }\n"];
export function graphql(source: "\n  fragment ImageFragment on Image {\n    tag\n    file {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment ImageFragment on Image {\n    tag\n    file {\n      id\n    }\n  }\n"];
export function graphql(source: "\n  query Navigation {\n    navigations(first: 1) {\n      links(first: 5) {\n        ...LinkItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query Navigation {\n    navigations(first: 1) {\n      links(first: 5) {\n        ...LinkItem\n      }\n    }\n  }\n"];
export function graphql(source: "\n  fragment LinkItem on Link {\n    text\n    url\n    id\n  }\n"): (typeof documents)["\n  fragment LinkItem on Link {\n    text\n    url\n    id\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;