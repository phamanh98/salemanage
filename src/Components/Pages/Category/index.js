import React, { useState, useEffect } from "react";
import categoryService from "./../../../Service/categoryService";
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




const Category = (props) => {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên LMH",
      dataIndex: "TenLMH",
      key: "TenLMH",
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
  const [dataCategory, setDataCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataCategory();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataCategory = () => {
   categoryService.getAllCategories().then((res) => {
      console.log(res);
      setDataCategory(res);
    });
  };

  const editData = (id) => {
    categoryService.getIdCategory(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
        TenLMH: res.TenLMH,
      });
    });
    setOpen(true);
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataCategory.length + 1,
    });
    setOpen(true);
    loadDataCategory();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataCategory.findIndex((item) => item.id === values.id);

    if (index != -1) {
      categoryService.updateCategory(values.id, values).then((res) => {
        loadDataCategory();
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
        TenMH: values.TenLMH,
      };
      categoryService.createCategory(params).then((res) => {
        loadDataCategory();
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
    categoryService.deleteCategory(id).then((res) => {
      loadDataCategory();
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
    return dataCategory.filter((ele) => ele.name.search(rex) >= 0);
  };
  
  const searchTable = (searchValue) => {
    setDataCategory(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
          <Form.Item name="search" label="Search">
            <Input onChange={(e) => setSearchValue(e.target.value)} />
          </Form.Item>
          <Button type="primary" onClick={() => searchTable(searchValue)}>
            Tìm kiếm
          </Button>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
          Thêm loại sản phẩm
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading} >
                <Table columns={columns} dataSource={dataCategory} />
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

            <Form.Item name="TenLMH" label="Tên LMH" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default Category;
