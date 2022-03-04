import React, { useState } from "react";
import { Button, Table } from 'antd';
import './MonHoc.scss'
import ModalMonHoc from './FormAddMonHoc'
const MonHoc = () => {
    const [visible, setVisibleModal] = useState(false);
    const [visibleSua, setVisibleModalSua] = useState(false);
    const [monHoc, setMonHoc] = useState({});
    const columns = [
        {
            title: 'Mã môn học',
            dataIndex: 'maMonHoc',
            key: 'maMonHoc',
            width: 200,
        },
        {
            title: 'Tên môn học',
            dataIndex: 'tenMonHoc',
            key: 'tenMonHoc',
            width: 400,
        },

        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'moTa',
            width: 300,
        },
        {
            title: 'Khoa',
            dataIndex: 'khoa',
            key: 'khoa',
            width: 400,
        },
        {
            title: 'Thao tác',
            key: 'thaoTac',
            width: 300,
            render: () => (<div><Button danger onClick={(e)=>{handlerEditButton(e)}}>Chỉnh sửa</Button> <Button>Xóa</Button></div>),
        },
    ];
    const data = [];
    for (let i = 0; i < 30; i++) {
        data.push({
            key: i,
            maMonHoc: `${i}`,
            tenMonHoc: `Kinh doanh quốc tế`,
            moTa: 'New York No. 1 Lake Park',
            khoa: 'CNTT',
        });
    }
    const handlerEditButton = (monHoc) => {
        setMonHoc(monHoc);
        setVisibleModalSua(true);
    }
    return (<div className='monHoc'>
        <h1>DANH SÁCH MÔN HỌC</h1>
        <Button className='ant-btn-primary' type="primary" onClick={()=>{setVisibleModal(true)}}>+ Thêm môn học</Button>
        <Table className='ant-table-wrapper' columns={columns} dataSource={data} />
        <ModalMonHoc
            type="add"
            visible={visible}
            closeModal={setVisibleModal} />
        <ModalMonHoc
            type="sua"
            visible={visibleSua}
            closeModal={setVisibleModalSua}
            data={
                monHoc
            }
        />
    </div>);
}
export default MonHoc;