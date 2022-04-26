import React, { useEffect } from "react";
import { Modal, Form, Input, notification } from "antd";
import queries from "core/graphql";
import PropTypes from "prop-types";

import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import { checkTrulyObject } from "components/helper";

const themChuyenNganhMutation = queries.mutation.themChuyenNganh("id");
const suaChuyenNganhMutation = queries.mutation.suaChuyenNganh("id");

const ModalChuyenNganh = ({
  visible,
  closeModal,
  type,
  data,
  onCallAPISuccess,
  khoaVienID,
}) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const [form] = Form.useForm();

  /**
   * API
   * ===========================================================
   */

  const [actThemChuyenNganh, { loading: loadingThemChuyenNganh }] = useMutation(
    themChuyenNganhMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.themChuyenNganh?.errors || [];
        const _data = dataRes?.themChuyenNganh?.data || [];

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
          message: "Thêm chuyên ngành thành công.",
        });
      },
    }
  );
  const [actSuaChuyenNganh, { loading: loadingSuaChuyenNganh }] = useMutation(
    suaChuyenNganhMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.suaChuyenNganh?.errors || [];
        const _data = dataRes?.suaChuyenNganh?.data || [];

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
          message: "Sửa chuyên ngành thành công.",
        });
      },
    }
  );

  /**
   * function
   * ============================================================
   */
  const handleCallAPIAdd = (inputs) => {
    actThemChuyenNganh({
      variables: {
        inputs,
      },
    });
  };

  const handleCallAPIEdit = (inputs, id) => {
    actSuaChuyenNganh({
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
          ten: _dataForm?.ten,
          moTa: _dataForm?.moTa,
          khoaVienID,
        };

        const _inputsFormat = checkTrulyObject(_inputs);

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
        <Form.Item name={"id"} label="Mã chuyên ngành">
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
          label="Tên chuyên ngành"
        >
          <Input />
        </Form.Item>
        <Form.Item name={"moTa"} label="Mô tả">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === "add" ? "Thêm Chuyên ngành" : "Sửa chuyên ngành"}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      confirmLoading={loadingThemChuyenNganh || loadingSuaChuyenNganh}
      onOk={handleButtonOkClick}
      okText={type === "add" ? "Thêm" : "Sửa"}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalChuyenNganh;

ModalChuyenNganh.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(["edit", "add"]),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
  khoaVienID: PropTypes.string.isRequired,
};

ModalChuyenNganh.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: "add",
  data: {},
  onCallAPISuccess: () => {},
};
