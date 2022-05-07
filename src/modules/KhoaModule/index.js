import { Card, Col, PageHeader, Row } from 'antd';
import React from 'react';
import ListHocKy from './ListHocKy';
import queries from 'core/graphql';
import { useParams } from 'react-router-dom';
import { FIND_KHOA_HOC_FRAGMENT } from './fragment';

import 'modules/KhoaModule/KhoaModule.scss';
import { useQuery } from '@apollo/client';

const prefix = 'khoa-hoc';
const findKhoaHocQuery = queries.query.findKhoaHocs(FIND_KHOA_HOC_FRAGMENT);

const KhoaHocModule = () => {
  const { khoa_id } = useParams();

  /**
   * API
   * =======================================================
   */

  const { data: dataFindKhoaHoc, refetch: refetchFindKhoaHoc } = useQuery(findKhoaHocQuery, {
    skip: !khoa_id,
    fetchPolicy: 'network-only',
    variables: {
      inputs: {
        id: khoa_id,
      },
    },
  });

  const khoaHoc = dataFindKhoaHoc?.findKhoaHocs?.data?.[0]?.data?.[0] || {};

  const listHocKy = khoaHoc?.hocKies?.map((item) => ({
    ...item,
    key: item?.id,
  }));

  /**
   * Render view
   * ==========================================================
   */

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
              <b>Khoa/Viện:</b> {khoaHoc?.chuyenNganh?.khoaVien?.ten}
            </Col>
            <Col span={8}>
              <b>Chuyên ngành:</b> {khoaHoc?.chuyenNganh?.ten}
            </Col>
            <Col span={8}>
              <b>Tên khóa:</b> {khoaHoc?.khoa}
            </Col>
            <Col span={8}>
              <b>Thời gian dự kiến:</b> 2018 - 2022
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> {khoaHoc?.moTa}
            </Col>
          </Row>
        </Card>
        <ListHocKy refetchFindKhoaHoc={refetchFindKhoaHoc} khoaId={khoa_id} data={listHocKy} />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default KhoaHocModule;
