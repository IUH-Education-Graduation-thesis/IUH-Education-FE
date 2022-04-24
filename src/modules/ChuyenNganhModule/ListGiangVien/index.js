import { Button, Collapse, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const { Panel } = Collapse;
const prefix = 'khoa-vien-chuyen-nganh';

const ListGiangVien = ({ data }) => {
  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
    },
    {
      key: 'hoTenDem',
      dataIndex: 'hoTenDem',
      title: 'Họ tên đệm',
    },
    {
      key: 'ten',
      dataIndex: 'ten',
      title: 'Tên',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
    },
    {
      key: 'soDienThoai',
      dataIndex: 'soDienThoai',
      title: 'Số điện thoại',
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
        <div className={`${prefix}__header__left`}>Danh sách giảng viên</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa giảng viên đã chọn</Button>
          <Button type="primary">Thêm giảng viên</Button>
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

export default ListGiangVien;

ListGiangVien.propTypes = {
  data: PropTypes.arrayOf({
    id: PropTypes.number,
    key: PropTypes.number,
    hoTenDem: PropTypes.string,
    ten: PropTypes.string,
    email: PropTypes.string,
    soDienThoai: PropTypes.string,
  }).isRequired,
};
