import { Button, Collapse, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalLichHoc from './ModalLichHoc';
import moment from 'moment';

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
      width: 70,
    },
    {
      key: 'ngayHocTrongTuan',
      dataIndex: 'ngayHocTrongTuan',
      title: 'Thứ',
      width: 70,
    },
    {
      key: 'nhomThucHanh',
      dataIndex: 'nhomThucHanh',
      title: 'Nhóm thực hành',
      width: 150,
    },
    {
      key: 'thoiGianBatDau',
      dataIndex: 'thoiGianBatDau',
      title: 'Thời gian bắt đầu',
      width: 150,
    },
    {
      key: 'thoiGianKetThuc',
      dataIndex: 'thoiGianKetThuc',
      title: 'Thời gian kết thúc',
      width: 150,
    },
    {
      key: 'tietHocBatDau',
      dataIndex: 'tietHocBatDau',
      title: 'Tiết học bắt đầu',
      width: 150,
    },
    {
      key: 'tietHocKetThuc',
      dataIndex: 'tietHocKetThuc',
      title: 'Tiết học kết thúc',
      width: 150,
    },
    {
      key: 'ghiChu',
      dataIndex: 'ghiChu',
      title: 'Ghi chú',
      width: 150,
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

  const lichHocs = lopHocPhan?.lichHocs?.map((item) => {
    const _thoiGianBatDau = moment(item?.thoiGianBatDau).format('YYYY/MM/DD');
    const _thoiGianKetThuc = moment(item?.thoiGianKetThuc).format('YYYY/MM/DD');

    return {
      ...item,
      key: item?.id,
      thoiGianBatDau: _thoiGianBatDau,
      thoiGianKetThuc: _thoiGianKetThuc,
    };
  });

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
    <Collapse defaultActiveKey={['1']} className={prefix}>
      <Panel className={prefix} showArrow={false} header={renderHeadOfPanel()} key="1">
        <Table scroll={{ y: '100%', x: '100%' }} columns={columns} dataSource={lichHocs} />
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
