import React, { useEffect } from 'react';
import { Modal, Form, Input, notification, DatePicker } from 'antd';
import queries from 'core/graphql';
import PropTypes from 'prop-types';

import { isEmpty } from 'lodash';
import { useMutation } from '@apollo/client';
import { checkTrulyObject } from 'components/helper';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

const suaNamHocMutation = queries.mutation.suaNamHoc('id');
const themNamHocMutation = queries.mutation.themNamHoc('id');

const ModalNamHoc = ({ visible, closeModal, type, data, onCallAPISuccess }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const [form] = Form.useForm();

  /**
   * API
   * ===========================================================
   */

  const [actThemNamHoc, { loading: loadingThemNamHoc }] = useMutation(themNamHocMutation, {
    fetchPolicy: 'network-only',
    onCompleted: (dataRes) => {
      const _errors = dataRes?.themNamHoc?.errors || [];
      const _data = dataRes?.themNamHoc?.data || [];

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
        message: 'Thêm năm học thành công.',
      });
    },
  });
  const [actSuaNamHoc, { loading: loadingSuaNamHoc }] = useMutation(suaNamHocMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.suaNamHoc?.errors || [];
      const _data = dataRes?.suaNamHoc?.data || [];

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
        message: 'Sửa năm học thành công.',
      });
    },
  });

  /**
   * function
   * ============================================================
   */
  const handleCallAPIAdd = (inputs) => {
    actThemNamHoc({
      variables: {
        inputs,
      },
    });
  };

  const handleCallAPIEdit = (inputs, id) => {
    actSuaNamHoc({
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

        console.log('_dataForm', _dataForm);

        const _namBatDauMoment = _dataForm?._namHoc?.[0];
        const _namKetThuc = _dataForm?._namHoc?.[1];

        const _namBatDauFormat = _namBatDauMoment?.format('YYYY');
        const _namKetThucFormat = _namKetThuc?.format('YYYY');

        const _inputs = {
          namBatDau: _namBatDauFormat,
          namKetThuc: _namKetThucFormat,
          ghiChu: _dataForm?.ghiChu,
        };

        console.log(_inputs);

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
    if (!visible) return;

    form?.resetFields();
  }, [form, visible]);

  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }

    const _namBatDauMonment = moment(data?.namBatDau, 'YYYY');
    const _namKetThucMoment = moment(data?.namKetThuc, 'YYYY');

    form.setFieldsValue({
      id: data?.id,
      _namHoc: [_namBatDauMonment, _namKetThucMoment],
      ghiChu: data?.ghiChu,
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
          name={'_namHoc'}
          label="Năm học"
        >
          <DatePicker.RangePicker picker="year" />
        </Form.Item>
        <Form.Item name={'ghiChu'} label="Ghi chú">
          <TextArea />
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
      confirmLoading={loadingThemNamHoc || loadingSuaNamHoc}
      onOk={handleButtonOkClick}
      okText={type === 'add' ? 'Thêm' : 'Sửa'}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalNamHoc;

ModalNamHoc.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(['edit', 'add']),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
};

ModalNamHoc.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: 'add',
  data: {},
  onCallAPISuccess: () => {},
};
