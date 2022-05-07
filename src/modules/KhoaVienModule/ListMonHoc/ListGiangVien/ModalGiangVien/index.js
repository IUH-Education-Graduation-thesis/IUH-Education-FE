import React, { useEffect } from 'react';
import { Modal, Form, notification, Select } from 'antd';
import PropTypes from 'prop-types';
import queries from 'core/graphql';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import { checkTrulyObject } from 'components/helper';
import { FIND_GIANG_VIEN_FRAGMENT } from 'modules/KhoaVienModule/fragment';

const findGiangVienQuery = queries.query.findGiangVien(FIND_GIANG_VIEN_FRAGMENT);
const updateMonHocMutation = queries.mutation.suaMonHoc('id');

const ModalGiangVien = ({ visible, closeModal, type, data, onCallAPISuccess, monHoc }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const { id } = useParams();

  const [form] = Form.useForm();

  /**
   * API
   * ===========================================================
   */

  const { data: dataFindGiangVien } = useQuery(findGiangVienQuery, {
    skip: !id,
    variables: {
      inputs: {
        khoaVienIds: [id],
      },
    },
  });

  const _listGiangVienFormat =
    dataFindGiangVien?.findGiangVien?.data?.[0]?.data?.map((item) => ({
      ...item,
      label: `${item?.hoTenDem} ${item?.ten} (${item?.id})`,
      value: item?.id,
    })) || [];

  const [actSuaMonHoc, { loading: loadingSuaMonHoc }] = useMutation(updateMonHocMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.suaMonHoc?.errors || [];
      const _data = dataRes?.suaMonHoc?.data || [];

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
        message: 'Thêm chuyên ngành thành công.',
      });
    },
  });

  /**
   * function
   * ============================================================
   */
  const handleCallAPIAdd = (inputs, id) => {
    actSuaMonHoc({
      variables: {
        inputs: {
          ...inputs,
        },
        id,
      },
    });
  };

  const handleButtonOkClick = () => {
    form
      ?.validateFields()
      ?.then(() => {
        const _dataForm = form?.getFieldsValue(true);

        const _currentGiangVienIds = monHoc?.giangViens?.map((item) => item?.id);

        const _inputs = {
          ten: monHoc?.ten,
          moTa: monHoc?.moTa,
          khoaVienID: monHoc?.khoaVien?.id,
          giangVienIds: [..._currentGiangVienIds, _dataForm?.giangVien],
        };

        const _inputsFormat = checkTrulyObject(_inputs);

        const _monHocId = monHoc?.id;

        if (type === 'add') {
          handleCallAPIAdd(_inputsFormat, _monHocId);
          return;
        }
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
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      id: data.id,
      ten: data.ten,
      moTa: data.moTa,
    });
  }, [data, form]);

  /**
   * render view
   * ============================================================================
   */

  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name="giangVien" label="Giảng viên">
          <Select options={_listGiangVienFormat} />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm giảng viên' : 'Sửa giảng viên'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      confirmLoading={loadingSuaMonHoc}
      onOk={handleButtonOkClick}
      okText={type === 'add' ? 'Thêm' : 'Sửa'}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalGiangVien;

ModalGiangVien.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(['edit', 'add']),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
  monHoc: PropTypes.objectOf(PropTypes.any).isRequired,
};

ModalGiangVien.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: 'add',
  data: {},
  onCallAPISuccess: () => {},
};
