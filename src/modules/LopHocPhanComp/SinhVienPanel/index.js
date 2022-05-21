import { Button, Collapse, notification, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalSinhVien from './ModalSinhVien';
import ModalDiem from './ModalDiem';
import queries from 'core/graphql';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const prefix = 'sinh-vien-list-panel';
const { Panel } = Collapse;
const xoaSinhVienMutation = queries.mutation.xoaSinhVienOfLopHocPhan('id');

const SinhVienList = ({ lopHocPhan, refetchGetLopHocPhan, loading }) => {
  const listSinhVien = lopHocPhan?.sinhVienLopHocPhans || [];

  console.log('lopHocPhan', lopHocPhan);

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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
          <Button loading={loadingXoaSinhVien} onClick={() => handleXoaSinhVien(record)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  /**
   * API
   * ====================================================
   */

  const [actXoaSinhVien, { loading: loadingXoaSinhVien }] = useMutation(xoaSinhVienMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.xoaSinhVienOfLopHocPhan?.errors || [];
      const _data = dataRes?.xoaSinhVienOfLopHocPhan?.data || [];

      if (!isEmpty(_errors))
        return _errors?.map((item) =>
          notification['error']({
            message: item?.message,
          }),
        );

      if (isEmpty(_data)) {
        notification['error']({
          message: 'Lỗi hệ thống!',
        });
        return;
      }

      refetchGetLopHocPhan();

      notification['success']({
        message: `Xóa ${_data?.length} học sinh khỏi lớp học phần thành công.`,
      });
    },
  });

  /**
   * Function
   * =============================================
   */

  const handleXoaSinhVien = (record) => {
    const _id = record?.id;

    actXoaSinhVien({
      variables: {
        sinhVienIds: [_id],
        lopHocPhanId: lopHocPhan?.id,
      },
    });
  };

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

  const handleXoaMultiSinhVien = (e) => {
    e?.stopPropagation();

    actXoaSinhVien({
      variables: {
        sinhVienIds: [...selectedRowKeys],
        lopHocPhanId: lopHocPhan?.id,
      },
    });
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
          <Button onClick={handleXoaMultiSinhVien} loading={loadingXoaSinhVien} danger>
            Xóa sinh viên đã chọn
          </Button>
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
            rowSelection={{
              selectedRowKeys,
              onChange: (value) => setSelectedRowKeys(value),
            }}
            loading={loading}
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
