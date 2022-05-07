import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import moment from 'moment';

import { Button, Form, Input, Select } from 'antd';
import {
  SearchOutlined,
  ArrowDownOutlined,
  ClearOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import queries from 'core/graphql';
import { FIND_KHOA_VIEN_FRAGMENT, FIND_NAM_HOC_FRAGMENT } from '../fragment';

const findKhoaVienQuery = queries.query.findKhoaVien(FIND_KHOA_VIEN_FRAGMENT);
const findNamHocQuery = queries.query.findNamHoc(FIND_NAM_HOC_FRAGMENT);

const prefix = 'sinh-vien--filter';

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
  const [dataForSelectMonHoc, setDataForSelectMonHoc] = useState([]);
  const [dataForSelectHocKy, setDataForSelectHocKy] = useState([]);

  /**
   * API
   * ==================================================
   */

  const { data: dataFindNamHoc } = useQuery(findNamHocQuery);

  const { data: dataFindKhoaVien, loading: loadingFindKhoaVien } = useQuery(findKhoaVienQuery);

  const listKhoaVien = dataFindKhoaVien?.findKhoaVien?.data?.[0]?.data;
  const dataForSelectKhoaVien = listKhoaVien?.map((item) => ({
    value: item?.id,
    label: item?.ten,
  }));

  const formatYear = (fromDate, toDate) => {
    const _formYear = moment(fromDate).format('YYYY');
    const _toYear = moment(toDate).format('YYYY');

    return `${_formYear} - ${_toYear}`;
  };

  const listNamHoc = dataFindNamHoc?.findNamHoc?.data?.[0]?.data;

  const dataForSelectNamHoc = listNamHoc?.map((item) => ({
    value: item?.id,
    label: formatYear(item?.ngayBatDau, item?.ngayKetThuc),
  }));

  /**
   * function
   * ==========================================
   */

  const handleDataForMonHoc = () => {
    const _listSelectedKhoaVien = form?.getFieldValue('khoaVienIds');

    const _listDataForMonHoc = _listSelectedKhoaVien?.map((item) => {
      return listKhoaVien
        ?.filter((_item) => _item?.id == item)
        ?.map((_item) => {
          return _item?.monHocs
            ?.map((__item) => ({
              label: __item?.ten,
              value: __item?.id,
            }))
            ?.flat();
        })
        ?.flat();
    });

    setDataForSelectMonHoc(_listDataForMonHoc?.flat());
  };

  const handleDataForHocKy = () => {
    const _listSelectedNamHoc = form?.getFieldValue('namHocIds');

    const _listDataForHocKy = _listSelectedNamHoc?.map((item) => {
      return listNamHoc
        ?.filter((_item) => _item?.id == item)
        ?.map((_item) => {
          return _item?.hocKys
            ?.map((__item) => ({
              label: `Học kỳ: ${__item?.thuTu}`,
              value: __item?.id,
            }))
            ?.flat();
        })
        ?.flat();
    });

    setDataForSelectHocKy(_listDataForHocKy?.flat());
  };

  const handleFilterCHange = (payload) => {
    handleDataForMonHoc();
    handleDataForHocKy();

    const _fieldChange = {
      [payload?.[0]?.name?.[0]]: payload?.[0]?.value,
    };

    const _currentFilterData = {
      ...currentFilterData,
      ..._fieldChange,
    };

    onFilterChange(_fieldChange, _currentFilterData, payload?.[0]?.name?.[0]);
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
            <Input prefix={<SearchOutlined />} placeholder="Nhập id học phần..." />
          </Form.Item>
          <Form.Item name="maHocPhan">
            <Input prefix={<SearchOutlined />} placeholder="Nhập mã học phần..." />
          </Form.Item>
        </div>

        <div className={`${prefix}__top__right`}>
          <Button onClick={onAddAStudentClick} type="primary">
            {' '}
            + Thêm 1 Học phần
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
        <Form.Item name="khoaVienIds">
          <Select
            options={dataForSelectKhoaVien}
            loading={loadingFindKhoaVien}
            mode="multiple"
            placeholder="Khoa Viện"
          ></Select>
        </Form.Item>
        <Form.Item name="monHocIds">
          <Select options={dataForSelectMonHoc} mode="multiple" placeholder="Môn học"></Select>
        </Form.Item>
        <Form.Item name="namHocIds">
          <Select options={dataForSelectNamHoc} mode="multiple" placeholder="Năm học"></Select>
        </Form.Item>
        <Form.Item name="hocKyIds">
          <Select options={dataForSelectHocKy} mode="multiple" placeholder="Học kỳ"></Select>
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
