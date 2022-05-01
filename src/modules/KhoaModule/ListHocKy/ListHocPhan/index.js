import { Button, Checkbox, Table } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";

import ModalHocPhan from "./ModalHocPhan";

const prefix = "khoa-hoc-ky-hoc-phan";

const ListHocPhan = ({ data, hocKyId, refetchFindKhoaHoc }) => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "maHocPhan",
      dataIndex: "maHocPhan",
      title: "Mã học phần",
    },
    {
      render: (_, record) => record?.monHoc?.ten,
      title: "Môn học",
    },
    {
      title: "Bắt buộc",
      render: (_, record) => <Checkbox checked={record?.batBuoc} />,
    },
    {
      key: "soTinChiLyThuet",
      dataIndex: "soTinChiLyThuyet",
      title: "Tín chỉ lý thuyết",
    },
    {
      key: "soTinChiThucHanh",
      dataIndex: "soTinChiThucHanh",
      title: "Tín chỉ thực hành",
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
   * =========================================================
   */

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleADDHocPhan = () => {
    setShowModalAdd(true);
  };

  const handleWhenModalHocPhanSuccess = (payload) => {
    setShowModalAdd(false);
    refetchFindKhoaHoc();
  };

  /**
   * render view
   * =========================================================
   */

  return (
    <div className={prefix}>
      <div className={`${prefix}__head`}>
        <div className={`${prefix}__head__left`}>
          Môn học của học kỳ {data?.thuTuHocKy}
        </div>
        <div className={`${prefix}__head__right`}>
          <Button danger>Xóa học phần đã chọn</Button>
          <Button onClick={handleADDHocPhan} type="primary">
            Thêm học phần
          </Button>
        </div>
      </div>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
        bordered
        columns={columns}
        dataSource={data?.hocPhans}
      />

      <ModalHocPhan
        visible={showModalAdd}
        closeModal={() => setShowModalAdd(false)}
        hocKyId={hocKyId}
        onCallAPISuccess={handleWhenModalHocPhanSuccess}
      />
    </div>
  );
};

export default ListHocPhan;

ListHocPhan.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  hocKyId: PropTypes.number.isRequired,
  refetchFindKhoaHoc: PropTypes.func,
};

ListHocPhan.defaultProps = {
  refetchFindKhoaHoc: () => {},
};
