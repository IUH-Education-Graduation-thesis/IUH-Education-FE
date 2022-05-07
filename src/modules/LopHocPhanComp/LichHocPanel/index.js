import { Button, Collapse, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalLichHoc from './ModalLichHoc';

const prefix = 'list-lich-hoc-panel';
const { Panel } = Collapse;

const ListLichHocPanel = ({ refetchGetLopHocPhan, lopHocPhan }) => {
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
      render: () => (
        <div>
          <Button danger>Chỉnh sửa</Button>
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  const lichHocs = lopHocPhan?.lichHocs?.map((item) => ({ ...item, key: item?.id })) || [];

  const [showMoldaAdd, setShowMoldaAdd] = useState(false);

  /**
   * Function
   * ==========================================
   */

  const handleModalSuccess = () => {
    setShowMoldaAdd(false);
    refetchGetLopHocPhan();
  };

  const handleThemLichHoc = (e) => {
    e?.stopPropagation();
    setShowMoldaAdd(true);
  };

  /**
   * Render view
   * ===================================================
   */
  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách lịch học</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa lịch học đã chọn</Button>
          <Button onClick={handleThemLichHoc} type="primary">
            Thêm lịch học
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Collapse className={prefix}>
      <Panel className={prefix} showArrow={false} header={renderHeadOfPanel()} key="1">
        <Table columns={columns} dataSource={lichHocs} />
      </Panel>

      <ModalLichHoc
        onCallAPISuccess={handleModalSuccess}
        lopHocPhan={lopHocPhan}
        visible={showMoldaAdd}
        closeModal={() => setShowMoldaAdd(false)}
      />
    </Collapse>
  );
};

export default ListLichHocPanel;

ListLichHocPanel.propTypes = {
  refetchGetLopHocPhan: PropTypes.func,
  lopHocPhan: PropTypes.object.isRequired,
};

ListLichHocPanel.defaultProps = {
  refetchGetLopHocPhan: () => {},
  listGiangVien: [],
};
