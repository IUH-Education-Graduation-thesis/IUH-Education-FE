/* eslint-disable no-unsafe-optional-chaining */
import { Button, Divider, notification, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import queries from 'core/graphql';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const prefix = 'day-nha-expand';
const themHocKyNormalQuery = queries.mutation.themHocKyNormal();
const xoaHocKyNormalMutation = queries?.mutation.xoaHocKyNormals('id');

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
      render: (_, record) => (
        <div>
          <Button
            onClick={() => handleXoaHocKy(record)}
            loading={loadingXoaHocKyNormal}
            danger
            style={{ marginLeft: 10 }}
          >
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

  const [actXoaHocKyNormal, { loading: loadingXoaHocKyNormal }] = useMutation(
    xoaHocKyNormalMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.xoaHocKyNormals?.errors || [];
        const _data = dataRes?.xoaHocKyNormals?.data || [];

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
          message: `Xóa thành ${_data?.length} công học kỳ khỏi năm học năm học.`,
        });
      },
    },
  );

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

  const handleXoaHocKy = (record) => {
    const _id = record?.id;

    actXoaHocKyNormal({
      variables: {
        ids: [_id],
      },
    });
  };

  const handleThemHocKy = () => {
    let _max = Math?.max(...[...hocKySorted?.map((item) => item?.thuTuHocKy)]);

    if (_max === -Infinity || _max === +Infinity || _max === null || _max === undefined) {
      _max = 0;
    }

    actThemHocKyNormal({
      variables: {
        inputs: {
          thuTuHocKy: _max + 1,
          namHocId: data?.id,
        },
      },
    });
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleXoaMultiHocKy = () => {
    const _ids = selectedRowKeys || [];

    actXoaHocKyNormal({
      variables: {
        ids: [..._ids],
      },
    });
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
        <Button loading={loadingXoaHocKyNormal} onClick={handleXoaMultiHocKy} danger>
          Xóa học kỳ đã chọn
        </Button>
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
