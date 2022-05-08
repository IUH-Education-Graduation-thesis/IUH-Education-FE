import { Button, Collapse, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalSinhVien from './ModalSinhVien';

const prefix = 'sinh-vien-list-panel';
const { Panel } = Collapse;

const SinhVienList = ({ lopHocPhan, refetchGetLopHocPhan }) => {
  const listSinhVien = lopHocPhan?.sinhVienLopHocPhans || [];

  const listSinhVienFormat = listSinhVien?.map((item) => ({
    key: item?.sinhVien?.id,
    id: item?.sinhVien?.id,
    idSinhVienLopHocPhan: item?.id,
    maSinhVien: item?.sinhVien?.maSinhVien,
    hoTenDem: item?.sinhVien?.hoTenDem,
    ten: item?.sinhVien?.ten,
    email: item?.sinhVien?.email,
    soDienThoai: item?.sinhVien?.soDienThoai,
    lop: item?.sinhVien?.lop?.ten,
    diems: {
      diemCuoiKy: item?.diemCuoiKy,
      diemGiuaKy: item?.diemGiuaKy,
      diemThucHanh: item?.diemThucHanh,
      diemThuongKy: item?.diemThuongKy,
    },
  }));

  const [isModalSinhVien, setIsModalSinhVien] = useState(false);

  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
    },
    {
      key: 'maSinhVien',
      dataIndex: 'maSinhVien',
      title: 'Mã sinh viên',
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
      key: 'lop',
      dataIndex: 'lop',
      title: 'Lớp',
    },

    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: () => (
        <div>
          <Button type="primary">Điểm</Button>
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  /**
   * Function
   * =============================================
   */

  const handleClickButtonThemSinhVien = (e) => {
    e?.stopPropagation();
    setIsModalSinhVien(true);
  };

  const handleWhenModalAddSinhVienSuccess = () => {
    setIsModalSinhVien(false);
    refetchGetLopHocPhan();
  };

  /**
   * Render view
   * ===================================================
   */
  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách sinh viên</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa sinh viên đã chọn</Button>
          <Button onClick={handleClickButtonThemSinhVien} type="primary">
            Thêm sinh viên
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Collapse defaultActiveKey={[1]} className={prefix}>
        <Panel className={prefix} showArrow={false} header={renderHeadOfPanel()} key="1">
          <Table dataSource={listSinhVienFormat} columns={columns} />
        </Panel>
      </Collapse>
      <ModalSinhVien
        onCallAPISuccess={handleWhenModalAddSinhVienSuccess}
        lopHocPhan={lopHocPhan}
        onClose={() => setIsModalSinhVien(false)}
        visible={isModalSinhVien}
      />
    </>
  );
};

export default SinhVienList;

SinhVienList.propTypes = {
  lopHocPhan: PropTypes.objectOf(PropTypes.any).isRequired,
  refetchGetLopHocPhan: PropTypes.func,
};

SinhVienList.defaultProps = {
  refetchGetLopHocPhan: () => {},
};
