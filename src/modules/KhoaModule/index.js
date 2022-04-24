import { Card, Col, PageHeader, Row } from 'antd';
import React from 'react';
import ListHocKy from './ListHocKy';
import 'modules/KhoaModule/KhoaModule.scss';

const prefix = 'khoa-hoc';

const mockDataForListHocKy = [...Array(10)?.keys()]?.map((item) => ({
  id: item,
  key: item,
  thuTuHocKy: item,
  moTa: 'Day la cai mo ta',
  hocPhans: [
    {
      id: item,
      maHocPhan: `231241232${item}`,
      moTa: 'Day la cai mo ta',
      batBuoc: true,
      soTinChiLyThuet: 3,
      soTinChiThucHanh: 0,
      monHoc: {
        ten: 'Lập trình hướng đối tượng',
      },
    },
  ],
}));

const KhoaHocModule = () => {
  return (
    <Row className={prefix}>
      <Col span={4}></Col>
      <Col span={16}>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          onBack={() => null}
          title="Chi tiết khóa học"
        />
        <Card title="Thôn tin khóa học">
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <b>Khoa/Viện:</b> Công nghệ thông tin
            </Col>
            <Col span={8}>
              <b>Chuyên ngành:</b> Công nghệ thông tin
            </Col>
            <Col span={8}>
              <b>Tên khóa:</b> 14
            </Col>
            <Col span={8}>
              <b>Thời gian dự kiến:</b> 2018 - 2022
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> Đây là dòng mô tả
            </Col>
          </Row>
        </Card>
        <ListHocKy data={mockDataForListHocKy} />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default KhoaHocModule;
