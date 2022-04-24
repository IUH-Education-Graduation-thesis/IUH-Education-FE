import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Divider } from "antd";
import queries from "core/graphql";
import { useLazyQuery } from "@apollo/client";
import { checkTrulyObject } from "components/helper";

import { FIND_KHOA_VIEN } from "./fragment";
import "./Khoa.scss";
import ModalAddKhoa from "./FormAddKhoa";
import FilterExpand from "./FilterExpand";
import ModalAddChuyenNganh from "../ChuyenNganh/FormAddChuyenNganh";

const findKhoaVienQuery = queries.query.findKhoaVien(FIND_KHOA_VIEN);

const KhoaComponent = () => {
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibelModalThemChuyenNganh, setvisibelModalThemChuyenNganh] =
    useState(false);
  const [khoa, setKhoa] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [currentConfig, setCurrentConfig] = useState({
    id: "",
    ten: "",
  });

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
   * API
   * ===============================================================
   */
  const [
    actFindKhoaVien,
    { data: dataFindKhoaVien, loading: loadingFindKhoaVien },
  ] = useLazyQuery(findKhoaVienQuery, {
    fetchPolicy: "network-only",
  });

  const listKhoaVien =
    dataFindKhoaVien?.findKhoaVien?.data?.[0]?.data?.map((item) => ({
      ...item,
      key: item?.id,
    })) || [];

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

  const handleFilterChange = (currentFieldChange, allFiledCurrent) => {
    setCurrentConfig({
      ...allFiledCurrent,
    });
  };

  /**
   * useEffect
   * ==============================================================
   */

  /**
   * find khoa vien when init page
   */
  useEffect(() => {
    const _inputs = checkTrulyObject(currentConfig);

    actFindKhoaVien({
      variables: {
        inputs: {
          ..._inputs,
        },
      },
    });
  }, [actFindKhoaVien, currentConfig]);

  /**
   * Render view
   * =======================================================================
   */

  return (
    <div className="khoa">
      <h3>DANH SÁCH KHOA</h3>
      <FilterExpand
        currentFilterData={currentConfig}
        onFilterChange={handleFilterChange}
        onAddAStudentClick={() => setVisibleModal(true)}
      />

      <Divider />

      <div className="khoa__action">
        <Button danger>Xóa học phần đã chọn</Button>
      </div>

      <Table
        className="ant-table-wrapper"
        columns={columns}
        loading={loadingFindKhoaVien}
        dataSource={listKhoaVien}
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
