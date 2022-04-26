import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, notification, Divider } from 'antd';
import './KhoaHoc.scss';
import ModalAddKhoaHoc from './FormAddKhoaHoc';
import queries from 'core/graphql';
import { GET_KHOAHOC_FAGMENT } from './fragment';
import { useMutation, useQuery } from '@apollo/client';
import { get, isEmpty } from 'lodash';
import ExpandFilter from './FilterExpand';

const getAllKhoaHocQuery = queries.query.findKhoaHocs(GET_KHOAHOC_FAGMENT);
const xoaKhoaHocMutation = queries.mutation.xoaKhoaHocs(GET_KHOAHOC_FAGMENT);

const KhoaHocComponent = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [khoaHoc, setKhoa] = useState({});
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const dataMockKhoaHoc = [...Array(10)?.keys()]?.map((i) => ({
    id: i,
    key: i,
    khoa: i,
    namBatDau: 2014,
    namKetThuc: 2015,
    moTa: `Day la mo ta`,
    chuyenNganh: {
      id: i,
      khoaVien: {
        id: i,
      },
    },
  }));

  const { data: dataGetKhoaHoc, loading: loadingGetKhoaHoc } =
    useQuery(getAllKhoaHocQuery);
  const [actDelete, { data: dataDeleteDayNha, loading: loadingDeleteDayNha }] =
    useMutation(xoaKhoaHocMutation);

  useEffect(() => {
    const _listDayNha = dataGetKhoaHoc?.findKhoaHocs?.data || [];
    setData(_listDayNha);
  }, [dataGetKhoaHoc]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'khoa',
      key: 'khoa',
      width: 400,
    },
    {
      title: 'Năm bắt đầu',
      dataIndex: 'namBatDau',
      key: 'namBatDau',
      width: 200,
    },
    {
      title: 'Năm kết thúc',
      dataIndex: 'namKetThuc',
      key: 'namKetThuc',
      width: 200,
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
      fixed: 'right',
      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Chỉnh sửa
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => handleButtonDelete(e)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  /**
   * Function
   * ====================================================================
   */
  const handlerEditButton = (khoaHoc) => {
    setKhoa(khoaHoc);
    setVisibleModalEdit(true);
  };

  const handleCreateComplete = (e) => {
    setVisibleModalAdd(false);
    let _data = data;
    _data = [e, ..._data];
    setData(_data);
  };

  const handleButtonDelete = async (e) => {
    const _dataReutrn = await actDelete({
      variables: {
        id: e?.id,
      },
    });

    const dataReturn = get(_dataReutrn, 'data', {});

    const errors = get(dataReturn, 'xoaKhoaHoc.errors', []);
    if (!isEmpty(errors)) {
      errors?.map((item) =>
        notification['error']({
          message: item?.message,
        })
      );
      return;
    }

    const status = get(dataReturn, 'xoaKhoaHoc.status', '');
    if (status === 'OK') {
      const _index = data?.findIndex((item) => item?.id === e?.id);

      let _listKhoaHoc = data;
      _listKhoaHoc = [
        ..._listKhoaHoc.slice(0, _index),
        ..._listKhoaHoc.slice(_index + 1),
      ];

      setData(_listKhoaHoc);
      notification.open({
        message: 'Thông báo',
        description: status,
      });
      return;
    }

    console.log('Loi ket noi');
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleClickTableRow = (e, record) => {
    const _origin = window?.location?.origin;

    const _khoaVienId = record?.chuyenNganh?.khoaVien?.id;
    const _chuyenNganhId = record?.chuyenNganh?.id;

    window.location.href = `${_origin}/khoa-vien/${_khoaVienId}/chuyen-nganh/${_chuyenNganhId}/khoa/${record?.id}`;
  };

  /**
   * Render view
   * ===========================================================
   */

  return (
    <div className="khoaHoc">
      <h3>DANH SÁCH KHÓA HỌC</h3>
      <ExpandFilter />
      <Divider />
      <div className="khoaHoc__action">
        <Button danger>Xóa khóa học đã chọn</Button>
      </div>
      <Table
        className="ant-table-wrapper"
        columns={columns}
        dataSource={dataMockKhoaHoc}
        scroll={{ x: 1500, y: '50vh' }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
        onRow={(record) => {
          return {
            onClick: (e) => handleClickTableRow(e, record),
          };
        }}
      />
      <ModalAddKhoaHoc
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
        onCreateComplete={(e) => handleCreateComplete(e)}
      />
      <ModalAddKhoaHoc
        type="edit"
        visible={visibleModalEdit}
        closeModal={setVisibleModalEdit}
        data={khoaHoc}
      />
    </div>
  );
};

export default KhoaHocComponent;
