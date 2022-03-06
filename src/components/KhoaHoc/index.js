import React, { useEffect, useState } from "react";
import { Button, Table, Modal, notification } from 'antd';
import './KhoaHoc.scss'
import ModalAddKhoaHoc from './FormAddKhoaHoc'
import queries from "core/graphql";
import { GET_KHOAHOC_FAGMENT } from "./fragment";
import { useMutation, useQuery } from "@apollo/client";
import { get, isEmpty } from "lodash";

const getAllKhoaHocQuery = queries.query.findKhoaHocs(GET_KHOAHOC_FAGMENT);
const xoaKhoaHocMutation = queries.mutation.xoaKhoaHoc(GET_KHOAHOC_FAGMENT)

const KhoaHocComponent = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [khoaHoc, setKhoa] = useState({});
  const [data, setData] = useState([]);
  const { data: dataGetKhoaHoc, loading: loadingGetKhoaHoc } = useQuery(getAllKhoaHocQuery);
  const [actDelete, { data: dataDeleteDayNha, loading: loadingDeleteDayNha }] = useMutation(xoaKhoaHocMutation);

  useEffect(() => {
    const _listDayNha = dataGetKhoaHoc?.findKhoaHocs?.data || [];
    setData(_listDayNha);
  }, [dataGetKhoaHoc]);
  const columns = [
    {
      title: 'Mã khóa học',
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
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: 300,
    },
    {
      title: 'Thao tác',
      key: 'thaoTac',
      width: 300,
      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Chỉnh sửa
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={() => handleButtonDelete(e)}>Xóa</Button>
        </div>
      ),
    },
  ];
  const handlerEditButton = (khoaHoc) => {
    setKhoa(khoaHoc);
    setVisibleModalEdit(true);
  };
  const handleCreateComplete = (e) => {
    setVisibleModalAdd(false);
    let _data = data;
    _data = [e, ..._data];
    setData(_data);
  }
  const handleButtonDelete = async (e) => {

    const _dataReutrn = await actDelete({
      variables: {
        id: e?.id
      }
    });

    const dataReturn = get(_dataReutrn, "data", {});

    const errors = get(dataReturn, 'xoaKhoaHoc.errors', []);
    if (!isEmpty(errors)) {
      errors?.map(item =>
        notification["error"]({
          message: item?.message,
        }));
      return;
    }

    const status = get(dataReturn, 'xoaKhoaHoc.status', "");
    if (status === "OK") {
      const _index = data?.findIndex(item => item?.id === e?.id)

      let _listKhoaHoc = data;
      _listKhoaHoc = [
        ..._listKhoaHoc.slice(0, _index),
        ..._listKhoaHoc.slice(_index + 1)
      ];

      setData(_listKhoaHoc);
      notification.open({
        message: 'Thông báo',
        description: status,
      })
      return;
    }

    console.log("Loi ket noi");
  }
  return (
    <div className='khoaHoc'>
      <h1>DANH SÁCH KHÓA HỌC </h1>
      <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModalAdd(true)}>+ Thêm khóa học</Button>
      <Table className='ant-table-wrapper' columns={columns} dataSource={data} scroll={{ x: 1500, y: "50vh" }} />
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
        data={
          khoaHoc
        }
      />
    </div>
  );
};

export default KhoaHocComponent;
