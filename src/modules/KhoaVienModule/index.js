import { Card, Col, PageHeader, Row } from "antd";
import React from "react";

import ListMonHoc from "./ListMonHoc";
import ListChuyenNganh from "./ListChuyenNganh";
import "modules/KhoaVienModule/KhoaVienModule.scss";

const prefix = "khoa-vien-module";

const KhoaVienModule = () => {
  const dataForListMonHoc = [...Array(10)?.keys()]?.map((item) => ({
    id: item,
    key: item,
    ten: `ten mon hoc ${item}`,
    giangViens: [...Array(10)?.keys()]?.map((_item) => ({
      id: _item,
      key: _item,
      hoTenDem: `Ho ten dem ${_item}`,
      ten: `ten ${_item}`,
      email: `hoantruong681${_item}@gmail.com`,
      soDienThoai: `034938077${_item}`,
      hocHamString: `Thac si`,
    })),
  }));

  const dataForListChuyenNganh = [...Array(10)?.keys()]?.map((item) => ({
    id: item,
    key: item,
    ten: `Ten chuyen nganh ${item}`,
    moTa: `Mo ta ${item}`,
  }));

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
        <Card title="Thôn tin khoa/viện">
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <b>Khoa/Viện:</b> Công nghệ thông tin
            </Col>
            <Col span={8}>
              <b>Liên kết:</b> fit.iuh.edu.vn
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> Đây là mô tả của khoa viện
            </Col>
          </Row>
        </Card>
        <ListMonHoc data={dataForListMonHoc} />
        <ListChuyenNganh data={dataForListChuyenNganh} />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default KhoaVienModule;
