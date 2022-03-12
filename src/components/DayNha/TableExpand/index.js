import { Button, Divider, Table } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";

const prefix = "day-nha-expand";

const TableExpand = ({ data, onAddClassRoom, onDeleteMultipleClassroom }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Tên phòng học",
      dataIndex: "tenPhongHoc",
      key: "tenPhongHoc",
      width: 400,
    },

    {
      title: "Sức chứa",
      dataIndex: "sucChua",
      key: "sucChua",
      width: 400,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: 300,
    },
    {
      title: "Thao tác",
      key: "thaoTac",
      width: 300,
      render: (e) => (
        <div>
          <Button danger>Chỉnh sửa</Button>
          <Button style={{ marginLeft: 10 }}>Xóa</Button>
        </div>
      ),
    },
  ];

  /**
   * function
   * =======================================================
   */

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  /**
   * render view
   * ==========================================================
   */

  return (
    <div className={prefix}>
      <div className={`${prefix}__head`}>
        <Button type="primary">+ Thêm phòng học</Button>
        <Button danger>Xóa phòng học đã chọn</Button>
      </div>
      <Divider />
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
      />
    </div>
  );
};

export default TableExpand;

TableExpand.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.number,
      tenPhongHoc: PropTypes.string,
      sucChua: PropTypes.number,
      moTa: PropTypes.string,
    })
  ),
  onAddClassRoom: PropTypes.func,
  onDeleteMultipleClassroom: PropTypes.func,
};

TableExpand.defaultProps = {
  data: [],
  onAddClassRoom: () => {},
  onDeleteMultipleClassroom: () => {},
};
