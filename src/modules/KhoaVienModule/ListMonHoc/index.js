import { Button, Collapse, notification, Table } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import queries from "core/graphql";

import ListGiangVien from "./ListGiangVien";
import ModalMonHoc from "./ModalMonHoc";
import { useMutation } from "@apollo/client";
import { isEmpty } from "lodash";

const prefix = "khoa-vien-mon-hoc";
const { Panel } = Collapse;

const xoaMonHocsMutation = queries.mutation.xoaMonHocs("id");

const ListMonHoc = ({ data, khoaVienID, refetchFindKhoaVien }) => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "ten",
      dataIndex: "ten",
      title: "Tên môn học",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (_, record) => (
        <div>
          <Button onClick={(e) => handleClickEditRow(e, record)} danger>
            Chỉnh sửa
          </Button>
          <Button onClick={(e) => handleClickDeleteRow(e, record)}>Xóa</Button>
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowsKey] = useState([]);
  const [showAddMonHocModal, setShowAddMonHocModal] = useState(false);
  const [showEditMonHocModal, setShowEditMonHocModal] = useState(false);
  const [currentMonHoc, setCurrentMonHoc] = useState({});

  /**
   * API
   * ==========================================================
   */

  const [actXoaMonHocs, { loading: loadingXoaMonHoc }] = useMutation(
    xoaMonHocsMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.xoaMonHocs?.errors || [];
        const _data = dataRes?.xoaMonHocs?.data || [];

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

        setSelectedRowsKey([]);
        refetchFindKhoaVien();

        notification["success"]({
          message: `Xóa ${_data?.length} môn học thành công.`,
        });
      },
    }
  );

  /**
   * Function
   * ====================================================
   */

  const handleClickDeleteRow = (e, record) => {
    e?.stopPropagation();
    actXoaMonHocs({
      variables: {
        ids: [record?.id],
      },
    });
  };

  const handleClickEditRow = (e, record) => {
    e?.stopPropagation();
    setCurrentMonHoc(record);
    setShowEditMonHocModal(true);
  };

  const handleSelectedKeyChange = (payload) => {
    setSelectedRowsKey(payload);
  };

  const handleCallAPISuccess = () => () => {
    setShowEditMonHocModal(false);
    setShowAddMonHocModal(false);
    refetchFindKhoaVien();
  };

  const handleThemMonHoc = (e) => {
    e?.stopPropagation();
    setShowAddMonHocModal(true);
  };

  const handleDeleteMultiMonHoc = (e) => {
    e?.stopPropagation();
    const _ids = selectedRowKeys || [];

    actXoaMonHocs({
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
        <div className={`${prefix}__header__left`}>Danh sách môn học</div>
        <div className={`${prefix}__header__right`}>
          <Button
            loading={loadingXoaMonHoc}
            onClick={handleDeleteMultiMonHoc}
            danger
          >
            Xóa môn học đã chọn
          </Button>
          <Button onClick={handleThemMonHoc} type="primary">
            Thêm môn học
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
              onChange: handleSelectedKeyChange,
            }}
            expandable={{
              expandedRowRender: (record) => (
                <ListGiangVien data={record?.giangViens} />
              ),
            }}
            columns={columns}
            dataSource={data}
          />
        </Panel>
      </Collapse>
      <ModalMonHoc
        onCallAPISuccess={handleCallAPISuccess()}
        khoaVienID={khoaVienID}
        closeModal={() => setShowAddMonHocModal(false)}
        visible={showAddMonHocModal}
      />
      <ModalMonHoc
        type="edit"
        data={currentMonHoc}
        onCallAPISuccess={handleCallAPISuccess()}
        khoaVienID={khoaVienID}
        closeModal={() => setShowEditMonHocModal(false)}
        visible={showEditMonHocModal}
      />
    </>
  );
};

export default ListMonHoc;

ListMonHoc.propTypes = {
  data: PropTypes.array.isRequired,
  khoaVienID: PropTypes.string.isRequired,
  refetchFindKhoaVien: PropTypes.func,
};

ListMonHoc.defaultProps = {
  refetchFindKhoaVien: () => {},
};
