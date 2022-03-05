import React, { useEffect } from "react";
import { Modal, Form, Input, notification, Button } from "antd";
import queries from "core/graphql"
import { GET_DAYNHA_FRAGMENT } from "../fragment";
import { useMutation, useQuery } from "@apollo/client";
import { get, isEmpty } from "lodash";
import suaDayNha from "core/graphql/suaDayNha";
// init APi 
const createDayNhaMutation = queries.mutation.themDayNha(GET_DAYNHA_FRAGMENT);
const updateDayNhaMutation = queries.mutation.suaDayNha(GET_DAYNHA_FRAGMENT);

const ModalDayNha = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [form] = Form.useForm();
  const [actCreate, { data: dataCreate, loading: loadingCreate }] = useMutation(createDayNhaMutation,
    {
      onCompleted: (dataReturn) => {
        const errors = get(dataReturn, 'themDayNha.errors', []);
        if (!isEmpty(errors)) {
          return errors.map(item =>
            notification["error"]({
              message: item?.message,
            })
          )
        }
        const _data = get(dataReturn, 'themDayNha.data', {});
        const status = get(dataReturn, 'themDayNha.status', {})
        if (!isEmpty(_data)) {
          onCreateComplete(_data?.[0]);
          notification.open({
            message: 'Thông báo',
            description: status,
          })
          return;
        }
        notification["error"]({
          message: "Loi ket noi",
        })
      }
    });
  const [actUpdate, { data: dataUpdate, loading: loadingUpdate }] = useMutation(updateDayNhaMutation,
    {
      onCompleted: (dataReturn) => {
        const errors = get(dataReturn, 'suaDayNha.errors', []);
        if (!isEmpty(errors)) {
          return errors.map(item =>
            notification["error"]({
              message: item?.message,
            })
          )
        }
        const _data = get(dataReturn, 'suaDayNha.data', {});
        const status = get(dataReturn, 'suaDayNha.status', {})
        if (!isEmpty(_data)) {
          onCreateComplete(_data?.[0]);
          notification.open({
            message: 'Thông báo',
            description: status,
          })
          return;
        }
        notification["error"]({
          message: "Loi ket noi",
        })
      }
    });
  const handleAdd = async () => {
    const _dataForm = form.getFieldsValue(true);
    await actCreate({
      variables: {
        inputs: {
          tenDayNha: _dataForm?.tenDayNha,
          moTa: _dataForm?.moTa
        }
      }
    })
    form?.resetFields()
  }
  const handleEdit = async () => {
    const _dataForm = form.getFieldsValue(true);
    await actUpdate({
      variables: {
        inputs: {
          id: _dataForm?.id,
          tenDayNha: _dataForm?.tenDayNha,
          moTa: _dataForm?.moTa
        }
      }
    })
    form.resetFields()
  }


  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      id: data.id,
      tenDayNha: data.tenDayNha,
      moTa: data.moTa,
    })
  }, [data])


  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const renderForm = () => {
    return (
      <Form {...layout}
        form={form}
        name="nest-messages"
        onFinish={type === 'add' ? handleAdd : handleEdit}
      >
        <Form.Item
          name={"id"}
          label="Mã dãy nhà"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"tenDayNha"}
          label="Tên dãy nhà"
          rules={[{ required: true, message: 'Yêu cầu nhập tên dãy nhà!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"moTa"}
          label="Mô tả"
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {type === 'add' ? "Thêm" : "Sửa"}
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm dãy nhà' : 'Sửa dãy nhà'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      footer={null}
      confirmLoading={loadingCreate || loadingUpdate}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalDayNha;
