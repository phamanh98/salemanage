import React, { useState, useEffect } from "react";
import productService from "./../../../Service/productService";
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
  notification,
} from "antd";
import { CheckOutlined} from "@ant-design/icons";
import { ExportCSV } from "../../Common/ExportExcel";


const Product = (props) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên MH",
      dataIndex: "TenMH",
      key: "TenMH",
    },
    {
        title: "Mô tả",
        dataIndex: "MoTa",
        key: "MoTa",
      },
    {
      title: "HSD",
      dataIndex: "HSD",
      key: "HSD",
    },
    {
      title: "Đơn giá bán",
      dataIndex: "DonGiaBan",
      key: "DonGiaBan",
    },
    {
        title: "Đơn giá nhập",
        dataIndex: "DonGiaNhap",
        key: "DonGiaNhap",
      },
      {
        title: "Chiết khấu",
        dataIndex: "ChietKhau",
        key: "ChietKhau",
      },
      {
        title: "Số lượng tồn",
        dataIndex: "SoLuongTon",
        key: "SoLuongTon",
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
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataProduct();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataProduct = () => {
   productService.getAllProducts().then((res) => {
      console.log(res);
      setDataProduct(res);
    });
  };

  function FormatTime(time, prefix = "") {
    var date = Date.parse(time); // returns NaN if it can't parse
    return Number.isNaN(date) ? "" : prefix + date.toLocaleDateString();
}
  const editData = (id) => {
    productService.getIdProduct(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
        TenMH: res.TenMH,
        MoTa: res.MoTa,
        HSD: res.HSD != true ? null : (res.HSD._d).toJson(),
        DonGiaBan: res.DonGiaBan,
        DonGiaNhap: res.DonGiaNhap,
        ChietKhau : res.ChietKhau,
        SoLuongTon: res.SoLuongTon
      });
    });
    setOpen(true);
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataProduct.length + 1,
    });
    setOpen(true);
    loadDataProduct();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataProduct.findIndex((item) => item.id === values.id);

    if (index != -1) {
      productService.updateProduct(values.id, values).then((res) => {
        loadDataProduct();
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
        TenMH: values.TenMH,
        MoTa: values.MoTa,
        HSD: values.HSD,
        DonGiaBan: values.DonGiaBan,
        DonGiaNhap: values.DonGiaNhap,
        ChietKhau : values.ChietKhau,
        SoLuongTon: values.SoLuongTon
      };
      productService.createProduct(params).then((res) => {
        loadDataProduct();
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
    productService.deleteProduct(id).then((res) => {
      loadDataProduct();
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
    return dataProduct.filter((ele) => ele.name.search(rex) >= 0);
  };
  const searchTable = (searchValue) => {
    setDataProduct(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
            <ExportCSV csvData={dataProduct} fileName="danhsachSP"/>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
          Thêm sản phẩm mới
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading} >
                <Table columns={columns} dataSource={dataProduct} />
            </Spin>
        </Col>
    </Row>
        <Modal
          open={open}
          onCancel={handleCancel}
          title="Thông tin mặt hàng"
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

            <Form.Item name="TenMH" label="Tên MH" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="MoTa"
              label="Mô tả"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="HSD"
              label="HSD"
            >
                <DatePicker  format="DD/MM/YYYY"/>
            </Form.Item>
            <Form.Item
              name="DonGiaNhap"
              label="Đơn giá nhập"
            >
               <InputNumber addonAfter={"vnđ"}/>
            </Form.Item>
            <Form.Item
              name="DonGiaBan"
              label="Đơn Giá Bán"
            >
              <InputNumber addonAfter={"vnđ"}/>
            </Form.Item>
            <Form.Item
              name="ChietKhau"
              label="ChietKhau"
            >
              <InputNumber 
               addonAfter={"%"}/>
            </Form.Item>
            <Form.Item
              name="SoLuong"
              label="SoLuong"
            >
              <Input/>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default Product;
