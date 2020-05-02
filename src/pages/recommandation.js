import { PageHeader } from 'antd';
import { RecommendationSearch, RecommendationResults } from 'components/Recommendation';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import useRecommendation from 'hooks/recommendation';
import useMe from 'hooks/me';

const Recommendation = () => {
  const router = useRouter();
  const me = useMe();
  const searchEnabled = get(me, 'group.uiConfig.search');

  const { recoms, setRecomVariables } = useRecommendation();

  console.log(recoms, 'ahahah');

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
      <RecommendationResults recoms={recoms} />
    </div>
  );
};

export default Recommendation;
