/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query Navigation {\n    navigations(first: 1) {\n      links(first: 5) {\n        ...LinkItem\n      }\n    }\n  }\n": types.NavigationDocument,
    "\n  fragment LinkItem on Link {\n    text\n    url\n    id\n  }\n": types.LinkItemFragmentDoc,
};

export function graphql(source: "\n  query Navigation {\n    navigations(first: 1) {\n      links(first: 5) {\n        ...LinkItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query Navigation {\n    navigations(first: 1) {\n      links(first: 5) {\n        ...LinkItem\n      }\n    }\n  }\n"];
export function graphql(source: "\n  fragment LinkItem on Link {\n    text\n    url\n    id\n  }\n"): (typeof documents)["\n  fragment LinkItem on Link {\n    text\n    url\n    id\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;