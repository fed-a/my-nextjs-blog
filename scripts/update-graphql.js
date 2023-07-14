const fs = require('fs');
const path = require('path');

const GRAPHQL_PATH = '../src/gql/graphql.ts';

let content = fs.readFileSync(path.join(__dirname, GRAPHQL_PATH), {
  encoding: 'utf8',
  flag: 'r',
});

content = 'import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"\r\n' + content;
content = content.replaceAll('Apollo.useQuery', 'useQuery');

fs.writeFileSync(path.join(__dirname, GRAPHQL_PATH), content);
