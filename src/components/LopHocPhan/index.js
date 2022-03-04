import React, { useState } from "react";
import { Table, Select, Button } from 'antd';
import './index.scss'
import ModalAddLopHocPhan from "./FormAddLopHocPhan";
const LopHocPhan = () => {
    const [visibleModalAdd, setVisibleModalAdd] = useState(false);
    const [visibleModalEdit, setVisibleModalEdit] = useState(false);
    const [lopHocPhan, setLopHocPhan] = useState({});
    const columns = [
        {
            title: 'ID',
            width: 50,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Mã học phần',
            dataIndex: 'maHocPhan',
            key: 'maHocPhan',
            width: 200,
        },
        {
            title: 'Tên viết tắt',
            dataIndex: 'tenVietTat',
            key: 'tenVietTat',
            width: 400,
        },
        {
            title: 'Tên lớp học phần',
            dataIndex: 'tenLopHocPhan',
            key: 'tenLopHocPhan',
            width: 300,
        },
        {
            title: 'Số nhóm thực hành',
            dataIndex: 'soNhomTH',
            key: 'soNhomTH',
            width: 300,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            width: 300,
        },
        {
            title: 'Số lượng đăng ký tối đa',
            dataIndex: 'soLuongDangKyToiDa',
            key: 'soLuongDangKyToiDa',
            width: 300,
        },
        {
            title: 'Số lượng đăng ký hiện tại',
            dataIndex: 'soLuongDangKyHienTai',
            key: 'soLuongDangKyHienTai',
            width: 300,
        },
        {
            title: 'ID học phần tương ứng',
            dataIndex: 'idLopHocPhanTuongUng',
            key: 'idLopHocPhanTuongUng',
            width: 300,
        },
        {
            title: 'Học kỳ',
            dataIndex: 'hocKy',
            key: 'hocKy',
            width: 300,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'moTa',
            width: 300,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (e) => (
                <div>
                    <Button danger onClick={() => handlerEditButton(e)}>Chỉnh sửa</Button> <Button style={{ marginLeft: 10 }}>Xóa</Button>
                </div>
            ),
        },
    ];

    const data = [];
    for (let i = 0; i < 13; i++) {
        data.push({
            key: i,
            id: `${i}`,
            maHocPhan: `400129343${i}`,
            tenVietTat: `DHKTPM14`,
            tenLopHocPhan: `----`,
            soNhomTH: 4,
            trangThai: `Đang mở`,
            soLuongDangKyToiDa: `90`,
            soLuongDangKyHienTai: `35`,
            idLopHocPhanTuongUng: `1231241`,
            hocKy: 5,
            moTa: `không`,

        });

    }
    const handlerEditButton = (lopHocPhan) => {
        setLopHocPhan(lopHocPhan);
        setVisibleModalEdit(true);
    };
    const { Option } = Select;
    const khoaData = ["CNTT", "Công nghệ may", "Kinh doanh quốc tế"];

    React.useState(khoaData[0]);
    return (
        <div className='hocLopPhan'>
            <h1>DANH SÁCH LỚP HỌC PHẦN</h1>
            <div className="combox-sv">
                <span>Khoa</span>
                <Select
                    className="ant-select-selector"
                    defaultValue={khoaData[0]}
                    style={{ width: 300 }}
                >
                    {khoaData.map((khoaData) => (
                        <Option key={khoaData}>{khoaData}</Option>
                    ))}
                </Select>
            </div>
            <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModalAdd(true)}>+ Thêm lớp học phần</Button>
            <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: "50vh" }} />
            <ModalAddLopHocPhan
                type="add"
                visible={visibleModalAdd}
                closeModal={setVisibleModalAdd}
            />
            <ModalAddLopHocPhan
                type="edit"
                visible={visibleModalEdit}
                closeModal={setVisibleModalEdit}
                data={
                    lopHocPhan
                }
            />
        </div>
    );
}
export default LopHocPhan;