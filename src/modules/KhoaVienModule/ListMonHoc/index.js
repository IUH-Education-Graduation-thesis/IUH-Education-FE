import { Button, Collapse, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ListGiangVien from './ListGiangVien';

const prefix = 'khoa-vien-mon-hoc';
const { Panel } = Collapse;

const ListMonHoc = ({ data }) => {
  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
    },
    {
      key: 'ten',
      dataIndex: 'ten',
      title: 'Tên môn học',
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

  const [selectedRowKeys, setSelectedRowsKey] = useState([]);
  /**
   * Function
   * ====================================================
   */
  const handleSelectedKeyChange = (payload) => {
    setSelectedRowsKey(payload);
  };

  /**
   * Render view
   * ===================================================
   */
  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách môn học</div>
        <div className={`${prefix}__header__right`}>
          <Button danger>Xóa môn học đã chọn</Button>
          <Button type="primary">Thêm môn học</Button>
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
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: handleSelectedKeyChange,
          }}
          expandable={{
            expandedRowRender: (record) => (
              <ListGiangVien data={record?.giangViens} />
            ),
          }}
          columns={columns}
          dataSource={data}
        />
      </Panel>
    </Collapse>
  );
};

export default ListMonHoc;

ListMonHoc.propTypes = {
  data: PropTypes.array.isRequired,
};
