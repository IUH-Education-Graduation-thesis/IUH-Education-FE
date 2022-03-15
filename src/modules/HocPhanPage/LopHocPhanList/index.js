import { Button, Card, Table } from "antd";
import useSelection from "antd/lib/table/hooks/useSelection";
import React, { useEffect, useState } from "react";

const prefix = "danh-sach-lop-hoc-phan";

const LopHocPhanList = () => {
  const [dataListLopHocPhan, setDataListLopHocPhan] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  /**
   * useEffect
   * ============================================
   */

  /**
   * handle init data for table
   */
  useEffect(() => {
    const _data = [...Array(30).keys()]?.map((item) => ({
      key: item,
      id: item,
      maLopHocPhan: "1231231231231",
      tenLopHocPhan: `Ten lop hoc phan ${item}`,
      trangThai: "Đã mở lớp",
      soLuongToiDa: 80,
    }));

    setDataListLopHocPhan(_data);
  }, []);

  /**
   * function
   * ======================================
   */

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  /**
   * render view
   * =====================================
   */
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "maLopHocPhan",
      dataIndex: "maLopHocPhan",
      title: "Mã lớp học phần",
    },
    {
      key: "tenLopHocPhan",
      dataIndex: "tenLopHocPhan",
      title: "Tên lớp học phần",
    },
    {
      key: "trangThai",
      dataIndex: "trangThai",
      title: "Trạng thái",
    },
    {
      key: "soLuongToiDa",
      dataIndex: "soLuongToiDa",
      title: "Số lượng tối đa",
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

  const renderTitle = () => {
    return (
      <div className={`${prefix}__title`}>
        <div className={`${prefix}__title__left`}>Danh sách lớp học phần</div>
        <div className={`${prefix}__title__right`}>
          <Button type="primary">Thêm lớp học phần</Button>
          <Button danger>Xóa lớp học phần đã chọn</Button>
        </div>
      </div>
    );
  };

  return (
    <Card className={prefix} title={renderTitle()}>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
        columns={columns}
        dataSource={dataListLopHocPhan}
      />
    </Card>
  );
};

export default LopHocPhanList;
