import React, { useEffect, useState } from "react";
import { Button, Table } from 'antd';
import './DayNha.scss'
import ModalAddDayNha from './FormAddDayNha'
import { GET_DAYNHA_FRAGMENT } from "./fragment";
import queries from "core/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { get, isEmpty } from "lodash";

// Call API
const getAllDayNhaQuery = queries.query.findDayNha(GET_DAYNHA_FRAGMENT);
const deleteDayNhaMutation = queries.mutation.xoaDayNha(GET_DAYNHA_FRAGMENT);

const DayNha = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [dayNha, setDayNha] = useState({});
  const [data, setData] = useState([]);

  const { data: dataGetDayNha, loading: loadingGetDayNha } = useQuery(getAllDayNhaQuery);
  const [actDeleteDayNha, { data: dataDeleteDayNha, loading: loadingDeleteDayNha }] = useMutation(deleteDayNhaMutation);

  useEffect(() => {
    const _listDayNha = dataGetDayNha?.findDayNha?.data || [];
    setData(_listDayNha);
  }, [dataGetDayNha]);

  const columns = [
    {
      title: 'Mã dãy nhà',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Tên dãy nhà',
      dataIndex: 'tenDayNha',
      key: 'tenDayNha',
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
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => handleButtonDelete(e)}
          >Xóa</Button>
        </div>
      ),
    },
  ];

  const handlerEditButton = (e) => {
    setDayNha(e);
    setVisibleModalEdit(true);
  };

  const handleButtonDelete = async (dayNha) => {

    const _dataReutrn = await actDeleteDayNha({
      variables: {
        id: dayNha?.id
      }
    });

    const dataReturn = get(_dataReutrn, "data", {});

    const errors = get(dataReturn, 'xoaDayNha.errors', []);
    if (!isEmpty(errors)) {
      errors?.map(item => console.log(item.message));
      return;
    }

    const status = get(dataReturn, 'xoaDayNha.status', "");
    if (status === "OK") {
      const _index = data?.findIndex(item => item?.id === dayNha?.id)

      let _listDayNha = data;
      _listDayNha = [
        ..._listDayNha.slice(0, _index),
        ..._listDayNha.slice(_index + 1)
      ];

      setData(_listDayNha);

      return;
    }

    console.log("Loi ket noi");
  }

  const handleCreateComplete = (e) => {
    setVisibleModalAdd(false);
    let _data = data;
    _data = [e, ..._data];
    setData(_data);
  }

  const handleUpdateComplete = (e) => {
    setVisibleModalEdit(false);

    const _index = data?.findIndex(item => item?.id === e?.id);

    let _data = data;
    _data = [
      ...data?.slice(0, _index),
      {
        ..._data?.[_index],
        ...e
      },
      ...data?.slice(_index + 1)
    ];
    console.log(_data);

    setData(_data);
  }
  return (
    <div className='daynha'>
      <h1>DANH SÁCH DÃY NHÀ </h1>
      <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModalAdd(true)}>+ Thêm dãy nhà</Button>
      <Table className='ant-table-wrapper' columns={columns} dataSource={data} scroll={{ x: 1500, y: "50vh" }} />
      <ModalAddDayNha
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
        onCreateComplete={(e) => handleCreateComplete(e)}
      />
      <ModalAddDayNha
        type="edit"
        visible={visibleModalEdit}
        closeModal={setVisibleModalEdit}
        data={
          dayNha
        }
        onCreateComplete={(e) => handleUpdateComplete(e)}
      />
    </div>
  );
};

export default DayNha;
