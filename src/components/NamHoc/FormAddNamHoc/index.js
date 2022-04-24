import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, notification, Button, DatePicker } from 'antd';
import queries from 'core/graphql';
import { GET_NAMHOC_FRAGMENT } from '../fragment';
import { useMutation, useQuery } from '@apollo/client';
import { get, isEmpty } from 'lodash';
import suaDayNha from 'core/graphql/suaDayNha';
// init APi
const createMutation = queries.mutation.themNamHoc(GET_NAMHOC_FRAGMENT);

const ModalNamHoc = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [form] = Form.useForm();
  const [ngayBatDau, setNgayBatDau] = useState();
  const [ngayKetThuc, setNgayKetThuc] = useState();

  const [actCreate, { data: dataCreate, loading: loadingCreate }] = useMutation(
    createMutation,
    {
      onCompleted: (dataReturn) => {
        const errors = get(dataReturn, 'themNamHoc.errors', []);
        if (!isEmpty(errors)) {
          return errors.map((item) =>
            notification['error']({
              message: item?.message,
            })
          );
        }
        const _data = get(dataReturn, 'themNamHoc.data', {});
        const status = get(dataReturn, 'themNamHoc.status', {});
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
          ngayBatDau: _dataForm?.ngayBatDau,
          ngayKetThuc: _dataForm?.ngayKetThuc,
          moTa: _dataForm?.moTa,
        },
      },
    });
    form?.resetFields();
  };

  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      id: data.id,
      tenDayNha: data.tenDayNha,
      moTa: data.moTa,
    });
  }, [data]);

  const handleChangeNgay = (type, date, dateString) => {
    if (type === 'ngayBatDau') {
      setNgayBatDau(dateString);
    }
    if (type === 'ngayKetThuc') {
      setNgayKetThuc(dateString);
    }
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
        <Form.Item name={'id'} label="Mã năm học">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="ngayBatDau"
          label="Ngày bắt đầu"
          rules={[
            { required: true, message: 'Yêu cầu chọn ngày bắt đầu năm học!' },
          ]}
        >
          <DatePicker
            onChange={(date, dateString) =>
              handleChangeNgay('ngayBatDau', date, dateString)
            }
            placeholder="Ngày bắt đầu"
          />
        </Form.Item>
        <Form.Item
          name="ngayKetThuc"
          label="Ngày kết thúc"
          rules={[
            { required: true, message: 'Yêu cầu chọn ngày kết thúc năm học!' },
          ]}
        >
          <DatePicker
            onChange={(date, dateString) =>
              handleChangeNgay('ngayKetThuc', date, dateString)
            }
            placeholder="Ngày kết thúc"
          />
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
      title={type === 'add' ? 'Thêm năm học' : 'Sửa năm học'}
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

export default ModalNamHoc;
