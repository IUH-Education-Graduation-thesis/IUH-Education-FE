import React, { useEffect } from 'react';
import { Modal, Form, Input, notification, DatePicker } from 'antd';
import queries from 'core/graphql';
import PropTypes from 'prop-types';

import { isEmpty } from 'lodash';
import { useMutation } from '@apollo/client';
import { checkTrulyObject } from 'components/helper';
import moment from 'moment';

const themKhoaHocMutation = queries.mutation.themKhoaHoc('id');
const suaKhoaHocMutation = queries.mutation.suaKhoaHoc('id');

const ModalKhoaHoc = ({ visible, closeModal, type, data, onCallAPISuccess, chuyenNganhId }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const [form] = Form.useForm();

  /**
   * API
   * ===========================================================
   */

  const [actThemKhoaHoc, { loading: loadingThemKhoaHoc }] = useMutation(themKhoaHocMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.themKhoaHoc?.errors || [];
      const _data = dataRes?.themKhoaHoc?.data || [];

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
        message: 'Thêm khóa học thành công.',
      });
    },
  });

  const [actSuaKhoaHoc, { loading: loadingSuaKhoaHoc }] = useMutation(suaKhoaHocMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.suaKhoaHoc?.errors || [];
      const _data = dataRes?.suaKhoaHoc?.data || [];

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
        message: 'Sửa khóa học thành công.',
      });
    },
  });

  /**
   * function
   * ============================================================
   */
  const handleCallAPIAdd = (inputs) => {
    actThemKhoaHoc({
      variables: {
        inputs,
      },
    });
  };

  const handleCallAPIEdit = (inputs, id) => {
    actSuaKhoaHoc({
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
          khoa: _dataForm?.khoa,
          moTa: _dataForm?.moTa,
          thoiGianBatDau: _dataForm?.thoiGianBatDau,
          thoiGianKetThuc: _dataForm?.thoiGianKetThuc,
          chuyenNganhId,
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

  const handleOnFileChange = (payload) => {
    console.log(payload);

    const _name = payload?.[0]?.name?.[0];
    const _value = payload?.[0]?.value;

    if (_name === '_thoiGianBatDau') {
      const _thoiGianBatDauFormat = _value?.format('YYYY-MM-DD');

      form?.setFieldsValue({
        thoiGianBatDau: _thoiGianBatDauFormat,
      });
    }

    if (_name === '_thoiGianKetThuc') {
      const _thoiGianKetThucFormat = _value?.format('YYYY-MM-DD');

      form?.setFieldsValue({
        thoiGianKetThuc: _thoiGianKetThucFormat,
      });
    }
  };

  /**
   * useEffect
   * =============================================================
   */

  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    const _thoiGianBatDauMoment = !isEmpty(data?.thoiGianBatDau)
      ? moment(data?.thoiGianBatDau)
      : undefined;
    const _thoiGianKetThucMoment = !isEmpty(data?.thoiGianKetThuc)
      ? moment(data?.thoiGianKetThuc)
      : undefined;

    form.setFieldsValue({
      id: data.id,
      khoa: data.khoa,
      _thoiGianBatDau: _thoiGianBatDauMoment,
      _thoiGianKetThuc: _thoiGianKetThucMoment,
      moTa: data.moTa,
    });
  }, [data, form]);

  /**
   * render view
   * ============================================================================
   */

  const renderForm = () => {
    return (
      <Form onFieldsChange={handleOnFileChange} {...layout} form={form} name="nest-messages">
        <Form.Item name={'id'} label="Mã khóa">
          <Input disabled />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống!',
            },
          ]}
          name={'khoa'}
          label="Tên khóa"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Thời gian bắt đầu" name="_thoiGianBatDau">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Thời gian kết thúc" name="_thoiGianKetThuc">
          <DatePicker />
        </Form.Item>
        <Form.Item name={'moTa'} label="Mô tả">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm khóa học' : 'Sửa khóa học'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      confirmLoading={loadingThemKhoaHoc || loadingSuaKhoaHoc}
      onOk={handleButtonOkClick}
      okText={type === 'add' ? 'Thêm' : 'Sửa'}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalKhoaHoc;

ModalKhoaHoc.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(['edit', 'add']),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
  chuyenNganhId: PropTypes.string.isRequired,
};

ModalKhoaHoc.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: 'add',
  data: {},
  onCallAPISuccess: () => {},
};
