import { Form, Row, Col, Button, Slider } from 'antd';
import get from 'lodash/get';
import JobSearch from './JobSearch';
import useMe from 'hooks/me';

const Recommendation = ({ setRecomVariables }) => {
  const onValuesChange = (v) => console.log(v, 'vvv');

  const me = useMe();
  const alphaFixed = get(me, 'group.uiConfig.alphaFixed');
  const betaFixed = get(me, 'group.uiConfig.betaFixed');

  const onFinish = (v) => {
    console.log(v);
    setRecomVariables(v);
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      onValuesChange={onValuesChange}
      style={{ width: '100%' }}
      onFinish={onFinish}
      initialValues={{
        oldJobIsco08: undefined,
        alpha: 0.5,
        beta: 0.5,
      }}
    >
      <br />
      <Row gutter={[24, 2]}>
        <Col lg={8} xs={12}>
          <Form.Item
            label="Job précédent"
            name="oldJobIsco08"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <JobSearch />
          </Form.Item>
        </Col>

        <Col lg={5} xs={6}>
          <Form.Item
            label="Alpha"
            name="alpha"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Slider min={0} max={1} step={0.01} style={{ width: '100%' }} disabled={alphaFixed} />
          </Form.Item>
        </Col>

        <Col lg={5} xs={6}>
          <Form.Item
            label="Beta"
            name="beta"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Slider min={0} max={1} step={0.01} style={{ width: '100%' }} disabled={betaFixed} />
          </Form.Item>
        </Col>

        <Col lg={4} xs={6}>
          <Form.Item label="Recommander">
            <Button type="primary" htmlType="submit">
              Recommander
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Recommendation;
