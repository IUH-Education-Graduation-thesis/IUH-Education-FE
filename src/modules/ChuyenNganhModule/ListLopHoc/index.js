import { Button, Collapse, Select, Table } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import TableExpand from "./LopHocTableExpand";
import ModalKhoaHoc from "./ModalKhoaHoc";

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
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [currentKhoa, setCurrentKhoa] = useState({});

  /**
   * Function
   * ==================================================
   */
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
  /**
   * Render view
   * ===================================================
   */
  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách khóa học</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa khóa học đã chọn</Button>
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
