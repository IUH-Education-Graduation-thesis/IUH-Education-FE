import { Button, Divider, notification, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalLopHoc from './ModalLopHoc';
import queries from 'core/graphql';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const prefix = 'lop-hoc-expand';
const xoaLopsMutation = queries.mutation.xoaLops('id');

const TableExpand = ({ data, khoaId, refetchFindChuyenNganh }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [currentLopHoc, setCurrentLopHoc] = useState({});

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Tên lớp',
      dataIndex: 'ten',
      key: 'ten',
      width: 400,
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: 300,
    },
    {
      title: 'Thao tác',
      key: 'thaoTac',
      width: 300,
      render: (_, record) => (
        <div>
          <Button onClick={(e) => handleEditRow(e, record)} danger>
            Chỉnh sửa
          </Button>
          <Button
            onClick={() => handleDeleteRow(record)}
            loading={loadingXoaLops}
            style={{ marginLeft: 10 }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  /**
   * API
   * =====================================================
   */
  const [actXoaLops, { loading: loadingXoaLops }] = useMutation(xoaLopsMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.xoaLops?.errors || [];
      const _data = dataRes?.xoaLops?.data || [];

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
        message: `Xóa ${_data?.length} lớp thành công.`,
      });
    },
  });

  /**
   * function
   * =======================================================
   */

  const handleDeleteRow = (record) => {
    actXoaLops({
      variables: {
        ids: [record?.id],
      },
    });
  };

  const handleEditRow = (e, record) => {
    e?.stopPropagation();
    setCurrentLopHoc(record);
    setShowModalEdit(true);
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleCallAPIAddSuccess = () => {
    setShowModalAdd(false);
    setShowModalEdit(false);
    refetchFindChuyenNganh();
  };

  const handleClickButtonAdd = (e) => {
    e?.stopPropagation();

    setShowModalAdd(true);
  };

  const handleDeleteMultiLop = () => {
    const _ids = selectedRowKeys || [];

    actXoaLops({
      variables: {
        ids: _ids,
      },
    });
  };

  /**
   * render view
   * ==========================================================
   */

  return (
    <div className={prefix}>
      <div className={`${prefix}__head`}>
        <Button onClick={handleClickButtonAdd} type="primary">
          + Thêm lớp
        </Button>
        <Button onClick={handleDeleteMultiLop} loading={loadingXoaLops} danger>
          Xóa lớp học đã chọn
        </Button>
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

      <ModalLopHoc
        onCallAPISuccess={handleCallAPIAddSuccess}
        khoaId={khoaId}
        type="add"
        closeModal={() => setShowModalAdd(false)}
        visible={showModalAdd}
      />
      <ModalLopHoc
        onCallAPISuccess={handleCallAPIAddSuccess}
        khoaId={khoaId}
        data={currentLopHoc}
        type="edit"
        closeModal={() => setShowModalEdit(false)}
        visible={showModalEdit}
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
    }),
  ),
  onAddClassRoom: PropTypes.func,
  onDeleteMultipleClassroom: PropTypes.func,
  khoaId: PropTypes.string.isRequired,
  refetchFindChuyenNganh: PropTypes.func,
};

TableExpand.defaultProps = {
  data: [],
  onAddClassRoom: () => {},
  onDeleteMultipleClassroom: () => {},
  refetchFindChuyenNganh: () => {},
};
