import React, { useEffect, useState } from "react";
import { Table, Button, Divider } from "antd";
import { useLazyQuery } from "@apollo/client";
import queries from "core/graphql";
import { isEmpty } from "lodash";

import "./index.scss";
import ModalHocPhan from "./FormAddHocPhan";
import ExpandFilter from "./FilterExpand";
import { FIND_HOC_PHAN_FRAGMENT } from "./fragment";

const FindHocPhanQuery = queries?.query?.findHocPhan(FIND_HOC_PHAN_FRAGMENT);

const HocPhan = () => {
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [hocPhan, setHocPhan] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [seletedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentFilterData, setCurrentFilterData] = useState({
    id: "",
    maHocPhan: "",
    namHocIds: [],
    hocKyIds: [],
    khoaVienIds: [],
    monHocIds: [],
  });

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
      dataIndex: "tenMonHoc",
      key: "tenMonHoc",
      width: 400,
    },
    {
      title: "Số tín chỉ LT",
      dataIndex: "soTinChiLyThuyet",
      key: "soTinChiLyThuyet",
      width: 300,
    },
    {
      title: "Số tín chỉ TH",
      dataIndex: "soTinChiThucHanh",
      key: "soTinChiThucHanh",
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

  /**
   * API
   * ==========================================================================================
   */

  const [actFindHocPhan, { data: dataFindHocPhan, loadingFindHocPhan }] =
    useLazyQuery(FindHocPhanQuery, {
      fetchPolicy: "network-only",
    });

  const dataForTable = dataFindHocPhan?.findHocPhans?.data?.[0]?.data?.map(
    (item) => ({
      key: item?.id,
      id: item?.id,
      maHocPhan: item?.maHocPhan,
      moTa: item?.moTa,
      tenMonHoc: item?.monHoc?.ten,
      soTinChiLyThuyet: item?.monHoc?.soTinChiLyThuyet,
      soTinChiThucHanh: item?.monHoc?.soTinChiThucHanh,
    })
  );

  /**
   * Function
   * ================================================
   */

  const handlerEditButton = (hocPhan) => {
    setHocPhan(hocPhan);
    setVisibleModalEdit(true);
  };

  const handleOnRowClick = (event, record) => {
    const _origin = window?.location?.origin;

    window.location.href = `${_origin}/hoc-phan/${record?.id}`;
  };

  const handleCallAPIWithFilter = (filterData) => {
    const _inputs = {
      id: !isEmpty(filterData?.id) ? filterData?.id : undefined,
      maHocPhan: !isEmpty(filterData?.maHocPhan)
        ? filterData?.maHocPhan
        : undefined,
      namHocIds: !isEmpty(filterData?.namHocIds)
        ? filterData?.namHocIds
        : undefined,
      hocKyIds: !isEmpty(filterData?.hocKyIds)
        ? filterData?.hocKyIds
        : undefined,
      khoaVienIds: !isEmpty(filterData?.khoaVienIds)
        ? filterData?.khoaVienIds
        : undefined,
      monHocIds: !isEmpty(filterData?.monHocIds)
        ? filterData?.monHocIds
        : undefined,
    };

    actFindHocPhan({
      variables: {
        inputs: _inputs,
      },
    });
  };

  const handleOnFilterChange = (
    currentFieldChange,
    currentFilterDataComp,
    name
  ) => {
    const _data = {
      ...currentFilterData,
      ...currentFieldChange,
    };

    setCurrentFilterData(_data);

    handleCallAPIWithFilter(_data);
  };

  const handleSelectedRowKeyChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  /**
   * useEffect
   * =================================================
   */

  useEffect(() => {
    handleCallAPIWithFilter(currentFilterData);
  }, []);

  /**
   * Render view
   * ============================================================
   */

  return (
    <div className="hocPhan">
      <h3>DANH SÁCH HỌC PHẦN</h3>
      <ExpandFilter onFilterChange={handleOnFilterChange} />
      <Divider />
      <div className="hocPhan__action">
        <Button danger>Xóa học phần đã chọn</Button>
      </div>
      <Table
        onRow={(record, index) => ({
          onClick: (e) => handleOnRowClick(e, record),
        })}
        columns={columns}
        dataSource={dataForTable}
        scroll={{ x: 1300 }}
        rowSelection={{
          selectedRowKeys: seletedRowKeys,
          onChange: handleSelectedRowKeyChange,
        }}
      />
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
