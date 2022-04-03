import { Card, Col, PageHeader, Row } from "antd";
import React from "react";

const prefix = "chi-tiet-lop";

const LopModule = () => {
  return (
    <Row className={prefix}>
      <Col span={4}></Col>
      <Col span={16}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
          onBack={() => null}
          title="Chi tiết lớp"
        />
        <Card title="Thông tin lớp">
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <b>Khoa/Viện:</b> Công nghệ thông tin
            </Col>
            <Col span={8}>
              <b>Chuyên ngành:</b> Kỹ thuật phần mềm
            </Col>
            <Col span={8}>
              <b>Khóa:</b> 14
            </Col>
            <Col span={8}>
              <b>Tên lớp:</b> DHKTPM14BTT
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> Đây là mô tả của chuyen nganh
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default LopModule;
