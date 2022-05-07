import { Button, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ModalGiangVien from './ModalGiangVien';

const prefix = 'list-mon-hoc-in-khoa-vien';

const ListGiangVien = ({ data, monHoc, refetchFindKhoaVien }) => {
  const [showModalAdd, setShowModalAdd] = useState(false);

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
      render: () => (
        <div>
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

  const handleThemGiangVien = () => {
    setShowModalAdd(true);
  };

  const handleModalGiangVienSuccess = () => {
    setShowModalAdd(false);
    refetchFindKhoaVien();
  };

  /**
   * render view
   * =====================================================================
   */

  return (
    <div className={prefix}>
      <div className={`${prefix}__head`}>
        <Button danger>Xóa giảng viên đã chọn</Button>
        <Button onClick={handleThemGiangVien} type="primary">
          Thêm giảng viên
        </Button>
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
      <ModalGiangVien
        monHoc={monHoc}
        visible={showModalAdd}
        closeModal={() => setShowModalAdd(false)}
        onCallAPISuccess={handleModalGiangVienSuccess}
      />
    </div>
  );
};

export default ListGiangVien;

ListGiangVien.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  monHoc: PropTypes.objectOf(PropTypes.any).isRequired,
  refetchFindKhoaVien: PropTypes.func,
};

ListGiangVien.defaultProps = {
  refetchFindKhoaVien: () => {},
};
