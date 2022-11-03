/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query Navigation {\n  navigations(first: 1) {\n    links(first: 5) {\n      text\n      url\n      id\n    }\n  }\n}": types.NavigationDocument,
};

export function graphql(source: "query Navigation {\n  navigations(first: 1) {\n    links(first: 5) {\n      text\n      url\n      id\n    }\n  }\n}"): (typeof documents)["query Navigation {\n  navigations(first: 1) {\n    links(first: 5) {\n      text\n      url\n      id\n    }\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;