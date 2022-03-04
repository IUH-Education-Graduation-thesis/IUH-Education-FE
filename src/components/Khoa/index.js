import React, { useState } from "react";
import { Button, Table, Modal } from 'antd';
import './Khoa.scss'
import ModalAddKhoa from './FormAddKhoa'
const KhoaComponent = () => {
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [khoa, setKhoa] = useState({});
  const columns = [
    {
      title: 'Mã khoa',
      dataIndex: 'maKhoa',
      key: 'maKhoa',
      width: 100,
    },
    {
      title: 'Tên khoa',
      dataIndex: 'tenKhoa',
      key: 'tenKhoa',
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
          <Button style={{marginLeft:10}}>Xóa</Button>
        </div>
      ),
    },
  ];
  const handlerEditButton = (khoa) => {
    setKhoa(khoa);
    setVisibleModal1(true);
  };
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      key: i,
      maKhoa: `${i}`,
      tenKhoa: `Kinh doanh quốc tế`,
      moTa: 'New York No. 1 Lake Park',
    });
  }
  return (
    <div className='khoa'>
      <h1>DANH SÁCH KHOA</h1>
      <Button className='ant-btn-primary' type="primary"  onClick={() => setVisibleModal(true)}>+ Thêm khoa</Button>
      <Table className='ant-table-wrapper' columns={columns} dataSource={data} />
      <ModalAddKhoa
        type="add"
        visible={visibleModal}
        closeModal={setVisibleModal}
      />
      <ModalAddKhoa
        type="sua"
        visible={visibleModal1}
        closeModal={setVisibleModal1}
        data={
          khoa
        }
      />
    </div>
  );
};

export default KhoaComponent;
