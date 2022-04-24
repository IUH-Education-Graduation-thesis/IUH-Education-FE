import React, { useEffect } from "react";
import { Modal, Form, Input, notification } from "antd";
import queries from "core/graphql";
import PropTypes from "prop-types";

import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import { checkTrulyObject } from "components/helper";

const themKhoaVienQuery = queries.mutation.themKhoaVien("id");

const ModalKhoa = ({ visible, closeModal, type, data, onCallAPISuccess }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const [form] = Form.useForm();

  /**
   * API
   * ===========================================================
   */

  const [actThemKhoaVien] = useMutation(themKhoaVienQuery, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.themKhoaVien?.errors || [];
      const _data = dataRes?.themKhoaVien?.data || [];

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
        message: "Thêm khoa viên thành công.",
      });
    },
  });

  /**
   * function
   * ============================================================
   */
  const handleCallAPIAdd = (inputs) => {
    actThemKhoaVien({
      variables: {
        inputs: {
          ...inputs,
        },
      },
    });
  };

  const handleButtonOkClick = () => {
    form
      ?.validateFields()
      ?.then(() => {
        const _dataForm = form?.getFieldsValue(true);

        const _inputs = {
          ten: _dataForm?.ten,
          moTa: _dataForm?.moTa,
          link: _dataForm?.link,
        };

        const _inputsFormat = checkTrulyObject(_inputs);

        if (type === "add") {
          handleCallAPIAdd(_inputsFormat);
        }
      })
      ?.catch(() => {});
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
      link: data?.link,
    });
  }, [data, form]);

  /**
   * render view
   * ============================================================================
   */

  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name={"id"} label="Mã khoa">
          <Input disabled />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
          name={"ten"}
          label="Tên khoa"
        >
          <Input />
        </Form.Item>
        <Form.Item name={"moTa"} label="Mô tả">
          <Input />
        </Form.Item>
        <Form.Item name={"link"} label="Link">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === "add" ? "Thêm khoa" : "Sửa khoa"}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      onOk={handleButtonOkClick}
      okText={type === "add" ? "Thêm" : "Sửa"}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalKhoa;

ModalKhoa.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(["edit", "add"]),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
};

Modal.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: "add",
  data: {},
  onCallAPISuccess: () => {},
};
