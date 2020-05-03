import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import pick from 'lodash/pick';
import { RECOMMENDATIONS } from 'gql/queries';
import { useAuth } from 'hooks/auth';

export default () => {
  const [recomVariables, setRecomVariables] = useState(undefined);
  const { accessToken } = useAuth();

  console.log(recomVariables);
  const { oldJobData } = pick(recomVariables, ['oldJobData.isco08', 'oldJobData.title']);
  console.log(oldJobData);
  const variables = pick(recomVariables, ['alpha', 'beta']);
  variables.oldJobIsco08 = !oldJobData || oldJobData.isco08;
  variables.oldJobTitle = !oldJobData || oldJobData.title;
  console.log(variables);

  const { loading, error, data } = useQuery(RECOMMENDATIONS, {
    skip: !recomVariables,
    variables,
    context: {
      headers: {
        accessToken,
      },
    },
  });

  if (loading || error || !data) return { recoms: [], setRecomVariables };

  return { recoms: data.recommendations.results, setRecomVariables };
};
