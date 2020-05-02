import { Card, Row, Col, Form, Input, Button, Switch } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { SurveySelect } from 'components/Select';
import { useAuth } from 'hooks/auth';
import capitalize from 'lodash/capitalize';
import useGroupConfig from 'hooks/groupConfig';
import { ALL_GROUPS } from 'gql/queries';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 12,
  },
};

const ItemSelect = (SelectComponent, props) => ({ value, onChange }) => {
  return <SelectComponent value={value} setValue={onChange} {...props} />;
};

const SurveyItem = ItemSelect(SurveySelect);

const GroupUIConfig = ({ uiConfig }) => {
  const config = { ...uiConfig };
  delete config.__typename;
  return (
    <>
      {Object.entries(config).map(([key, val], i) => {
        return (
          <Form.Item name={['uiConfig', key]} label={`${capitalize(key)}:`} valuePropName="checked">
            <Switch />
          </Form.Item>
        );
      })}
    </>
  );
};

const GroupDetail = ({ group }) => {
  const { form, onChange, reset, save, canSave } = useGroupConfig(group);

  const checkDiff = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('baselineId') !== value) {
        return Promise.resolve();
      }
      return Promise.reject(Error('Les survey sont les memes'));
    },
  });

  return (
    <Col md={12} sm={24}>
      <Card title={`Group ${group.name} config`} type="inner">
        <Form form={form} {...layout} labelAlign="left" onValuesChange={onChange} onFinish={save}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Required' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="baselineId"
            label="Baseline"
            rules={[{ required: true, message: 'Required' }]}
          >
            <SurveyItem placeholder="Survey" showSearch />
          </Form.Item>
          <Form.Item
            name="cruiserId"
            label="Cruiser"
            rules={[{ required: true, message: 'Required' }, checkDiff]}
          >
            <SurveyItem placeholder="Survey" showSearch />
          </Form.Item>

          <GroupUIConfig uiConfig={group.uiConfig} />

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" disabled={!canSave}>
              Save
            </Button>
            <Button htmlType="button" onClick={reset} disabled={!canSave}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default () => {
  const { accessToken } = useAuth();
  const {
    loading,
    error,
    data: { allGroups = [] },
  } = useQuery(ALL_GROUPS, {
    context: {
      headers: {
        accessToken,
      },
      skip: !accessToken,
    },
  });

  return (
    <Card title="Group configuration">
      <Row gutter={[24, 24]}>
        {allGroups.map((item) => (
          <GroupDetail group={item} key={item.name} />
        ))}
      </Row>
    </Card>
  );
};
