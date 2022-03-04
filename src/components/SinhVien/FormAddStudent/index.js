import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";

import { isEmpty } from "lodash";
const { Option, OptGroup } = Select;

const ModalStudent = ({ visible, closeModal, type, data }) => {
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
    })
  }, [data])

  const bacDaoTao = [
    { value: 'Cd', label: 'Cao dang' },
    { value: 'dh', label: 'Dai hoc' },
    { value: 'tc', label: 'Trung cap' }
  ]
  const khoaHoc = [
    { value: 'k14', label: '2018-2022' },
    { value: 'k13', label: '2019-2022' },

  ]
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item
          name={"ID"}
          label="ID"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"MSSV"}
          label="MSSV"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"name"}
          label="Họ tên"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"sdt"}
          label="Số điện thoại"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"cmnd"}
          label="CMND"
        >
          <Input />
        </Form.Item>
        <Select style={{ width: 200, margin: 10, marginLeft: 40 }} placeholder='Chuyên ngành' onChange={handleChange}>
          <OptGroup label="CNTT">
            <Option value="jack">Ky thuat phan mem</Option>
            <Option value="lucy">Khoa hoc du lieu</Option>
          </OptGroup>
          <OptGroup label="Tai ngan">
            <Option value="tcnh">Tai chinh ngan hang</Option>
          </OptGroup>
        </Select>
        <Select options={bacDaoTao} style={{ width: 290, margin: 10, marginLeft: 40 }} placeholder='Bậc đào tạo' onChange={handleChange} />
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 40 }} placeholder='Khóa học' onChange={handleChange} />
        <Form.Item
          name={"email1"}
          label="Email"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"mahs"}
          label="Mã hồ sơ"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ngày sinh">
          <DatePicker placeholder='Ngày sinh' />
        </Form.Item>
        <Form.Item label="Ngày vào trường">
          <DatePicker placeholder='Ngày vào trường' />
        </Form.Item>
        <Form.Item label="Ngày vào đoàn" >
          <DatePicker placeholder='Ngày vào đoàn' />
        </Form.Item>
        <Form.Item label="Ngày vào Đảng" >
          <DatePicker placeholder='Ngày vào Đảng' />
        </Form.Item>
        <Form.Item
          name={"maKhuVuc"}
          label="Mã khu vực"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"diaChilh"}
          label="Địa chỉ liên hệ"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"hoKhau"}
          label="Hộ khẩu thường trú"
        >
          <Input />
        </Form.Item>
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 160 }} placeholder='Trang thái học tập' onChange={handleChange} />
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 160 }} placeholder='Loại hình đào tạo' onChange={handleChange} />
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 160 }} placeholder='Dân tộc' onChange={handleChange} />
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 160 }} placeholder='Tôn giáo' onChange={handleChange} />
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 160 }} placeholder='Đối tượng' onChange={handleChange} />
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
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalStudent;
