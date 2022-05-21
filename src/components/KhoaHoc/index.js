import React, { useEffect, useState } from 'react';
import { Table, Divider } from 'antd';
import './KhoaHoc.scss';
import queries from 'core/graphql';
import { FIND_KHOA_HOC } from './fragment';
import { useLazyQuery } from '@apollo/client';
import ExpandFilter from './FilterExpand';
import { checkTrulyObject } from 'components/helper';
import moment from 'moment';

const findKhoaHocQuery = queries.query.findKhoaHocs(FIND_KHOA_HOC);

const KhoaHocComponent = () => {
  const [currentFilter, setCurrentFilter] = useState({
    id: '',
    tenKhoaHoc: '',
  });

  const [actFindKhoaHoc, { data: dataFindKhoaHoc, loading: loadingFindKhoaHoc }] = useLazyQuery(
    findKhoaHocQuery,
    {
      fetchPolicy: 'network-only',
    },
  );

  const listKhoa =
    dataFindKhoaHoc?.findKhoaHocs?.data?.[0]?.data?.map((item) => ({
      ...item,
      key: item?.id,
    })) || [];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'khoa',
      key: 'khoa',
      width: 100,
      render: (khoaHoc) => `Khóa ${khoaHoc}`,
    },
    {
      title: 'Chuyên ngành',
      width: 100,
      render: (_, record) => record?.chuyenNganh?.ten,
    },
    {
      title: 'Khoa viện',
      width: 100,
      render: (_, record) => record?.chuyenNganh?.khoaVien?.ten,
    },
    {
      title: 'Năm bắt đầu',
      dataIndex: 'thoiGianBatDau',
      key: 'thoiGianBatDau',
      width: 100,
      render: (date) => moment?.(date)?.format('DD/MM/YYYY'),
    },
    {
      title: 'Năm kết thúc',
      dataIndex: 'thoiGianKetThuc',
      key: 'thoiGianKetThuc',
      width: 100,
      render: (date) => moment?.(date)?.format('DD/MM/YYYY'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: 300,
    },
  ];

  /**
   * useEffect
   * =======================================================
   */

  /**
   * handle call api
   */
  useEffect(() => {
    const _inputs = checkTrulyObject(currentFilter);

    actFindKhoaHoc({
      variables: {
        inputs: _inputs,
      },
    });
  }, [actFindKhoaHoc, currentFilter]);

  /**
   * Function
   * ====================================================================
   */

  const handleClickTableRow = (e, record) => {
    const _origin = window?.location?.origin;

    const _khoaVienId = record?.chuyenNganh?.khoaVien?.id;
    const _chuyenNganhId = record?.chuyenNganh?.id;

    window.location.href = `${_origin}/khoa-vien/${_khoaVienId}/chuyen-nganh/${_chuyenNganhId}/khoa/${record?.id}`;
  };

  const handleFilterChange = (currentChange, allData) => {
    setCurrentFilter({ ...allData });
  };

  /**
   * Render view
   * ===========================================================
   */

  return (
    <div className="khoaHoc">
      <h3>DANH SÁCH KHÓA HỌC</h3>
      <ExpandFilter onFilterChange={handleFilterChange} currentFilterData={currentFilter} />
      <Divider />

      <Table
        loading={loadingFindKhoaHoc}
        className="ant-table-wrapper"
        columns={columns}
        dataSource={listKhoa}
        scroll={{ x: 1500, y: '50vh' }}
        onRow={(record) => {
          return {
            onClick: (e) => handleClickTableRow(e, record),
          };
        }}
      />
    </div>
  );
};

export default KhoaHocComponent;
