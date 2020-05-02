import gql from 'graphql-tag';

export const FRAGMENT_GROUP_ALL_FIELDS = gql`
  fragment GroupAllFields on Group {
    id
    name
    baselineId
    cruiserId
    uiConfig {
      search
      alphaFixed
      betaFixed
    }
  }
`;
