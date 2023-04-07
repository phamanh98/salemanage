import React, { useState, useEffect } from "react";
import employeeService from "./../../../Service/employeeService";
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
  DatePicker,
  Select,
  notification
} from "antd";
import { CheckOutlined} from "@ant-design/icons";
import { ExportCSV } from "../../Common/ExportExcel";



const Employee = (props) => {

    
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ tên NV",
      dataIndex: "HoTenNV",
      key: "HoTenNV",
    },
    {
        title: "Giới Tính",
        dataIndex: "GioiTinh",
        key: "GioiTinh",
      },
    {
      title: "CCCD",
      dataIndex: "CCCD",
      key: "CCCD",
    },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      key: "NgaySinh",
    },
    {
        title: "Chức vụ",
        dataIndex: "ChucVu",
        key: "ChucVu",
      },
      {
        title: "Địa chỉ",
        dataIndex: "DiaChi",
        key: "DiaChi",
      },
      {
        title: "Số ĐT",
        dataIndex: "SoDT",
        key: "SoDT",
      },
      {
        title: "Email",
        dataIndex: "Email",
        key: "Email",
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
  const [dataEmployee, setDataEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataEmployee();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataEmployee = () => {
   employeeService.getAllEmployee().then((res) => {
      console.log(res);
      setDataEmployee(res);
    });
  };

  const editData = (id) => {
    employeeService.getIdEmployee(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
        HoTenNV: res.HoTenNV,
        GioiTinh: res.GioiTinh,
        CCCD: res.CCCD,
        NgaySinh: res.NgaySinh,
        ChucVu: res.ChucVu,
        DiaChi: res.DiaChi,
        SoDT: res.SoDT,
        Email: res.Email
      });
    });
    setOpen(true);
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataEmployee.length + 1,
    });
    setOpen(true);
    loadDataEmployee();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataEmployee.findIndex((item) => item.id === values.id);

    if (index != -1) {
      employeeService.updateEmployee(values.id, values).then((res) => {
        loadDataEmployee();
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
        HoTenNV: values.HoTenNV,
        GioiTinh: values.GioiTinh,
        CCCD: values.CCCD,
        NgaySinh: values.NgaySinh,
        ChucVu: values.ChucVu,
        DiaChi : values.DiaChi,
        SoDT: values.SoDT,
        Email: values.Email
      };
      employeeService.createEmployee(params).then((res) => {
        loadDataEmployee();
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
    employeeService.deleteEmployee(id).then((res) => {
      loadDataEmployee();
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
    return dataEmployee.filter((ele) => ele.name.search(rex) >= 0);
  };
  const searchTable = (searchValue) => {
    setDataEmployee(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
            <ExportCSV csvData={dataEmployee} fileName="danhsachNV"/>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
          Thêm nhân viên
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading} >
                <Table columns={columns} dataSource={dataEmployee} />
            </Spin>
        </Col>
    </Row>
        <Modal
          open={open}
          onCancel={handleCancel}
          title="Thông tin nhân viên"
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
             <Form.Item name="HoTenNV" label="Họ tên NV" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="HoTenNV"
              label="HoTenNV"
            >
              <Input />
            </Form.Item>
            <Form.Item name="HoTenNV" label="Họ tên NV" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="GioiTinh"
              label="Giới tính"
            >
              <Select 
              style={{ width: 120 }}
              defaultValue="nam"
              >
                  <option key="0" value="nam">Nam</option>
                  <option key="1" value="nu">Nữ</option>
                </Select>
            </Form.Item>
            <Form.Item
              name="CCCD"
              label="CCCD"
            >
               <Input />
            </Form.Item>
            <Form.Item
              name="Ngaysinh"
              label="Ngày sinh"
            >
               <DatePicker/>
            </Form.Item>
            <Form.Item
              name="ChucVu"
              label="Chức vụ"
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="DiaChi"
              label="Địa chỉ"
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="SoDT"
              label="Số DT"
            >
                <Input/>
            </Form.Item>
            <Form.Item
              name="Email"
              label="Email"
            >
                <Input/>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default Employee;
