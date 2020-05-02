import { Typography, Card, Collapse, Row, Col, Spin, Tag } from 'antd';
import usePositions from 'hooks/positions';

const { Panel } = Collapse;
const { Paragraph } = Typography;

const PermanentTag = ({ position }) => {
  const {
    employment: { permanent },
  } = position;
  if (permanent) return <Tag color="green">CDI</Tag>;
  return <Tag color="blue">CDD</Tag>;
};

const ImmediatelyTag = ({ position }) => {
  const {
    employment: { immediately },
  } = position;
  if (immediately) return <Tag color="green">Maintenant</Tag>;
  return <Tag color="blue">A Convenir</Tag>;
};

const LoadTag = ({ position }) => {
  const {
    employment: { workloadPercMin: min, workloadPercMax: max },
  } = position;
  if (min === 100) return <Tag color="green">{`${min}%`}</Tag>;
  return <Tag color="blue">{`${min}% - ${max}%`}</Tag>;
};

const EmploymentDate = ({ position, name, objKey }) => {
  const value = position.employment[objKey];
  console.log(position.employment, 'uuuu', objKey, value);
  if (value)
    return (
      <Row>
        <Col span={6}>{name}:</Col>
        <Col span={18}>{value}</Col>
      </Row>
    );
  return null;
};

const Position = ({ position }) => {
  return (
    <Card title={position.descriptions[0].title} type="inner">
      {console.log(position.employment, 'aaaa')}
      <Row>
        <Col span={6}>Tags:</Col>
        <Col span={18}>
          <PermanentTag position={position} />
          <ImmediatelyTag position={position} />
          <LoadTag position={position} />
        </Col>
      </Row>
      <Row>
        <Col span={6}>Description:</Col>
        <Col span={18}>
          <Paragraph ellipsis={{ rows: 3 }}>{position.descriptions[0].description}</Paragraph>
        </Col>
      </Row>
      <EmploymentDate position={position} objKey="startDate" name="Start" />
      <EmploymentDate position={position} objKey="endDate" name="End" />
    </Card>
  );
};

const IndividualResult = ({ recom }) => {
  const { positions, totalCount, loading } = usePositions(recom.avam);

  const count = totalCount === undefined ? '' : `positions: ${totalCount}`;

  console.log(totalCount, positions.length);

  return (
    <Col xs={16} lg={9}>
      <Card title="Card">
        <Spin spinning={loading}>
          <Row>
            <Col span={24}>{recom.jobTitle}</Col>
            <Col span={24}>
              <Collapse bordered={false}>
                <Panel header={`${recom.jobTitle} ${count}`} style={{ width: '100%' }}>
                  {positions.map((position, i) => (
                    <Position key={i} position={position} />
                  ))}
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Spin>
      </Card>
    </Col>
  );
};

const RecommendationResults = ({ recoms }) => {
  return (
    <Row gutter={[24, 24]} justify="space-around">
      {recoms.map((recom, i) => (
        <IndividualResult key={i} recom={recom} />
      ))}
    </Row>
  );
};

export default RecommendationResults;
