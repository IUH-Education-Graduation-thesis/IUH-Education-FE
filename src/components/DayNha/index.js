import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from 'antd';
import './DayNha.scss'
import ModalAddDayNha from './FormAddDayNha'
import { GET_DAYNHA_FRAGMENT } from "./fragment";
import queries from "core/graphql";
import { useQuery } from "@apollo/client";
// Call API
const getAllDayNha = queries.query.findDayNha(GET_DAYNHA_FRAGMENT);

const DayNha = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [dayNha, setDayNha] = useState({});
  const [data, setData] = useState([]);

  const { data: dataGetDayNha, loading: loadingGetDayNha } = useQuery(getAllDayNha);
  console.log("data Day nha", dataGetDayNha?.findDayNha?.data);
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
          <Button style={{ marginLeft: 10 }}>Xóa</Button>
        </div>
      ),
    },
  ];
  const handlerEditButton = (e) => {
    setDayNha(e);
    setVisibleModalEdit(true);
  };
  // const data = [];
  // for (let i = 0; i < 30; i++) {
  //   data.push({
  //     key: i,
  //     maKhoa: `${i}`,
  //     tenKhoa: `Kinh doanh quốc tế`,
  //     moTa: 'New York No. 1 Lake Park',
  //   });
  // }
  return (
    <div className='daynha'>
      <h1>DANH SÁCH DÃY NHÀ </h1>
      <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModalAdd(true)}>+ Thêm dãy nhà</Button>
      <Table className='ant-table-wrapper' columns={columns} dataSource={data} scroll={{ x: 1500, y: "50vh" }} />
      <ModalAddDayNha
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
      />
      <ModalAddDayNha
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

export default DayNha;
