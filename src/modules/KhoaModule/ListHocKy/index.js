import { Button, Collapse, notification, Table } from 'antd';
import React, { useState } from 'react';
import ListHocPhan from './ListHocPhan';
import ModalHocKy from './ModalHocKy';
import PropTypes from 'prop-types';
import queries from 'core/graphql';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const prefix = 'khoa-hoc-ky';

const { Panel } = Collapse;
const xoaHocKysMutation = queries.mutation.xoaHocKys('id');

const ListHocKy = ({ data, khoaId, refetchFindKhoaHoc, khoaHoc }) => {
  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
    },
    {
      key: 'thuTu',
      dataIndex: 'thuTu',
      title: 'Tên học kỳ',
      render: (thuTu) => {
        return `Học kỳ ${thuTu} khóa ${khoaHoc?.khoa}`;
      },
    },
    {
      key: 'moTa',
      dataIndex: 'moTa',
      title: 'Mô tả',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <div>
          <Button onClick={(e) => handleEditRow(e, record)} danger>
            Chỉnh sửa
          </Button>
          <Button onClick={(e) => handleDeleteRow(e, record)}>Xóa</Button>
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [currentHocKy, setCurrentHocKy] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);

  /**
   * API
   * ====================================================
   */

  const [actXoaHocKys, { loading: loadingXoaHocKy }] = useMutation(xoaHocKysMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.xoaHocKys?.errors || [];
      const _data = dataRes?.xoaHocKys?.data || [];

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
      refetchFindKhoaHoc();

      notification['success']({
        message: `Xóa ${_data?.length} học kỳ thành công.`,
      });
    },
  });

  /**
   * function
   * ==================================================
   */
  const handleDeleteRow = (e, record) => {
    e?.stopPropagation();

    actXoaHocKys({
      variables: {
        ids: [record?.id],
      },
    });
  };

  const handleEditRow = (e, record) => {
    e?.stopPropagation();

    setCurrentHocKy(record);
    setShowModalEdit(true);
  };

  const handleCallAPIAddSuccess = () => {
    setShowModalAdd(false);
    setShowModalEdit(false);
    refetchFindKhoaHoc();
  };

  const handleSelectedKeyChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleClickAddHocKy = (e) => {
    e?.stopPropagation();
    setShowModalAdd(true);
  };

  const handleDeleteMultiRow = (e) => {
    e?.stopPropagation();

    const _ids = selectedRowKeys || [];

    actXoaHocKys({
      variables: {
        ids: _ids,
      },
    });
  };

  /**
   * render view
   * ===========================================
   */

  const renderHeadOfPanel = () => {
    return (
      <div className={`${prefix}__header`}>
        <div className={`${prefix}__header__left`}>Danh sách Học kỳ</div>
        <div className={`${prefix}__header__right`}>
          <Button loading={loadingXoaHocKy} onClick={handleDeleteMultiRow} danger>
            Xóa học kỳ đã chọn
          </Button>
          <Button onClick={handleClickAddHocKy} type="primary">
            Thêm học kỳ
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Collapse defaultActiveKey={['1']} className={prefix}>
        <Panel className={prefix} showArrow={false} header={renderHeadOfPanel()} key="1">
          <Table
            bordered
            rowSelection={{
              selectedRowKeys,
              onChange: handleSelectedKeyChange,
            }}
            expandable={{
              expandedRowRender: (record) => (
                <ListHocPhan
                  refetchFindKhoaHoc={refetchFindKhoaHoc}
                  hocKyId={record?.id}
                  data={record}
                />
              ),
            }}
            columns={columns}
            dataSource={data}
          />
        </Panel>
      </Collapse>
      <ModalHocKy
        onCallAPISuccess={handleCallAPIAddSuccess}
        khoaId={khoaId}
        type="add"
        closeModal={() => setShowModalAdd(false)}
        visible={showModalAdd}
      />

      <ModalHocKy
        onCallAPISuccess={handleCallAPIAddSuccess}
        khoaId={khoaId}
        type="edit"
        data={currentHocKy}
        closeModal={() => setShowModalEdit(false)}
        visible={showModalEdit}
      />
    </>
  );
};

export default ListHocKy;

ListHocKy.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  khoaId: PropTypes.string.isRequired,
  refetchFindKhoaHoc: PropTypes.func,
  khoaHoc: PropTypes.object.isRequired,
};

ListHocKy.defaultProps = {
  refetchFindKhoaHoc: () => {},
};
