import React, { useCallback, useEffect, useState } from 'react';
import { Button, Table, Divider, notification } from 'antd';
import queries from 'core/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';
import { checkTrulyObject } from 'components/helper';
import { isEmpty } from 'lodash';

import { FIND_KHOA_VIEN } from './fragment';
import './Khoa.scss';
import ModalAddKhoa from './FormAddKhoa';
import FilterExpand from './FilterExpand';
import ModalAddChuyenNganh from '../ChuyenNganh/FormAddChuyenNganh';

const findKhoaVienQuery = queries.query.findKhoaVien(FIND_KHOA_VIEN);
const xoaKhoaViensQuery = queries.mutation.xoaKhoaViens('id');

const KhoaComponent = () => {
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibelModalThemChuyenNganh, setvisibelModalThemChuyenNganh] = useState(false);
  const [khoa, setKhoa] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [currentConfig, setCurrentConfig] = useState({
    id: '',
    ten: '',
  });

  const columns = [
    {
      title: 'Mã khoa',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Tên khoa',
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
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 300,
    },
    {
      title: 'Thao tác',
      key: 'thaoTac',
      width: 300,
      render: (_, record) => (
        <div>
          <Button danger onClick={(e) => handlerEditButton(e, record)}>
            Chỉnh sửa
          </Button>
          <Button onClick={(e) => handleDeleteRow(e, record)} style={{ marginLeft: 10 }}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  /**
   * API
   * ===============================================================
   */
  const [actXoaKhoaViens, { loading: loadingXoaKhoaVien }] = useMutation(xoaKhoaViensQuery, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.xoaKhoaViens?.errors || [];
      const _data = dataRes?.xoaKhoaViens?.data || [];

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

      callAPIFindKhoaVien();

      notification['success']({
        message: `Xóa thành công ${_data?.length} khoa viện.`,
      });
    },
  });

  const [actFindKhoaVien, { data: dataFindKhoaVien, loading: loadingFindKhoaVien }] = useLazyQuery(
    findKhoaVienQuery,
    {
      fetchPolicy: 'network-only',
    },
  );

  const listKhoaVien =
    dataFindKhoaVien?.findKhoaVien?.data?.[0]?.data?.map((item) => ({
      ...item,
      key: item?.id,
    })) || [];

  /**
   * Function
   * =============================================================
   */
  const handleDeleteRow = (e, record) => {
    e.stopPropagation();

    actXoaKhoaViens({
      variables: {
        ids: [record?.id],
      },
    });
  };

  const callAPIFindKhoaVien = useCallback(() => {
    const _inputs = checkTrulyObject(currentConfig);

    actFindKhoaVien({
      variables: {
        inputs: {
          ..._inputs,
        },
      },
    });
  }, [actFindKhoaVien, currentConfig]);

  const handleWhenAddKhoaVienSuccess = () => {
    callAPIFindKhoaVien();
    setVisibleModal(false);
    setVisibleModal1(false);
  };

  const handlerEditButton = (e, khoa) => {
    e.stopPropagation();
    setKhoa(khoa);
    setVisibleModal1(true);
  };

  const handleChangeSelectedRowKey = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleClickRowTable = (e, record) => {
    const _origin = window?.location?.origin;
    window.location.href = `${_origin}/khoa-vien/${record?.id}`;
  };

  const handleFilterChange = (currentFieldChange, allFiledCurrent) => {
    setCurrentConfig({
      ...allFiledCurrent,
    });
  };

  const handleFilterClear = () => {
    setCurrentConfig({
      id: '',
      ten: '',
    });
  };

  const handleDeleteMultiKhoaVien = () => {
    const _ids = selectedRowKeys || [];

    actXoaKhoaViens({
      variables: {
        ids: _ids,
      },
    });
  };

  /**
   * useEffect
   * ==============================================================
   */

  /**
   * find khoa vien when init page
   */
  useEffect(() => {
    const _inputs = checkTrulyObject(currentConfig);

    actFindKhoaVien({
      variables: {
        inputs: {
          ..._inputs,
        },
      },
    });
  }, [actFindKhoaVien, currentConfig]);

  /**
   * Render view
   * =======================================================================
   */

  return (
    <div className="khoa">
      <h3>DANH SÁCH KHOA</h3>
      <FilterExpand
        onClear={handleFilterClear}
        currentFilterData={currentConfig}
        onFilterChange={handleFilterChange}
        onAddAStudentClick={() => setVisibleModal(true)}
      />

      <Divider />

      <div className="khoa__action">
        <Button
          loading={loadingXoaKhoaVien}
          onClick={handleDeleteMultiKhoaVien}
          disabled={isEmpty(selectedRowKeys)}
          danger
        >
          Xóa học phần đã chọn
        </Button>
      </div>

      <Table
        className="ant-table-wrapper"
        columns={columns}
        loading={loadingFindKhoaVien}
        dataSource={listKhoaVien}
        onRow={(record) => {
          return {
            onClick: (e) => handleClickRowTable(e, record),
          };
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleChangeSelectedRowKey,
        }}
      />
      <ModalAddKhoa
        type="add"
        visible={visibleModal}
        closeModal={setVisibleModal}
        onCallAPISuccess={handleWhenAddKhoaVienSuccess}
      />
      <ModalAddKhoa
        type="sua"
        visible={visibleModal1}
        onCallAPISuccess={handleWhenAddKhoaVienSuccess}
        closeModal={setVisibleModal1}
        data={khoa}
      />
      <ModalAddChuyenNganh
        closeModal={() => setvisibelModalThemChuyenNganh(false)}
        visible={visibelModalThemChuyenNganh}
        isKhoaMode
      />
    </div>
  );
};

export default KhoaComponent;
