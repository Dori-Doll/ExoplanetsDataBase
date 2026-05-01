/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Planet = {
  __typename?: 'Planet';
  disc_year?: Maybe<Scalars['Int']['output']>;
  hostname: Scalars['String']['output'];
  pl_bmasse?: Maybe<Scalars['Float']['output']>;
  pl_name: Scalars['String']['output'];
  sy_dist?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  planets: Array<Planet>;
};

export type GetPlanetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlanetsQuery = { planets: Array<{ pl_name: string, hostname: string, disc_year: number | null, pl_bmasse: number | null, sy_dist: number | null }> };


export const GetPlanetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlanets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pl_name"}},{"kind":"Field","name":{"kind":"Name","value":"hostname"}},{"kind":"Field","name":{"kind":"Name","value":"disc_year"}},{"kind":"Field","name":{"kind":"Name","value":"pl_bmasse"}},{"kind":"Field","name":{"kind":"Name","value":"sy_dist"}}]}}]}}]} as unknown as DocumentNode<GetPlanetsQuery, GetPlanetsQueryVariables>;