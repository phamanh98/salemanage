import { Form, Input, Button, Checkbox, notification } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  CheckOutlined,
  CloseOutlined 
} from "@ant-design/icons";
// import firebase from 'firebase';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "./styles.css";

// // Configure Firebase.
// const config = {
//   apiKey: 'AIzaSyDjiF92aYIaGpNE9Iqcio6iyOGEbht_Ax8',
//   authDomain: 'coopmartsale.firebaseapp.com',
// };
// firebase.initializeApp(config);


function Login() {
  const navigate = useNavigate();

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
 
// // Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'redirect',
//   // We will display Google and Facebook as auth providers.
//   signInSuccessUrl: '/defaultLayout',
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   ]
// };

  // thong bao khi dang nhap
  const onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    switch (name) {
      case "Username":
        setUsername(value);
        break;
      case "Password":
        setPassword(value);
        break;
      default:
    }
  };

  //dang nhap
  const handleSubmit = (e) => {
    e.preventDefault(); //khong hien thi tren duong dan
   if(Username === "quanly" && Password === "quanly" ){
    localStorage.setItem("loginInfo", JSON.stringify({
        username: Username,
        password: Password,
        role : "quanly"
    }))
    navigate("/product");
    notification.open({
        message: `Đăng nhập thành công với quyền quản lý`,
        placement: "topRight",
        icon: <CheckOutlined style={{ color: "green" }} />,
        style: { zIndex: "10000000" },
      });
    return;
   }
   else if (Username === "NVbanhang" && Password === "NVbanhang" ){
    localStorage.setItem("loginInfo", JSON.stringify({
        username: Username,
        password: Password,
        role : "NVbanhang"
    }))
    navigate("/product");
    notification.open({
        message: `Đăng nhập thành công với quyền NV bán hàng`,
        placement: "topRight",
        icon: <CheckOutlined style={{ color: "green" }} />,
        style: { zIndex: "10000000" },
      });
    return;
   }
   else if (Username === "NVthungan" && Password === "NVthungan" ){
    localStorage.setItem("loginInfo", JSON.stringify({
        username: Username,
        password: Password,
        role: "NVthungan"
    }))
    navigate("/bill");
    notification.open({
        message: `Đăng nhập thành công với quyền thu ngân`,
        placement: "topRight",
        icon: <CheckOutlined style={{ color: "green" }} />,
        style: { zIndex: "10000000" },
      });
    return;
   }
   else if (Username === "NVthukho" && Password === "NVthukho" ){
    localStorage.setItem("loginInfo", JSON.stringify({
        username: Username,
        password: Password,
        role: "NVthukho"
    }))
    navigate("/order");
    notification.open({
        message: `Đăng nhập thành công với quyền thủ kho`,
        placement: "topRight",
        icon: <CheckOutlined style={{ color: "green" }} />,
        style: { zIndex: "10000000" },
      });
    return;
   }
   else if (Username === "admin" && Password === "admin" ){
    localStorage.setItem("loginInfo", JSON.stringify({
        username: Username,
        password: Password,
        role: "admin"
    }))
    navigate("/account");
    notification.open({
        message: `Đăng nhập thành công với quyền admin`,
        placement: "topRight",
        icon: <CheckOutlined style={{ color: "green" }} />,
        style: { zIndex: "10000000" },
      });
    return;
   }
   else {
    return notification.info({
        message: `Đăng nhập thất bại `,
        description: "Sai tài khoản hoặc mật khẩu",
        placement: "topRight",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
   }
  };

  useEffect(() => {
    const loginInfo = localStorage.getItem("loginInfo");
    if(!loginInfo){
      navigate("/login")
    }
  }, []);


  return (
    <>
      <div className="login">
        <div className="container">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="Username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                name="Username"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              name="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                name="Password"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
               Quên mật khẩu
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handleSubmit}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> */}
    </>
  );
}

export default Login;


