import gql from 'graphql-tag';
import { FRAGMENT_GROUP_ALL_FIELDS } from './fragments';

export const ME = gql`
  query me {
    me {
      id
      email
      firstName
      lastName
      verified
      role
      baselineLink
      formDone
      group {
        ...GroupAllFields
      }
    }
  }
  ${FRAGMENT_GROUP_ALL_FIELDS}
`;

export const ALL_GROUPS = gql`
  query allGroups {
    allGroups {
      ...GroupAllFields
    }
  }
  ${FRAGMENT_GROUP_ALL_FIELDS}
`;

export const GET_SIGNUP_LINK = gql`
  query getSignupLink($groupId: Int!, $expireAt: DateTime!) {
    getSignupLink(groupId: $groupId, expireAt: $expireAt) {
      url
      token
    }
  }
`;

export const ALL_SURVEYS = gql`
  query allSurveys {
    allSurveys {
      id
      name
      isActive
    }
  }
`;

export const JOB_SEARCH_HINTS = gql`
  query jobSearchHints($query: String!, $limit: Int!) {
    jobSearchHints(query: $query, limit: $limit) {
      id
      avam
      bfs
      isco08
      title
    }
  }
`;

export const RECOMMENDATIONS = gql`
  query recommendations($oldJobIsco08: Int!, $alpha: Float!, $beta: Float!) {
    recommendations(oldJobIsco08: $oldJobIsco08, alpha: $alpha, beta: $beta) {
      varList
      results {
        jobTitle
        isco08
        avam
        bfs
      }
    }
  }
`;

export const POSITIONS = gql`
  query positions($professionCodes: [Int]!, $page: Int!) {
    positions(professionCodes: $professionCodes, page: $page) {
      totalCount
      positions {
        id
        jobQuantity
        company {
          name
          city
          street
          postalCode
          houseNumber
          countryCode
        }
        employment {
          startDate
          endDate
          immediately
          permanent
          workloadPercMin
          workloadPercMax
        }
        location {
          city
          countryCode
          cantonCode
        }
        contact {
          salutation
          firstName
          lastName
          phone
          email
        }
        descriptions {
          languageCode
          title
          description
        }
      }
    }
  }
`;
