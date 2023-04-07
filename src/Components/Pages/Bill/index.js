import React, { useState, useEffect } from "react";
import billService from "./../../../Service/billService";
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




const Bill = (props) => {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày xuất",
      dataIndex: "NgayXuat",
      key: "NgayXuat",
    },
    {
        title: "Tổng trị giá",
        dataIndex: "TongTriGia",
        key: "TongTriGia",
      },
      {
        title: "PTTT",
        dataIndex: "PTTT",
        key: "PTTT",
      },
      {
        title: "Ghi Chú",
        dataIndex: "GhiChu",
        key: "GhiChu",
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
  const [dataBill, setDataBill] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataBill();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataBill = () => {
   billService.getAllBill().then((res) => {
      console.log(res);
      setDataBill(res);
    });
  };

  const editData = (id) => {
   billService.getIdBill(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
        NgayXuat: res.NgayXuat != true ? null : (res.NgayXuat._d).toJson(),
        TongTriGia: res.TongTriGia,
        PTTT: res.PTTT,
        GhiChu: res.GhiChu
      });
    });
    setOpen(true);
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataBill.length + 1,
    });
    setOpen(true);
    loadDataBill();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataBill.findIndex((item) => item.id === values.id);

    if (index != -1) {
      billService.updateBill(values.id, values).then((res) => {
        loadDataBill();
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
        NgayXuat: values.NgayXuat,
        TongTriGia: values.TongTriGia,
        PTTT: values.PTTT,
        GhiChu: values.GhiChu,
      };
      billService.createBill(params).then((res) => {
        loadDataBill();
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
    billService.deleteBill(id).then((res) => {
      loadDataBill();
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
    return dataBill.filter((ele) => ele.name.search(rex) >= 0);
  };

  const searchTable = (searchValue) => {
    setDataBill(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
            <ExportCSV csvData={dataBill} fileName="danhsachHĐ"/>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
          Thêm hóa đơn mới
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading} >
                <Table columns={columns} dataSource={dataBill} />
            </Spin>
        </Col>
    </Row>
        <Modal
          open={open}
          onCancel={handleCancel}
          title="Thông tin hóa đơn"
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

            <Form.Item name="NgayXuat" label="Ngày xuất" rules={[{ required: true }]}>
              <DatePicker/>
            </Form.Item>
            <Form.Item name="TongTriGia" label="Tổng trị giá" rules={[{ required: true }]}>
              <InputNumber/>
            </Form.Item>
            <Form.Item name="PTTT" label="PTTT" rules={[{ required: true }]}>
              <Select
                 style={{ width: 120 }}
                 defaultValue="money"
              >
                <option key="0" value="money">Tiền mặt</option>
                <option key="1" value="card">Thẻ</option>
                <option key="2" value="wallet">MoMo</option>
                </Select>
            </Form.Item>
            <Form.Item name="GhiChu" label="Ghi chú">
              <Input/>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default Bill;
