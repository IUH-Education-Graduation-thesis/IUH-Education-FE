import React, { useEffect } from 'react';
import { Modal, Form, Input, notification, Select } from 'antd';
import queries from 'core/graphql';
import PropTypes from 'prop-types';

import { isEmpty } from 'lodash';
import { useMutation } from '@apollo/client';
import { checkTrulyObject } from 'components/helper';

const themLopHocPhanMutation = queries.mutation.themLopHocPhan('id');
const suaLopHocPhanMutation = queries.mutation.suaLopHocPhan('id');

const dataTrangThaiLopHocPhan = [
  {
    label: 'Chờ sinh viên đăng ký',
    value: 'CHO_SINH_VIEN_DANG_KY',
  },
  {
    label: 'Đang lên kế hoạch',
    value: 'DANG_LEN_KE_HOACH',
  },
  {
    label: 'Chấp nhận mở lớp',
    value: 'CHAP_NHAN_MO_LOP',
  },
  {
    label: 'Bị Hủy',
    value: 'HUY_LOP_HOC_PHAN',
  },
  {
    label: 'Đã khóa',
    value: 'DA_KHOA',
  },
];

const ModalLopHocPhan = ({
  visible,
  closeModal,
  type,
  data,
  onCallAPISuccess,
  hocKyId,
  hocPhanId,
}) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const [form] = Form.useForm();

  /**
   * API
   * ===========================================================
   */

  const [actThemLopHocPhan, { loading: loadingThemHocPhan }] = useMutation(themLopHocPhanMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.themLopHocPhan?.errors || [];
      const _data = dataRes?.themLopHocPhan?.data || [];

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
        message: 'Thêm lớp học phần thành công.',
      });
    },
  });
  const [actSuaLopHocPhan, { loading: loadingSuaLopHocPhan }] = useMutation(suaLopHocPhanMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.suaLopHocPhan?.errors || [];
      const _data = dataRes?.suaLopHocPhan?.data || [];

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
        message: 'Sửa học phần thành công.',
      });
    },
  });

  /**
   * function
   * ============================================================
   */
  const handleCallAPIAdd = (inputs) => {
    actThemLopHocPhan({
      variables: {
        inputs,
      },
    });
  };

  const handleCallAPIEdit = (inputs, id) => {
    actSuaLopHocPhan({
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
          moTa: _dataForm?.moTa,
          soNhomThucHanh: _dataForm?.soNhomThucHanh,
          soLuongToiDa: _dataForm?.soLuongToiDa,
          lopDuKien: _dataForm?.lopDuKien,
          hocPhanId,
          hocKyNormalId: hocKyId,
          trangThaiLopHocPhan: _dataForm?.trangThaiLopHocPhan,
        };

        const _inputsFormat = checkTrulyObject(_inputs);

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
      ...data,
      trangThaiLopHocPhan: data?.trangThaiLopHocPhanEnum,
    });
  }, [data, form]);

  /**
   * render view
   * ============================================================================
   */

  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name={'id'} label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống!',
            },
          ]}
          name={'maLopHocPhan'}
          label="Mã lớp học phần"
        >
          <Input />
        </Form.Item>
        <Form.Item
          hidden={type === 'add'}
          rules={[
            {
              required: type === 'edit',
              message: 'Không được bỏ trống!',
            },
          ]}
          name={'trangThaiLopHocPhan'}
          label="Trạng thái"
        >
          <Select options={dataTrangThaiLopHocPhan} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống!',
            },
          ]}
          label="Số nhóm thực hành"
          name="soNhomThucHanh"
        >
          <Input type={'number'} />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống!',
            },
          ]}
          label="Số lượng tối đa"
          name="soLuongToiDa"
        >
          <Input type={'number'} />
        </Form.Item>

        <Form.Item label="Lớp dự kiến" name="lopDuKien">
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="moTa">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={type === 'add' ? 'Thêm lớp học phần' : 'Sửa lớp học phần'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      confirmLoading={loadingThemHocPhan || loadingSuaLopHocPhan}
      onOk={handleButtonOkClick}
      okText={type === 'add' ? 'Thêm' : 'Sửa'}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalLopHocPhan;

ModalLopHocPhan.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(['edit', 'add']),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
  hocKyId: PropTypes.string.isRequired,
  hocPhanId: PropTypes.string.isRequired,
};

ModalLopHocPhan.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: 'add',
  data: {},
  onCallAPISuccess: () => {},
};
