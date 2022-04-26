import { Button, Collapse, notification, Select, Table } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import TableExpand from "./LopHocTableExpand";
import ModalKhoaHoc from "./ModalKhoaHoc";
import queries from "core/graphql";
import { useMutation } from "@apollo/client";
import { isEmpty } from "lodash";

const xoaKhoaHocsMutation = queries.mutation.xoaKhoaHocs("id");

const { Panel } = Collapse;
const prefix = "chuyen-nganh-lop-hoc";

const ListLopHoc = ({ data, chuyenNganhId, refetchFindChuyenNganh }) => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "khoa",
      dataIndex: "khoa",
      title: "Tên khóa",
    },
    {
      key: "thoiGianBatDau",
      dataIndex: "thoiGianBatDau",
      title: "Thời gian bắt đầu",
    },
    {
      key: "thoiGianKetThuc",
      dataIndex: "thoiGianKetThuc",
      title: "Thời gian kết thúc",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (_, record) => (
        <div>
          <Button onClick={(e) => handleEditRow(e, record)} danger>
            Chỉnh sửa
          </Button>
          <Button
            loading={loadingXoaKhoaHocs}
            onClick={(e) => handleDeleteRow(e, record)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [currentKhoa, setCurrentKhoa] = useState({});

  /**
   * API
   * ====================================================
   */

  const [actXoaKhoaHocs, { loading: loadingXoaKhoaHocs }] = useMutation(
    xoaKhoaHocsMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.xoaKhoaHocs?.errors || [];
        const _data = dataRes?.xoaKhoaHocs?.data || [];

        if (!isEmpty(_errors))
          return _errors?.map((item) =>
            notification["error"]({
              message: item?.message,
            })
          );

        if (isEmpty(_data)) {
          notification["error"]({
            message: "Lỗi hệ thống!",
          });
          return;
        }

        setSelectedRowKeys([]);
        refetchFindChuyenNganh();

        notification["success"]({
          message: `Xóa ${_data?.length} khóa học thành công.`,
        });
      },
    }
  );

  /**
   * Function
   * ==================================================
   */
  const handleDeleteRow = (e, record) => {
    e?.stopPropagation();

    actXoaKhoaHocs({
      variables: {
        ids: [record?.id],
      },
    });
  };

  const handleEditRow = (e, record) => {
    e?.stopPropagation();
    setCurrentKhoa(record);
    setShowModalEdit(true);
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleClickThemKhoaHoc = (e) => {
    e?.stopPropagation();

    setShowModalAdd(true);
  };

  const handleCallAPIAddSuccess = (payload) => {
    setShowModalEdit(false);
    setShowModalAdd(false);
    refetchFindChuyenNganh();
  };

  const handleXoaKhaoHocs = (e) => {
    e?.stopPropagation();

    const _ids = selectedRowKeys || [];

    actXoaKhoaHocs({
      variables: {
        ids: _ids,
      },
    });
  };
  /**
   * Render view
   * ===================================================
   */
  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách khóa học</div>
        <div className={`${prefix}__header__right`}>
          <Button
            loading={loadingXoaKhoaHocs}
            onClick={handleXoaKhaoHocs}
            danger
          >
            Xóa khóa học đã chọn
          </Button>
          <Button onClick={handleClickThemKhoaHoc} type="primary">
            Thêm khóa học
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Collapse className={prefix}>
        <Panel
          className={prefix}
          showArrow={false}
          header={renderHeadOfPanel()}
          key="1"
        >
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: handleSelectedRowChange,
            }}
            expandable={{
              expandedRowRender: (record) => (
                <TableExpand data={record?.lops} />
              ),
            }}
            columns={columns}
            dataSource={data}
          />
        </Panel>
      </Collapse>
      <ModalKhoaHoc
        onCallAPISuccess={handleCallAPIAddSuccess}
        chuyenNganhId={chuyenNganhId}
        type="add"
        closeModal={() => setShowModalAdd(false)}
        visible={showModalAdd}
      />
      <ModalKhoaHoc
        onCallAPISuccess={handleCallAPIAddSuccess}
        data={currentKhoa}
        chuyenNganhId={chuyenNganhId}
        type="edit"
        closeModal={() => setShowModalEdit(false)}
        visible={showModalEdit}
      />
    </>
  );
};

export default ListLopHoc;

ListLopHoc.propTypes = {
  data: PropTypes.arrayOf({
    id: PropTypes.number,
    key: PropTypes.number,
    khoa: PropTypes.string,
    thoiGianBatDau: PropTypes.string,
    thoiGianKetThuc: PropTypes.string,
  }).isRequired,
  chuyenNganhId: PropTypes.string.isRequired,
  refetchFindChuyenNganh: PropTypes.func,
};

ListLopHoc.propTypes = {
  refetchFindChuyenNganh: () => {},
};
