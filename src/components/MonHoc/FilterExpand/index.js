import React, { useMemo, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { Button, Form, Input, Select } from "antd";
import {
  SearchOutlined,
  ArrowDownOutlined,
  ClearOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

const prefix = "sinh-vien--filter";

const dataMockKhoaVien = [
  {
    id: 1,
    label: "Công nghệ thông tin",
    value: 2,
  },
  {
    id: 2,
    label: "May thời trang",
    value: 3,
  },
  {
    id: 3,
    label: "Tài ngân",
    value: 4,
  },
  {
    id: 4,
    label: "Xây dựng",
    value: 25,
  },
];

const { useForm } = Form;

const ExpandFilter = ({
  onAddAStudentClick,
  onAddWithFileClick,
  onFilterChange,
  currentFilterData,
  onClear,
}) => {
  const [form] = useForm();

  const [expanded, setExpanded] = useState(false);

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

  const renderArrow = useMemo(() => {
    if (expanded) {
      return <ArrowDownOutlined onClick={() => setExpanded(false)} />;
    }

    return <ArrowUpOutlined onClick={() => setExpanded(true)} />;
  }, [expanded]);

  return (
    <Form form={form} onFieldsChange={handleFilterCHange} className={prefix}>
      <div className={`${prefix}__top`}>
        <div className={`${prefix}__top__left`}>
          <Form.Item name="id">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Nhập mã môn học..."
            />
          </Form.Item>
          <Form.Item name="ten">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Nhập tên môn học..."
            />
          </Form.Item>
        </div>

        <div className={`${prefix}__top__right`}>
          <Button onClick={onAddAStudentClick} type="primary">
            {" "}
            + Thêm 1 môn học
          </Button>
          <Button onClick={onAddWithFileClick} type="ghost">
            {" "}
            + Thêm bằng file excel
          </Button>
          {renderArrow}
          <ClearOutlined onClick={handleClearFilter} />
        </div>
      </div>
      <div
        className={classNames(`${prefix}__expand`, {
          expanded,
        })}
      >
        <Form.Item name="khoa_vien">
          <Select
            options={dataMockKhoaVien}
            mode="multiple"
            placeholder="Khoa Viện"
          ></Select>
        </Form.Item>
        <Form.Item name="chuyen_nganh">
          <Select
            options={dataMockKhoaVien}
            mode="multiple"
            placeholder="Chuyên ngành"
          ></Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ExpandFilter;

ExpandFilter.propTypes = {
  onAddAStudentClick: PropTypes.func,
  onAddWithFileClick: PropTypes.func,
  onFilterChange: PropTypes.func,
  currentFilterData: PropTypes.objectOf(PropTypes.any).isRequired,
  onClear: PropTypes.func,
};

ExpandFilter.defaultProps = {
  onAddAStudentClick: () => {},
  onAddWithFileClick: () => {},
  onFilterChange: () => {},
  currentFilterData: {},
  onClear: () => {},
};
