import React, { useEffect, useState } from "react";
import { Button, Divider, notification, Table } from "antd";

import queries from "core/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { get, isEmpty } from "lodash";

import "./NamHoc.scss";
import { GET_NAMHOC_FRAGMENT } from "./fragment";
import ModalNamHoc from "./FormAddNamHoc";
import TableExpand from "./TableExpand";
import ExpandFilter from "./FilterExpand";

// Call API
const getAllNamHocQuery = queries.query.findNamHoc(GET_NAMHOC_FRAGMENT);
const deleteMutation = queries.mutation.xoaNamHoc(GET_NAMHOC_FRAGMENT);

const NamHoc = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [namHoc, setNamHoc] = useState({});
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { data: dataGetNamHoc, loading: loadingGetNamHoc } =
    useQuery(getAllNamHocQuery);
  const [actDelete, { data: dataDeleteDayNha, loading: loadingDeleteDayNha }] =
    useMutation(deleteMutation);

  useEffect(() => {
    const _listDayNha = dataGetNamHoc?.findNamHoc?.data || [];
    setData(_listDayNha);
  }, [dataGetNamHoc]);

  const columns = [
    {
      title: "Mã năm học",
      dataIndex: "id",
      key: "id",
      width: 130,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngayBatDau",
      key: "ngayBatDau",
      width: 300,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngayKetThuc",
      key: "ngayKetThuc",
      width: 300,
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
      width: 400,
      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Chỉnh sửa
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => handleButtonDelete(e)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const handlerEditButton = (e) => {
    setNamHoc(e);
    setVisibleModalEdit(true);
  };

  /**
   * function
   * ==================================================================
   *
   */

  const handleButtonDelete = async (e) => {
    const _dataReutrn = await actDelete({
      variables: {
        id: e?.id,
      },
    });

    const dataReturn = get(_dataReutrn, "data", {});

    const errors = get(dataReturn, "xoaNamHoc.errors", []);
    if (!isEmpty(errors)) {
      errors?.map((item) =>
        notification["error"]({
          message: item?.message,
        })
      );
      return;
    }

    const status = get(dataReturn, "xoaNamHoc.status", "");
    if (status === "OK") {
      const _index = data?.findIndex((item) => item?.id === e?.id);

      let _listNamHoc = data;
      _listNamHoc = [
        ..._listNamHoc.slice(0, _index),
        ..._listNamHoc.slice(_index + 1),
      ];

      setData(_listNamHoc);
      notification.open({
        message: "Thông báo",
        description: status,
      });
      return;
    }

    console.log("Loi ket noi");
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

  /**
   * render view
   * ================================================================
   */

  return (
    <div className="namHoc">
      <h3>DANH SÁCH NĂM HỌC </h3>

      <ExpandFilter />
      <Divider />
      <div className="namHoc__action">
        <Button danger>Xóa năm học đã chọn</Button>
      </div>
      <Table
        className="ant-table-wrapper"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500, y: "50vh" }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
        expandable={{
          expandedRowRender: (record) => <TableExpand data={record?.hocKys} />,
        }}
      />
      <ModalNamHoc
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
        onCreateComplete={(e) => handleCreateComplete(e)}
      />
      <ModalNamHoc
        type="edit"
        visible={visibleModalEdit}
        closeModal={setVisibleModalEdit}
        data={namHoc}
      />
    </div>
  );
};

export default NamHoc;
