import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL ?? "", {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
  },
});

export default client;
