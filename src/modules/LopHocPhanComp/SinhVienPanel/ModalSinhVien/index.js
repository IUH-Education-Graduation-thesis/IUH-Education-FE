/* eslint-disable no-unsafe-optional-chaining */
import { Button, Divider, Modal, notification, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterExpand from 'components/SinhVien/FilterExpand';
import queries from 'core/graphql';
import { isEmpty, isArray } from 'lodash';
import { FIND_SINH_VIEN } from 'modules/LopHocPhanComp/fragment';
import { useLazyQuery, useMutation } from '@apollo/client';
import { checkTrulyObject } from 'components/helper';

const findSinhVienQuery = queries.query.findSinhVien(FIND_SINH_VIEN);
const themSinhVienVaoLopHocPhanMutation = queries.mutation.themSinhVienVaoLopHocPhan();

const ModalSinhVien = ({ lopHocPhan, onCallAPISuccess, onClose, visible, ...rest }) => {
  const dataForNhomThucHanh = [...Array(lopHocPhan?.soNhomThucHanh)?.keys()]?.map((item) => ({
    label: `Nhóm ${item + 1}`,
    value: item + 1,
  }));

  const [configs, setConfigs] = useState({
    id: '',
    maSinhVien: '',
    tenSinhVien: '',
    khoaVienIds: [],
    chuyenNganhIds: [],
    khoaHocIds: [],
    lopIds: [],
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentNhomThucHanh, setcurrentNhomThucHanh] = useState(null);

  /**
   * API
   * ================================================
   */

  const [actThemSinhVienVaoLopHocPhan, { loading: loadingThemSinhVienVaoLopHocPhan }] = useMutation(
    themSinhVienVaoLopHocPhanMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.themSinhVienVaoLopHocPhan?.errors || [];
        const _data = dataRes?.themSinhVienVaoLopHocPhan?.data || [];

        if (!isEmpty(_errors))
          return _errors?.map((item) =>
            notification['error']({
              message: item?.message,
            }),
          );

        if (!isArray(_data) && isEmpty(_data)) {
          notification['error']({
            message: 'Lỗi hệ thống!',
          });
          return;
        }

        if (isArray(_data) && isEmpty(_data)) {
          notification['error']({
            message: 'Học sinh đã tồn tại!',
          });
          return;
        }

        onCallAPISuccess(_data?.[0]);

        notification['success']({
          message: `Thêm ${_data?.length} sinh viên vào lớp học phần thành công.`,
        });
      },
    },
  );

  const [actFindSinhVien, { data: dataFindSinhVien, loading: loadingFindSinhVien }] =
    useLazyQuery(findSinhVienQuery);

  const listSinhVienFormat = dataFindSinhVien?.findSinhVien?.data?.[0]?.data?.map((item) => ({
    ...item,
    lop: item?.lop?.ten,
    key: item?.id,
  }));

  /**
   * Function
   * =====================================================
   */

  const handleFilterChange = (fieldChange, allFieldAffterChange) => {
    setConfigs({
      ...allFieldAffterChange,
    });
  };

  const handleThemSinhVien = (id) => {
    const _inputs = {
      hocPhanId: lopHocPhan?.id,
      sinhVienIds: [id],
      nhomThuHanh: currentNhomThucHanh,
    };

    const _inputsCheck = checkTrulyObject(_inputs, ['nhomThuHanh']);

    actThemSinhVienVaoLopHocPhan({
      variables: {
        ..._inputsCheck,
      },
    });
  };

  const handleSelectedRowChange = (ids) => {
    setSelectedRowKeys(ids);
  };

  const handleThemSinhViens = () => {
    const _ids = selectedRowKeys || [];

    const _inputs = {
      hocPhanId: lopHocPhan?.id,
      sinhVienIds: _ids,
      nhomThuHanh: currentNhomThucHanh,
    };

    const _inputsCheck = checkTrulyObject(_inputs, ['nhomThuHanh']);

    actThemSinhVienVaoLopHocPhan({
      variables: {
        ..._inputsCheck,
      },
    });
  };

  const handleSelectorNhomThucHanhChange = (value) => {
    setcurrentNhomThucHanh(value);
  };

  /**
   * useEffect
   * ===========================================================
   */

  /**
   * call api when config change
   */
  useEffect(() => {
    const _inputs = checkTrulyObject(configs);

    actFindSinhVien({
      variables: {
        inputs: {
          ..._inputs,
        },
      },
    });
  }, [actFindSinhVien, configs]);

  /**
   * Render view
   * =======================================================
   */

  const columns = [
    { key: 'id', dataIndex: 'id', title: 'ID' },
    { key: 'maSinhVien', dataIndex: 'maSinhVien', title: 'Mã sinh viên' },
    { key: 'hoTenDem', dataIndex: 'hoTenDem', title: 'Họ tên đệm' },
    { key: 'ten', dataIndex: 'ten', title: 'Tên' },
    { key: 'emai', dataIndex: 'email', title: 'Email' },
    { key: 'soDienThoai', dataIndex: 'soDienThoai', title: 'Số điện thoại' },
    { key: 'lop', dataIndex: 'lop', title: 'Lớp' },
    {
      key: 'action',
      render: (_, record) => {
        return (
          <Button onClick={() => handleThemSinhVien(record?.id)} type="primary">
            Thêm
          </Button>
        );
      },
    },
  ];

  return (
    <Modal
      title="Thêm sinh viên vào lớp học phần"
      width={'70vw'}
      onCancel={onClose}
      {...rest}
      visible={visible}
      confirmLoading={loadingThemSinhVienVaoLopHocPhan}
    >
      <FilterExpand
        currentFilterData={configs}
        onFilterChange={handleFilterChange}
        showPrimaryButton={false}
      />

      <Divider />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="modal-sinh-vien">
        <Select
          onChange={handleSelectorNhomThucHanhChange}
          options={dataForNhomThucHanh}
          placeholder="Nhóm thực hành"
        />

        <Button
          loading={loadingThemSinhVienVaoLopHocPhan}
          style={{ marginLeft: 20 }}
          onClick={handleThemSinhViens}
          type="primary"
        >
          Thêm sinh viên
        </Button>
      </div>

      <Table
        dataSource={listSinhVienFormat}
        loading={loadingFindSinhVien}
        style={{ marginTop: 20 }}
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
      />
    </Modal>
  );
};

export default ModalSinhVien;

ModalSinhVien.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  lopHocPhan: PropTypes.object.isRequired,
  onCallAPISuccess: PropTypes.func,
};

ModalSinhVien.defaultProps = {
  visible: false,
  onClose: () => {},
  onCallAPISuccess: () => {},
};
