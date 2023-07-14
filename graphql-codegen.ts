import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STRAPI_ENDPOINT_GRAPHQL}`,
  documents: './src/gql/documents/**/*.graphql',
  generates: {
    'src/gql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
