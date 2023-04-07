import React, { useState, useEffect } from "react";
import customerService from "./../../../Service/customerService";
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



const Customer = (props) => {

    
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ tên KH",
      dataIndex: "HoTenKH",
      key: "HoTenKH",
    },
    {
        title: "Giới Tính",
        dataIndex: "GioiTinh",
        key: "GioiTinh",
      },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      key: "NgaySinh",
    },
    {
        title: "Thành viên",
        dataIndex: "LoaiThanhVien",
        key: "LoaiThanhVien",
      },
      {
        title: "Địa chỉ",
        dataIndex: "DiaChi",
        key: "DiaChi",
      },
      {
        title: "Email",
        dataIndex: "Email",
        key: "Email",
      },
      {
        title: "Số DT",
        dataIndex: "SoDT",
        key: "SoDT",
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
  const [dataCustomer, setDataCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataCustomer();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataCustomer = () => {
   customerService.getAllCustomer().then((res) => {
      console.log(res);
      setDataCustomer(res);
    });
  };

  const editData = (id) => {
    customerService.getIdCustomer(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
        HoTenKH: res.HoTenKH,
        GioiTinh: res.GioiTinh,
        Ngaysinh: res.Ngaysinh,
        LoaiThanhVien: res.LoaiThanhVien,
        DiaChi: res.DiaChi,
        Email: res.Email,
        SoDT: res.SoDT,
      });
    });
    setOpen(true);
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataCustomer.length + 1,
    });
    setOpen(true);
    loadDataCustomer();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataCustomer.findIndex((item) => item.id === values.id);

    if (index != -1) {
      customerService.updateCustomer(values.id, values).then((res) => {
        loadDataCustomer();
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
        Ngaysinh: values.Ngaysinh,
        LoaiThanhVien: values.LoaiThanhVien,
        DiaChi: values.DiaChi,
        Email: values.Email,
        SoDT: values.SoDT,
      };
      customerService.createCustomer(params).then((res) => {
        loadDataCustomer();
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
    customerService.deleteCustomer(id).then((res) => {
        loadDataCustomer();
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
    return dataCustomer.filter((ele) => ele.name.search(rex) >= 0);
  };
  const searchTable = (searchValue) => {
    setDataCustomer(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
            <ExportCSV csvData={dataCustomer} fileName="danhsachKH"/>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
         Thêm khách hàng
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading}>
                <Table columns={columns} dataSource={dataCustomer} />
            </Spin>
        </Col>
    </Row>
        <Modal
          open={open}
          onCancel={handleCancel}
          title="Thông tin khách hàng"
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

            <Form.Item name="HoTenKH" label="Họ tên KH" rules={[{ required: true }]}>
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
              name="Ngaysinh"
              label="Ngày sinh"
            >
               <DatePicker/>
            </Form.Item>
            <Form.Item
              name="LoaiThanhVien"
              label="Thành viên"
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
              name="Email"
              label="Email"
            >
                <Input/>
            </Form.Item>
            <Form.Item
              name="SoDT"
              label="Số DT"
            >
                <Input/>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default Customer;