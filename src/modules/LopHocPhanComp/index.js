import React, { useState } from 'react';

import { Button, Card, Col, PageHeader, Row } from 'antd';
import ListLichHocPanel from './LichHocPanel';
import ListSinhVienPanel from './SinhVienPanel';
import queries from 'core/graphql';

import 'modules/LopHocPhanComp/LopHocPhanComp.scss';
import { GET_LOP_HOC_PHAN } from './fragment';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ModalLopHocPhan from 'modules/HocPhanPage/LopHocPhanList/ModalLopHocPhan';

const prefix = 'chi-tiet-lop-hoc-phan';
const getLopHocPhanQuery = queries.query.getLopHocPhan(GET_LOP_HOC_PHAN);

const LopHocPhanModule = () => {
  const { lop_hoc_phan_id, hoc_phan_id } = useParams();

  const [showModalEdit, setShowModalEdit] = useState(false);

  /**
   * API
   * =======================================================
   */

  const {
    data: dataGetLopHocPhan,
    loading: loadingGetLopHocPhan,
    refetch: refetchGetLopHocPhan,
  } = useQuery(getLopHocPhanQuery, {
    skip: !lop_hoc_phan_id,
    variables: {
      id: lop_hoc_phan_id,
    },
  });

  const lopHocPhan = dataGetLopHocPhan?.getLopHocPhan?.data?.[0] || {};

  /**
   * Function
   * ==========================================================
   */

  const handleWhenModalLopHocPhanSuccess = () => {
    setShowModalEdit(false);
    refetchGetLopHocPhan();
  };

  /**
   * Render view
   * =================================================
   */

  return (
    <Row className={prefix}>
      <Col span={4} />
      <Col span={16}>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          className="site-page-header"
          onBack={() => null}
          title="Chi tiết lớp học phần"
        />

        <Card
          extra={
            <Button onClick={() => setShowModalEdit(true)} type="primary">
              Sửa
            </Button>
          }
          title="Thôn lớp tin học phần"
        >
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <b>Môn học:</b> {lopHocPhan?.hocPhan?.monHoc?.ten}
            </Col>
            <Col span={8}>
              <b>Số tín chỉ lý thuyết:</b> {lopHocPhan?.hocPhan?.soTinChiLyThuyet}
            </Col>
            <Col span={8}>
              <b>Số tín chỉ thực hành:</b> {lopHocPhan?.hocPhan?.soTinChiThucHanh}
            </Col>
            <Col span={8}>
              <b>Năm học:</b>{' '}
              {`${lopHocPhan?.hocKyNormal?.namHoc?.namBatDau} - ${lopHocPhan?.hocKyNormal?.namHoc?.namKetThuc}`}
            </Col>
            <Col span={8}>
              <b>Học kỳ:</b> {lopHocPhan?.hocKyNormal?.thuTuHocKy}
            </Col>
            <Col span={8}>
              <b>ID:</b> {lopHocPhan?.id}
            </Col>
            <Col span={8}>
              <b>Mã lớp học phần:</b> {lopHocPhan?.maLopHocPhan}
            </Col>
            <Col span={8}>
              <b>Trạng thái:</b> {lopHocPhan?.trangThaiLopHocPhan}
            </Col>
            <Col span={8}>
              <b>Số lượng tối đa:</b> {lopHocPhan?.soLuongToiDa}
            </Col>
            <Col span={8}>
              <b>Số lượng hiện tại:</b> {lopHocPhan?.soLuongHienTai}
            </Col>
            <Col span={8}>
              <b>Số nhóm thực hành:</b> {lopHocPhan?.soNhomThucHanh}
            </Col>
            <Col span={8}>
              <b>Tên lớp:</b> {lopHocPhan?.lopDuKien}
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> {lopHocPhan?.moTa}
            </Col>
          </Row>
        </Card>

        <ListLichHocPanel
          loading={loadingGetLopHocPhan}
          lopHocPhan={lopHocPhan}
          lopHocPhanId={lop_hoc_phan_id}
          refetchGetLopHocPhan={refetchGetLopHocPhan}
        />
        <ListSinhVienPanel
          loading={loadingGetLopHocPhan}
          lopHocPhan={lopHocPhan}
          refetchGetLopHocPhan={refetchGetLopHocPhan}
        />
      </Col>
      <Col span={4} />
      <ModalLopHocPhan
        onCallAPISuccess={handleWhenModalLopHocPhanSuccess}
        type="edit"
        data={lopHocPhan}
        hocPhanId={hoc_phan_id}
        hocKyId={lopHocPhan?.hocKyNormal?.id}
        visible={showModalEdit}
        closeModal={() => setShowModalEdit(false)}
      />
    </Row>
  );
};

export default LopHocPhanModule;
