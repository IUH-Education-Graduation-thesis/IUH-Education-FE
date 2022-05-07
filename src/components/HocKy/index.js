import React, { useState } from 'react';
import { Button, Table } from 'antd';
import './index.scss';
import ModalHocKy from './FormAddHocKy';
const HocKy = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalSua, setVisibleModalSua] = useState(false);
  const [hocKy, setHocKy] = useState({});
  const columns = [
    {
      title: 'Mã học kỳ',
      dataIndex: 'maHocKy',
      key: 'maHocKy',
      width: 200,
    },
    {
      title: 'Năm học bắt đầu',
      dataIndex: 'namHocBatDau',
      key: 'namHocBatDau',
      width: 400,
    },
    {
      title: 'Năm học kết thúc',
      dataIndex: 'namHocKetThuc',
      key: 'namHocKetThuc',
      width: 400,
    },
    {
      title: 'Học kỳ',
      dataIndex: 'hocKy',
      key: 'hocKy',
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
      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Chỉnh sửa
          </Button>{' '}
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      key: i,
      maHocKy: `${i}`,
      moTa: `K1${i}`,
      hocKy: 1,
      namHocBatDau: '2018',
      namHocKetThuc: '2022',
    });
  }
  const handlerEditButton = (hocKy) => {
    setHocKy(hocKy);
    setVisibleModalSua(true);
  };
  return (
    <div className="hocKy">
      <h1>DANH SÁCH HỌC KỲ</h1>
      <Button className="ant-btn-primary" type="primary" onClick={() => setVisibleModal(true)}>
        + Thêm học kỳ
      </Button>
      <Table className="ant-table-wrapper" columns={columns} dataSource={data} />
      <ModalHocKy type="add" visible={visibleModal} closeModal={setVisibleModal} />
      <ModalHocKy
        type="sua"
        visible={visibleModalSua}
        closeModal={setVisibleModalSua}
        data={hocKy}
      />
    </div>
  );
};
export default HocKy;
