import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import queries from 'core/graphql';
import { Form, Input, Select } from 'antd';
import {
  SearchOutlined,
  ArrowDownOutlined,
  ClearOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { FIND_KHOA_VIEN } from 'components/SinhVien/fragment';

const prefix = 'sinh-vien--filter';

const findKhoaVienQuery = queries.query.findKhoaVien(FIND_KHOA_VIEN);

const { useForm } = Form;

const ExpandFilter = ({ onFilterChange, currentFilterData, onClear }) => {
  const [form] = useForm();

  const [expanded, setExpanded] = useState(false);
  const [currentKhoaVien, setCurrentKhoaVien] = useState(null);

  /**
   * API
   * ==================================================
   */

  const { data: dataFindKhoaVien } = useQuery(findKhoaVienQuery);

  const dataForKhoaVien = dataFindKhoaVien?.findKhoaVien?.data?.[0]?.data?.map((item) => ({
    ...item,
    value: item?.id,
    label: item?.ten,
  }));

  const dataForChuyenNganh = currentKhoaVien?.chuyenNganhs?.map((item) => ({
    ...item,
    value: item?.id,
    label: item?.ten,
  }));

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

  const handleKhoaVienSelectChange = (id) => {
    const _khoaVien = dataForKhoaVien?.find((item) => item?.id === id);

    setCurrentKhoaVien(_khoaVien);
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
            <Input prefix={<SearchOutlined />} placeholder="Nh???p m?? kh??a h???c..." />
          </Form.Item>
          <Form.Item name="tenKhoaHoc">
            <Input prefix={<SearchOutlined />} placeholder="Nh???p t??n kh??a h???c..." />
          </Form.Item>
        </div>

        <div className={`${prefix}__top__right`}>
          {renderArrow}
          <ClearOutlined onClick={handleClearFilter} />
        </div>
      </div>
      <div
        className={classNames(`${prefix}__expand`, {
          expanded,
        })}
      >
        <Form.Item name="khoaVienId">
          <Select
            onChange={handleKhoaVienSelectChange}
            options={dataForKhoaVien}
            placeholder="Khoa Vi???n"
          ></Select>
        </Form.Item>
        <Form.Item name="chuyenNganhId">
          <Select options={dataForChuyenNganh} placeholder="Chuy??n ng??nh"></Select>
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
