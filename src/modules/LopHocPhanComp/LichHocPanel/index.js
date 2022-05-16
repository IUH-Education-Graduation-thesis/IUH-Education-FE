import { Button, Collapse, notification, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalLichHoc from './ModalLichHoc';
import moment from 'moment';
import queries from 'core/graphql';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const prefix = 'list-lich-hoc-panel';
const { Panel } = Collapse;

const xoaLichHocsMutation = queries.mutation.xoaLichHocs('id');

const ListLichHocPanel = ({ refetchGetLopHocPhan, lopHocPhan }) => {
  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      width: 70,
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
      render: (_, recrod) => (
        <div>
          <Button onClick={() => handleClickEditRow(recrod)} danger>
            Chỉnh sửa
          </Button>
          <Button onClick={() => handleXoa1LichHoc(recrod?.id)}>Xóa</Button>
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [currentLichHoc, setCurrentLichHoc] = useState(null);

  /**
   * API
   * =============================================
   */

  const [actXoaLichHocs, { loading: loadingXoaLichHoc }] = useMutation(xoaLichHocsMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.xoaLichHocs?.errors || [];
      const _data = dataRes?.xoaLichHocs?.data || [];

      if (!isEmpty(_errors))
        return _errors?.map((item) =>
          notification['error']({
            message: item?.message,
          }),
        );

      if (isEmpty(_data)) {
        notification['error']({
          message: 'Lỗi hệ thống!',
        });
        return;
      }

      setSelectedRowKeys([]);
      refetchGetLopHocPhan();

      notification['success']({
        message: `Xóa ${_data?.length} lịch học thành công.`,
      });
    },
  });

  /**
   * Function
   * ==========================================
   */

  const handleClickEditRow = (record) => {
    setCurrentLichHoc(record);
    setShowModalEdit(true);
  };

  const handleXoa1LichHoc = (id) => {
    actXoaLichHocs({
      variables: {
        ids: [id],
      },
    });
  };

  const handleModalSuccess = () => {
    setShowMoldaAdd(false);
    setShowModalEdit(false);
    refetchGetLopHocPhan();
  };

  const handleThemLichHoc = (e) => {
    e?.stopPropagation();
    setShowMoldaAdd(true);
  };

  const handleTableSelectChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  const handleXoaMultiLichHoc = () => {
    if (isEmpty(selectedRowKeys)) return;

    actXoaLichHocs({
      variables: {
        ids: selectedRowKeys,
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
        <div className={`${prefix}__header__left`}>Danh sách lịch học</div>
        <div className={`${prefix}__header__right`}>
          <Button loading={loadingXoaLichHoc} onClick={handleXoaMultiLichHoc} danger>
            Xóa lịch học đã chọn
          </Button>
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
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: handleTableSelectChange,
          }}
          scroll={{ y: '100%', x: '100%' }}
          columns={columns}
          dataSource={lichHocs}
        />
      </Panel>

      <ModalLichHoc
        onCallAPISuccess={handleModalSuccess}
        lopHocPhan={lopHocPhan}
        visible={showMoldaAdd}
        closeModal={() => setShowMoldaAdd(false)}
      />

      <ModalLichHoc
        onCallAPISuccess={handleModalSuccess}
        lopHocPhan={lopHocPhan}
        visible={showModalEdit}
        type="edit"
        data={currentLichHoc}
        closeModal={() => setShowModalEdit(false)}
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
