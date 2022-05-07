import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, notification, Button, Select } from 'antd';
import queries from 'core/graphql';
import { GET_PHONGHOC_FRAGMENT } from '../fragment';
import { useMutation, useQuery } from '@apollo/client';
import { get, isEmpty } from 'lodash';
import { GET_DAYNHA_FRAGMENT } from 'components/DayNha/fragment';
import { Option } from 'antd/lib/mentions';
// init APi
const createMutation = queries.mutation.themPhongHoc(GET_PHONGHOC_FRAGMENT);
const getAllDayNhaQuery = queries.query.findDayNha(GET_DAYNHA_FRAGMENT);

const ModalPhongHoc = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [form] = Form.useForm();
  const [dataDayNha, setDataDayNha] = useState([]);
  const [currentDayNha, setCurrentDayNha] = useState({});
  const { data: dataGetDayNha } = useQuery(getAllDayNhaQuery);

  useEffect(() => {
    const _listDayNha = dataGetDayNha?.findDayNha?.data || [];
    setDataDayNha(_listDayNha);
  }, [dataGetDayNha]);

  const [actCreate, { loading: loadingCreate }] = useMutation(createMutation, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'themPhongHoc.errors', []);
      if (!isEmpty(errors)) {
        return errors.map((item) =>
          notification['error']({
            message: item?.message,
          }),
        );
      }
      const _data = get(dataReturn, 'themPhongHoc.data', {});
      const status = get(dataReturn, 'themPhongHoc.status', {});
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
  });

  const handleAdd = async () => {
    const _dataForm = form.getFieldsValue(true);
    await actCreate({
      variables: {
        inputs: {
          tenPhongHoc: _dataForm?.tenPhongHoc,
          sucChua: _dataForm?.sucChua,
          moTa: _dataForm?.moTa,
          dayNhaId: currentDayNha.id,
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
      sucChua: data.sucChua,
      moTa: data.moTa,
    });
    setCurrentDayNha(data.tenDayNha);
  }, [data]);

  const handleChangeDayNha = (e) => {
    const _currentDayNha = dataDayNha?.find((item) => item?.id === e);
    setCurrentDayNha(_currentDayNha);
  };

  const renderForm = () => {
    return (
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={type === 'add' ? handleAdd : null}
      >
        <Form.Item name={'id'} label="Mã phòng học">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={'tenPhongHoc'}
          label="Tên phòng học"
          rules={[{ required: true, message: 'Yêu cầu nhập tên phòng học!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'sucChua'}
          label="Sức chứa sinh viên"
          rules={[{ required: true, message: 'Yêu cầu nhập sức chứa sinh viên!' }]}
        >
          <Input type={'number'} />
        </Form.Item>
        <Form.Item name={'moTa'} label="Mô tả">
          <Input />
        </Form.Item>
        <Form.Item label="Dãy nhà">
          <Select
            className="ant-select-selector"
            value={currentDayNha?.tenDayNha}
            style={{ width: 300 }}
            onChange={handleChangeDayNha}
          >
            {dataDayNha?.map((itemDayNha) => (
              <Option key={itemDayNha?.id}>{itemDayNha?.tenDayNha}</Option>
            ))}
          </Select>
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
      title={type === 'add' ? 'Thêm phòng học' : 'Sửa phòng học'}
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

export default ModalPhongHoc;
