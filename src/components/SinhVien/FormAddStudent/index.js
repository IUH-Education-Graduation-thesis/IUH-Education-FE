import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, notification } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import queries from 'core/graphql';
import PropTypes from 'prop-types';

import { isEmpty } from 'lodash';
import { checkTrulyObject } from 'components/helper';
import { FIND_KHOA_VIEN, THEM_SINH_VIEN_FRAGMENT } from '../fragment';

const findKhoaVienQuery = queries?.query.findKhoaVien(FIND_KHOA_VIEN);
const themSinhVienMutation = queries.mutation.themSinhVien(
  THEM_SINH_VIEN_FRAGMENT
);

const ModalStudent = ({ visible, closeModal, type, data, onAddSuccess }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [form] = Form.useForm();

  const [currentKhoaVienID, setCurrentKhoaVienID] = useState(null);
  const [currentChuyenNganh, setCurrentChuyenNganh] = useState(null);
  const [currentKhoaID, setCurrentKhoaID] = useState(null);
  /**
   * API
   * =======================================================================
   */

  const [actThemSinhVien] = useMutation(themSinhVienMutation);

  const { data: dataFindKhoaVien, loading: loadingFindKhoaVien } =
    useQuery(findKhoaVienQuery);

  const dataForKhoaVienSelect =
    dataFindKhoaVien?.findKhoaVien?.data?.[0]?.data?.map((item) => ({
      ...item,
      value: item?.id,
      label: item?.ten,
    }));

  /**
   * useEffect
   * ======================================================================
   */

  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      ID: data.id,
      MSSV: data.mssv,
      name: data.name,
      sdt: data.sdt,
      cmnd: data.cmnd,
      // khoa: data.khoa,
      // chuyenNganh: data.chuyenNganh,
      // bacDaoTao: data.bacDaoTao,
      // khoaHoc: data.khoaHoc,
      email: data.email,
      mahs: data.mahs,
      ngaySinh: data.ngaySinh,
      ngayVaoTruong: data.ngayVaoTruong,
      ngayVaoDoan: data.ngayVaoDoan,
      ngayVaoDang: data.ngayVaoDang,
      maKhuVuc: data.maKhuVuc,
      diaChilh: data.diaChilh,
      hoKhau: data.hoKhau,
      trangThaiHocTap: data.trangThaiHocTap,
      loaiHinhDaoTao: data.loaiHinhDaoTao,
      danToc: data.danToc,
      tonGiao: data.tonGiao,
      doiTuong: data.doiTuong,
    });
  }, [data]);

  /**
   * Function
   * =======================================================
   */

  const handleDataForChuyenNganh = useCallback(() => {
    const _currentKhoaVien = currentKhoaVienID;

    const _data = dataForKhoaVienSelect
      ?.find((item) => item?.id === _currentKhoaVien)
      ?.chuyenNganhs?.map((item) => ({
        ...item,
        label: item?.ten,
        value: item?.id,
      }));

    return _data;
  }, [currentKhoaVienID, dataForKhoaVienSelect]);

  const handleDataForKhoaHoc = useCallback(() => {
    const _listChuyenNganh = handleDataForChuyenNganh();

    const _listKhoa = _listChuyenNganh
      ?.find((item) => item?.id === currentChuyenNganh)
      ?.khoas?.map((item) => ({
        ...item,
        label: item?.khoa,
        value: item?.id,
      }));

    return _listKhoa;
  }, [currentChuyenNganh, handleDataForChuyenNganh]);

  const handleLopChange = (e) => {
    form?.setFieldsValue({
      lopId: e,
    });
  };

  const handleDataForLop = useCallback(() => {
    const _listKhoa = handleDataForKhoaHoc();

    const _listLop = _listKhoa
      ?.find((item) => item?.id === currentKhoaID)
      ?.lops?.map((item) => ({
        ...item,
        label: item?.ten,
        value: item?.id,
      }));

    return _listLop;
  }, [currentKhoaID, handleDataForKhoaHoc]);

  const handleSubmit = () => {
    form
      ?.validateFields()
      .then(async () => {
        const _inputs = form?.getFieldsValue(true);

        const _inputsReal = {
          hoTenDem: _inputs?.hoTenDem,
          ten: _inputs?.ten,
          avatar: null,
          gioiTinh: true,
          ngayVaoDang: _inputs?.ngayVaoDang,
          ngayVaoTruong: _inputs?.ngayVaoTruong,
          ngayVaoDoan: _inputs?.ngayVaoDoan,
          ngaySinh: _inputs?.ngaySinh,
          soDienThoai: _inputs?.soDienThoai,
          diaChi: _inputs?.diaChi,
          noiSinh: _inputs?.noiSinh,
          email: _inputs?.email,
          soCMND: _inputs?.soCMND,
          bacDaoTao: _inputs?.bacDaoTao,
          trangThai: _inputs?.trangThai,
          danToc: _inputs?.danToc,
          tonGiao: _inputs?.tonGiao,
          loaiHinhDaoTao: _inputs?.loaiHinhDaoTao,
          lopId: _inputs?.lopId,
        };

        const _inputAfterFilter = checkTrulyObject(_inputsReal);
        const _dataRes = await actThemSinhVien({
          variables: {
            inputs: {
              ..._inputAfterFilter,
            },
          },
        });

        const _errors = _dataRes?.data?.themSinhVien?.errors || [];

        if (!isEmpty(_errors)) {
          return _errors?.map((item) =>
            notification['error']({
              message: item?.message,
            })
          );
        }

        const _data = _dataRes?.data?.themSinhVien?.data || [];

        if (isEmpty(_data)) {
          return notification['error']({
            message: 'Lỗi kết nối!',
          });
        }

        onAddSuccess(_data?.[0]);

        return notification['success']({
          message: 'Thêm học sinh thành công.',
        });
      })
      .catch(() => {
        notification['error']({
          message: 'Nhập thiếu thông tin yêu cầu!',
        });
      });
  };

  const handleFieldFormChange = (payload) => {
    const _nameField = payload?.[0]?.name?.[0];
    const _value = payload?.[0]?.value;

    if (_nameField === '_ngaySinh') {
      const _dataFormat = _value?.format('YYYY-MM-DD');
      form?.setFieldsValue({
        ngaySinh: _dataFormat,
      });

      return;
    }

    if (_nameField === '_ngayVaoTruong') {
      const _dataFormat = _value?.format('YYYY-MM-DD');
      form?.setFieldsValue({
        ngayVaoTruong: _dataFormat,
      });

      return;
    }

    if (_nameField === '_ngayVaoDoan') {
      const _dataFormat = _value?.format('YYYY-MM-DD');
      form?.setFieldsValue({
        ngayVaoDoan: _dataFormat,
      });

      return;
    }

    if (_nameField === '_ngayVaoDang') {
      const _dataFormat = _value?.format('YYYY-MM-DD');
      form?.setFieldsValue({
        ngayVaoDang: _dataFormat,
      });

      return;
    }
  };

  /**
   * Render view
   * ====================================================================
   */

  const renderForm = () => {
    return (
      <Form
        onFieldsChange={handleFieldFormChange}
        {...layout}
        form={form}
        name="nest-messages"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="maSinhVien" label="MSSV">
          <Input disabled placeholder="Mã số sinh viên..." />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Họ tên đệm không được bỏ trống',
            },
          ]}
          name={'hoTenDem'}
          label="Họ tên đệm"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Tên không được bỏ trống!',
            },
          ]}
          name={'ten'}
          label="Tên"
        >
          <Input />
        </Form.Item>
        <Form.Item name={'soDienThoai'} label="Số điện thoại">
          <Input />
        </Form.Item>
        <Form.Item name={'soCMND'} label="CMND">
          <Input />
        </Form.Item>
        <Form.Item name={'email'} label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="_ngaySinh" label="Ngày sinh">
          <DatePicker placeholder="Ngày sinh" />
        </Form.Item>
        <Form.Item name="_ngayVaoTruong" label="Ngày vào trường">
          <DatePicker placeholder="Ngày vào trường" />
        </Form.Item>
        <Form.Item name="_ngayVaoDoan" label="Ngày vào đoàn">
          <DatePicker placeholder="Ngày vào đoàn" />
        </Form.Item>
        <Form.Item name="_ngayVaoDang" label="Ngày vào Đảng">
          <DatePicker placeholder="Ngày vào Đảng" />
        </Form.Item>
        <Form.Item name="diaChi" label="Địa chỉ liên hệ">
          <Input />
        </Form.Item>
        <Form.Item label="Khoa viện">
          <Select
            loading={loadingFindKhoaVien}
            options={dataForKhoaVienSelect}
            placeholder="Khoa viện"
            onChange={(e) => setCurrentKhoaVienID(e)}
          />
        </Form.Item>

        <Form.Item label="Chuyên ngành">
          <Select
            options={handleDataForChuyenNganh()}
            placeholder="Chuyên ngành"
            onChange={(e) => setCurrentChuyenNganh(e)}
          />
        </Form.Item>

        <Form.Item label="Khóa">
          <Select
            options={handleDataForKhoaHoc()}
            placeholder="Khóa"
            onChange={(e) => setCurrentKhoaID(e)}
          />
        </Form.Item>

        <Form.Item
          label="Lớp"
          rules={[
            {
              required: true,
              message: 'Lóp không được để trống!',
            },
          ]}
          name="_lopId"
        >
          <Select
            options={handleDataForLop()}
            placeholder="Lớp"
            onChange={handleLopChange}
          />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm sinh viên' : 'Sửa sinh viên'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      destroyOnClose
      onOk={handleSubmit}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalStudent;

ModalStudent.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(['edit', 'add']),
  data: PropTypes.objectOf(PropTypes.any),
  onAddSuccess: PropTypes.func,
};

ModalStudent.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: 'add',
  data: {},
  onAddSuccess: () => {},
};
