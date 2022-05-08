import { Button, Collapse, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalSinhVien from './ModalSinhVien';
import ModalDiem from './ModalDiem';

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
  const [isModalDiem, setIsModalDiem] = useState(false);
  const [currentSinhVien, setCurrentSinhVien] = useState({});

  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      width: '100px',
    },
    {
      key: 'maSinhVien',
      dataIndex: 'maSinhVien',
      title: 'Mã sinh viên',
      width: 150,
    },
    {
      key: 'hoTenDem',
      dataIndex: 'hoTenDem',
      title: 'Họ tên đệm',
      width: 200,
    },
    {
      key: 'ten',
      dataIndex: 'ten',
      title: 'Tên',
      width: 100,
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
      width: 150,
    },
    {
      key: 'soDienThoai',
      dataIndex: 'soDienThoai',
      title: 'Số điện thoại',
      width: 150,
    },
    {
      key: 'lop',
      dataIndex: 'lop',
      title: 'Lớp',
      width: 150,
    },

    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <div>
          <Button
            onClick={() => handleClickXemDiem(record)}
            style={{ marginRight: 10 }}
            type="primary"
          >
            Điểm
          </Button>
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  /**
   * Function
   * =============================================
   */

  const handleClickXemDiem = (sinhVien) => {
    setIsModalDiem(true);
    setCurrentSinhVien(sinhVien);
  };

  const handleClickButtonThemSinhVien = (e) => {
    e?.stopPropagation();
    setIsModalSinhVien(true);
  };

  const handleWhenModalAddSinhVienSuccess = () => {
    setIsModalSinhVien(false);
    refetchGetLopHocPhan();
  };

  const handleWhenApiEditSuccess = () => {
    setIsModalDiem(false);
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
          <Table
            scroll={{ x: '100%', y: '100%' }}
            dataSource={listSinhVienFormat}
            columns={columns}
          />
        </Panel>
      </Collapse>
      <ModalSinhVien
        onCallAPISuccess={handleWhenModalAddSinhVienSuccess}
        lopHocPhan={lopHocPhan}
        onClose={() => setIsModalSinhVien(false)}
        visible={isModalSinhVien}
      />
      <ModalDiem
        sinhVien={currentSinhVien}
        visible={isModalDiem}
        onClose={() => setIsModalDiem(false)}
        onCallAPISuccess={handleWhenApiEditSuccess}
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
