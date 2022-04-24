import { Button, Collapse, Table } from 'antd';
import React from 'react';

const prefix = 'sinh-vien-list-panel';
const { Panel } = Collapse;

const SinhVienList = () => {
  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
    },
    {
      key: 'isLichThi',
      dataIndex: 'isLichThi',
      title: 'Lịch thi',
    },
    {
      key: 'ngayHocTrongTuan',
      dataIndex: 'ngayHocTrongTuan',
      title: 'Thứ',
    },
    {
      key: 'nhomThucHanh',
      dataIndex: 'nhomThucHanh',
      title: 'Nhóm thực hành',
    },
    {
      key: 'thoiGianBatDau',
      dataIndex: 'thoiGianBatDau',
      title: 'Thời gian bắt đầu',
    },
    {
      key: 'thoiGianKetThuc',
      dataIndex: 'thoiGianKetThuc',
      title: 'Thời gian kết thúc',
    },
    {
      key: 'tietHocBatDau',
      dataIndex: 'tietHocBatDau',
      title: 'Tiết học bắt đầu',
    },
    {
      key: 'tietHocKetThuc',
      dataIndex: 'tietHocKetThuc',
      title: 'Tiết học kết thúc',
    },
    {
      key: 'ghiChu',
      dataIndex: 'ghiChu',
      title: 'Ghi chú',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (e) => (
        <div>
          <Button danger>Chỉnh sửa</Button>
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  /**
   * Render view
   * ===================================================
   */
  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách sinh viên</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa sinh viên đã chọn</Button>
          <Button type="primary">Thêm sinh viên</Button>
        </div>
      </div>
    );
  };

  return (
    <Collapse className={prefix}>
      <Panel
        className={prefix}
        showArrow={false}
        header={renderHeadOfPanel()}
        key="1"
      >
        <Table columns={columns} />
      </Panel>
    </Collapse>
  );
};

export default SinhVienList;
