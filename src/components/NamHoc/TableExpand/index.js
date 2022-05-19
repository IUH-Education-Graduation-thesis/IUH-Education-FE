import { Button, Divider, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const prefix = 'day-nha-expand';

const TableExpand = ({ data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Thứ tự học kỳ',
      dataIndex: 'thuTuHocKy',
      key: 'thuTuHocKy',
      width: 400,
      render: (thuTuHocKy) => {
        return `Học kỳ ${thuTuHocKy} (${data?.namBatDau} - ${data?.namKetThuc})`;
      },
    },

    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: 400,
    },
    {
      title: 'Thao tác',
      key: 'thaoTac',
      width: 300,
      render: () => (
        <div>
          <Button danger>Chỉnh sửa</Button>
          <Button style={{ marginLeft: 10 }}>Xóa</Button>
        </div>
      ),
    },
  ];

  const hocKys =
    data?.hocKyNormals?.map((item) => ({
      ...item,
      key: item?.id,
    })) || [];

  const hocKySorted = hocKys?.sort((a, b) => b.thuTuHocKy - a.thuTuHocKy);

  /**
   * function
   * =======================================================
   */

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  /**
   * render view
   * ==========================================================
   */

  return (
    <div className={prefix}>
      <div className={`${prefix}__head`}>
        <Button type="primary">+ Thêm học kỳ</Button>
        <Button danger>Xóa học kỳ đã chọn</Button>
      </div>
      <Divider />
      <Table
        columns={columns}
        dataSource={hocKySorted}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
      />
    </div>
  );
};

export default TableExpand;

TableExpand.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.number,
      thuTuHocKy: PropTypes.number,
      moTa: PropTypes.string,
    }),
  ),
  onAddClassRoom: PropTypes.func,
  onDeleteMultipleClassroom: PropTypes.func,
};

TableExpand.defaultProps = {
  data: [],
  onAddClassRoom: () => {},
  onDeleteMultipleClassroom: () => {},
};
