import { Button, Card, Form, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import queries from "core/graphql";
import { GET_NAM_HOC_FRAGMENT } from "../fragment";
import { useQuery } from "@apollo/client";
import { isEmpty } from "lodash";
import ModalLopHocPhan from "./ModalLopHocPhan";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const prefix = "danh-sach-lop-hoc-phan";
const getNamHocsQuery = queries.query.getNamHocs(GET_NAM_HOC_FRAGMENT);

const LopHocPhanList = ({ data, refetchFindHocPhan }) => {
  const { hoc_phan_id } = useParams();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentNamHoc, setCurrentNamHoc] = useState({});
  const [currentHocKy, setCurrentHocKy] = useState({});
  const [showModalAdd, setShowModalAdd] = useState(false);

  /**
   * API
   * =======================================================
   */

  const { data: dataGetNamHocs } = useQuery(getNamHocsQuery);

  const dataForSelectNamHoc =
    dataGetNamHocs?.getNamHocs?.data?.map((item) => ({
      ...item,
      label: `${item?.namBatDau} - ${item?.namKetThuc}`,
      value: item?.id,
    })) || [];

  const dataForSelectHocKy = currentNamHoc?.hocKyNormals?.map((item) => ({
    ...item,
    label: `Học kỳ: ${item?.thuTuHocKy}`,
    value: item?.id,
  }));

  /**
   * useEffect
   * ============================================
   */

  /**
   * function
   * ======================================
   */

  const handleDataForTable = () => {
    if (isEmpty(currentHocKy)) return data;

    return data?.filter((item) => item?.hocKyNormal?.id === currentHocKy?.id);
  };

  const handleHocKyChange = (id) => {
    const _data = dataForSelectHocKy?.find((item) => item?.id === id);
    setCurrentHocKy(_data);
  };

  const handleNamHocChange = (id) => {
    const _data = dataForSelectNamHoc?.find((item) => item?.id === id);

    setCurrentNamHoc(_data);
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleClickRowTable = (e, record) => {
    const _origin = window?.location?.origin;

    window.location.href = `${_origin}/hoc-phan/${hoc_phan_id}/lop-hoc-phan/${record?.id}`;
  };

  const handleClickCreateLopHocPhan = () => {
    setShowModalAdd(true);
  };

  const handleWhenModalSuccess = (payload) => {
    setShowModalAdd(false);
    refetchFindHocPhan();
  };

  /**
   * render view
   * =====================================
   */
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "maLopHocPhan",
      dataIndex: "maLopHocPhan",
      title: "Mã lớp học phần",
    },
    {
      key: "tenLopHocPhan",
      dataIndex: "tenLopHocPhan",
      title: "Tên lớp học phần",
    },
    {
      key: "trangThaiLopHocPhan",
      dataIndex: "trangThaiLopHocPhan",
      title: "Trạng thái",
    },
    {
      key: "soLuongToiDa",
      dataIndex: "soLuongToiDa",
      title: "Số lượng tối đa",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (e) => (
        <div>
          <Button danger>Chỉnh sửa</Button>
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  const renderTitle = () => {
    return (
      <div className={`${prefix}__title`}>
        <div className={`${prefix}__title__left`}>Danh sách lớp học phần</div>
        <div className={`${prefix}__title__right`}>
          <Button
            onClick={handleClickCreateLopHocPhan}
            disabled={isEmpty(currentHocKy)}
            type="primary"
          >
            Thêm lớp học phần
          </Button>
          <Button danger>Xóa lớp học phần đã chọn</Button>
        </div>
      </div>
    );
  };

  return (
    <Card className={prefix} title={renderTitle()}>
      <Form className={`${prefix}__filter`}>
        <Form.Item label="Năm học">
          <Select
            onChange={handleNamHocChange}
            options={dataForSelectNamHoc}
            placeholder="Năm học"
          />
        </Form.Item>
        <Form.Item label="Học kỳ">
          <Select
            onChange={handleHocKyChange}
            options={dataForSelectHocKy}
            placeholder="Học kỳ"
          />
        </Form.Item>
      </Form>

      <Table
        onRow={(record, index) => ({
          onClick: (e) => handleClickRowTable(e, record),
        })}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
        columns={columns}
        dataSource={handleDataForTable()}
      />

      <ModalLopHocPhan
        hocPhanId={hoc_phan_id}
        hocKyId={currentHocKy?.id}
        visible={showModalAdd}
        closeModal={() => setShowModalAdd(false)}
        onCallAPISuccess={handleWhenModalSuccess}
      />
    </Card>
  );
};

export default LopHocPhanList;

LopHocPhanList.propType = {
  data: PropTypes.objectOf(PropTypes.any),
  refetchFindHocPhan: PropTypes.func,
};

LopHocPhanList.defaultProps = {
  refetchFindHocPhan: () => {},
};
