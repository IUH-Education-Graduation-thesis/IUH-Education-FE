import React, { useState } from "react";
import { Button, Table, Modal } from 'antd';
import './KhoaHoc.scss'
import ModalAddKhoaHoc from './FormAddKhoaHoc'
const KhoaHocComponent = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [khoaHoc, setKhoa] = useState({});
  const columns = [
    {
      title: 'Mã khóa học',
      dataIndex: 'maKhoaHoc',
      key: 'maKhoaHoc',
      width: 100,
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
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
  const handlerEditButton = (khoaHoc) => {
    setKhoa(khoaHoc);
    setVisibleModalEdit(true);
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
    <div className='khoaHoc'>
      <h1>DANH SÁCH KHÓA HỌC </h1>
      <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModalAdd(true)}>+ Thêm khóa học</Button>
      <Table className='ant-table-wrapper' columns={columns} dataSource={data} scroll={{ x: 1500, y: "50vh" }} />
      <ModalAddKhoaHoc
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
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
