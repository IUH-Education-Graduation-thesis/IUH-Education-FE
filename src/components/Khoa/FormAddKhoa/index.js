import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

import { isEmpty } from 'lodash';

const ModalKhoa = ({ visible, closeModal, type, data }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [form] = Form.useForm();
  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      maKhoa: data.maKhoa,
      tenKhoa: data.tenKhoa,
      moTa: data.moTa,
    });
  }, [data]);

  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name={'id'} label="Mã khoa">
          <Input disabled />
        </Form.Item>
        <Form.Item name={'ten'} label="Tên khoa">
          <Input />
        </Form.Item>
        <Form.Item name={'moTa'} label="Mô tả">
          <Input />
        </Form.Item>
        <Form.Item name={'link'} label="Link">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm khoa' : 'Sửa khoa'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalKhoa;
