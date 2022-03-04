import React, { useEffect,useState } from "react";
import { Modal, Form, Input, DatePicker,Select } from "antd";

import { isEmpty } from "lodash";


const ModalHocPhan = ({ visible, closeModal, type, data }) => {
  const [hocPhan, setHocPhan] = useState({});
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
      maHocPhan: data.maHocPhan,
      monHoc: data.monHoc,
      tinChiLT: data.tinChiLT,
      tinChiTH: data.tinChiTH,
      hocPhanBatBuoc: data.hocPhanBatBuoc,
      monHocTienQuyet: data.monHocTienQuyet,
      monHocSongHanh: data.monHocSongHanh,
      monHocTuongDuong: data.monHocTuongDuong,
      moTa: data.moTa,
    })
  }, [data])
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const monHoc = [
    { value: 'toanCC', label: 'Toán cao cấp' },
    { value: 'cauTrucRoiRac', label: 'Cấu trúc rời rạc' },

  ]
  const monHocTienQuyet = [
    { value: 'toanCC', label: 'Toán cao cấp' },
    { value: 'cauTrucRoiRac', label: 'Cấu trúc rời rạc' },

  ]
  const monHocSongHanh = [
    { value: 'toanCC', label: 'Toán cao cấp' },
    { value: 'cauTrucRoiRac', label: 'Cấu trúc rời rạc' },

  ]
  const monHocTuongDuong = [
    { value: 'toanCC', label: 'Toán cao cấp' },
    { value: 'cauTrucRoiRac', label: 'Cấu trúc rời rạc' },

  ]
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item
          name={"id"}
          label="ID"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"maHocPhan"}
          label="Mã học phần"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Môn học"
        >
           <Select options={monHoc} style={{ width: 290 }} placeholder='Môn học' />
        </Form.Item>
        <Form.Item
          name={"tinChiLT"}
          label="Số tín chỉ LT"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"tinChiTH"}
          label="Số tín chỉ TH"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"hocPhanBatBuoc"}
          label="Học phần bắt buộc"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Môn học tiên quyết"
        >
           <Select options={monHocTienQuyet} style={{ width: 290 }} placeholder='Môn học tiên quyết' />
        </Form.Item>
        <Form.Item
          label="Môn học song hành"
        >
           <Select options={monHocSongHanh} style={{ width: 290 }} placeholder='Môn học song hành' />
        </Form.Item>
        <Form.Item
          label="Môn học tương đương"
        >
           <Select options={monHocTuongDuong} style={{ width: 290 }} placeholder='Môn học tương đương' />
        </Form.Item>
        <Form.Item
          name={"moTa"}
          label="Mô tả"
        >
          <Input />
        </Form.Item>
      </Form>
    );
  };
  const handleOk = (hocPhan) => {
    setHocPhan(hocPhan);
    console.log(hocPhan);
    closeModal(false);

  };
  return (
    <Modal
      title={type === 'add' ? 'Thêm học phần' : 'Sửa học phần'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      onOk={(e)=>handleOk(e)}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalHocPhan;
