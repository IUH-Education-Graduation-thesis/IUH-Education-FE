import { Button, Collapse, Table } from "antd";
import React, { useState } from "react";
import ListHocPhan from "./ListHocPhan";
import ModalHocKy from "./ModalHocKy";
import PropTypes from "prop-types";

const prefix = "khoa-hoc-ky";

const { Panel } = Collapse;

const ListHocKy = ({ data, khoaId, refetchFindKhoaHoc }) => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "thuTu",
      dataIndex: "thuTu",
      title: "Tên học kỳ",
    },
    {
      key: "moTa",
      dataIndex: "moTa",
      title: "Mô tả",
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
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [currentHocKy, setCurrentHocKy] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);

  /**
   * function
   * ==================================================
   */
  const handleEditRow = (e, record) => {
    e?.stopPropagation();

    setCurrentHocKy(record);
    setShowModalEdit(true);
  };

  const handleCallAPIAddSuccess = (payload) => {
    setShowModalAdd(false);
    setShowModalEdit(false);
    refetchFindKhoaHoc();
  };

  const handleSelectedKeyChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleClickAddHocKy = (e) => {
    e?.stopPropagation();
    setShowModalAdd(true);
  };

  /**
   * render view
   * ===========================================
   */

  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách Học kỳ</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa học kỳ đã chọn</Button>
          <Button onClick={handleClickAddHocKy} type="primary">
            Thêm học kỳ
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
            bordered
            rowSelection={{
              selectedRowKeys,
              onChange: handleSelectedKeyChange,
            }}
            expandable={{
              expandedRowRender: (record) => <ListHocPhan data={record} />,
            }}
            columns={columns}
            dataSource={data}
          />
        </Panel>
      </Collapse>
      <ModalHocKy
        onCallAPISuccess={handleCallAPIAddSuccess}
        khoaId={khoaId}
        type="add"
        closeModal={() => setShowModalAdd(false)}
        visible={showModalAdd}
      />

      <ModalHocKy
        onCallAPISuccess={handleCallAPIAddSuccess}
        khoaId={khoaId}
        type="edit"
        data={currentHocKy}
        closeModal={() => setShowModalEdit(false)}
        visible={showModalEdit}
      />
    </>
  );
};

export default ListHocKy;

ListHocKy.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  khoaId: PropTypes.string.isRequired,
  refetchFindKhoaHoc: PropTypes.func,
};

ListHocKy.defaultProps = {
  refetchFindKhoaHoc: () => {},
};
