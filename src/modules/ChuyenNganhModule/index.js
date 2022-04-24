import React from 'react';

import { Row, Col, PageHeader, Card } from 'antd';
import ListGiangVien from './ListGiangVien';
import ListLopHoc from './ListLopHoc';

import 'modules/ChuyenNganhModule/ChuyenNganhModule.scss';

const prefix = 'chuyen-nganh';

const mockDataForListGiangVien = [...Array(10)?.keys()]?.map((item) => ({
  id: item,
  key: item,
  hoTenDem: `Ho va ten ${item}`,
  ten: `Ten ${item}`,
  email: `hoantruong681${item}@gmail.com`,
  soDienThoai: `034938077${item}`,
}));

const mockDataForListLopHoc = [...Array(10)?.keys()]?.map((item) => ({
  id: item,
  key: item,
  ten: `Ten Lop Hoc ${item}`,
  moTa: `Mo ta ${item}`,
}));

const ChuyenNganhModule = () => {
  return (
    <Row className={prefix}>
      <Col span={4}></Col>
      <Col span={16}>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          onBack={() => null}
          title="Chi tiết Chuyên ngành"
        />
        <Card title="Thôn tin chuyên ngành">
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <b>Khoa/Viện:</b> Công nghệ thông tin
            </Col>
            <Col span={8}>
              <b>Chuyên ngành:</b> Kỹ thuật phần mềm
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> Đây là mô tả của chuyen nganh
            </Col>
          </Row>
        </Card>
        <ListGiangVien data={mockDataForListGiangVien} />
        <ListLopHoc data={mockDataForListLopHoc} />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default ChuyenNganhModule;
