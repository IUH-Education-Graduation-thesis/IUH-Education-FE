import React, { useEffect, useState } from "react";
import { Table, Button, Select, Modal } from "antd";
import { useQuery, useMutation } from "@apollo/client";

import queries from "core/graphql";
import ModalAddSinhVien from "./FormAddStudent";
import { GET_SINHVIENS_FRAGMENT } from "./fragment";
import "./SinhVien.scss";

// const getSinhViensQuery = queries.query.getSinhViens(GET_SINHVIENS_FRAGMENT);

const SinhVienComponent = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [sinhVien, setSinhVien] = useState({});
  // const [data, setData] = useState([]);

  const columns = [
    {
      title: "ID",
      width: 50,
      dataIndex: "sinhVienId",
      key: "sinhVienId",
      fixed: "left",
    },
    {
      title: "MSSV",
      width: 100,
      dataIndex: "maSinhVien",
      key: "maSinhVien",
      fixed: "left",
    },
    {
      title: "Họ tên đệm",
      width: 250,
      dataIndex: "hoTenDem",
      key: "hoTenDem",
      fixed: "left",
    },
    {
      title: "Tên",
      width: 250,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Giới tính",
      width: 250,
      dataIndex: "gioiTinh",
      key: "gioiTinh",
    },
    {
      title: "Ngày sinh",
      width: 250,
      dataIndex: "ngaySinh",
      key: "ngaySinh",
    },
    {
      title: "Bậc đào tạo",
      width: 250,
      dataIndex: "bacDaoTao",
      key: "bacDaoTao",
    },
    {
      title: "Trạng thái",
      width: 250,
      dataIndex: "trangThai",
      key: "trangThai",
    },
    {
      title: "Loại hình đào tạo",
      width: 250,
      dataIndex: "loaiHinhDaoTao",
      key: "loaiHinhDaoTao",
    },
    {
      title: "Ngày vào trường",
      width: 250,
      dataIndex: "ngayVaoTruong",
      key: "ngayVaoTruong",
    },
    {
      title: "Ngày vào đoàn",
      width: 250,
      dataIndex: "ngayVaoDoan",
      key: "ngayVaoDoan",
    },
    {
      title: "Số điện thoại",
      width: 250,
      dataIndex: "soDienThoai",
      key: "soDienThoai",
    },
    {
      title: "Địa chỉ",
      width: 250,
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "Nơi sinh",
      width: 250,
      dataIndex: "noiSinh",
      key: "noiSinh",
    },
    {
      title: "Hộ khẩu thường trú",
      width: 250,
      dataIndex: "hoKhauThuongTru",
      key: "hoKhauThuongTru",
    },
    {
      title: "Dân tộc",
      width: 250,
      dataIndex: "danToc",
      key: "danToc",
    },
    {
      title: "Ngày vào đảng",
      width: 250,
      dataIndex: "ngayVaoDang",
      key: "ngayVaoDang",
    },
    {
      title: "Email",
      width: 250,
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tôn giáo",
      width: 250,
      dataIndex: "tonGiao",
      key: "tonGiao",
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 200,

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

  // const { data: dataGetSinhViens, loading: loadingGetSinhViens } =
  //   useQuery(getSinhViensQuery);

  const handlerEditButton = (sinhVien) => {
    setSinhVien(sinhVien);
    setVisibleModalEdit(true);
  };

  // console.log("dataGetSinhViens", dataGetSinhViens);

  // useEffect(() => {
  //   const _listSinhVien = dataGetSinhViens?.getSinhViens?.data || [];
  //   setData(_listSinhVien);
  // }, [dataGetSinhViens]);
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      sinhVienId: `${i}`,
      hoTenDem: `Nguyễn Hoàng Anh `,
      ten: `Nhân ${i}`,
      maSinhVien: 18050711,
      gioiTinh: `Nam`,
      address: `London Park no. ${i}`,
      sdt: `023191233${i}`,
      cmnd: `2138631${i}`,
      khoa: `Khoa Công nghệ thông tin`,
      chuyenNganh: `Kỹ thuật phần mềm`,
      trangThai: `Đang học`,
      bacDaoTao: `Đại học`,
      khoaHoc: `2018-2022`,
      email: `email`,
      mahs: `${i}`,
      ngaySinh: `1/2/2000`,
      ngayVaoTruong: `1/2/2017`,
      ngayVaoDoan: `1/2/2017`,
      ngayVaoDang: `1/2/2020`,
      maKhuVuc: 1,
      diaChilh: `11 Phan Huy Ích,p7,Quân Bình Thạnh,Tp.Hồ Chí Minh, Việt Nam`,
      hoKhau: `11 Phan Huy Ích,p7,Quân Bình Thạnh,Tp.Hồ Chí Minh, Việt Nam`,
      trangThaiHocTap: `Đang học`,
      loaiHinhDaoTao: `Tiên tiến`,
      danToc: `Kinh`,
      tonGiao: `Phật`,
      doiTuong: `Không`,

    });
  }
  const { Option } = Select;
  const khoaData = ["CNTT", "Công nghệ may", "Kinh doanh quốc tế"];

  React.useState(khoaData[0]);

  return (
    <div className="sinhvien">
      <h1>DANH SÁCH SINH VIÊN</h1>
      <div className="combox-sv">
        <span>Khoa</span>
        <Select
          className="ant-select-selector"
          defaultValue={khoaData[0]}
          style={{ width: 300 }}
        >
          {khoaData.map((khoaData) => (
            <Option key={khoaData}>{khoaData}</Option>
          ))}
        </Select>
      </div>
      <Button
        onClick={() => setVisibleModalAdd(true)}
        className="ant-btn-primary"
        type="primary"
      >
        + Thêm sinh viên
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500, y: "50vh" }}
      />

      <ModalAddSinhVien
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
      />
      <ModalAddSinhVien
        type="edit"
        visible={visibleModalEdit}
        closeModal={setVisibleModalEdit}
        data={sinhVien}
      />
    </div>
  );
};

export default SinhVienComponent;
