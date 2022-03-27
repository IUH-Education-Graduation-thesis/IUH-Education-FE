import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Divider } from "antd";
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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

  /**
   * Function
   * =============================================================
   */

  const handlerEditButton = (khoa) => {
    setKhoa(khoa);
    setVisibleModal1(true);
  };

  const handleChangeSelectedRowKey = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleClickRowTable = (e, record) => {
    const _origin = window?.location?.origin;
    window.location.href = `${_origin}/khoa-vien/${record?.id}`;
  };

  /**
   * useEffect
   * ==============================================================
   */

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

  return (
    <div className="khoa">
      <h3>DANH SÁCH KHOA</h3>
      <FilterExpand onAddAStudentClick={() => setVisibleModal(true)} />

      <Divider />

      <div className="khoa__action">
        <Button danger>Xóa học phần đã chọn</Button>
      </div>

      <Table
        className="ant-table-wrapper"
        columns={columns}
        dataSource={listKhoa}
        onRow={(record, index) => {
          return {
            onClick: (e) => handleClickRowTable(e, record),
          };
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleChangeSelectedRowKey,
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
