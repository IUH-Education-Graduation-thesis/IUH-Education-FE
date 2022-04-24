import { Button, Collapse, Select, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const { Panel } = Collapse;
const prefix = 'chuyen-nganh-lop-hoc';
const dataMockForSelect = [
  { label: 'Khoa 11', value: 11 },
  { label: 'Khoa 12', value: 12 },
];

const ListLopHoc = ({ data }) => {
  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
    },
    {
      key: 'ten',
      dataIndex: 'ten',
      title: 'Tên lớp',
    },
    {
      key: 'moTa',
      dataIndex: 'moTa',
      title: 'Mô tả',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
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
        <div className={`${prefix}__header__left`}>Danh sách Lớp học</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa lớp học đã chọn</Button>
          <Button type="primary">Thêm lớp học</Button>
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
        <Select options={dataMockForSelect} />
        <Table
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

export default ListLopHoc;

ListLopHoc.propTypes = {
  data: PropTypes.arrayOf({
    id: PropTypes.number,
    key: PropTypes.number,
    ten: PropTypes.string,
    moTa: PropTypes.string,
  }).isRequired,
};
