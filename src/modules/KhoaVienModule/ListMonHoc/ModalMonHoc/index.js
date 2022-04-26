import React, { useEffect } from "react";
import { Modal, Form, Input, notification } from "antd";
import queries from "core/graphql";
import PropTypes from "prop-types";

import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import { checkTrulyObject } from "components/helper";

const themChuyenNganhMutation = queries.mutation.themChuyenNganh("id");
const suaChuyenNganhMutation = queries.mutation.suaChuyenNganh("id");

const themMonHocMutation = queries.mutation.themMonHoc("id");

const ModalMonHoc = ({
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

  const [actThemMonHoc, { loading: loadingThemMonHoc }] = useMutation(
    themMonHocMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.themMonHoc?.errors || [];
        const _data = dataRes?.themMonHoc?.data || [];

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
          message: "Thêm môn học thành công.",
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
          message: "Thêm môn học thành công.",
        });
      },
    }
  );

  /**
   * function
   * ============================================================
   */
  const handleCallAPIAdd = (inputs) => {
    actThemMonHoc({
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
    });
  }, [data, form]);

  /**
   * render view
   * ============================================================================
   */

  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name={"id"} label="Mã môn học">
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
          label="Tên Môn học"
        >
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={type === "add" ? "Thêm môn học" : "Sửa môn học"}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      confirmLoading={loadingThemMonHoc || loadingSuaChuyenNganh}
      onOk={handleButtonOkClick}
      okText={type === "add" ? "Thêm" : "Sửa"}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalMonHoc;

ModalMonHoc.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(["edit", "add"]),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
  khoaVienID: PropTypes.string.isRequired,
};

ModalMonHoc.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: "add",
  data: {},
  onCallAPISuccess: () => {},
};
