import React, { useState, useEffect } from "react";
import orderService from "./../../../Service/orderService";
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



const Order = (props) => {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "NgayDH",
      key: "NgayDH",
    },
    {
        title: "Ngày giao hàng",
        dataIndex: "NgayGH",
        key: "NgayGH",
      },
      {
        title: "Trạng thái",
        dataIndex: "TrangThai",
        key: "TrangThai",
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
  const [dataOrder, setDataOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataOrder();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataOrder = () => {
   orderService.getAllOrder().then((res) => {
      console.log(res);
      setDataOrder(res);
    });
  };

  const editData = (id) => {
    orderService.getIdOrder(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
       NgayDH: res.NgayDH != true ? null : (res.NgayDH._d).toJson(),
       NgayGH: res.NgayGH != true ? null : (res.NgayGH._d).toJson(),
        TrangThai: res.TrangThai
      });
    });
    setOpen(true);
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataOrder.length + 1,
    });
    setOpen(true);
    loadDataOrder();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataOrder.findIndex((item) => item.id === values.id);

    if (index != -1) {
      orderService.updateOrder(values.id, values).then((res) => {
        loadDataOrder();
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
        NgayDH: values.NgayDH,
        NgayGH: values.NgayGH,
        TrangThai: values.TrangThai
      };
      orderService.createOrder(params).then((res) => {
        loadDataOrder();
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
    orderService.deleteOrder(id).then((res) => {
        loadDataOrder();
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
    return dataOrder.filter((ele) => ele.name.search(rex) >= 0);
  };
  const searchTable = (searchValue) => {
    setDataOrder(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
            <ExportCSV csvData={dataOrder} fileName="danhsachDH"/>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
          Thêm đơn đặt hàng
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading} >
                <Table columns={columns} dataSource={dataOrder} />
            </Spin>
        </Col>
    </Row>
        <Modal
          open={open}
          onCancel={handleCancel}
          title="Thông tin loại mặt hàng"
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

            <Form.Item name="NgayDH" label="Ngày đặt hàng" rules={[{ required: true }]}>
              <DatePicker/>
            </Form.Item>
            <Form.Item name="NgayGH" label="Ngày giao hàng" rules={[{ required: true }]}>
              <DatePicker/>
            </Form.Item>
            <Form.Item name="TrangThai" label="Trạng thái" rules={[{ required: true }]}>
            <Select 
              style={{ width: 120 }}
              defaultValue="succes"
              >
                  <option key="0" value="success">Thành công</option>
                  <option key="1" value="fail">Thất bại</option>
                  <option key="2" value="pending">Đang giao</option>
                </Select>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default Order;
