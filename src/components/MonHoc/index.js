import React, { useEffect, useState } from 'react';
import { Button, Divider, Table } from 'antd';
import styled from 'styled-components';
import './MonHoc.scss';
import ModalMonHoc from './FormAddMonHoc';
import ExpandFilter from './FilterExpand';

const WrapExpandFilter = styled.div`
  margin-bottom: 16px;
`;

const MonHoc = () => {
  const [visible, setVisibleModal] = useState(false);
  const [visibleSua, setVisibleModalSua] = useState(false);
  const [monHoc, setMonHoc] = useState({});
  const [listMonHoc, setListMonHoc] = useState([]);
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 200,
    },
    {
      title: 'Tên môn học',
      dataIndex: 'ten',
      key: 'ten',
      width: 400,
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: 300,
    },
    {
      title: 'Số tín chỉ LT',
      dataIndex: 'soTinChiLyThuyet',
      key: 'soTinChiLyThuyet',
      width: 300,
    },
    {
      title: 'Số tín chỉ thực hành',
      dataIndex: 'soTinChiThucHanh',
      key: 'soTinChiThucHanh',
      width: 300,
    },
    {
      title: 'Thao tác',
      key: 'thaoTac',
      width: 300,
      render: () => (
        <div>
          <Button
            danger
            onClick={(e) => {
              handlerEditButton(e);
            }}
          >
            Chỉnh sửa
          </Button>{' '}
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  /**
   * handle init data default for table
   */
  useEffect(() => {
    const data = [...Array(10).keys()]?.map((item) => ({
      key: item,
      id: `${item}`,
      ten: `Kinh doanh quốc tế ${item}`,
      moTa: 'New York No. 1 Lake Park',
      soTinChiLyThuyet: item,
      soTinChiThucHanh: item,
    }));

    setListMonHoc(data);
  }, []);

  /**
   * function
   * =====================================================================
   */

  const handlerEditButton = (monHoc) => {
    setMonHoc(monHoc);
    setVisibleModalSua(true);
  };

  const handleWhenSelectedChange = (selectedRowKeys) => {
    setSelectedRowsKey(selectedRowKeys);
  };

  /**
   * render view
   * =================================================================
   */

  return (
    <div className="monHoc">
      <h3>DANH SÁCH MÔN HỌC</h3>
      <WrapExpandFilter>
        <ExpandFilter />
      </WrapExpandFilter>

      <Divider style={{ marginTop: 16, marginBottom: 16 }} />

      <div className="monHoc__action-multiple-select">
        <Button danger>Xóa môn học đã chọn</Button>
      </div>

      <Table
        rowSelection={{
          selectedRowKeys: selectedRowsKey,
          onChange: handleWhenSelectedChange,
        }}
        className="monHoc__table"
        columns={columns}
        dataSource={listMonHoc}
      />
      <ModalMonHoc type="add" visible={visible} closeModal={setVisibleModal} />
      <ModalMonHoc
        type="sua"
        visible={visibleSua}
        closeModal={setVisibleModalSua}
        data={monHoc}
      />
    </div>
  );
};
export default MonHoc;
