import React, { useState, useEffect } from "react";
import receiptService from "../../../Service/receiptService";
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
  notification
} from "antd";
import { CheckOutlined} from "@ant-design/icons";
import { ExportCSV } from "../../Common/ExportExcel";



const Receipt = (props) => {

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
        title: "Số lượng nhập",
        dataIndex: "SoLuongNhap",
        key: "SoLuongNhap",
      },
      {
        title: "Giá nhập",
        dataIndex: "GiaNhap",
        key: "GiaNhap",
      },
      {
        title: "Ngày nhập",
        dataIndex: "Ngaynhap",
        key: "Ngaynhap",
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
  const [dataReceipt, setDataReceipt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataReceipt();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataReceipt = () => {
   receiptService.getAllReceipt().then((res) => {
      console.log(res);
      setDataReceipt(res);
    });
  };

  const editData = (id) => {
   receiptService.getIdReceipt(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
       TenMH: res.TenMH,
       SoLuongNhap: res.SoLuongNhap,
       GiaNhap: res.GiaNhap,
       Ngaynhap: res.Ngaynhap != true ? null : (res.Ngaynhap_d).toJson(),
      });
    });
    setOpen(true);
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataReceipt.length + 1,
    });
    setOpen(true);
    loadDataReceipt();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataReceipt.findIndex((item) => item.id === values.id);

    if (index != -1) {
      receiptService.updateReceipt(values.id, values).then((res) => {
        loadDataReceipt();
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
       SoLuongNhap: values.SoLuongNhap,
       GiaNhap: values.GiaNhap,
       Ngaynhap: values.Ngaynhap
      };
      receiptService.createReceipt(params).then((res) => {
        loadDataReceipt();
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
    receiptService.deleteReceipt(id).then((res) => {
        loadDataReceipt();
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
    return dataReceipt.filter((ele) => ele.name.search(rex) >= 0);
  };

  const searchTable = (searchValue) => {
    setDataReceipt(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
            <ExportCSV csvData={dataReceipt} fileName="danhsachPN"/>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
          Thêm phiếu nhập
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading} >
                <Table columns={columns} dataSource={dataReceipt} />
            </Spin>
        </Col>
    </Row>
        <Modal
          open={open}
          onCancel={handleCancel}
          title="Thông tin phiếu nhập"
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
              <Input/>
            </Form.Item>
            <Form.Item name="SoLuongNhap" label="Số lương nhập" rules={[{ required: true }]}>
              <InputNumber/>
            </Form.Item>
            <Form.Item name="GiaNhap" label="Giá nhập" rules={[{ required: true }]}>
              <InputNumber/>
            </Form.Item>
            <Form.Item name="Ngaynhap" label="Ngày nhập" rules={[{ required: true }]}>
              <DatePicker/>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default Receipt;
