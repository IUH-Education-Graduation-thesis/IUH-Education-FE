import React from 'react';
import { Row, Col, PageHeader, Card } from 'antd';
import 'modules/HocPhanPage/HocPhanPage.scss';
import MonHocCollapse from './MonHocCollapse';
import LopHocPhanList from './LopHocPhanList';
import { useParams } from 'react-router-dom';

import queries from 'core/graphql';
import { FIND_HOC_PHAN } from './fragment';
import { useQuery } from '@apollo/client';

const prefix = 'hoc-phan-module';

const findHocPhanQuery = queries.query.findHocPhan(FIND_HOC_PHAN);

const HocPhanModule = () => {
  const { hoc_phan_id } = useParams();

  /**
   * API
   * =================================================
   */

  const { data: dataFindHocPhan, refetch: refetchFindHocPhan } = useQuery(findHocPhanQuery, {
    skip: !hoc_phan_id,
    variables: {
      inputs: {
        id: hoc_phan_id,
      },
    },
  });

  const hocPhan = dataFindHocPhan?.findHocPhans?.data?.[0]?.data?.[0] || {};

  const dataForListLopHocPhan = hocPhan?.lopHocPhans?.map((item) => ({
    ...item,
    key: item?.id,
  }));

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
              <b>Môn học:</b> {hocPhan?.monHoc?.ten}
            </Col>
            <Col span={8}>
              <b>ID:</b> {hocPhan?.id}
            </Col>
            <Col span={8}>
              <b>Mã học phần:</b> {hocPhan?.maHocPhan}
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> {hocPhan?.moTa}
            </Col>
            <Col span={8}>
              <b>Bắt buộc:</b> {hocPhan?.batBuoc ? 'có' : 'không'}
            </Col>
            <Col span={8}>
              <b>Tín chỉ lý thuyết:</b> {hocPhan?.soTinChiLyThuyet}
            </Col>
            <Col span={8}>
              <b>Tín chỉ thực hành:</b> {hocPhan?.soTinChiThucHanh}
            </Col>
          </Row>
        </Card>
        <MonHocCollapse />
        <LopHocPhanList data={dataForListLopHocPhan} refetchFindHocPhan={refetchFindHocPhan} />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default HocPhanModule;
