import React, { useEffect } from 'react';
import { Modal, Form, Input, notification, Switch } from 'antd';
import queries from 'core/graphql';
import PropTypes from 'prop-types';

import { isEmpty } from 'lodash';
import { useMutation } from '@apollo/client';
import { checkTrulyObject } from 'components/helper';

const suaGiangVienMutation = queries.mutation.suaGiangVien('id');
const themGiangVienMutation = queries.mutation.themGiangVien('id');

const ModalGiangVien = ({ visible, closeModal, type, data, onCallAPISuccess, chuyenNganhId }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const [form] = Form.useForm();

  /**
   * API
   * ===========================================================
   */

  const [actThemGiangVien, { loading: loadingThemGiangVien }] = useMutation(themGiangVienMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.themGiangVien?.errors || [];
      const _data = dataRes?.themGiangVien?.data || [];

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

      onCallAPISuccess(_data?.[0]);

      notification['success']({
        message: 'Thêm giảng viên thành công.',
      });
    },
  });
  const [actSuaGiangVien, { loading: loadingSuaGiangVien }] = useMutation(suaGiangVienMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.suaGiangVien?.errors || [];
      const _data = dataRes?.suaGiangVien?.data || [];

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

      onCallAPISuccess(_data?.[0]);

      notification['success']({
        message: 'Sửa giảng viên thành công.',
      });
    },
  });

  /**
   * function
   * ============================================================
   */
  const handleCallAPIAdd = (inputs) => {
    actThemGiangVien({
      variables: {
        inputs,
      },
    });
  };

  const handleCallAPIEdit = (inputs, id) => {
    actSuaGiangVien({
      variables: {
        inputs,
        id,
      },
    });
  };

  const handleButtonOkClick = () => {
    form
      ?.validateFields()
      ?.then(() => {
        const _dataForm = form?.getFieldsValue(true);

        const _inputs = {
          ten: _dataForm?.ten,
          hoTenDem: _dataForm?.hoTenDem,
          email: _dataForm?.email,
          soDienThoai: _dataForm?.soDienThoai,
          chuyenNganhID: chuyenNganhId,
          gioiTinh: true,
          hocHam: 'THAC_SI',
        };

        const _inputsFormat = checkTrulyObject(_inputs, ['gioiTinh']);

        if (type === 'add') {
          handleCallAPIAdd(_inputsFormat);
          return;
        }

        const _id = form?.getFieldValue('id');

        handleCallAPIEdit(_inputsFormat, _id);
      })
      ?.catch(() => {
        notification['error']({
          message: 'Nhập thiếu thông tin!',
        });
      });
  };

  /**
   * useEffect
   * =============================================================
   */

  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      id: data.id,
      ten: data.ten,
      hoTenDem: data?.hoTenDem,
      email: data?.email,
      soDienThoai: data?.soDienThoai,
    });
  }, [data, form]);

  /**
   * render view
   * ============================================================================
   */

  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name={'id'} label="Mã giảng viên">
          <Input disabled />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống!',
            },
          ]}
          name={'hoTenDem'}
          label="Họ tên đệm"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống!',
            },
          ]}
          name={'ten'}
          label="Tên"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Giới tính" name={'gioiTinh'}>
          <Switch checkedChildren="Nam" unCheckedChildren="Nữ" />
        </Form.Item>
        <Form.Item name={'email'} label="Email">
          <Input />
        </Form.Item>
        <Form.Item name={'soDienThoai'} label="Số điện thoại">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm Giảng viên' : 'Sửa Giảng viên'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      confirmLoading={loadingThemGiangVien || loadingSuaGiangVien}
      onOk={handleButtonOkClick}
      okText={type === 'add' ? 'Thêm' : 'Sửa'}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalGiangVien;

ModalGiangVien.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(['edit', 'add']),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
  khoaVienID: PropTypes.string.isRequired,
  chuyenNganhId: PropTypes.string.isRequired,
};

ModalGiangVien.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: 'add',
  data: {},
  onCallAPISuccess: () => {},
};
