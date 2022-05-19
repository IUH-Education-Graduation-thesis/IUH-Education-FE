import { Button, Modal, notification, Table, Upload } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import queries from 'core/graphql';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const themSinhViensMutation = queries.mutation.themSinhViens(` sinhVienSuccess {
  id
  maSinhVien
  hoTenDem
  ten
  lop {
    id
    ten
  }
}`);
const prefix = 'modal-them-sinh-vien-with-file';

const ModalAddSinhVienWithFile = ({ visible, closeModal, onSuccess }) => {
  const [listSinhVien, setListSinhVien] = useState([]);

  /**
   * API
   * ======================================================
   */

  const [actThemSinhViens, { loading: loadingThemSinhViens }] = useMutation(themSinhViensMutation);

  /**
   * useEffect
   * ===============================================
   */

  useEffect(() => {
    if (!visible) return;

    setListSinhVien([]);
  }, [visible]);

  /**
   * Function
   * =====================================================================
   */

  const propsUpload = useMemo(
    () => ({
      showUploadList: false,
      beforeUpload: async (file = {}) => {
        const _nameArrr = name?.split('.') || [];

        const _fileType = _nameArrr?.[_nameArrr?.length - 1];

        if (_fileType !== 'xlsx') {
          notification['error']({
            message: 'File tải lên không đúng định dạng',
          });

          Upload.LIST_IGNORE;
        }

        const fileFormatLowerCaseName = new File([file], `${file?.name?.toLowerCase()}`, {
          type: file?.type,
        });
        fileFormatLowerCaseName.uid = file?.uid;

        const _dataRes = await actThemSinhViens({
          variables: {
            files: [fileFormatLowerCaseName],
          },
        });

        console.log('_dataRes', _dataRes);

        const _errors = _dataRes?.data?.themSinhViens?.errors || [];

        if (!isEmpty(_errors)) {
          return _errors?.map((item) => notification['error']({ message: item?.message }));
        }

        const _data = _dataRes?.data?.themSinhViens?.data?.[0]?.sinhVienSuccess || [];

        if (!isEmpty(_data)) {
          setListSinhVien(_data?.map((item) => ({ ...item, key: item?.id })));

          return;
        }

        notification['error']({
          message: 'Lỗi kết nối!',
        });
      },
    }),
    [actThemSinhViens],
  );

  /**
   * render view
   * ========================================================================
   */

  const columns = useMemo(
    () => [
      {
        dataIndex: 'id',
        title: 'ID',
      },
      {
        dataIndex: 'maSinhVien',
        title: 'Mã sinh viên',
      },
      {
        dataIndex: 'hoTenDem',
        title: 'Họ tên đệm',
      },
      {
        dataIndex: 'ten',
        title: 'Tên',
      },
      {
        dataIndex: 'ngaySinh',
        title: 'Ngày Sinh',
      },
      {
        dataIndex: 'lop',
        title: 'Lớp',
        render: (lop) => lop?.ten,
      },
    ],
    [],
  );

  const renderContent = useMemo(() => {
    if (isEmpty(listSinhVien)) {
      return (
        <>
          <h5>
            Bạn đang sử dụng chức năng thêm sinh viên bằng file, để sử dụng chức năng này vui lòng
            tải lên file excel của bạn đúng với format yêu cầu. Nếu chưa có bạn có thể tại xuống
            file mẫu ở đây{' '}
            <a href="/files/test2.xlsx" download>
              download
            </a>
          </h5>

          <h5>
            Tải lên file ở đây:{' '}
            <span>
              <Upload {...propsUpload}>
                <Button loading={loadingThemSinhViens}>Upload file</Button>
              </Upload>
            </span>
          </h5>
        </>
      );
    }

    return (
      <>
        <h5>Thêm thành công sinh viên</h5>
        <Table columns={columns} dataSource={listSinhVien} />
      </>
    );
  }, [listSinhVien, columns, propsUpload, loadingThemSinhViens]);

  return (
    <Modal
      destroyOnClose
      onOk={onSuccess}
      title="Thêm sinh viên bằng file excel"
      visible={visible}
      onCancel={closeModal}
    >
      <div className={`${prefix}__content`}>{renderContent}</div>
    </Modal>
  );
};

export default ModalAddSinhVienWithFile;

ModalAddSinhVienWithFile.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  onSuccess: PropTypes.func,
};

ModalAddSinhVienWithFile.defaultProps = {
  visible: false,
  closeModal: () => {},
  onSuccess: () => {},
};
