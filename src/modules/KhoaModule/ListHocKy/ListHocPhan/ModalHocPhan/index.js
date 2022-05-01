import React, { useEffect, useState } from "react";
import { Modal, Form, Input, notification, Switch, Select } from "antd";
import queries from "core/graphql";
import PropTypes from "prop-types";

import { isEmpty } from "lodash";
import { useMutation, useQuery } from "@apollo/client";
import { checkTrulyObject } from "components/helper";
import { FIND_KHOA_VIEN_FRAGMENT } from "modules/KhoaModule/fragment";

const themHocPhanMutation = queries.mutation.themHocPhan("id");
const suaHocPhanMutation = queries.mutation.suaHocPhan("id");
const findKhoaVien = queries.query.findKhoaVien(FIND_KHOA_VIEN_FRAGMENT);

const ModalHocPhan = ({
  visible,
  closeModal,
  type,
  data,
  onCallAPISuccess,
  hocKyId,
}) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const [form] = Form.useForm();

  const [currentKhoaVien, setCurrentKhoaVien] = useState(null);

  /**
   * API
   * ===========================================================
   */

  const { data: dataFindKhoaVien } = useQuery(findKhoaVien);

  const [actThemHocPhan, { loading: loadingThemHocPhan }] = useMutation(
    themHocPhanMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.themHocPhan?.errors || [];
        const _data = dataRes?.themHocPhan?.data || [];

        if (!isEmpty(_errors))
          return _errors?.map((item) =>
            notification["error"]({
              message: item?.message,
            })
          );

        if (isEmpty(_data)) {
          notification["error"]({
            message: "Lỗi hệ thống!",
          });
          return;
        }

        onCallAPISuccess(_data?.[0]);

        notification["success"]({
          message: "Thêm học phần thành công.",
        });
      },
    }
  );
  const [actSuaHocPhan, { loading: loadingSuaHocPhan }] = useMutation(
    suaHocPhanMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.suaHocPhan?.errors || [];
        const _data = dataRes?.suaHocPhan?.data || [];

        if (!isEmpty(_errors))
          return _errors?.map((item) =>
            notification["error"]({
              message: item?.message,
            })
          );

        if (isEmpty(_data)) {
          notification["error"]({
            message: "Lỗi hệ thống!",
          });
          return;
        }

        onCallAPISuccess(_data?.[0]);

        notification["success"]({
          message: "Sửa học phần thành công.",
        });
      },
    }
  );

  const dataForKhoaVien =
    dataFindKhoaVien?.findKhoaVien?.data?.[0]?.data?.map((item) => ({
      ...item,
      label: item?.ten,
      value: item?.id,
    })) || [];

  const dataForMonHoc =
    dataForKhoaVien
      ?.find((item) => item?.id === currentKhoaVien)
      ?.monHocs?.map((item) => ({ label: item?.ten, value: item?.id })) || [];

  /**
   * function
   * ============================================================
   */
  const handleCallAPIAdd = (inputs) => {
    actThemHocPhan({
      variables: {
        inputs,
      },
    });
  };

  const handleCallAPIEdit = (inputs, id) => {
    actSuaHocPhan({
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

        const _inputs = {
          maHocPhan: _dataForm?.maHocPhan,
          moTa: _dataForm?.moTa,
          soTinChiLyThuyet: _dataForm?.soTinChiLyThuyet,
          soTinChiThucHanh: _dataForm?.soTinChiThucHanh,
          batBuoc: _dataForm?.batBuoc || false,
          monHocId: _dataForm?.monHocId,
          hocKyId,
        };

        const _inputsFormat = checkTrulyObject(_inputs, ["batBuoc"]);

        if (type === "add") {
          handleCallAPIAdd(_inputsFormat);
          return;
        }

        const _id = form?.getFieldValue("id");

        handleCallAPIEdit(_inputsFormat, _id);
      })
      ?.catch(() => {
        notification["error"]({
          message: "Nhập thiếu thông tin!",
        });
      });
  };

  const handleKhoaVienChange = (payload) => {
    setCurrentKhoaVien(payload);
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
      id: data?.id,
      batBuoc: data?.batBuoc,
      soTinChiLyThuyet: data?.soTinChiLyThuyet,
      soTinChiThucHanh: data?.soTinChiThucHanh,
      maHocPhan: data?.maHocPhan,
      moTa: data?.moTa,
      monHocId: data?.monHoc?.id,
    });
  }, [data, form]);

  /**
   * render view
   * ============================================================================
   */

  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name={"id"} label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
          name={"maHocPhan"}
          label="Mã học phần"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Bắt buộc" name={"batBuoc"}>
          <Switch />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
          name={"soTinChiLyThuyet"}
          label="Số tín chỉ lý thuyết"
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
          name={"soTinChiThucHanh"}
          label="Số tín chỉ thực hành"
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item required label="Môn học">
          <Select
            showSearch
            options={dataForKhoaVien}
            style={{ marginBottom: 10 }}
            placeholder="Khoa viện"
            onChange={handleKhoaVienChange}
          />

          <Form.Item
            rules={[{ required: true, message: "Không được để trống!" }]}
            name={"monHocId"}
          >
            <Select showSearch options={dataForMonHoc} placeholder="Môn học" />
          </Form.Item>
        </Form.Item>

        <Form.Item name={"moTa"} label="Mô tả">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === "add" ? "Thêm học phần" : "Sửa học phần"}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      confirmLoading={loadingThemHocPhan || loadingSuaHocPhan}
      onOk={handleButtonOkClick}
      okText={type === "add" ? "Thêm" : "Sửa"}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalHocPhan;

ModalHocPhan.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(["edit", "add"]),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
  hocKyId: PropTypes.string.isRequired,
};

ModalHocPhan.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: "add",
  data: {},
  onCallAPISuccess: () => {},
};
