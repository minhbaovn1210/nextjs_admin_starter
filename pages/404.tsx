import { NextPage } from "next";
import { Col, Row } from "antd";

const NotFoundPage: NextPage = () => {
  return (
    <Row style={{ margin: -20 }}>
      <Col md={24}>
        <img src="/images/404.jpg" alt="404" width="100%" height="100%" />
      </Col>
    </Row>
  );
};

export default NotFoundPage;
