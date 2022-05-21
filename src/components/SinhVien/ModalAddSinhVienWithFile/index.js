import { Button, Form, Modal, notification, Select, Table, Upload } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import queries from 'core/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import { FIND_KHOA_VIEN } from '../fragment';
import { useForm } from 'antd/lib/form/Form';

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

const findKhoaVienQuery = queries.query.findKhoaVien(FIND_KHOA_VIEN);

const prefix = 'modal-them-sinh-vien-with-file';

const ModalAddSinhVienWithFile = ({ visible, closeModal, onSuccess }) => {
  const [listSinhVien, setListSinhVien] = useState([]);
  const [currentKhoaVien, setCurrentKhoaVien] = useState(null);
  const [currentChuyenNganh, setCurrentChuyenNganh] = useState(null);
  const [currentKhoa, setCurrentKhoa] = useState(null);

  const [form] = useForm();
  /**
   * API
   * ======================================================
   */

  const { data: dataFindKhoaVien } = useQuery(findKhoaVienQuery);
  const [actThemSinhViens, { loading: loadingThemSinhViens }] = useMutation(themSinhViensMutation);

  const listKhoaVienFormat = useMemo(
    () =>
      dataFindKhoaVien?.findKhoaVien?.data?.[0]?.data?.map((item) => ({
        ...item,
        value: item?.id,
        label: item?.ten,
      })) || [],
    [dataFindKhoaVien],
  );

  const listChuyenNganh = useMemo(() => {
    return currentKhoaVien?.chuyenNganhs?.map((item) => ({
      ...item,
      value: item?.id,
      label: item?.ten,
    }));
  }, [currentKhoaVien?.chuyenNganhs]);

  const listKhoaHoc = useMemo(() => {
    return currentChuyenNganh?.khoas?.map((item) => ({
      ...item,
      label: `Khóa ${item?.khoa}`,
      value: item?.id,
    }));
  }, [currentChuyenNganh?.khoas]);

  const listLop = useMemo(() => {
    return currentKhoa?.lops?.map((item) => ({ ...item, value: item?.id, label: item?.ten }));
  }, [currentKhoa?.lops]);

  /**
   * useEffect
   * ===============================================
   */

  useEffect(() => {
    if (!visible) return;

    form.resetFields();
    setListSinhVien([]);
  }, [form, visible]);

  /**
   * Function
   * =====================================================================
   */

  const propsUpload = useMemo(
    () => ({
      // showUploadList: false,
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
      },
    }),
    [],
  );

  const handleKhoaVienChange = useCallback(
    (khoaVienId) => {
      const _khoaVien = listKhoaVienFormat.find((item) => item?.id === khoaVienId);

      setCurrentKhoaVien(_khoaVien);
    },
    [listKhoaVienFormat],
  );

  const handleChuyenNganhChange = useCallback(
    (chuyenNganhId) => {
      const _chuyenNganh = listChuyenNganh?.find((item) => item?.id === chuyenNganhId);

      setCurrentChuyenNganh(_chuyenNganh);
    },
    [listChuyenNganh],
  );

  const handleKhoaHocChange = useCallback(
    (khoaId) => {
      const _khoaHoc = listKhoaHoc?.find((item) => item?.id === khoaId);

      setCurrentKhoa(_khoaHoc);
    },
    [listKhoaHoc],
  );

  const handleOkButtonClick = () => {
    form?.submit();
  };

  const handleFormSubmit = useCallback(async () => {
    const _dataForm = form?.getFieldsValue(true);

    const _lopId = _dataForm?.lopId;
    const _file = _dataForm?.files?.file?.originFileObj;

    const _dataRes = await actThemSinhViens({
      variables: {
        files: [_file],
        lopId: _lopId,
      },
    });

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
  }, [actThemSinhViens, form]);

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

          <Form
            onFinish={handleFormSubmit}
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item label="Khoa/Viện">
              <Select onChange={handleKhoaVienChange} options={listKhoaVienFormat} />
            </Form.Item>

            <Form.Item label="Chuyên ngành">
              <Select onChange={handleChuyenNganhChange} options={listChuyenNganh} />
            </Form.Item>

            <Form.Item label="Khóa học">
              <Select onChange={handleKhoaHocChange} options={listKhoaHoc} />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'không được để trống!',
                },
              ]}
              name={'lopId'}
              label="Lớp"
            >
              <Select options={listLop} />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'không được để trống!',
                },
              ]}
              label="File"
              name={'files'}
            >
              <Upload {...propsUpload}>
                <Button>Upload file</Button>
              </Upload>
            </Form.Item>
          </Form>
        </>
      );
    }

    return (
      <>
        <h5>Thêm thành công sinh viên</h5>
        <Table columns={columns} dataSource={listSinhVien} />
      </>
    );
  }, [
    listSinhVien,
    columns,
    handleFormSubmit,
    form,
    handleKhoaVienChange,
    listKhoaVienFormat,
    handleChuyenNganhChange,
    listChuyenNganh,
    handleKhoaHocChange,
    listKhoaHoc,
    listLop,
    propsUpload,
  ]);

  return (
    <Modal
      destroyOnClose
      okText={isEmpty(listSinhVien) ? 'Thêm' : 'Đóng'}
      okButtonProps={{ loading: loadingThemSinhViens }}
      onOk={isEmpty(listSinhVien) ? handleOkButtonClick : onSuccess}
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
