import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, notification } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import queries from 'core/graphql';
import PropTypes from 'prop-types';

import { isEmpty } from 'lodash';
import { checkTrulyObject } from 'components/helper';
import { FIND_KHOA_VIEN, THEM_SINH_VIEN_FRAGMENT } from '../fragment';
import moment from 'moment';

const findKhoaVienQuery = queries?.query.findKhoaVien(FIND_KHOA_VIEN);
const themSinhVienMutation = queries.mutation.themSinhVien(THEM_SINH_VIEN_FRAGMENT);
const suaSinhVienMutation = queries.mutation.suaSinhVien('id');

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

  const { data: dataFindKhoaVien, loading: loadingFindKhoaVien } = useQuery(findKhoaVienQuery);

  const dataForKhoaVienSelect = dataFindKhoaVien?.findKhoaVien?.data?.[0]?.data?.map((item) => ({
    ...item,
    value: item?.id,
    label: item?.ten,
  }));

  const [actSuaSinhVien] = useMutation(suaSinhVienMutation);

  /**
   * useEffect
   * ======================================================================
   */

  useEffect(() => {
    if (isEmpty(data)) {
      const _currentDate = moment();

      form?.setFieldsValue({
        _ngayVaoTruong: _currentDate,
        ngayVaoTruong: _currentDate?.format('YYYY-MM-DD'),
      });

      return;
    }

    const _ngaySinhMoment = isEmpty(data?.ngaySinh) ? null : moment(data?.ngaySinh);

    const _ngayVaoTruongMoment = isEmpty(data?.ngayVaoTruong) ? null : moment(data?.ngayVaoTruong);

    const _ngayVaoDoanMoment = isEmpty(data?._ngayVaoDoan) ? null : moment(data?.ngayVaoDoan);

    const _ngayVaoDangMoment = isEmpty(data?.ngayVaoDang) ? null : moment(data?.ngayVaoDang);

    form.setFieldsValue({
      id: data.id,
      maSinhVien: data.maSinhVien,
      hoTenDem: data.hoTenDem,
      ten: data?.ten,
      doDienThoai: data?.soDienThoai,
      soCMND: data?.soCMND,
      emai: data?.email,
      _ngaySinh: _ngaySinhMoment,
      ngaySinh: data?.ngaySinh,
      _ngayVaoTruong: _ngayVaoTruongMoment,
      ngayVaoTruong: data?.ngayVaoTruong,
      _ngayVaoDoan: _ngayVaoDoanMoment,
      _ngayVaoDang: _ngayVaoDangMoment,
      ngayVaoDang: data?.ngayVaoDang,
      _lopId: data?.lop?.ten,
      lopId: data?.lop?.id,
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

  const handleSubmit = useCallback(() => {
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

        if (type == 'add') {
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
              }),
            );
          }

          const _data = _dataRes?.data?.themSinhVien?.data || [];

          if (isEmpty(_data)) {
            return notification['error']({
              message: 'L???i k???t n???i!',
            });
          }

          onAddSuccess(_data?.[0]);

          return notification['success']({
            message: 'Th??m h???c sinh th??nh c??ng.',
          });
        }

        const _idSinhVien = _inputs?.id || '';

        const _dataRes = await actSuaSinhVien({
          variables: {
            inputs: _inputAfterFilter,
            sinhVienId: _idSinhVien,
          },
        });

        const _errors = _dataRes?.data?.suaSinhVien?.errors || [];

        if (!isEmpty(_errors)) {
          return _errors?.map((item) =>
            notification['error']({
              message: item?.message,
            }),
          );
        }

        const _data = _dataRes?.data?.suaSinhVien?.data || [];

        if (isEmpty(_data)) {
          return notification['error']({
            message: 'L???i k???t n???i!',
          });
        }

        onAddSuccess(_data?.[0]);

        return notification['success']({
          message: 'S???a h???c sinh th??nh c??ng.',
        });
      })
      .catch(() => {
        notification['error']({
          message: 'Nh???p thi???u th??ng tin y??u c???u!',
        });
      });
  }, [actSuaSinhVien, actThemSinhVien, form, onAddSuccess, type]);

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
      <Form onFieldsChange={handleFieldFormChange} {...layout} form={form} name="nest-messages">
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="maSinhVien" label="MSSV">
          <Input disabled placeholder="M?? s??? sinh vi??n..." />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'H??? t??n ?????m kh??ng ???????c b??? tr???ng',
            },
          ]}
          name={'hoTenDem'}
          label="H??? t??n ?????m"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'T??n kh??ng ???????c b??? tr???ng!',
            },
          ]}
          name={'ten'}
          label="T??n"
        >
          <Input />
        </Form.Item>
        <Form.Item name={'soDienThoai'} label="S??? ??i???n tho???i">
          <Input />
        </Form.Item>
        <Form.Item name={'soCMND'} label="CMND">
          <Input />
        </Form.Item>
        <Form.Item name={'email'} label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="_ngaySinh" label="Ng??y sinh">
          <DatePicker placeholder="Ng??y sinh" />
        </Form.Item>
        <Form.Item name="_ngayVaoTruong" label="Ng??y v??o tr?????ng">
          <DatePicker placeholder="Ng??y v??o tr?????ng" />
        </Form.Item>
        <Form.Item name="_ngayVaoDoan" label="Ng??y v??o ??o??n">
          <DatePicker placeholder="Ng??y v??o ??o??n" />
        </Form.Item>
        <Form.Item name="_ngayVaoDang" label="Ng??y v??o ?????ng">
          <DatePicker placeholder="Ng??y v??o ?????ng" />
        </Form.Item>
        <Form.Item name="diaChi" label="?????a ch??? li??n h???">
          <Input />
        </Form.Item>
        <Form.Item label="Khoa vi???n">
          <Select
            loading={loadingFindKhoaVien}
            options={dataForKhoaVienSelect}
            placeholder="Khoa vi???n"
            onChange={(e) => setCurrentKhoaVienID(e)}
          />
        </Form.Item>

        <Form.Item label="Chuy??n ng??nh">
          <Select
            options={handleDataForChuyenNganh()}
            placeholder="Chuy??n ng??nh"
            onChange={(e) => setCurrentChuyenNganh(e)}
          />
        </Form.Item>

        <Form.Item label="Kh??a">
          <Select
            options={handleDataForKhoaHoc()}
            placeholder="Kh??a"
            onChange={(e) => setCurrentKhoaID(e)}
          />
        </Form.Item>

        <Form.Item
          label="L???p"
          rules={[
            {
              required: true,
              message: 'L??p kh??ng ???????c ????? tr???ng!',
            },
          ]}
          name="_lopId"
        >
          <Select options={handleDataForLop()} placeholder="L???p" onChange={handleLopChange} />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Th??m sinh vi??n' : 'S???a sinh vi??n'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      destroyOnClose
      okText={type === 'add' ? 'Th??m' : 'S???a'}
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
