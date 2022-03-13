import React, { useState } from "react";
import { Table, Button, Divider } from "antd";
import "./index.scss";
import ModalHocPhan from "./FormAddHocPhan";
import ExpandFilter from "./FilterExpand";

const HocPhan = () => {
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [hocPhan, setHocPhan] = useState({});
  const columns = [
    {
      title: "ID",
      width: 50,
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã học phần",
      dataIndex: "maHocPhan",
      key: "maHocPhan",
      width: 200,
    },
    {
      title: "Môn học",
      dataIndex: "monHoc",
      key: "monHoc",
      width: 400,
    },
    {
      title: "Số tín chỉ LT",
      dataIndex: "tinChiLT",
      key: "tinChiLT",
      width: 300,
    },
    {
      title: "Số tín chỉ TH",
      dataIndex: "tinChiTH",
      key: "tinChiTH",
      width: 300,
    },
    {
      title: "Học phần bắt buộc",
      dataIndex: "hocPhanBatBuoc",
      key: "hocPhanBatBuoc",
      width: 300,
    },
    {
      title: "Môn học tiên quyết",
      dataIndex: "monHocTienQuyet",
      key: "monHocTienQuyet",
      width: 300,
    },
    {
      title: "Môn học song hành",
      dataIndex: "monHocSongHanh",
      key: "monHocSongHanh",
      width: 300,
    },
    {
      title: "Môn học tương đương",
      dataIndex: "monHocTuongDuong",
      key: "monHocTuongDuong",
      width: 300,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: 300,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Chỉnh sửa
          </Button>
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 13; i++) {
    data.push({
      key: i,
      id: `${i}`,
      maHocPhan: `400129343${i}`,
      monHoc: `Kiến trúc và thiết kế phần mềm`,
      tinChiLT: 3,
      tinChiTH: 4,
      hocPhanBatBuoc: `i`,
      monHocTienQuyet: ` Lập trình WWW`,
      monHocSongHanh: `..`,
      monHocTuongDuong: `không`,
      moTa: `không`,
    });
  }
  const khoaData = ["CNTT", "Công nghệ may", "Kinh doanh quốc tế"];
  const handlerEditButton = (hocPhan) => {
    setHocPhan(hocPhan);
    setVisibleModalEdit(true);
  };
  React.useState(khoaData[0]);
  return (
    <div className="hocPhan">
      <h3>DANH SÁCH HỌC PHẦN</h3>
      <ExpandFilter />
      <Divider />
			<div className="hocPhan__action">
				<Button danger>Xóa học phần đã chọn</Button>
			</div>
      <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      <ModalHocPhan
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
      />
      <ModalHocPhan
        type="edit"
        visible={visibleModalEdit}
        closeModal={setVisibleModalEdit}
        data={hocPhan}
      />
    </div>
  );
};
export default HocPhan;
