import React from "react";
import PropTypes from "prop-types";

import { Button, DatePicker, Form, Input } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const prefix = "sinh-vien--filter";

const { useForm } = Form;

const ExpandFilter = ({
  onAddAStudentClick,
  onFilterChange,
  currentFilterData,
  onClear,
}) => {
  const [form] = useForm();

  /**
   * function
   * ==========================================
   */

  const handleFilterCHange = (payload) => {
    const _fieldChange = {
      [payload?.[0]?.name?.[0]]: payload?.[0]?.value,
    };

    const _currentFilterData = {
      ...currentFilterData,
      ..._fieldChange,
    };

    onFilterChange(_fieldChange, _currentFilterData, payload?.name?.[0]);
  };

  const handleClearFilter = () => {
    form.resetFields();
    onClear();
  };

  /**
   * render view
   * ==================================
   */

  return (
    <Form form={form} onFieldsChange={handleFilterCHange} className={prefix}>
      <div className={`${prefix}__top`}>
        <div className={`${prefix}__top__left`}>
          <Form.Item name="name">
            <Input
              type="number"
              prefix={<SearchOutlined />}
              placeholder="Nhập tên khóa học..."
            />
          </Form.Item>
        </div>

        <div className={`${prefix}__top__right`}>
          <Button onClick={onAddAStudentClick} type="primary">
            {" "}
            + Thêm 1 khóa học
          </Button>

          <ClearOutlined onClick={handleClearFilter} />
        </div>
      </div>
    </Form>
  );
};

export default ExpandFilter;

ExpandFilter.propTypes = {
  onAddAStudentClick: PropTypes.func,
  onFilterChange: PropTypes.func,
  currentFilterData: PropTypes.objectOf(PropTypes.any).isRequired,
  onClear: PropTypes.func,
};

ExpandFilter.defaultProps = {
  onAddAStudentClick: () => {},
  onFilterChange: () => {},
  currentFilterData: {},
  onClear: () => {},
};
