import { Form, Row, Col, Button, Slider } from 'antd';
import get from 'lodash/get';
import useMe from 'hooks/me';
import JobSearch from './JobSearch';

const Recommendation = ({ setRecomVariables }) => {
  const onValuesChange = (v) => console.log(v, 'vvv');

  const me = useMe();
  const alphaFixed = get(me, 'group.uiConfig.alphaFixed');
  const betaFixed = get(me, 'group.uiConfig.betaFixed');

  console.log(me);

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
        oldJobData: me.oldJobIsco08
          ? {
              isco08: me.oldJobIsco08 || undefined,
              title: me.oldJobTitle || undefined,
            }
          : undefined,
        alpha: me.alpha || 0.5,
        beta: me.beta || 0.5,
      }}
    >
      <br />
      <Row gutter={[24, 2]}>
        <Col lg={8} xs={12}>
          <Form.Item
            label="Job précédent"
            name="oldJobData"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <JobSearch me={me} />
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
