import React, { useState } from "react";
import { Button, Table, Modal } from 'antd';
import './PhongHoc.scss'
import ModalAddPhonghoc from './FormAddPhongHoc'
const PhongHoc = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [dayNha, setDayNha] = useState({});
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
  const handlerEditButton = (e) => {
    setDayNha(e);
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
    <div className='phongHoc'>
      <h1>DANH SÁCH DÃY NHÀ </h1>
      <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModalAdd(true)}>+ Thêm dãy nhà</Button>
      <Table className='ant-table-wrapper' columns={columns} dataSource={data} scroll={{ x: 1500, y: "50vh" }} />
      <ModalAddPhonghoc
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
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
