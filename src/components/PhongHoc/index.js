import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from 'antd';
import './PhongHoc.scss'
import ModalAddPhonghoc from './FormAddPhongHoc'
import queries from "core/graphql"
import { GET_PHONGHOC_FRAGMENT } from "./fragment";
import { useMutation, useQuery } from "@apollo/client";
import { get, isEmpty } from "lodash";

const createPhongHocMutation = queries.mutation.themPhongHoc(GET_PHONGHOC_FRAGMENT)
const findPhongHocQuery = queries.query.findPhongHocs(GET_PHONGHOC_FRAGMENT)
const deletePhongHocMutation = queries.mutation.xoaPhongHoc(GET_PHONGHOC_FRAGMENT)

const PhongHoc = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [dayNha, setDayNha] = useState({});
  const [data, setData] = useState([]);
  const { data: dataGetPhongHoc, loading: loadingGetPhongHoc } = useQuery(findPhongHocQuery);

  const columns = [
    {
      title: 'Mã phòng học',
      dataIndex: 'id',
      key: 'id',
      width: 130,
    },
    {
      title: 'Tên phòng học',
      dataIndex: 'tenPhongHoc',
      key: 'tenPhongHoc',
      width: 300,
    },
    {
      title: 'Sức chứa',
      dataIndex: 'sucChua',
      key: 'sucChua',
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
      width: 400,
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
  const [actDelete, { data: dataDelete, loading: loadingDelete }] = useMutation(deletePhongHocMutation)
  useEffect(() => {
    const _listPhongHoc = dataGetPhongHoc?.findPhongHocs?.data || [];
    setData(_listPhongHoc);
  }, [dataGetPhongHoc]);

  const handleButtonDelete = async (phongHoc) => {

    const _dataReutrn = await actDelete({
      variables: {
        phongHocId: phongHoc?.id
      }
    });

    const dataReturn = get(_dataReutrn, "data", {});

    const errors = get(dataReturn, 'xoaPhongHoc.errors', []);
    if (!isEmpty(errors)) {
      errors?.map(item => console.log(item.message));
      return;
    }

    const status = get(dataReturn, 'xoaPhongHoc.status', "");
    if (status === "OK") {
      const _index = data?.findIndex(item => item?.id === phongHoc?.id)

      let _listPhongHoc = data;
      _listPhongHoc = [
        ..._listPhongHoc.slice(0, _index),
        ..._listPhongHoc.slice(_index + 1)
      ];

      setData(_listPhongHoc);

      return;
    }

    console.log("Loi ket noi");
  }
  const handlerEditButton = (e) => {
    setDayNha(e);
    setVisibleModalEdit(true);
  };
  const handleCreateComplete = (e) => {
    setVisibleModalAdd(false);
    let _data = data;
    _data = [e, ..._data];
    setData(_data);
  }
  return (
    <div className='phongHoc'>
      <h1>DANH SÁCH PHÒNG HỌC </h1>
      <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModalAdd(true)}>+ Thêm phòng học</Button>
      <Table className='ant-table-wrapper' columns={columns} dataSource={data} scroll={{ x: 1500, y: "50vh" }} />
      <ModalAddPhonghoc
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
        onCreateComplete={(e) => handleCreateComplete(e)}
      />
      <ModalAddPhonghoc
        type="edit"
        visible={visibleModalEdit}
        closeModal={setVisibleModalEdit}
        data={
          dayNha
        }
      />
    </div>
  );
};

export default PhongHoc;
