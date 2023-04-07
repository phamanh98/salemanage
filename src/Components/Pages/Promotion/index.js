import React, { useState, useEffect } from "react";
import promotionService from "./../../../Service/promotionService";
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



const Promotion = (props) => {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên CTKM",
      dataIndex: "TenCTKM",
      key: "TenCTKM",
    },
    {
        title: "Ngày bắt đầu",
        dataIndex: "NgayBD",
        key: "NgayBD",
      },
      {
        title: "Ngày kết thúc",
        dataIndex: "NgayKT",
        key: "NgayKT",
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
  const [dataPromotion, setDataPromotion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataPromotion();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataPromotion = () => {
   promotionService.getAllPromotion().then((res) => {
      console.log(res);
      setDataPromotion(res);
    });
  };

  const editData = (id) => {
    promotionService.getIdPromotion(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
        TenCTKM: res.TenCTKM,
        NgayBD: res.NgayBD != true ? null : (res.NgayBD._d).toJson(),
        NgayKT: res.NgayKT != true ? null : (res.NgayKT._d).toJson(),
      });
    });
    setOpen(true);
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataPromotion.length + 1,
    });
    setOpen(true);
    loadDataPromotion();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataPromotion.findIndex((item) => item.id === values.id);

    if (index != -1) {
      promotionService.updatePromotion(values.id, values).then((res) => {
        loadDataPromotion();
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
        TenCTKM: values.TenCTKM,
        NgayBD: values.NgayBD,
        NgayKT: values.NgayKT
      };
      promotionService.createPromotion(params).then((res) => {
        loadDataPromotion();
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
    promotionService.deletePromotion(id).then((res) => {
      loadDataPromotion();
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
    return dataPromotion.filter((ele) => ele.name.search(rex) >= 0);
  };
  const searchTable = (searchValue) => {
    setDataPromotion(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
            <ExportCSV csvData={dataPromotion} fileName="danhsachCTKM"/>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
          Thêm CTKM
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading} >
                <Table columns={columns} dataSource={dataPromotion} />
            </Spin>
        </Col>
    </Row>
        <Modal
          open={open}
          onCancel={handleCancel}
          title="Thông tin khuyến mãi"
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

            <Form.Item name="TenCTKM" label="Tên CTKM" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="NgayBD" label="Ngày bắt đầu" rules={[{ required: true }]}>
              <DatePicker/>
            </Form.Item>
            <Form.Item name="NgayKT" label="Ngày kết thúc" rules={[{ required: true }]}>
              <DatePicker/>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default Promotion;
