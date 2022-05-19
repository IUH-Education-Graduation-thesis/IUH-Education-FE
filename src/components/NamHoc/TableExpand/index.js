import { Button, Divider, notification, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import queries from 'core/graphql';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const prefix = 'day-nha-expand';
const themHocKyNormalQuery = queries.mutation.themHocKyNormal();

const TableExpand = ({ data, refectFilterNamHoc }) => {
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
      width: 100,
      render: () => (
        <div>
          <Button danger style={{ marginLeft: 10 }}>
            Xóa
          </Button>
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
   * API
   * =====================================================
   */

  const [actThemHocKyNormal, { loading: loadingThemHocKyNormal }] = useMutation(
    themHocKyNormalQuery,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.themHocKyNormal?.errors || [];
        const _data = dataRes?.themHocKyNormal?.data || [];

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

        refectFilterNamHoc();

        notification['success']({
          message: 'Thêm thành công học kỳ vào năm học năm học.',
        });
      },
    },
  );

  /**
   * function
   * =======================================================
   */

  const handleThemHocKy = () => {
    const _newHocKy =
      hocKySorted?.reduce((a, b) => a?.thuTuHocKy > b?.thuTuHocKy && a?.thuTuHocKy, 0) + 1 || 1;

    actThemHocKyNormal({
      variables: {
        inputs: {
          thuTuHocKy: _newHocKy,
          namHocId: data?.id,
        },
      },
    });
  };

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
        <Button onClick={handleThemHocKy} loading={loadingThemHocKyNormal} type="primary">
          + Thêm học kỳ
        </Button>
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
