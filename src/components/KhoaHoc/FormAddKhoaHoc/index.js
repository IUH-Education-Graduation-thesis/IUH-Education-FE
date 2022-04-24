import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import queries from 'core/graphql';
import { GET_KHOAHOC_FAGMENT } from '../fragment';
import { useMutation } from '@apollo/client';
import { get, isEmpty } from 'lodash';

const createMutation = queries.mutation.themKhoaHoc(GET_KHOAHOC_FAGMENT);

const ModalKhoaHoc = ({
  visible,
  closeModal,
  type,
  data,
  onCreateComplete,
}) => {
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
      id: data.id,
      tenKhoaHoc: data.tenKhoaHoc,
      moTa: data.moTa,
    });
  }, [data]);

  const [actCreate, { data: dataCreate, loading: loadingCreate }] = useMutation(
    createMutation,
    {
      onCompleted: (dataReturn) => {
        const errors = get(dataReturn, 'themKhoaHoc.errors', []);
        if (!isEmpty(errors)) {
          return errors.map((item) =>
            notification['error']({
              message: item?.message,
            })
          );
        }
        const _data = get(dataReturn, 'themKhoaHoc.data', {});
        const status = get(dataReturn, 'themKhoaHoc.status', {});
        if (!isEmpty(_data)) {
          onCreateComplete(_data?.[0]);
          notification.open({
            message: 'Thông báo',
            description: status,
          });
          return;
        }
        notification['error']({
          message: 'Loi ket noi',
        });
      },
    }
  );

  const handleAdd = async () => {
    const _dataForm = form.getFieldsValue(true);
    await actCreate({
      variables: {
        inputs: {
          khoa: _dataForm?.khoa,
          moTa: _dataForm?.moTa,
        },
      },
    });
    form?.resetFields();
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const renderForm = () => {
    return (
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={type === 'add' ? handleAdd : null}
      >
        <Form.Item name={'id'} label="Mã khóa học">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={'khoa'}
          label="Tên khóa học"
          rules={[{ required: true, message: 'Yêu cầu nhập tên khóa học!' }]}
        >
          <Input type={'number'} />
        </Form.Item>
        <Form.Item name={'moTa'} label="Mô tả">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {type === 'add' ? 'Thêm' : 'Sửa'}
          </Button>
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
      footer={null}
      confirmLoading={loadingCreate}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalKhoaHoc;
