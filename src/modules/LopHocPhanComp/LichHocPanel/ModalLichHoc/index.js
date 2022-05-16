/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, notification, Select, DatePicker, Radio } from 'antd';
import queries from 'core/graphql';
import PropTypes from 'prop-types';

import { isEmpty } from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import { checkTrulyObject } from 'components/helper';
import { FIND_DAY_NHA_FRAGMENT } from 'modules/LopHocPhanComp/fragment';
import moment from 'moment';

const findDayNhaQuery = queries.query.findDayNha(FIND_DAY_NHA_FRAGMENT);
const themLichHocMutation = queries.mutation.themLichHoc('id');
const suaLichHocMutation = queries.mutation.suaLichHoc('id');

const ModalLichHoc = ({ visible, closeModal, type, data, onCallAPISuccess, lopHocPhan }) => {
  const [currentDayNha, setCurrentDayNha] = useState(null);
  const [currentType, setCurrentType] = useState(1);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const [form] = Form.useForm();

  const listGiangVien = lopHocPhan?.hocPhan?.monHoc?.giangViens || [];

  const listGiangVienForSelector = listGiangVien?.map((item) => ({
    ...item,
    value: item?.id,
    label: `${item?.hoTenDem} ${item?.ten}`,
  }));

  const optionsForNgayHocTrongTuan = [
    {
      label: 'Thứ 2',
      value: 2,
    },
    {
      label: 'Thứ 3',
      value: 3,
    },
    {
      label: 'Thứ 4',
      value: 4,
    },
    {
      label: 'Thứ 5',
      value: 5,
    },
    {
      label: 'Thứ 6',
      value: 6,
    },
    {
      label: 'Thứ 7',
      value: 7,
    },
    {
      label: 'Chủ nhật',
      value: 8,
    },
  ];

  const optionsForNhomThucHanh = [...Array(lopHocPhan?.soNhomThucHanh || 0)?.keys()]?.map(
    (item) => ({
      label: `Nhóm ${item + 1}`,
      value: item + 1,
    }),
  );

  const optionsForPhongHoc = currentDayNha?.phongHocs?.map((item) => ({
    ...item,
    label: item?.tenPhongHoc,
    value: item?.id,
  }));

  const optionsForType = [
    { label: 'Chính', value: 1 },
    { label: 'Học bù', value: 2 },
    { label: 'Thi', value: 3 },
  ];

  /**
   * API
   * ===========================================================
   */

  const { data: dataFindDayNha } = useQuery(findDayNhaQuery);

  const [actThemLichHoc, { loading: loadingThemLichHoc }] = useMutation(themLichHocMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.themLichHoc?.errors || [];
      const _data = dataRes?.themLichHoc?.data || [];

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
        message: 'Thêm lịch học thành công.',
      });
    },
  });
  const [actSuaLichHoc, { loading: loadingSuaLichHoc }] = useMutation(suaLichHocMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.suaLichHoc?.errors || [];
      const _data = dataRes?.suaLichHoc?.data || [];

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
        message: 'Sửa lịch học thành công.',
      });
    },
  });

  const optionsForDayNha =
    dataFindDayNha?.findDayNha?.data?.map((item) => ({
      ...item,
      label: item?.tenDayNha,
      value: item?.id,
    })) || [];

  /**
   * function
   * ============================================================
   */
  const handleDayNhaChange = (id) => {
    const _dayNha = optionsForDayNha?.find((item) => item?.id === id);

    setCurrentDayNha(_dayNha);
  };

  const handleCallAPIAdd = (inputs) => {
    actThemLichHoc({
      variables: {
        inputs,
      },
    });
  };

  const handleCallAPIEdit = (inputs, id) => {
    actSuaLichHoc({
      variables: {
        inputs,
        id,
      },
    });
  };

  const handleButtonOkClick = () => {
    form
      ?.validateFields()
      ?.then(() => {
        const _dataForm = form?.getFieldsValue(true);

        const _thoiGianBatDau = moment(_dataForm?.thoiGianBatDau)?.format('YYYY-MM-DD');

        const _inputs = {
          isLichThi: currentType === 3,
          isHocBu: currentType === 2,
          ngayHocTrongTuan: _dataForm?.ngayHocTrongTuan,
          ghiChu: _dataForm?.moTa,
          nhomThucHanh: _dataForm?.nhomThucHanh,
          thoiGianBatDau: _thoiGianBatDau,
          tietHocBatDau: _dataForm?.tietHocBatDau,
          tietHocKetThuc: _dataForm?.tietHocKetThuc,
          phongHocId: _dataForm?.phongHocId,
          giangVienId: _dataForm?.giangVienId,
          lopHocPhanId: lopHocPhan?.id,
        };

        console.log(_inputs);

        const _inputsFormat = checkTrulyObject(_inputs, ['isHocBu', 'isLichThi']);

        if (type === 'add') {
          handleCallAPIAdd(_inputsFormat);
          return;
        }

        const _id = form?.getFieldValue('id');

        handleCallAPIEdit(_inputsFormat, _id);
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
      form?.setFieldsValue({
        type: 1,
      });

      return;
    }

    const _thoiGianBatDau = moment(data?.thoiGianBatDau);

    form.setFieldsValue({
      id: data.id,
      ngayHocTrongTuan: data.ngayHocTrongTuan,
      nhomThucHanh: data?.nhomThucHanh,
      moTa: data.ghiChu,
      tietHocBatDau: data?.tietHocBatDau,
      tietHocKetThuc: data?.tietHocKetThuc,
      thoiGianBatDau: _thoiGianBatDau,
      giangVienId: data?.giangVien?.id,
      phongHocId: data?.phongHoc?.id,
      type: 1,
    });
  }, [data, form]);

  /**
   * render view
   * ============================================================================
   */

  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name="type" label="Loại lịch học">
          <Radio.Group
            onChange={(value) => setCurrentType(value)}
            options={optionsForType}
            optionType="button"
          />
        </Form.Item>

        <Form.Item name={'id'} label="Mã lịch học">
          <Input disabled />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống!',
            },
          ]}
          name={'ngayHocTrongTuan'}
          label="Thứ"
        >
          <Select options={optionsForNgayHocTrongTuan} />
        </Form.Item>
        <Form.Item name={'nhomThucHanh'} label="Nhóm thực hành">
          <Select options={optionsForNhomThucHanh} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống!',
            },
          ]}
          name={'tietHocBatDau'}
          label="Tiết bắt đầu"
        >
          <Input type={'number'} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống!',
            },
          ]}
          name={'tietHocKetThuc'}
          label="Tiết kết thúc"
        >
          <Input type={'number'} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống!',
            },
          ]}
          name={'thoiGianBatDau'}
          label="Thời gian bắt đầu"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label="Phòng học">
          <Select
            style={{ marginBottom: 10 }}
            placeholder="Dãy nhà"
            options={optionsForDayNha}
            onChange={handleDayNhaChange}
          />
          <Form.Item name={'phongHocId'}>
            <Select placeholder="Phòng học" options={optionsForPhongHoc} />
          </Form.Item>
        </Form.Item>
        <Form.Item name={'giangVienId'} label="Giảng viên">
          <Select options={listGiangVienForSelector} />
        </Form.Item>
        <Form.Item name={'moTa'} label="Mô tả">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm lịch học' : 'Sửa lịch học'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      confirmLoading={loadingThemLichHoc || loadingSuaLichHoc}
      onOk={handleButtonOkClick}
      okText={type === 'add' ? 'Thêm' : 'Sửa'}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalLichHoc;

ModalLichHoc.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(['edit', 'add']),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
  lopHocPhan: PropTypes.object.isRequired,
};

ModalLichHoc.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: 'add',
  data: {},
  onCallAPISuccess: () => {},
  listGiangVien: [],
};
