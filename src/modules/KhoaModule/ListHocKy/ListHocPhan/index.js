import { Button, Table } from "antd";
import React, { useState } from "react";

const prefix = "khoa-hoc-ky-hoc-phan";

const ListHocPhan = ({ data }) => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "maHocPhan",
      dataIndex: "maHocPhan",
      title: "Mã học phần",
    },
    {
      render: (_, record) => record?.monHoc?.ten,
      title: "Môn học",
    },
    {
      key: "soTinChiLyThuet",
      dataIndex: "soTinChiLyThuet",
      title: "Tín chỉ lý thuyết",
    },
    {
      key: "soTinChiThucHanh",
      dataIndex: "soTinChiThucHanh",
      title: "Tín chỉ thực hành",
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  /**
   * Function
   * =========================================================
   */

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  /**
   * render view
   * =========================================================
   */

  return (
    <div className={prefix}>
      <div className={`${prefix}__head`}>
        <div className={`${prefix}__head__left`}>
          Môn học của học kỳ {data?.thuTuHocKy}
        </div>
        <div className={`${prefix}__head__right`}>
          <Button danger>Xóa học phần đã chọn</Button>
          <Button type="primary">Thêm học phần</Button>
        </div>
      </div>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
        bordered
        columns={columns}
        dataSource={data?.hocPhans}
      />
    </div>
  );
};

export default ListHocPhan;
