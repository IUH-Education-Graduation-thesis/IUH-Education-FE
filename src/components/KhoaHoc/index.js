import React, { useEffect, useState } from "react";
import { Button, Table, Modal, notification, Divider } from "antd";
import "./KhoaHoc.scss";
import ModalAddKhoaHoc from "./FormAddKhoaHoc";
import queries from "core/graphql";
import { GET_KHOAHOC_FAGMENT, FIND_KHOA_HOC } from "./fragment";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { get, isEmpty } from "lodash";
import ExpandFilter from "./FilterExpand";
import { checkTrulyObject } from "components/helper";

const findKhoaHocQuery = queries.query.findKhoaHocs(FIND_KHOA_HOC);

const KhoaHocComponent = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [khoaHoc, setKhoa] = useState({});
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({
    id: "",
    tenKhoaHoc: "",
  });

  const [
    actFindKhoaHoc,
    { data: dataFindKhoaHoc, loading: loadingFindKhoaHoc },
  ] = useLazyQuery(findKhoaHocQuery, {
    fetchPolicy: "network-only",
  });

  const listKhoa =
    dataFindKhoaHoc?.findKhoaHocs?.data?.[0]?.data?.map((item) => ({
      ...item,
      key: item?.id,
    })) || [];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Tên khóa học",
      dataIndex: "khoa",
      key: "khoa",
      width: 400,
    },
    {
      title: "Năm bắt đầu",
      dataIndex: "thoiGianBatDau",
      key: "thoiGianBatDau",
      width: 200,
    },
    {
      title: "Năm kết thúc",
      dataIndex: "thoiGianKetThuc",
      key: "thoiGianKetThuc",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: 300,
    },
    {
      title: "Thao tác",
      key: "thaoTac",
      width: 300,
      fixed: "right",
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
   * useEffect
   * =======================================================
   */

  /**
   * handle call api
   */
  useEffect(() => {
    const _inputs = checkTrulyObject(currentFilter);

    actFindKhoaHoc({
      variables: {
        inputs: _inputs,
      },
    });
  }, [actFindKhoaHoc, currentFilter]);

  /**
   * Function
   * ====================================================================
   */
  const handlerEditButton = (khoaHoc) => {
    setKhoa(khoaHoc);
    setVisibleModalEdit(true);
  };

  const handleCreateComplete = (e) => {
    setVisibleModalAdd(false);
    let _data = data;
    _data = [e, ..._data];
    setData(_data);
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleClickTableRow = (e, record) => {
    const _origin = window?.location?.origin;

    const _khoaVienId = record?.chuyenNganh?.khoaVien?.id;
    const _chuyenNganhId = record?.chuyenNganh?.id;

    window.location.href = `${_origin}/khoa-vien/${_khoaVienId}/chuyen-nganh/${_chuyenNganhId}/khoa/${record?.id}`;
  };

  const handleFilterChange = (currentChange, allData) => {
    setCurrentFilter({ ...allData });
  };

  /**
   * Render view
   * ===========================================================
   */

  return (
    <div className="khoaHoc">
      <h3>DANH SÁCH KHÓA HỌC</h3>
      <ExpandFilter
        onFilterChange={handleFilterChange}
        currentFilterData={currentFilter}
      />
      <Divider />
      <div className="khoaHoc__action">
        <Button danger>Xóa khóa học đã chọn</Button>
      </div>
      <Table
        loading={loadingFindKhoaHoc}
        className="ant-table-wrapper"
        columns={columns}
        dataSource={listKhoa}
        scroll={{ x: 1500, y: "50vh" }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
        onRow={(record) => {
          return {
            onClick: (e) => handleClickTableRow(e, record),
          };
        }}
      />
      <ModalAddKhoaHoc
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
        onCreateComplete={(e) => handleCreateComplete(e)}
      />
      <ModalAddKhoaHoc
        type="edit"
        visible={visibleModalEdit}
        closeModal={setVisibleModalEdit}
        data={khoaHoc}
      />
    </div>
  );
};

export default KhoaHocComponent;
