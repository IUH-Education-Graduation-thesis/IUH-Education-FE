import React, { useEffect, useMemo } from "react";
import { Modal, Form, Input, Select } from "antd";
import PropTypes from "prop-types";

import { isEmpty } from "lodash";

const ModalChuyenNganh = ({ visible, closeModal, type, data, isKhoaMode }) => {
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
      maChuyenNganh: data.maChuyenNganh,
      tenChuyenNganh: data.tenChuyenNganh,
      soTinChi: data.soTinChi,
      khoa: data.khoa,
      moTa: data.moTa,
    });
  }, [data]);
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const khoa = [
    { value: "cnnt", label: "CNTT" },
    { value: "taiNgan", label: "Tài ngân" },
  ];

  const renderInputKhoaVien = useMemo(() => {
    if (isKhoaMode) return;

    return (
      <Form.Item label="Khoa">
        <Select
          options={khoa}
          style={{ width: 290 }}
          placeholder="Khoa"
          onChange={handleChange}
        />
      </Form.Item>
    );
  }, [isKhoaMode, khoa]);

  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name={"maChuyenNganh"} label="Mã chuyên ngành">
          <Input disabled />
        </Form.Item>
        <Form.Item name={"tenChuyenNganh"} label="Tên chuyên ngành">
          <Input />
        </Form.Item>
        <Form.Item name={"moTa"} label="Mô tả">
          <Input />
        </Form.Item>
        {renderInputKhoaVien}
      </Form>
    );
  };

  return (
    <Modal
      title={type === "add" ? "Thêm chuyên ngành" : "Sửa chuyên ngành"}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalChuyenNganh;

ModalChuyenNganh.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(["add", "edit"]).isRequired,
  data: PropTypes.objectOf(PropTypes.any),
  isKhoaVienMode: PropTypes.bool,
};

ModalChuyenNganh.defaultProps = {
  visible: false,
  closeModal: () => {},
  data: {},
  isKhoaMode: false,
};
