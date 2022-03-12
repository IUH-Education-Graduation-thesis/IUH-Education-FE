import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import "./Khoa.scss";
import ModalAddKhoa from "./FormAddKhoa";
import FilterExpand from "./FilterExpand";
import ModalAddChuyenNganh from "../ChuyenNganh/FormAddChuyenNganh";

const KhoaComponent = () => {
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibelModalThemChuyenNganh, setvisibelModalThemChuyenNganh] =
    useState(false);
  const [listKhoa, setListKhoa] = useState([]);
  const [khoa, setKhoa] = useState({});
  const columns = [
    {
      title: "Mã khoa",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Tên khoa",
      dataIndex: "ten",
      key: "ten",
      width: 400,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: 300,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: 300,
    },
    {
      title: "Thao tác",
      key: "thaoTac",
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

  const handlerEditButton = (khoa) => {
    setKhoa(khoa);
    setVisibleModal1(true);
  };

  /**
   * handle mock data for table when init page
   */
  useEffect(() => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        key: i,
        id: `${i}`,
        ten: `Kinh doanh quốc tế`,
        moTa: "New York No. 1 Lake Park",
        link: "helloworld.com",
        chuyenNganhs: [...Array(10).keys()]?.map((item) => ({
          id: item,
          ten: `Kỹ thuật phần mềm ${item}`,
          moTa: "Đây là dòng mô tả",
        })),
      });
    }

    setListKhoa(data);
  }, []);

  /**
   * Render view
   * =======================================================================
   */

  const renderExpand = (data) => {
    return (
      <div className="table__child-wrapper">
        <div className="table__child-wrapper__head">
          <Button
            onClick={() => setvisibelModalThemChuyenNganh(true)}
            type="primary"
          >
            {" "}
            + Thêm 1 chuyên ngành
          </Button>
          <Button type="ghost"> + Thêm bằng file excel</Button>
        </div>
        {renderExpandTable(data?.chuyenNganhs)}
      </div>
    );
  };

  const renderExpandTable = (data) => {
    const _columns = [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Tên chuyên ngành", dataIndex: "ten", key: "ten" },
      { title: "Mô tả", dataIndex: "moTa", key: "moTa" },
      {
        title: "Action",
        dataIndex: "",
        key: "",
        render: () => {
          return (
            <div>
              <Button danger>Chỉnh sửa</Button>
              <Button style={{ marginLeft: 10 }}>Xóa</Button>
            </div>
          );
        },
      },
    ];

    return <Table columns={_columns} dataSource={data} pagination={false} />;
  };

  return (
    <div className="khoa">
      <h3>DANH SÁCH KHOA</h3>
      <FilterExpand onAddAStudentClick={() => setVisibleModal(true)} />

      <Table
        className="ant-table-wrapper"
        columns={columns}
        dataSource={listKhoa}
        expandable={{
          expandedRowRender: renderExpand,
        }}
      />
      <ModalAddKhoa
        type="add"
        visible={visibleModal}
        closeModal={setVisibleModal}
      />
      <ModalAddKhoa
        type="sua"
        visible={visibleModal1}
        closeModal={setVisibleModal1}
        data={khoa}
      />
      <ModalAddChuyenNganh
        closeModal={() => setvisibelModalThemChuyenNganh(false)}
        visible={visibelModalThemChuyenNganh}
        isKhoaMode
      />
    </div>
  );
};

export default KhoaComponent;
