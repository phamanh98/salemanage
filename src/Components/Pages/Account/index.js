import React, { useState, useEffect } from "react";
import accountService from "./../../../Service/accountService";
import {
  Table,
  Tag,
  Upload,
  Space,
  Popconfirm,
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Spin,
  Row,
  Col,
  Select,
  notification
} from "antd";
import { CheckOutlined} from "@ant-design/icons";
import { ExportCSV } from "../../Common/ExportExcel";




const Account = (props) => {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
        title: "Tình trạng",
        dataIndex: "TinhTrang",
        key: "TinhTrang",
      },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => editData(record.id)}>Sửa</Button>

          <Popconfirm
            title="Bạn có chắc muốn xóa ?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [formModal] = Form.useForm();
  const [searchValue, setSearchValue] = useState("");
  const [dataAccount, setDataAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataAccount();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataAccount = () => {
   accountService.getAllAccount().then((res) => {
      console.log(res);
      setDataAccount(res);
    });
  };

  const editData = (id) => {
    accountService.getIdAccount(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
        username: res.username,
        TinhTrang: res.TinhTrang
      });
    });
    setOpen(true);
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataAccount.length + 1,
    });
    setOpen(true);
    loadDataAccount();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataAccount.findIndex((item) => item.id === values.id);

    if (index != -1) {
      accountService.updateAccount(values.id, values).then((res) => {
        loadDataAccount();
        notification.open({
          message: `Sửa thành công`,
          placement: "topRight",
          icon: <CheckOutlined style={{ color: "green" }} />,
          style: { zIndex: "10000000" },
        });
        return;
      });
    } else {
      const params = {
        id: values.id,
        username: values.username,
        TinhTrang: values.TinhTrang
      };
      accountService.createAccount(params).then((res) => {
        loadDataAccount();
        notification.open({
          message: `Thêm thành công`,
          placement: "topRight",
          icon: <CheckOutlined style={{ color: "green" }} />,
          style: { zIndex: "10000000" },
        });
        return;
      });
    }
    handleCancel();
  };

  const handleDelete = (id) => {
   accountService.deleteAccount(id).then((res) => {
    loadDataAccount();
    notification.open({
      message: `Xóa thành công`,
      placement: "topRight",
      icon: <CheckOutlined style={{ color: "green" }} />,
      style: { zIndex: "10000000" },
    });
    return;
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };

  //search resolve
  const FindAll = (key) => {
    const rex = new RegExp(key, "i");
    return dataAccount.filter((ele) => ele.name.search(rex) >= 0);
  };
  const searchTable = (searchValue) => {
    setDataAccount(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
            <ExportCSV csvData={dataAccount} fileName="danhsachTK"/>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
          Thêm tài khoản mới
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading} >
                <Table columns={columns} dataSource={dataAccount} />
            </Spin>
        </Col>
    </Row>
        <Modal
          open={open}
          onCancel={handleCancel}
          title="Thông tin tài khoản"
          footer={
            <Button type="primary" htmlType="submit" form="formModal">
              Lưu
            </Button>
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={formModal}
            name="formModal"
            onFinish={onFinish}
          >
            <Form.Item name="id" label="ID" rules={[{ required: true }]}>
              <Input disabled />
            </Form.Item>

            <Form.Item name="username" label="User Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="TinhTrang" label="Tình Trạng" rules={[{ required: true }]}>
            <Select 
              style={{ width: 120 }} defaultValue="active">
                <option key="0" value="active">Hoạt động</option>
                <option key="1" value="blocked">Khóa</option>
                </Select>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default Account;
