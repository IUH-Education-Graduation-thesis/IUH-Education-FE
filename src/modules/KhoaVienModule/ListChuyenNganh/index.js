import { Button, Collapse, notification, Table } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import queries from 'core/graphql';
import ModalChuyenNganh from './ModalChuyenNganh';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const { Panel } = Collapse;
const prefix = 'khoa-vien-chuyen-nganh';

const xoaChuyenNganhMutation = queries.mutation.xoaChuyenNganhs('id');

const ChuyenNganhList = ({ data, refetchKhoaVien }) => {
  const { id: khoaVienId } = useParams();

  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
    },
    {
      key: 'ten',
      dataIndex: 'ten',
      title: 'Tên chuyên ngành',
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
          <Button onClick={(e) => handleClickChinhSua(e, record)} danger>
            Chỉnh sửa
          </Button>
          <Button onClick={(e) => handleClickDeleteRow(e, record)}>Xóa</Button>
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalSua, setShowModalSua] = useState(false);
  const [currentChuyenNganh, setCurrentChuyenNganh] = useState(null);

  /**
   * API
   * ==================================================
   */

  const [actXoaChuyenNganhs] = useMutation(xoaChuyenNganhMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.xoaChuyenNganhs?.errors || [];
      const _data = dataRes?.xoaChuyenNganhs?.data || [];

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
      refetchKhoaVien();

      notification['success']({
        message: `Xóa ${_data?.length} chuyên ngành thành công.`,
      });
    },
  });

  /**
   * Function
   * ==================================================
   */
  const handleClickDeleteRow = (e, record) => {
    e?.stopPropagation();

    actXoaChuyenNganhs({
      variables: {
        ids: [record?.id],
      },
    });
  };

  const handleClickChinhSua = (e, record) => {
    e?.stopPropagation();
    setCurrentChuyenNganh(record);
    setShowModalSua(true);
  };

  const handleThemChuyenNganhClick = (e) => {
    e?.stopPropagation();
    setShowModalAdd(true);
  };

  const handleSelectedRowChange = (payload) => {
    setSelectedRowKeys(payload);
  };

  const handleCallAPIAddSuccess = () => {
    setShowModalAdd(false);
    setShowModalSua(false);
    refetchKhoaVien();
  };

  const handleDeleteMultiChuyenNganh = (e) => {
    e?.stopPropagation();
    const _ids = selectedRowKeys || [];

    actXoaChuyenNganhs({
      variables: {
        ids: _ids,
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
        <div className={`${prefix}__header__left`}>Danh sách chuyên ngành</div>
        <div className={`${prefix}__header__right`}>
          <Button onClick={(e) => handleDeleteMultiChuyenNganh(e)} danger>
            Xóa chuyên ngành đã chọn
          </Button>
          <Button onClick={handleThemChuyenNganhClick} type="primary">
            Thêm chuyên ngành
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Collapse className={prefix}>
        <Panel className={prefix} showArrow={false} header={renderHeadOfPanel()} key="1">
          <Table
            onRow={(record) => {
              return {
                onClick: () => {
                  const _origin = window?.location?.origin;

                  window.location.href = `${_origin}/khoa-vien/${khoaVienId}/chuyen-nganh/${record?.id}`;
                },
              };
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: handleSelectedRowChange,
            }}
            columns={columns}
            dataSource={data}
          />
        </Panel>
      </Collapse>

      <ModalChuyenNganh
        onCallAPISuccess={handleCallAPIAddSuccess}
        khoaVienID={khoaVienId}
        type="add"
        visible={showModalAdd}
      />
      <ModalChuyenNganh
        data={currentChuyenNganh}
        onCallAPISuccess={handleCallAPIAddSuccess}
        khoaVienID={khoaVienId}
        type="edit"
        visible={showModalSua}
      />
    </>
  );
};

export default ChuyenNganhList;

ChuyenNganhList.propTypes = {
  data: PropTypes.arrayOf({
    id: PropTypes.number,
    key: PropTypes.number,
    ten: PropTypes.string,
    moTa: PropTypes.string,
  }).isRequired,
  refetchKhoaVien: PropTypes.func,
};

ChuyenNganhList.defaultProps = {
  refetchKhoaVien: () => {},
};
