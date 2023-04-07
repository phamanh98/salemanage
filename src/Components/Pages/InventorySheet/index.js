import React, { useState, useEffect } from "react";
import inventorySheetService from "../../../Service/inventorySheetService";
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



const InventorySheet = (props) => {

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
        title: "Tình trạng",
        dataIndex: "TinhTrang",
        key: "TinhTrang",
      },
      {
        title: "Số lượng tồn",
        dataIndex: "SoLuongTon",
        key: "SoLuongTon",
      },
      {
        title: "Ngày kiểm",
        dataIndex: "NgayKiem",
        key: "NgayKiem",
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
  const [dataInventorySheet, setDataInventorySheet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadDataInventorySheet();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const loadDataInventorySheet = () => {
  inventorySheetService.getAllInventorySheet().then((res) => {
      console.log(res);
      setDataInventorySheet(res);
    });
  };

  const editData = (id) => {
    inventorySheetService.getIdInventorySheet(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
       TenMH: res.TenMH,
       TinhTrang: res.TinhTrang,
       SoLuongTon: res.SoLuongTon,
       NgayKiem: res.NgayKiem != true ? null : (res.NgayKiem._d).toJson(),
      });
    });
    setOpen(true);
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataInventorySheet.length + 1,
    });
    setOpen(true);
    loadDataInventorySheet();
  };

  const onFinish = (values) => {
    console.log(values);
    const index = dataInventorySheet.findIndex((item) => item.id === values.id);

    if (index != -1) {
      inventorySheetService.updateInventorySheet(values.id, values).then((res) => {
        loadDataInventorySheet();
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
        TinhTrang: values.TinhTrang,
        SoLuongTon: values.SoLuongTon,
        NgayKiem: values.NgayKiem
      };
      inventorySheetService.createReceipt(params).then((res) => {
        loadDataInventorySheet();
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
    inventorySheetService.deleteInventorySheet(id).then((res) => {
      loadDataInventorySheet();
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
    return dataInventorySheet.filter((ele) => ele.name.search(rex) >= 0);
  };

  const searchTable = (searchValue) => {
    setDataInventorySheet(FindAll(searchValue));
  };
 
  return (
    <>
    <Row>
        <Col span={8}>
        <div className="search">
            <ExportCSV csvData={dataInventorySheet} fileName="danhsachPKK"/>
        </div>
        </Col>
        <Col span={8} offset={8}>
        <Button type="primary" onClick={createPeople}>
          Thêm phiếu kiểm kho
        </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Spin spinning={isLoading} >
                <Table columns={columns} dataSource={dataInventorySheet} />
            </Spin>
        </Col>
    </Row>
        <Modal
          open={open}
          onCancel={handleCancel}
          title="Thông tin phiếu kiểm kho"
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
            <Form.Item name="TinhTrang" label="Tình trạng">
              <InputNumber/>
            </Form.Item>
            <Form.Item name="SoLuongTon" label="Số lượng tồn" rules={[{ required: true }]}>
              <InputNumber/>
            </Form.Item>
            <Form.Item name="NgayKiem" label="Ngày kiểm" rules={[{ required: true }]}>
              <DatePicker/>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default InventorySheet;
