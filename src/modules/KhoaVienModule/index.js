import { Card, Col, PageHeader, Row } from "antd";
import React from "react";

import ListMonHoc from "./ListMonHoc";
import ListChuyenNganh from "./ListChuyenNganh";
import "modules/KhoaVienModule/KhoaVienModule.scss";

const prefix = "khoa-vien-module";

const KhoaVienModule = () => {
  return (
    <Row className={prefix}>
      <Col span={4}></Col>
      <Col span={16}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
          onBack={() => null}
          title="Chi tiết khoa viện"
        />
        <Card title="Thôn tin học phần">
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <b>Khoa/Viện:</b> Công nghệ thông tin
            </Col>
            <Col span={8}>
              <b>Chuyên ngành:</b> Kỹ thuật phần mềm
            </Col>
            <Col span={8}>
              <b>Môn học:</b> Lập trình hướng đối tượng
            </Col>
            <Col span={8}>
              <b>Năm học:</b> 2018-2019
            </Col>
            <Col span={8}>
              <b>Học kỳ:</b> 2
            </Col>
            <Col span={8}>
              <b>ID:</b> 2
            </Col>
            <Col span={8}>
              <b>Mã học phần:</b> 24123124512
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> Đây là mô tả
            </Col>
            <Col span={8}>
              <b>Bắt buộc:</b> có
            </Col>
          </Row>
        </Card>
        <ListMonHoc />
        <ListChuyenNganh />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default KhoaVienModule;
