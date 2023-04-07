import React, { useState, useEffect } from "react";
import supplierService from "./../../../Service/supplierService";
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
  DatePickerProps,
  notification
} from "antd";
import { CheckOutlined} from "@ant-design/icons";
import { ExportCSV } from "../../Common/ExportExcel";



const Supplier = (props) => {

    
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên NCC",
      dataIndex: "TenNCC",
      key: "TenNCC",
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
  const [dataSupplier, setDataSupplier] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataSupplier();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataSupplier = () => {
   supplierService.getAllSupplier().then((res) => {
      console.log(res);
      setDataSupplier(res);
    });
  };

  const editData = (id) => {
    supplierService.getIdSupplier(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
       TenNCC: res.TenNCC,
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
      id: dataSupplier.length + 1,
    });
    setOpen(true);
    loadDataSupplier();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataSupplier.findIndex((item) => item.id === values.id);

    if (index != -1) {
      supplierService.updateSupplier(values.id, values).then((res) => {
        loadDataSupplier();
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
        TenNCC: values.TenNCC,
       DiaChi: values.DiaChi,
       SoDT: values.SoDT,
       Email: values.Email
      };
      supplierService.createSupplier(params).then((res) => {
        loadDataSupplier();
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
    supplierService.deleteSupplier(id).then((res) => {
        loadDataSupplier();
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
    return dataSupplier.filter((ele) => ele.name.search(rex) >= 0);
  };
  const searchTable = (searchValue) => {
    setDataSupplier(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
            <ExportCSV csvData={dataSupplier} fileName="danhsachNCC"/>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
          Thêm nhà cung cấp
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading} >
                <Table columns={columns} dataSource={dataSupplier} />
            </Spin>
        </Col>
    </Row>
        <Modal
          open={open}
          onCancel={handleCancel}
          title="Thông tin nhà cung cấp"
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

            <Form.Item name="TenNCC" label="Tên NCC" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="DiaChi"
              label="Địa chỉ"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="SoDT"
              label="Số ĐT"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Email"
              label="Email"
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
          </Form>
        </Modal>
    </>
  );
};
export default Supplier;