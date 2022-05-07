import { Button, Collapse, notification, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalGiangVien from './ModalGiangVien';
import queries from 'core/graphql';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const { Panel } = Collapse;
const prefix = 'khoa-vien-chuyen-nganh';
const xoaGiangViensMutation = queries.mutation.xoaGiangViens('id');

const ListGiangVien = ({ data, chuyenNganhId, refetchFindChuyenNganh }) => {
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
      render: (_, record) => (
        <div>
          <Button onClick={(e) => handleEditRow(e, record)} danger>
            Chỉnh sửa
          </Button>
          <Button onClick={() => handleXoaRow(record)}>Xóa</Button>
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [currentGiangVien, setCurrentGiangVien] = useState({});

  /**
   * API
   * ====================================================
   */

  const [actXoaGiangVien] = useMutation(xoaGiangViensMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.xoaGiangViens?.errors || [];
      const _data = dataRes?.xoaGiangViens?.data || [];

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

      setSelectedRowKeys([]);
      refetchFindChuyenNganh();

      notification['success']({
        message: `Xóa ${_data?.length} giảng viên thành công.`,
      });
    },
  });

  /**
   * Function
   * ==================================================
   */

  const handleXoaRow = (record) => {
    actXoaGiangVien({
      variables: {
        ids: [record?.id],
      },
    });
  };

  const handleEditRow = (e, record) => {
    e?.stopPropagation();
    setShowModalEdit(true);
    setCurrentGiangVien(record);
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const themGiangVienClickButton = (e) => {
    e?.stopPropagation();
    setShowModalAdd(true);
  };

  const handleCallAPIAddSuccess = () => {
    setShowModalAdd(false);
    setShowModalEdit(false);
    refetchFindChuyenNganh();
  };

  const handleDeleteMultipleGiangVien = (e) => {
    e?.stopPropagation();
    const _ids = selectedRowKeys || [];
    actXoaGiangVien({
      variables: {
        ids: [..._ids],
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
        <div className={`${prefix}__header__left`}>Danh sách giảng viên</div>
        <div className={`${prefix}__header__right`}>
          <Button onClick={handleDeleteMultipleGiangVien} danger>
            Xóa giảng viên đã chọn
          </Button>
          <Button onClick={themGiangVienClickButton} type="primary">
            Thêm giảng viên
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Collapse className={prefix}>
        <Panel className={prefix} showArrow={false} header={renderHeadOfPanel()} key="1">
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
      <ModalGiangVien
        onCallAPISuccess={handleCallAPIAddSuccess}
        chuyenNganhId={chuyenNganhId}
        closeModal={() => setShowModalEdit(false)}
        type="add"
        visible={showModalAdd}
      />
      <ModalGiangVien
        onCallAPISuccess={handleCallAPIAddSuccess}
        chuyenNganhId={chuyenNganhId}
        type="edit"
        data={currentGiangVien}
        closeModal={() => setShowModalEdit(false)}
        visible={showModalEdit}
      />
    </>
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
  chuyenNganhId: PropTypes.string.isRequired,
  refetchFindChuyenNganh: PropTypes.func,
};

ListGiangVien.defaultProps = {
  refetchFindChuyenNganh: () => {},
};
