import React, { useEffect } from "react";
import { Modal, Form, Input, notification } from "antd";
import queries from "core/graphql";
import PropTypes from "prop-types";

import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import { checkTrulyObject } from "components/helper";

const suaChuyenNganhMutation = queries.mutation.suaChuyenNganh("id");

const themKhoaHocMutation = queries.mutation.themKhoaHoc("id");

const ModalKhoaHoc = ({
  visible,
  closeModal,
  type,
  data,
  onCallAPISuccess,
  chuyenNganhId,
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

  const [actThemKhoaHoc, { loading: loadingThemKhoaHoc }] = useMutation(
    themKhoaHocMutation,
    {
      onCompleted: (dataRes) => {
        const _errors = dataRes?.themKhoaHoc?.errors || [];
        const _data = dataRes?.themKhoaHoc?.data || [];

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
          message: "Thêm khóa học thành công.",
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
    actThemKhoaHoc({
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
          khoa: _dataForm?.khoa,
          moTa: _dataForm?.moTa,
          chuyenNganhId,
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
      khoa: data.khoa,
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
          name={"khoa"}
          label="Tên khóa"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name={"moTa"} label="Mô tả">
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === "add" ? "Thêm khóa học" : "Sửa khóa học"}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      confirmLoading={loadingThemKhoaHoc || loadingSuaChuyenNganh}
      onOk={handleButtonOkClick}
      okText={type === "add" ? "Thêm" : "Sửa"}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalKhoaHoc;

ModalKhoaHoc.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.oneOf(["edit", "add"]),
  data: PropTypes.objectOf(PropTypes.any),
  onCallAPISuccess: PropTypes.func,
  chuyenNganhId: PropTypes.string.isRequired,
};

ModalKhoaHoc.defaultProps = {
  visible: false,
  closeModal: () => {},
  type: "add",
  data: {},
  onCallAPISuccess: () => {},
};
