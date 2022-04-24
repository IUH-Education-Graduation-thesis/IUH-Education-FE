import { Button, Collapse, Table } from 'antd';
import React from 'react';

const prefix = 'hoc-phan-mon-hoc';
const { Panel } = Collapse;

const MonHocCollapse = () => {
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
      key: 'khoaVien',
      dataIndex: 'khoaVien',
      title: 'Khoa viện',
    },
    {
      key: 'chuyenNganh',
      dataIndex: 'chuyenNganh',
      title: 'Chuyên Ngành',
    },
    {
      key: '',
      dataIndex: '',
      title: 'Hành động',
      fixed: 'right',
      render: (_, record) => {
        return (
          <div className={`${prefix}__table__action`}>
            <Button danger>Xóa</Button>
          </div>
        );
      },
    },
  ];

  /**
   * render view
   * =====================================================
   */

  const renderHeadOfCollapse = (title) => {
    return (
      <span className={`${prefix}__head`}>
        <h4 className="head__left">{title}</h4>
        <div className="head__right">
          <Button type="primary">Thêm môn học</Button>
          <Button danger>Xóa môn học đã chọn</Button>
        </div>
      </span>
    );
  };

  return (
    <Collapse className={`${prefix}`}>
      <Panel
        showArrow={false}
        header={renderHeadOfCollapse('Môn học tiên quyết')}
        key="1"
      >
        <Table columns={columns} bordered />
      </Panel>
      <Panel
        showArrow={false}
        header={renderHeadOfCollapse('Môn học song hành')}
        key="2"
      >
        <Table columns={columns} bordered />
      </Panel>
      <Panel
        showArrow={false}
        header={renderHeadOfCollapse('Môn học trước')}
        key="3"
      >
        <Table columns={columns} bordered />
      </Panel>
    </Collapse>
  );
};

export default MonHocCollapse;
