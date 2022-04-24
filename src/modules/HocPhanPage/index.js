import React from 'react';
import { Row, Col, PageHeader, Card } from 'antd';
import 'modules/HocPhanPage/HocPhanPage.scss';
import MonHocCollapse from './MonHocCollapse';
import LopHocPhanList from './LopHocPhanList';

const prefix = 'hoc-phan-module';

const HocPhanModule = () => {
  /**
   * render view
   * =====================================
   */

  return (
    <Row className={prefix}>
      <Col span={4}></Col>
      <Col span={16}>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          className="site-page-header"
          onBack={() => null}
          title="Chi tiết học phần"
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
        <MonHocCollapse />
        <LopHocPhanList />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default HocPhanModule;
