import { Button, Collapse, Table } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";

const { Panel } = Collapse;
const prefix = "khoa-vien-chuyen-nganh";

const ChuyenNganhList = ({ data }) => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "ten",
      dataIndex: "ten",
      title: "Tên chuyên ngành",
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
   * Function
   * ==================================================
   */

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  /**
   * Render view
   * ===================================================
   */
  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách chuyên ngành</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa chuyên ngành đã chọn</Button>
          <Button type="primary">Thêm chuyên ngành</Button>
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
          onRow={(record) => {
            return {
              onClick: (e) => {
                const _origin = window?.location?.origin;

                window.location.href = `${_origin}/lop-hoc-phan/${record?.id}`;
              },
            };
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: handleSelectedRowChange,
          }}
          columns={columns}
          dataSource={data}
        />
      </Panel>
    </Collapse>
  );
};

export default ChuyenNganhList;

ChuyenNganhList.propTypes = {
  data: PropTypes.arrayOf({
    id: PropTypes.number,
    key: PropTypes.number,
    ten: PropTypes.string,
    moTa: PropTypes.string,
  }).isRequired,
};
