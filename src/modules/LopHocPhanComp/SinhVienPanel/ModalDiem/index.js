import { Button, Col, Divider, Form, Input, Modal, notification, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { checkTrulyObject } from 'components/helper';
import { useParams } from 'react-router-dom';
import queries from 'core/graphql';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const suaDiemSinhVienMutation = queries.mutation.suaDiemSinhVien(`sinhVienLopHocPhanId {
  sinhVienId
  lopHocPhanId
}`);

const { useForm } = Form;

const ModalDiem = ({ visible, onClose, sinhVien, onCallAPISuccess }) => {
  const { diems = {} } = sinhVien;
  const { lop_hoc_phan_id } = useParams();

  console.log('sinhVien', sinhVien);

  const [form] = useForm();

  /**
   * API
   * ===============================================
   */

  const [actSuaDiemSinhVien, { loading: loadingSuaDiem }] = useMutation(suaDiemSinhVienMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.suaDiemSinhVien?.errors || [];
      const _data = dataRes?.suaDiemSinhVien?.data || [];

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
        message: 'Sửa điểm sinh viên trong lớp học phần thành công.',
      });
    },
  });

  /**
   * UseEffect
   * =======================================================
   */

  useEffect(() => {
    form?.setFieldsValue({
      ...diems,
    });
  }, [diems, form, sinhVien]);

  /**
   * Function
   * ===================================================
   */
  const handleOnSubmitClick = () => {
    form
      ?.validateFields()
      .then(() => {
        const _dataForm = form?.getFieldsValue(true);

        const _inpust = {
          sinhVienId: sinhVien?.id,
          lopHocPhanId: lop_hoc_phan_id,
          ..._dataForm,
        };

        const _inputsCheckTruly = checkTrulyObject(_inpust);

        actSuaDiemSinhVien({
          variables: {
            inputs: {
              ..._inputsCheckTruly,
            },
          },
        });
      })
      .catch(() => {
        notification['error']({
          message: 'Nhập thiếu không tin!',
        });
      });
  };

  /**
   * Render view
   * ==============================================================
   */

  return (
    <Modal
      className="modal-diem"
      width={'70vw'}
      title="Điểm của sinh viên"
      visible={visible}
      onCancel={onClose}
      destroyOnClose
      onOk={handleOnSubmitClick}
      confirmLoading={loadingSuaDiem}
    >
      <Row style={{ fontSize: 17, fontWeight: 'bold' }} className="modal-diem__info">
        <Col span={12}>ID: {`${sinhVien?.id}`}</Col>
        <Col span={12}>Mã sinh viên: {`${sinhVien?.maSinhVien}`}</Col>
        <Col span={12}>Họ và tên: {`${sinhVien?.hoTenDem} ${sinhVien?.ten}`}</Col>
        <Col span={12}>Lớp: {sinhVien?.lop}</Col>
        <Col span={12}>Email: {sinhVien?.email}</Col>
        <Col span={12}>Số điện thoại: {sinhVien?.soDienThoai}</Col>
      </Row>

      <Divider />

      <Form form={form}>
        <h5>Điểm lý thuyết</h5>

        <Form.List name="diemThuongKy">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    key={key}
                    {...restField}
                    name={[name]}
                    rules={[{ required: true, message: 'Không được để trống!' }]}
                  >
                    <Input placeholder="Điểm" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm điểm
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <h5>Điểm giữa kỳ</h5>

        <Form.Item name="diemGiuaKy">
          <Input />
        </Form.Item>

        <h5>Điểm thực hành</h5>

        <Form.List name="diemThucHanh">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name]}
                    rules={[{ required: true, message: 'Không được để trống!' }]}
                  >
                    <Input placeholder="Điểm" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm điểm
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <h5>Điểm cuối kỳ</h5>

        <Form.Item name="diemCuoiKy">
          <Input placeholder="Điểm" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDiem;

ModalDiem.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  sinhVien: PropTypes.object.isRequired,
  onCallAPISuccess: PropTypes.func,
};

ModalDiem.defaultProps = {
  visible: false,
  onClose: () => {},
  onCallAPISuccess: () => {},
};
