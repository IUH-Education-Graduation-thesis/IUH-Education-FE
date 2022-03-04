import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

import { isEmpty } from "lodash";


const ModalKhoaHoc = ({ visible, closeModal, type, data }) => {
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
      maKhoaHoc: data.maKhoaHoc,
      tenKhoaHoc: data.tenKhoaHoc,
      moTa: data.moTa,
    })
  }, [data])


  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item
          name={"maKhoaHoc"}
          label="Mã khóa học"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"tenKhoaHoc"}
          label="Tên khóa học"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"moTa"}
          label="Mô tả"
        >
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
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalKhoaHoc;
