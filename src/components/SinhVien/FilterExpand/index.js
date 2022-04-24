import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import queries from 'core/graphql';

import { Button, Form, Input, Select } from 'antd';
import {
  SearchOutlined,
  ArrowDownOutlined,
  ClearOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { FIND_KHOA_VIEN } from '../fragment';

const prefix = 'sinh-vien--filter';
const findKhoaVienQuery = queries.query.findKhoaVien(FIND_KHOA_VIEN);

const dataMockKhoaVien = [
  {
    id: 1,
    label: 'Công nghệ thông tin',
    value: 2,
  },
  {
    id: 2,
    label: 'May thời trang',
    value: 3,
  },
  {
    id: 3,
    label: 'Tài ngân',
    value: 4,
  },
  {
    id: 4,
    label: 'Xây dựng',
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

  const { data: dataFindKhoaVien, loading: loadingFindKhoaVien } =
    useQuery(findKhoaVienQuery);

  const dataForFilter = dataFindKhoaVien?.findKhoaVien?.data?.[0]?.data;

  const dataForKhoaVien = dataForFilter?.map((item) => ({
    value: item?.id,
    label: item?.ten,
  }));

  const dataForChuyenNganh = dataForFilter
    ?.filter((item) => currentFilterData?.khoaVienIds?.includes(item?.id))
    ?.map((item) => {
      return item?.chuyenNganhs
        ?.map((_item) => ({
          value: _item?.id,
          label: _item?.ten,
          lops: _item?.khoas
            ?.map((__item) => __item)
            ?.flat()
            ?.map((_i) => _i?.lops?.map((__i) => __i)?.flat())
            ?.flat(),
          khoas: _item?.khoas?.map((__item) => __item)?.flat(),
        }))
        ?.flat();
    })
    ?.flat();

  const dataForKhoa = dataForChuyenNganh
    ?.filter((item) => currentFilterData?.chuyenNganhIds?.includes(item?.value))
    ?.map((item) =>
      item?.khoas
        ?.map((_item) => ({
          ..._item,
          value: _item?.id,
          label: _item?.khoa,
        }))
        ?.flat()
    )
    ?.flat();

  const dataForLop = dataForKhoa
    ?.filter((item) => currentFilterData?.khoaHocIds?.includes(item?.value))
    ?.map((item) =>
      item?.lops
        ?.map((_item) => ({
          ..._item,
          value: _item?.id,
          label: _item?.ten,
        }))
        ?.flat()
    )
    ?.flat();

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
          <Form.Item name="maSinhVien">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Nhập mã sinh viên..."
            />
          </Form.Item>
          <Form.Item name="tenSinhVien">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Nhập tên sinh viên..."
            />
          </Form.Item>
        </div>

        <div className={`${prefix}__top__right`}>
          <Button onClick={onAddAStudentClick} type="primary">
            {' '}
            + Thêm 1 sinh viên
          </Button>
          <Button onClick={onAddWithFileClick} type="ghost">
            {' '}
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
        <Form.Item className={`${prefix}__expand__all`} name="khoaVienIds">
          <Select
            options={dataForKhoaVien}
            mode="multiple"
            placeholder="Khoa Viện"
          ></Select>
        </Form.Item>
        <Form.Item name="chuyenNganhIds">
          <Select
            options={dataForChuyenNganh}
            mode="multiple"
            placeholder="Chuyên ngành"
          ></Select>
        </Form.Item>
        <Form.Item name="khoaHocIds">
          <Select
            options={dataForKhoa}
            mode="multiple"
            placeholder="Khóa"
          ></Select>
        </Form.Item>
        <Form.Item className={`${prefix}__expand__all`} name="lopIds">
          <Select
            options={dataForLop}
            mode="multiple"
            placeholder="Lớp"
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
