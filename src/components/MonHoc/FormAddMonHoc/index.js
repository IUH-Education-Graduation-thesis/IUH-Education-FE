import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';

import { isEmpty } from 'lodash';

const ModalMonHoc = ({ visible, closeModal, type, data }) => {
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
      maMonHoc: data.maMonHoc,
      tenMonHoc: data.tenMonHoc,
      moTa: data.moTa,
      khoa: data.khoa,
    });
  }, [data]);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const khoa = [
    { value: 'cnnt', label: 'CNTT' },
    { value: 'taiNgan', label: 'Tài ngân' },
  ];
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name={'maMonHoc'} label="Mã năm học">
          <Input disabled />
        </Form.Item>
        <Form.Item name={'tenMonHoc'} label="Tên môn học">
          <Input />
        </Form.Item>
        <Form.Item label="Khoa">
          <Select
            options={khoa}
            style={{ width: 290 }}
            placeholder="Khoa"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item name={'moTa'} label="Mô tả">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm môn học' : 'Sửa môn học'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalMonHoc;
