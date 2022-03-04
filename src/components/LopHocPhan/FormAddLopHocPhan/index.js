import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";

import { isEmpty } from "lodash";


const ModalAddLopHocPhan = ({ visible, closeModal, type, data }) => {

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    };
    const [form] = Form.useForm();
    useEffect(() => {
        if (isEmpty(data)) {
            return;
        }
        form.setFieldsValue({
            id: data.id,
            maHocPhan: data.maHocPhan,
            tenVietTat: data.tenVietTat,
            tenLopHocPhan: data.tenLopHocPhan,
            soNhomTH: data.soNhomTH,
            trangThai: data.trangThai,
            soLuongDangKyToiDa: data.soLuongDangKyToiDa,
            soLuongDangKyHienTai: data.soLuongDangKyHienTai,
            idLopHocPhanTuongUng: data.idLopHocPhanTuongUng,
            hocKy: data.hocKy,
            moTa: data.moTa,
        })
    }, [data])
    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    const trangThai = [
        { value: 'dangHoc', label: 'Đang học' },
        { value: 'daKetThuc', label: 'Đã kết thúc' },

    ]
    const monHocTienQuyet = [
        { value: 'toanCC', label: 'Toán cao cấp' },
        { value: 'cauTrucRoiRac', label: 'Cấu trúc rời rạc' },

    ]
    const monHocSongHanh = [
        { value: 'toanCC', label: 'Toán cao cấp' },
        { value: 'cauTrucRoiRac', label: 'Cấu trúc rời rạc' },

    ]
    const monHocTuongDuong = [
        { value: 'toanCC', label: 'Toán cao cấp' },
        { value: 'cauTrucRoiRac', label: 'Cấu trúc rời rạc' },

    ]
    const renderForm = () => {
        return (
            <Form {...layout} form={form} name="nest-messages">
                <Form.Item
                    name={"id"}
                    label="ID"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name={"maHocPhan"}
                    label="Mã học phần"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"tenVietTat"}
                    label="Tên viết tắt"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"tenLopHocPhan"}
                    label="Tên lớp học phần"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"soNhomTH"}
                    label="Số nhóm thực hành"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                >
                    <Select options={trangThai} style={{ width: 290 }} placeholder='Trạng thái' />
                </Form.Item>
                <Form.Item
                    name={"soLuongDangKyToiDa"}
                    label="Số lượng đăng ký tối đa"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"soLuongDangKyHienTai"}
                    label="Số lượng đăng ký hiện tại"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"idLopHocPhanTuongUng"}
                    label="ID lớp học phần tương ứng"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"hocKy"}
                    label="Học kỳ"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"moTa"}
                    label="Mô tả"
                >
                    <Input />
                </Form.Item>
            </Form>
        );
    };
    return (
        <Modal
            title={type === 'add' ? 'Thêm lớp học phần' : 'Sửa lớp học phần'}
            centered
            visible={visible}
            onCancel={() => closeModal(false)}
            width={1000}

        >
            {renderForm()}
        </Modal>
    );
};

export default ModalAddLopHocPhan;
