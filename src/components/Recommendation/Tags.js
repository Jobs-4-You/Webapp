import { Row, Col, Tag, Tooltip } from 'antd';

export const PermanentTag = ({ position }) => {
  const {
    employment: { permanent },
  } = position;
  if (permanent)
    return (
      <Tooltip title="Durée indédterminée">
        <Tag color="green">CDI</Tag>
      </Tooltip>
    );
  return (
    <Tooltip title="Duré déterminée">
      <Tag color="blue">CDD</Tag>
    </Tooltip>
  );
};

export const ImmediatelyTag = ({ position }) => {
  const {
    employment: { immediately },
  } = position;
  if (immediately)
    return (
      <Tooltip title="Disponible maintenant">
        <Tag color="green">Maintenant</Tag>
      </Tooltip>
    );
  return (
    <Tooltip title="Début à convenir">
      <Tag color="blue">A Convenir</Tag>
    </Tooltip>
  );
};

export const LoadTag = ({ position }) => {
  const {
    employment: { workloadPercMin: min, workloadPercMax: max },
  } = position;
  if (min === 100)
    return (
      <Tooltip title="Temps plein">
        <Tag color="green">{`${min}%`}</Tag>
      </Tooltip>
    );
  return (
    <Tooltip title="Temps partiel">
      <Tag color="blue">{`${min}% - ${max}%`}</Tag>
    </Tooltip>
  );
};

const EmploymentDate = ({ value, name }) => {
  if (value)
    return (
      <Row>
        <Col span={6}>{name}:</Col>
        <Col span={18}>{value}</Col>
      </Row>
    );
  return null;
};

export const EmploymentDates = ({ position }) => {
  return (
    <>
      <EmploymentDate position={position} value={position.employment.startDate} name="Début" />
      <EmploymentDate position={position} value={position.employment.endDate} name="Fin" />
    </>
  );
  return null;
};
