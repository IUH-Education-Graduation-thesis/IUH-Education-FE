import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";

import SinhVienComponent from "components/SinhVien";
import KhoaComponent from "components/Khoa";
import ChuyenNganh from "components/ChuyenNganh";
import MonHoc from "components/MonHoc";
import HocKy from "components/HocKy";
import HocPhan from "components/HocPhan";
import LopHocPhan from "components/LopHocPhan";
import "./HomePage.scss";
import { isEmpty } from "lodash";
import KhoaHocComponent from "components/KhoaHoc";
import DayNha from "components/DayNha"
import PhongHoc from "components/PhongHoc";
import NamHoc from "components/NamHoc";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const prefix = "home-page";

const listComponent = [
  {
    key: "5",
    component: SinhVienComponent,
  },
  {
    key: "6",
    component: KhoaComponent,
  },
  {
    key: "7",
    component: ChuyenNganh,
  },
  {
    key: "8",
    component: MonHoc,
  },
  {
    key: "9",
    component: HocKy,
  },
  {
    key: "10",
    component: HocPhan,
  },
  {
    key: "11",
    component: LopHocPhan,
  },
  {
    key: "12",
    component: KhoaHocComponent,
  },
  {
    key: "13",
    component: DayNha,
  },
  {
    key: "14",
    component: PhongHoc,
  },
  {
    key: "15",
    component: NamHoc,
  },
];

const HomePage = () => {
  const [currentComponent, setCurrentComponent] = useState("5");

  const handleChangeMenu = (e) => {
    const key = e?.key;

    setCurrentComponent(key);
  };

  const renderContent = () => {
    const _component = listComponent?.find(
      (item) => item?.key === currentComponent
    );

    if (isEmpty(_component)) return;

    const Component = _component?.component;

    return <Component />;
  };

  return (
    <Layout className={`${prefix}`}>
      <Header className={`${prefix}__header header`}>
        <div className="logo">IUHStudent</div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["5"]}
            defaultOpenKeys={["sub1, sub2"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleChangeMenu}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Tài khoản">
              <Menu.Item key="1">Đăng xuất</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Chức năng">
              <Menu.Item key="5">Sinh Viên</Menu.Item>
              <Menu.Item key="6">Khoa</Menu.Item>
              <Menu.Item key="7">Chuyên Ngành</Menu.Item>
              <Menu.Item key="8">Môn Học</Menu.Item>
              <Menu.Item key="9">Học Kỳ</Menu.Item>
              <Menu.Item key="10">Học Phần</Menu.Item>
              <Menu.Item key="11">Lớp Học Phần</Menu.Item>
              <Menu.Item key="12">Khóa học</Menu.Item>
              <Menu.Item key="13">Dãy nhà</Menu.Item>
              <Menu.Item key="14">Phòng học</Menu.Item>
              <Menu.Item key="15">Năm học</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomePage;
