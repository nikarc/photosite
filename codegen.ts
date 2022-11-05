import * as dotenv from "dotenv";
dotenv.config();

import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URL,
  documents: ["src/**/*.tsx", "!src/gql/**/*"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
