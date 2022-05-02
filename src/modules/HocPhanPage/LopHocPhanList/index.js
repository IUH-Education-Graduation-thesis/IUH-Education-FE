import { Button, Card, Form, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import queries from "core/graphql";
import { GET_NAM_HOC_FRAGMENT } from "../fragment";
import { useQuery } from "@apollo/client";
import { isEmpty } from "lodash";

const prefix = "danh-sach-lop-hoc-phan";
const getNamHocsQuery = queries.query.getNamHocs(GET_NAM_HOC_FRAGMENT);

const LopHocPhanList = () => {
  const [dataListLopHocPhan, setDataListLopHocPhan] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentNamHoc, setCurrentNamHoc] = useState({});
  const [currentHocKy, setCurrentHocKy] = useState({});

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
   * handle init data for table
   */
  useEffect(() => {
    const _data = [...Array(30).keys()]?.map((item) => ({
      key: item,
      id: item,
      maLopHocPhan: "1231231231231",
      tenLopHocPhan: `Ten lop hoc phan ${item}`,
      trangThai: "Đã mở lớp",
      soLuongToiDa: 80,
    }));

    setDataListLopHocPhan(_data);
  }, []);

  /**
   * function
   * ======================================
   */

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

    window.location.href = `${_origin}/lop-hoc-phan/${record?.id}`;
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
      key: "trangThai",
      dataIndex: "trangThai",
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
          <Button disabled={isEmpty(currentHocKy)} type="primary">
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
        dataSource={dataListLopHocPhan}
      />
    </Card>
  );
};

export default LopHocPhanList;
