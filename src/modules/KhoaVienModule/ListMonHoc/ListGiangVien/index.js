import { Button, Table } from "antd";
import React, { useState } from "react";

const prefix = "list-mon-hoc-in-khoa-vien";

const ListMonHoc = ({ data }) => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "hoTenDem",
      dataIndex: "hoTenDem",
      title: "Họ tên đệm",
    },
    {
      key: "ten",
      dataIndex: "ten",
      title: "Tên",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "soDienThoai",
      dataIndex: "soDienThoai",
      title: "Số điện thoại",
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
   * function
   * ==========================================
   */

  const handleChangeSelectedRow = (payload) => {
    setSelectedRowKeys(payload);
  };

  /**
   * render view
   * =====================================================================
   */

  return (
    <div className={prefix}>
      <div className={`${prefix}__head`}>
        <Button danger>Xóa giảng viên đã chọn</Button>
        <Button type="primary">Thêm giảng viên</Button>
      </div>

      <div className={`${prefix}__wrap-table`}>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: handleChangeSelectedRow,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default ListMonHoc;
