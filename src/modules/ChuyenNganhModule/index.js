import React from "react";

import { Row, Col, PageHeader, Card } from "antd";
import ListGiangVien from "./ListGiangVien";
import { useParams } from "react-router-dom";
import ListLopHoc from "./ListLopHoc";
import queries from "core/graphql";
import { useQuery } from "@apollo/client";
import { FIND_CHUYEN_NGANH } from "./fragment";

import "modules/ChuyenNganhModule/ChuyenNganhModule.scss";

const prefix = "chuyen-nganh";
const findChuyenNganhQuery = queries.query.findChuyenNganh(FIND_CHUYEN_NGANH);

const ChuyenNganhModule = () => {
  const { chuyen_nganh_id, id } = useParams();

  /**
   * API
   * =====================================================================
   *
   */

  const { data: dataFindChuyenNganh, refetch: refetchFindChuyenNganh } =
    useQuery(findChuyenNganhQuery, {
      fetchPolicy: "network-only",
      skip: !chuyen_nganh_id,
      variables: {
        inputs: {
          id: chuyen_nganh_id,
        },
      },
    });

  const chuyenNganh = dataFindChuyenNganh?.findChuyenNganh?.data?.[0] || {};
  const giangVienList =
    chuyenNganh?.giangViens?.map((item) => ({ ...item, key: item?.id })) || [];
  const khoaHocList =
    chuyenNganh?.khoas?.map((item) => ({ ...item, key: item?.id })) || [];

  /**
   * render view
   * ===============================================================
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
          title="Chi tiết Chuyên ngành"
        />
        <Card title="Thôn tin chuyên ngành">
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <b>Khoa/Viện:</b> {chuyenNganh?.khoaVien?.ten}
            </Col>
            <Col span={8}>
              <b>Chuyên ngành:</b> {chuyenNganh?.ten}
            </Col>
            <Col span={8}>
              <b>Mô tả:</b> {chuyenNganh?.moTa}
            </Col>
          </Row>
        </Card>
        <ListGiangVien
          refetchFindChuyenNganh={refetchFindChuyenNganh}
          chuyenNganhId={chuyen_nganh_id}
          data={giangVienList}
        />
        <ListLopHoc
          refetchFindChuyenNganh={refetchFindChuyenNganh}
          chuyenNganhId={chuyen_nganh_id}
          data={khoaHocList}
        />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default ChuyenNganhModule;
