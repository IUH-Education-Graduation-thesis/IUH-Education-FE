import { Button, Collapse, Table } from "antd";
import React, { useState } from "react";
import ListHocPhan from "./ListHocPhan";

const prefix = "khoa-hoc-ky";

const { Panel } = Collapse;

const ListHocKy = ({ data }) => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "thuTu",
      dataIndex: "thuTu",
      title: "Tên học kỳ",
    },
    {
      key: "moTa",
      dataIndex: "moTa",
      title: "Mô tả",
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
   * ==================================================
   */

  const handleSelectedKeyChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  /**
   * render view
   * ===========================================
   */

  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách Học kỳ</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa học kỳ đã chọn</Button>
          <Button type="primary">Thêm học kỳ</Button>
        </div>
      </div>
    );
  };

  return (
    <Collapse className={prefix}>
      <Panel
        className={prefix}
        showArrow={false}
        header={renderHeadOfPanel()}
        key="1"
      >
        <Table
          bordered
          rowSelection={{
            selectedRowKeys,
            onChange: handleSelectedKeyChange,
          }}
          expandable={{
            expandedRowRender: (record) => <ListHocPhan data={record} />,
          }}
          columns={columns}
          dataSource={data}
        />
      </Panel>
    </Collapse>
  );
};

export default ListHocKy;
