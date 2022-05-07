import { Button, Checkbox, notification, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import queries from 'core/graphql';
import ModalHocPhan from './ModalHocPhan';
import { useMutation } from '@apollo/client';

const prefix = 'khoa-hoc-ky-hoc-phan';

const xoaHocPhansMutation = queries.mutation.xoaHocPhans('id');

const ListHocPhan = ({ data, hocKyId, refetchFindKhoaHoc }) => {
  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
    },
    {
      key: 'maHocPhan',
      dataIndex: 'maHocPhan',
      title: 'Mã học phần',
    },
    {
      render: (_, record) => record?.monHoc?.ten,
      title: 'Môn học',
    },
    {
      title: 'Bắt buộc',
      render: (_, record) => <Checkbox checked={record?.batBuoc} />,
    },
    {
      key: 'soTinChiLyThuet',
      dataIndex: 'soTinChiLyThuyet',
      title: 'Tín chỉ lý thuyết',
    },
    {
      key: 'soTinChiThucHanh',
      dataIndex: 'soTinChiThucHanh',
      title: 'Tín chỉ thực hành',
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
          <Button onClick={(e) => handleDeleteRow(e, record)}>Xóa</Button>
        </div>
      ),
    },
  ];

  const dataTabel = data?.hocPhans?.map((item) => ({ ...item, key: item?.id }));

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModaEdit, setShowModaEdit] = useState(false);
  const [currentHocPhan, setCurrentHocPhan] = useState(null);

  /**
   * API
   * =====================================================
   */

  const [actXoaHocPhans, { loading: loadinbXoaHocPhans }] = useMutation(xoaHocPhansMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.xoaHocPhans?.errors || [];
      const _data = dataRes?.xoaHocPhans?.data || [];

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
      refetchFindKhoaHoc();

      notification['success']({
        message: `Xóa ${_data?.length} học phần thành công.`,
      });
    },
  });

  /**
   * Function
   * =========================================================
   */

  const handleDeleteRow = (e, record) => {
    e?.stopPropagation();

    actXoaHocPhans({
      variables: {
        ids: [record?.id],
      },
    });
  };

  const handleEditRow = (e, record) => {
    e?.stopPropagation();

    setCurrentHocPhan(record);
    setShowModaEdit(true);
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleADDHocPhan = () => {
    setShowModalAdd(true);
  };

  const handleWhenModalHocPhanSuccess = () => {
    setShowModaEdit(false);
    setShowModalAdd(false);
    refetchFindKhoaHoc();
  };

  const handleDeleteMutipleRow = () => {
    const _ids = selectedRowKeys || [];

    actXoaHocPhans({
      variables: {
        ids: _ids,
      },
    });
  };

  const handleOnRowClick = (event, record) => {
    const _origin = window?.location?.origin;

    window.location.href = `${_origin}/hoc-phan/${record?.id}`;
  };

  /**
   * render view
   * =========================================================
   */

  return (
    <div className={prefix}>
      <div className={`${prefix}__head`}>
        <div className={`${prefix}__head__left`}>Môn học của học kỳ {data?.thuTuHocKy}</div>
        <div className={`${prefix}__head__right`}>
          <Button
            onClick={handleDeleteMutipleRow}
            disabled={selectedRowKeys?.length <= 0}
            loading={loadinbXoaHocPhans}
            danger
          >
            Xóa học phần đã chọn
          </Button>
          <Button onClick={handleADDHocPhan} type="primary">
            Thêm học phần
          </Button>
        </div>
      </div>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
        onRow={(record) => ({
          onClick: (e) => handleOnRowClick(e, record),
        })}
        bordered
        columns={columns}
        dataSource={dataTabel}
      />

      <ModalHocPhan
        visible={showModalAdd}
        closeModal={() => setShowModalAdd(false)}
        hocKyId={hocKyId}
        onCallAPISuccess={handleWhenModalHocPhanSuccess}
      />
      <ModalHocPhan
        visible={showModaEdit}
        type="edit"
        closeModal={() => setShowModaEdit(false)}
        hocKyId={hocKyId}
        data={currentHocPhan}
        onCallAPISuccess={handleWhenModalHocPhanSuccess}
      />
    </div>
  );
};

export default ListHocPhan;

ListHocPhan.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  hocKyId: PropTypes.number.isRequired,
  refetchFindKhoaHoc: PropTypes.func,
};

ListHocPhan.defaultProps = {
  refetchFindKhoaHoc: () => {},
};
