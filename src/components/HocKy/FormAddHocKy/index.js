import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';

import { isEmpty } from 'lodash';

const ModalHocKy = ({ visible, closeModal, type, data }) => {
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
      maNamHoc: data.maNamHoc,
      namHocBatDau: data.namHocBatDau,
      namHocKetThuc: data.namHocKetThuc,
      hocKy: data.hocKy,
      moTa: data.moTa,
    });
  }, [data]);
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name={'maNamHoc'} label="Mã năm học">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Năm học bắt đầu">
          <DatePicker onChange={onChange} picker="year" placeholder="năm" />
        </Form.Item>
        <Form.Item label="Năm học kết thúc">
          <DatePicker onChange={onChange} picker="year" placeholder="năm" />
        </Form.Item>
        <Form.Item name={'hocKy'} label="Học kỳ">
          <Input />
        </Form.Item>
        <Form.Item name={'moTa'} label="Mô tả">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm học kỳ' : 'Sửa học kỳ'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalHocKy;
