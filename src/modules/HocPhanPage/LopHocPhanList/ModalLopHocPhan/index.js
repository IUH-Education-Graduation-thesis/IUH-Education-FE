import React, { useEffect } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import queries from 'core/graphql';
import PropTypes from 'prop-types';

import { isEmpty } from 'lodash';
import { useMutation } from '@apollo/client';
import { checkTrulyObject } from 'components/helper';

const themLopHocPhanMutation = queries.mutation.themLopHocPhan('id');
const suaHocPhanMutation = queries.mutation.suaHocPhan('id');

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
  const [actSuaHocPhan, { loading: loadingSuaHocPhan }] = useMutation(suaHocPhanMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.suaHocPhan?.errors || [];
      const _data = dataRes?.suaHocPhan?.data || [];

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
    actSuaHocPhan({
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
          maLopHocPhan: _dataForm?.maLopHocPhan,
          moTa: _dataForm?.moTa,
          soNhomThucHanh: _dataForm?.soNhomThucHanh,
          soLuongToiDa: _dataForm?.soLuongToiDa,
          lopDuKien: _dataForm?.lopDuKien,
          hocPhanId,
          hocKyNormalId: hocKyId,
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
      id: data?.id,
      batBuoc: data?.batBuoc,
      soTinChiLyThuyet: data?.soTinChiLyThuyet,
      soTinChiThucHanh: data?.soTinChiThucHanh,
      maHocPhan: data?.maHocPhan,
      moTa: data?.moTa,
      monHocId: data?.monHoc?.id,
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
      confirmLoading={loadingThemHocPhan || loadingSuaHocPhan}
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
