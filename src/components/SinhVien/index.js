import React, { useEffect, useState } from "react";
import { Table, Button, Divider } from "antd";
import { useQuery, useLazyQuery } from "@apollo/client";
import queries from "core/graphql";

import ModalAddSinhVien from "./FormAddStudent";
import "./SinhVien.scss";
import ExpandFilter from "./FilterExpand";
import { FIND_SINH_VIEN_FRAGMENT } from "./fragment";
import { isEmpty } from "lodash";

const findSinhVienQuery = queries.query.findSinhVien(FIND_SINH_VIEN_FRAGMENT);

const SinhVienComponent = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [sinhVien, setSinhVien] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [currentFilter, setCurrentFilter] = useState({
    maSinhVien: "",
    tenSinhVien: "",
    id: "",
    khoaVienIds: [],
    chuyenNganhIds: [],
    khoaHocIds: [],
    lopIds: [],
  });

  const columns = [
    {
      title: "ID",
      width: 50,
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "MSSV",
      width: 150,
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
      fixed: "left",
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
      dataIndex: "bacDaoTaoString",
      key: "bacDaoTaoString",
    },
    {
      title: "Số điện thoại",
      width: 250,
      dataIndex: "soDienThoai",
      key: "soDienThoai",
    },
    {
      title: "Email",
      width: 250,
      dataIndex: "email",
      key: "email",
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

  /**
   * API
   * =======================================================
   */

  const [
    actFindSinhVien,
    { data: dataFindSinhVien, loading: loadingFindSinhVien },
  ] = useLazyQuery(findSinhVienQuery);

  const listSinhVien = dataFindSinhVien?.findSinhVien?.data?.[0]?.data?.map(
    (item) => ({
      key: item?.id,
      ...item,
    })
  );

  /**
   * useEffect
   * =============================================================
   */
  useEffect(() => {
    const _inputs = {
      id: !isEmpty(currentFilter?.id) ? currentFilter?.id : undefined,
      maSinhVien: !isEmpty(currentFilter?.maSinhVien)
        ? currentFilter?.maSinhVien
        : undefined,
      tenSinhVien: !isEmpty(currentFilter?.tenSinhVien)
        ? currentFilter?.tenSinhVien
        : undefined,
      khoaVienIds: !isEmpty(currentFilter?.khoaVienIds)
        ? currentFilter?.khoaVienIds
        : undefined,
      chuyenNganhIds: !isEmpty(currentFilter?.chuyenNganhIds)
        ? currentFilter?.chuyenNganhIds
        : undefined,
      khoaHocIds: !isEmpty(currentFilter?.khoaHocIds)
        ? currentFilter?.khoaHocIds
        : undefined,
      lopIds: !isEmpty(currentFilter?.lopIds)
        ? currentFilter?.lopIds
        : undefined,
    };

    actFindSinhVien({
      variables: {
        inputs: {
          ..._inputs,
        },
      },
    });
  }, [currentFilter, actFindSinhVien]);

  /**
   * Function
   * ==========================================================================
   */

  const handleClearFilter = () => {
    setCurrentFilter({
      maSinhVien: "",
      tenSinhVien: "",
      id: "",
      khoaVienIds: [],
      chuyenNganhIds: [],
      khoaHocIds: [],
      lopIds: [],
    });
  };

  const handlerEditButton = (sinhVien) => {
    setSinhVien(sinhVien);
    setVisibleModalEdit(true);
  };

  const handleFilterChange = (fieldChange, currentFilterData, name) => {
    setCurrentFilter({
      ...currentFilter,
      ...fieldChange,
    });
  };

  const handleOnChangeSelectedRow = (payload) => {
    setSelectedRowKeys(payload);
  };

  /**
   * useEffect
   * ===================================================
   */

  return (
    <div className="sinhvien">
      <h1>DANH SÁCH SINH VIÊN</h1>
      <ExpandFilter
        currentFilterData={currentFilter}
        onFilterChange={handleFilterChange}
        onAddAStudentClick={() => setVisibleModalAdd(true)}
        onClear={handleClearFilter}
      />

      <Divider />

      <div className="sinhvien__action">
        <Button danger>Xóa sinh vien đã chọn</Button>
      </div>

      <Table
        loading={loadingFindSinhVien}
        style={{ marginTop: 24 }}
        columns={columns}
        dataSource={listSinhVien}
        scroll={{ x: 1500, y: "50vh" }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleOnChangeSelectedRow,
        }}
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
