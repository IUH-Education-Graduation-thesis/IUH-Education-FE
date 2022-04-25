import { Card, Col, PageHeader, Row } from "antd";
import React from "react";
import queries from "core/graphql";
import { useParams } from "react-router-dom";

import ListMonHoc from "./ListMonHoc";
import ListChuyenNganh from "./ListChuyenNganh";
import "modules/KhoaVienModule/KhoaVienModule.scss";
import { FIND_KHOA_KHOA_VIEN } from "./fragment";
import { useQuery } from "@apollo/client";

const prefix = "khoa-vien-module";

const findKhoaVienQuery = queries?.query.findKhoaVien(FIND_KHOA_KHOA_VIEN);

const KhoaVienModule = () => {
  const { id } = useParams();

  /**
   * api
   * ======================================================
   */

  const { data: dataFindKhoaVien, loading: loadingDataFindKhoaVien } = useQuery(
    findKhoaVienQuery,
    {
      skip: !id,
      variables: {
        inputs: {
          id,
        },
      },
    }
  );

  const currentKhoaVien =
    dataFindKhoaVien?.findKhoaVien?.data?.[0]?.data?.[0] || {};

  const dataForChuyenNganh = currentKhoaVien?.chuyenNganhs?.map((item) => ({
    key: item?.id,
    ...item,
  }));

  const dataForMonHoc = currentKhoaVien?.monHocs?.map((item) => ({
    ...item,
    key: item?.id,
  }));

  /**
   * function
   * =====================================================
   */

  /**
   * render view
   * ======================================================
   */

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
              <b>Khoa/Viện:</b> {currentKhoaVien?.ten}
            </Col>
            <Col span={8}>
              <b>Liên kết:</b> {currentKhoaVien?.link}
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> {currentKhoaVien?.moTa}
            </Col>
          </Row>
        </Card>
        <ListMonHoc data={dataForMonHoc} />
        <ListChuyenNganh data={dataForChuyenNganh} />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default KhoaVienModule;
