import React, { useEffect, useState } from 'react';
import { Button, Divider, Table } from 'antd';

import queries from 'core/graphql';
import { useLazyQuery } from '@apollo/client';

import './NamHoc.scss';
import { GET_NAMHOC_FRAGMENT } from './fragment';
import ModalNamHoc from './FormAddNamHoc';
import TableExpand from './TableExpand';
import ExpandFilter from './FilterExpand';
import { checkTrulyObject } from 'components/helper';

// Call API
const filterNamHocQuery = queries.query.filterNamHoc(GET_NAMHOC_FRAGMENT);

const NamHoc = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [namHoc, setNamHoc] = useState({});
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentConfig, setCurrentConfig] = useState({});

  /**
   * API
   * ============================================================
   */

  const [actFilterNamHoc, { data: dataFilterNamHoc }] = useLazyQuery(filterNamHocQuery);

  const dataForTableNamHoc = dataFilterNamHoc?.filterNamHoc?.data?.[0]?.result?.map((item) => ({
    ...item,
    key: item?.id,
  }));

  /**
   * useEffect
   * ==========================================================
   */

  // handle call api when page int or current data filter change
  useEffect(() => {
    const _inputs = checkTrulyObject(currentConfig);

    actFilterNamHoc({
      variables: {
        inputs: {
          ..._inputs,
        },
      },
    });
  }, [actFilterNamHoc, currentConfig]);

  /**
   * function
   * ==================================================================
   *
   */

  const handlerEditButton = (e) => {
    setNamHoc(e);
    setVisibleModalEdit(true);
  };

  const handleButtonDelete = async () => {};

  const handleCreateComplete = (e) => {
    setVisibleModalAdd(false);
    let _data = data;
    _data = [e, ..._data];
    setData(_data);
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleFilterComponentChange = (currentField, allField) => {
    setCurrentConfig(allField);
  };

  const handleClearFilter = () => {
    setCurrentConfig({});
  };

  /**
   * render view
   * ================================================================
   */

  const columns = [
    {
      title: 'Mã năm học',
      dataIndex: 'id',
      key: 'id',
      width: 130,
    },
    {
      title: 'Năm bắt đầu',
      dataIndex: 'namBatDau',
      key: 'namBatDau',
      width: 300,
    },
    {
      title: 'Năm kết thúc',
      dataIndex: 'namKetThuc',
      key: 'namKetThuc',
      width: 300,
    },
    {
      title: 'Mô tả',
      dataIndex: 'ghiChu',
      key: 'ghiChu',
      width: 300,
    },
    {
      title: 'Thao tác',
      key: 'thaoTac',
      width: 400,
      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Chỉnh sửa
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={() => handleButtonDelete(e)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="namHoc">
      <h3>DANH SÁCH NĂM HỌC </h3>

      <ExpandFilter
        currentFilterData={currentConfig}
        onFilterChange={handleFilterComponentChange}
        onClear={handleClearFilter}
      />
      <Divider />
      <div className="namHoc__action">
        <Button danger>Xóa năm học đã chọn</Button>
      </div>
      <Table
        className="ant-table-wrapper"
        columns={columns}
        dataSource={dataForTableNamHoc}
        scroll={{ x: 1500, y: '50vh' }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectedRowChange,
        }}
        expandable={{
          expandedRowRender: (record) => <TableExpand data={record?.hocKys} />,
        }}
      />
      <ModalNamHoc
        type="add"
        visible={visibleModalAdd}
        closeModal={setVisibleModalAdd}
        onCreateComplete={(e) => handleCreateComplete(e)}
      />
      <ModalNamHoc
        type="edit"
        visible={visibleModalEdit}
        closeModal={setVisibleModalEdit}
        data={namHoc}
      />
    </div>
  );
};

export default NamHoc;
