import { Button, Col, Form, Input, Row, Select, Table } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const prefix = 'content-modal-them-hoc-phan';

const ContentThemHocPhan = ({ dataFilter, onSubmit }) => {
  const [currentKhoaVien, setCurrentKhoaVien] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentMonHoc, setCurrentMonHoc] = useState(null);

  const dataForKhoaVien = dataFilter?.map((item) => ({
    ...item,
    value: item?.id,
    label: item?.ten,
  }));

  const dataMonHoc = currentKhoaVien?.monHocs?.map((item) => ({
    ...item,
    label: item?.ten,
    value: item?.id,
  }));

  const dataForTable = currentMonHoc?.hocPhans?.map((item) => ({
    ...item,
    key: item?.id,
  }));

  const columns = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'ID',
    },
    {
      dataIndex: 'maHocPhan',
      key: 'maHocPhan',
      title: 'Mã học phần',
    },
    {
      dataIndex: 'batBuoc',
      key: 'batBuoc',
      title: 'Bắt buộc',
      render: (isBatBuoc) => {
        return isBatBuoc ? 'có' : 'không';
      },
    },
    {
      dataIndex: 'monHoc',
      key: 'monHoc',
      title: 'Môn học',
      render: (monHoc) => monHoc?.ten,
    },
    {
      dataIndex: 'soTinChiLyThuyet',
      key: 'soTinChiLyThuyet',
      title: 'Số tín chỉ lý thuyết',
    },
    {
      dataIndex: 'soTinChiThucHanh',
      key: 'soTinChiThucHanh',
      title: 'Số tín chỉ thực hành',
    },
  ];
  /**
   * Function
   * ===================================================
   */

  const handleKhoavienChange = (value) => {
    const _currentKhoaVien = dataFilter?.find((item) => item?.id === value);

    setCurrentKhoaVien(_currentKhoaVien);
  };

  const handleRowChange = (activeKeys) => {
    setSelectedRowKeys(activeKeys);
  };

  const handleMonHocChange = (value) => {
    const _monHoc = dataMonHoc?.find((item) => item?.id === value);

    setCurrentMonHoc(_monHoc);
  };

  const handleOnSubmit = () => {
    onSubmit(selectedRowKeys);
  };

  /**
   * Render view
   * =============================================================
   */

  return (
    <div className={prefix}>
      <Form>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item>
              <Input placeholder="ID" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input placeholder="Mã học phần" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Select
                options={dataForKhoaVien}
                onChange={handleKhoavienChange}
                placeholder="Khoa viện"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Select onChange={handleMonHocChange} options={dataMonHoc} placeholder="Môn học" />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div className={`${prefix}__content`}>
        <div className={`${prefix}__content__head`}>
          <div className="head__title">Danh sách học phần</div>
          <div className="head__action">
            <Button onClick={handleOnSubmit}>Thêm lớp học phần</Button>
          </div>
        </div>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: handleRowChange,
          }}
          columns={columns}
          dataSource={dataForTable}
        />
      </div>
    </div>
  );
};

export default ContentThemHocPhan;

ContentThemHocPhan.propTypes = {
  onSubmit: PropTypes.func,
  dataFilter: PropTypes.array,
};

ContentThemHocPhan.defaultProps = {
  onSubmit: () => {},
  dataFilter: [],
};
