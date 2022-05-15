import { Button, notification, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import queries from 'core/graphql';
import ModalGiangVien from './ModalGiangVien';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const prefix = 'list-mon-hoc-in-khoa-vien';

const xoaGiangViensOfMonHocMutation = queries.mutation.xoaGiangViensOfMonHoc('id');

const ListGiangVien = ({ data, monHoc, refetchFindKhoaVien }) => {
  const [showModalAdd, setShowModalAdd] = useState(false);

  const dataForTable = data?.map((item) => ({
    ...item,
    key: item?.id,
  }));

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
          <Button onClick={() => handleXoa1GiangVien(record)} loading={loadingXoaGiangViens}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  /**
   * API
   * ===============================================================
   */

  const [actXoaGiangVien, { loading: loadingXoaGiangViens }] = useMutation(
    xoaGiangViensOfMonHocMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.xoaGiangViensOfMonHoc?.errors || [];
        const _data = dataRes?.xoaGiangViensOfMonHoc?.data || [];

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

        refetchFindKhoaVien();

        notification['success']({
          message: `Xóa thành công ${_data?.length} giảng viên khỏi khoa viện.`,
        });
      },
    },
  );

  /**
   * function
   * ==========================================
   */

  const handleXoa1GiangVien = (record) => {
    const _id = record?.id;

    actXoaGiangVien({
      variables: {
        giangVienIds: [_id],
        monHocId: monHoc?.id,
      },
    });
  };

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

  const handleXoaMultipleGiangVien = () => {
    const _ids = selectedRowKeys || [];

    actXoaGiangVien({
      variables: {
        giangVienIds: [..._ids],
        monHocId: monHoc?.id,
      },
    });
  };

  /**
   * render view
   * =====================================================================
   */

  return (
    <div className={prefix}>
      <div className={`${prefix}__head`}>
        <Button onClick={handleXoaMultipleGiangVien} loading={loadingXoaGiangViens} danger>
          Xóa giảng viên đã chọn
        </Button>
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
          dataSource={dataForTable}
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
