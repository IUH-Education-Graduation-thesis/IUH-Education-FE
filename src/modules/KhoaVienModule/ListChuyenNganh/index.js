import { Button, Collapse, Table } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ModalChuyenNganh from "./ModalChuyenNganh";

const { Panel } = Collapse;
const prefix = "khoa-vien-chuyen-nganh";

const ChuyenNganhList = ({ data, refetchKhoaVien }) => {
  const { id: khoaVienId } = useParams();

  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "ten",
      dataIndex: "ten",
      title: "Tên chuyên ngành",
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
      render: (e) => (
        <div>
          <Button danger>Chỉnh sửa</Button>
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);

  /**
   * Function
   * ==================================================
   */
  const handleThemChuyenNganhClick = (e) => {
    e?.stopPropagation();
    setShowModalAdd(true);
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleCallAPIAddSuccess = (payload) => {
    setShowModalAdd(false);
    refetchKhoaVien();
  };

  /**
   * Render view
   * ===================================================
   */
  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách chuyên ngành</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa chuyên ngành đã chọn</Button>
          <Button onClick={handleThemChuyenNganhClick} type="primary">
            Thêm chuyên ngành
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
            onRow={(record) => {
              return {
                onClick: (e) => {
                  const _origin = window?.location?.origin;

                  window.location.href = `${_origin}/khoa-vien/${khoaVienId}/chuyen-nganh/${record?.id}`;
                },
              };
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: handleSelectedRowChange,
            }}
            columns={columns}
            dataSource={data}
          />
        </Panel>
      </Collapse>
      <ModalChuyenNganh
        onCallAPISuccess={handleCallAPIAddSuccess}
        khoaVienID={khoaVienId}
        type="add"
        visible={showModalAdd}
      />
    </>
  );
};

export default ChuyenNganhList;

ChuyenNganhList.propTypes = {
  data: PropTypes.arrayOf({
    id: PropTypes.number,
    key: PropTypes.number,
    ten: PropTypes.string,
    moTa: PropTypes.string,
  }).isRequired,
  refetchKhoaVien: PropTypes.func,
};

ChuyenNganhList.defaultProps = {
  refetchKhoaVien: () => {},
};
