import { useState } from 'react';
import { PageHeader } from 'antd';
import { RecommendationSearch, RecommendationResults, JobDetails } from 'components/Recommendation';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import useRecommendation from 'hooks/recommendation';
import useMe from 'hooks/me';

const Recommendation = () => {
  const [jobDetails, setJobDetails] = useState(undefined);
  const router = useRouter();
  const me = useMe();
  const searchEnabled = get(me, 'group.uiConfig.search');
  const { recoms, setRecomVariables } = useRecommendation();

  const cancel = () => setJobDetails(undefined);

  return (
    <div gutter={[10, 10]}>
      <PageHeader
        ghost={false}
        onBack={() => router.push('/')}
        title="Recommandation"
        subTitle="Recommande des jobs"
      >
        {searchEnabled ? <RecommendationSearch setRecomVariables={setRecomVariables} /> : null}
      </PageHeader>
      <br />
      <RecommendationResults recoms={recoms} setJobDetails={setJobDetails} />
      <JobDetails position={jobDetails} cancel={cancel} />
    </div>
  );
};

export default Recommendation;
