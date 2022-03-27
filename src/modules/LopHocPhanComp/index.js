import React from "react";

import { Card, Col, Collapse, PageHeader, Row } from "antd";
import ListLichHocPanel from "./LichHocPanel";
import ListSinhVienPanel from "./SinhVienPanel";

import "modules/LopHocPhanComp/LopHocPhanComp.scss";

const prefix = "chi-tiet-lop-hoc-phan";

const LopHocPhanModule = () => {
  return (
    <Row className={prefix}>
      <Col span={4}></Col>
      <Col span={16}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
          className="site-page-header"
          onBack={() => null}
          title="Chi tiết lớp học phần"
        />

        <Card title="Thôn lớp tin học phần">
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
              <b>Mã lớp học phần:</b> 24123124512
            </Col>
            <Col span={8}>
              <b>Tên lớp:</b> DHKTPM14BTT
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> Đây là mô tả
            </Col>
          </Row>
        </Card>

        <ListLichHocPanel />
        <ListSinhVienPanel />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default LopHocPhanModule;
