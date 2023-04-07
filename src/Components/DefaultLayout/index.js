import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Menu, Dropdown, Avatar, Modal, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
  CoffeeOutlined,
  InsertRowAboveOutlined,
  SmileOutlined,
  UserOutlined,
  CodepenCircleOutlined,
  SolutionOutlined,
  ShopOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  ReconciliationOutlined
} from "@ant-design/icons";
import routes from "../../routes";
import "./style.css";

function DefaultLayout() {
  //khai bao
  const { Header, Sider, Content, Footer } = Layout;
  const { SubMenu } = Menu;

  const [open, setOpen] = useState(false);

  //routes
  const showContentMenu = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={route.main()}
            exact={route.exact}
          ></Route>
        );
      });
    }
    return result;
  };
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  //dang nhap
  const navigate = useNavigate();
  useEffect(() => {
    const loginInfo = localStorage.getItem("loginInfo");
    if (!loginInfo) {
      navigate("/login")
    }
  }, []);

  //dang xuat
  const logout = () => {
    localStorage.removeItem("loginInfo");
    navigate("/login");
  };

  //dropdownlist
  // function menu(listMenu) {
  //   return (
  //     <Menu>
  //       {listMenu.map((item, index) => (
  //         <Menu.Item onClick={item.onClick} key={index}>
  //           {item.title}
  //         </Menu.Item>
  //       ))}
  //     </Menu>
  //   );
  // }

  const items = [
    { key: 1, onClick: logout, label: "Đăng xuất" },
  ];


  const handleCancel = () => {
    setOpen(false);
  }

  const loginInfo = localStorage.getItem("loginInfo");


  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} width={250} collapsible collapsed={collapsed}>
          <div className="logo">
            <NavLink to="">
              <img
                style={{ width: "200px", height: "50px" }}
                src="https://inkythuatso.com/uploads/thumbnails/800/2021/12/coop-mart-logo-inkythuatso-04-11-09-53.jpg"
                alt="logo"
              ></img>
            </NavLink>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <SubMenu
              key="sub1"
              icon={<ReconciliationOutlined/>}
              title="Nghiệp vụ quản lý bán hàng"
            >
              <Menu.Item icon={<ShopOutlined />}>
                <NavLink to="/product">Quản lý mặt hàng</NavLink>
              </Menu.Item>
              <Menu.Item icon={<ShopOutlined />}>
                <NavLink to="/category">Quản lý loại mặt hàng</NavLink>
              </Menu.Item>
              <Menu.Item icon={<ShopOutlined />}>
                <NavLink to="/promotion">
                  Quản lý CTKM
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
            key="sub2"
            icon={<SmileOutlined/>}
            title="Chức năng của quản lý"
            >
            <Menu.Item icon={<UserOutlined />}>
              <NavLink to="/employee">
                Quản lý nhân viên
              </NavLink>
            </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<ReconciliationOutlined/>}
              title="Nghiệp vụ thu ngân"
            >
              <Menu.Item icon={<UserOutlined />}>
                <NavLink to="/customer">
                  Quản lý khách hàng
                </NavLink>
              </Menu.Item>
              <Menu.Item icon={<SolutionOutlined />}>
                <NavLink to="/bill">
                  Quản lý hóa đơn
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              icon={<ReconciliationOutlined/>}
              title="Nghiệp vụ thủ kho"
            >
              <Menu.Item icon={<TeamOutlined />}>
                <NavLink to="/supplier">
                  Quản lý NCC
                </NavLink>
              </Menu.Item>
              <Menu.Item icon={< ShoppingCartOutlined />}>
                <NavLink to="/order">
                  Quản lý đơn hàng NCC
                </NavLink>
              </Menu.Item>
              <Menu.Item icon={<SolutionOutlined />}>
                <NavLink to="/receipt">
                  Quản lý phiếu nhập
                </NavLink>
              </Menu.Item>
              <Menu.Item icon={<SolutionOutlined />}>
                <NavLink to="/inventory">
                  Quản lý phiếu kiểm kho
                </NavLink>
              </Menu.Item>
            </SubMenu>
            {
              loginInfo['role'] == "admin" ?
                <Menu.Item icon={<SolutionOutlined />}>
                  <NavLink to="/account">
                    Quản lý tài khoản
                  </NavLink>
                </Menu.Item> : ""
            }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
              <Col span={1} offset={1}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    style: { fontSize: "20px" },
                    onClick: toggle,
                  }
                )}
              </Col>
              <Col span={6} offset={16}>
                <Row>
                  <Col span={24}>
                    <div>
                      <Row>
                        <Col span={24}>
                          <Dropdown menu={{ items }}>
                            <Avatar src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" />
                          </Dropdown>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>{showContentMenu(routes)}</Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>Create By group 3</Footer>
        </Layout>
      </Layout>
      <Modal
        open={open}
        onCancel={handleCancel}
        title="Thông báo"
      >
        <h2 style={{ color: "red" }}>Bạn không được cấp quyền quản lý này</h2>
      </Modal>


    </>
  );
}

export default DefaultLayout