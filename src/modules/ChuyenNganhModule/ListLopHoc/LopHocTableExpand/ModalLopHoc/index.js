import React, { useEffect } from "react";
import { Modal, Form, Input, notification, DatePicker } from "antd";
import queries from "core/graphql";
import PropTypes from "prop-types";

import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import { checkTrulyObject } from "components/helper";
import moment from "moment";
import themLop from "core/graphql/themLop";

const themLopMutation = queries.mutation.themLop("id");
const suaLopMutation = queries.mutation.suaLop("id");

const ModalLopHoc = ({
  visible,
  closeModal,
  type,
  data,
  onCallAPISuccess,
  khoaId,
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

  const [acThemLop, { loading: loadingThemLop }] = useMutation(
    themLopMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.themLop?.errors || [];
        const _data = dataRes?.themLop?.data || [];

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
          message: "Thêm lớp học thành công.",
        });
      },
    }
  );

  const [actSuaLop, { loading: loadingSuaLop }] = useMutation(suaLopMutation, {
    onCompleted: (dataRes) => {
      const _errors = dataRes?.suaLop?.errors || [];
      const _data = dataRes?.suaLop?.data || [];

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
        message: `Sửa lớp học thành công.`,
      });
    },
  });

  /**
   * function
   * ============================================================
   */
  const handleCallAPIAdd = (inputs) => {
    acThemLop({
      variables: {
        inputs,
      },
    });
  };

  const handleCallAPIEdit = (inputs, id) => {
    actSuaLop({
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
          khoaId,
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
        <Form.Item name={"id"} label="Mã khóa">
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
          label="Tên lớp"
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
      title={type === "add" ? "Thêm lớp học" : "Sửa lớp học"}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      confirmLoading={loadingThemLop || loadingSuaLop}
      onOk={handleButtonOkClick}
      okText={type === "add" ? "Thêm" : "Sửa"}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalLopHoc;

ModalLopHoc.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(["edit", "add"]),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
  khoaId: PropTypes.string.isRequired,
};

ModalLopHoc.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: "add",
  data: {},
  onCallAPISuccess: () => {},
};
