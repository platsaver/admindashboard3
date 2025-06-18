import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Typography,
  Drawer,
  Descriptions,
  Space,
  Form,
  Input as FormInput,
  Modal,
  Pagination,
} from "antd";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { SearchOutlined } from "@ant-design/icons";
import {useTranslation } from "react-i18next";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const { Title } = Typography;

const initialPartnerData = [
  {
    key: "1",
    name: "TechCorp Hanoi",
    contact: "contact@techcorp.vn",
    location: "Hà Nội",
    coordinates: [21.0285, 105.8542],
  },
  {
    key: "2",
    name: "GreenSolutions HCMC",
    contact: "info@greensolutions.vn",
    location: "Hồ Chí Minh",
    coordinates: [10.7769, 106.7009],
  },
  {
    key: "3",
    name: "BlueWave Danang",
    contact: "support@bluewave.vn",
    location: "Đà Nẵng",
    coordinates: [16.0544, 108.2022],
  },
];

function PartnersDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [addPartnerDrawerVisible, setAddPartnerDrawerVisible] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isEditingPartner, setIsEditingPartner] = useState(false);
  const [deletePartnerModalVisible, setDeletePartnerModalVisible] = useState(false);
  const [data, setData] = useState(initialPartnerData);
  const [searchText, setSearchText] = useState("");
  const [partnerForm] = Form.useForm();
  const [addPartnerForm] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const {t} = useTranslation();

  const columns = [
    {
      title: t('partner'),
      dataIndex: "name",
      key: "name",
      width: "35%",
      render: (text) => (
        <div className="avatar-info">
          <Title level={5}>{text}</Title>
        </div>
      ),
    },
    {
      title: t('email'),
      dataIndex: "contact",
      key: "contact",
      width: "35%",
    },
    {
      title: t('address'),
      dataIndex: "location",
      key: "location",
      width: "30%",
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleRowClick = (record) => {
    setSelectedPartner(record);
    setDrawerVisible(true);
    setIsEditingPartner(false);
    partnerForm.setFieldsValue(record);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedPartner(null);
    setIsEditingPartner(false);
    partnerForm.resetFields();
  };

  const handleAddPartnerDrawer = () => {
    setAddPartnerDrawerVisible(true);
    addPartnerForm.resetFields();
  };

  const handleCloseAddPartnerDrawer = () => {
    setAddPartnerDrawerVisible(false);
    addPartnerForm.resetFields();
  };

  const handleEditPartner = () => {
    setIsEditingPartner(true);
    partnerForm.setFieldsValue(selectedPartner);
  };

  const handleSavePartner = () => {
    partnerForm.validateFields().then((values) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.key === selectedPartner.key ? { ...item, ...values } : item
        )
      );
      setSelectedPartner((prev) => ({ ...prev, ...values }));
      setIsEditingPartner(false);
      setDrawerVisible(false);
      partnerForm.resetFields();
    }).catch((error) => {
      console.log("Validation failed:", error);
    });
  };

  const handleAddPartner = () => {
    addPartnerForm.validateFields().then((values) => {
      const newPartner = {
        ...values,
        key: Date.now().toString(),
        coordinates: [21.0285, 105.8542],
      };
      setData((prevData) => [...prevData, newPartner]);
      setAddPartnerDrawerVisible(false);
      addPartnerForm.resetFields();
      setCurrentPage(1);
    }).catch((error) => {
      console.log("Validation failed:", error);
    });
  };

  const handleDeletePartner = () => {
    setData((prevData) =>
      prevData.filter((item) => item.key !== selectedPartner.key)
    );
    setDeletePartnerModalVisible(false);
    setDrawerVisible(false);
    setSelectedPartner(null);
    setCurrentPage(1);
  };

  const showDeletePartnerModal = () => {
    setDeletePartnerModalVisible(true);
  };

  const filteredData = data.filter((partner) => {
    const query = searchText.toLowerCase();
    return (
      partner.name.toLowerCase().includes(query) ||
      partner.contact.toLowerCase().includes(query) ||
      partner.location.toLowerCase().includes(query)
    );
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="tabled">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card
            className="criclebox tablespace mb-24"
            title={t('partner')}
            extra={
              <Space>
                <FormInput
                  placeholder={t('partnerSearch')}
                  prefix={<SearchOutlined />}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: "100%", maxWidth: "200px" }}
                />
                <Button
                  type="primary"
                  onClick={handleAddPartnerDrawer}
                  style={{ backgroundColor: "green" }}
                >
                  {t('add')}
                </Button>
              </Space>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={paginatedData}
                pagination={false}
                className="ant-border-space"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
                scroll={{ x: 400 }} // Ensure horizontal scroll on small screens
              />
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredData.length}
                onChange={handlePageChange}
                showSizeChanger
                pageSizeOptions={["5", "10", "20"]}
                style={{ marginTop: 16, textAlign: "center", paddingBottom: 10 }}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card className="criclebox mb-24" title={t('partnerLocation')}>
            <div style={{ height: "500px", minHeight: "300px" }}>
              {isClient ? (
                <MapContainer
                  center={[16.0471, 108.2062]}
                  zoom={6}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredData.map((partner) => (
                    <Marker key={partner.key} position={partner.coordinates}>
                      <Popup>
                        <b>{partner.name}</b>
                        <br />
                        {partner.location}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <div>{t('mapLoading')}</div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
      <Drawer
        title={isEditingPartner ? t('editPartnerTitle') : selectedPartner?.name || t('partnerDetails')}
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        height={isEditingPartner ? "80%" : "50%"}
      >
        {selectedPartner && !isEditingPartner && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label={t('partnerName')}>{selectedPartner.name}</Descriptions.Item>
              <Descriptions.Item label={t('partnerContact')}>{selectedPartner.contact}</Descriptions.Item>
              <Descriptions.Item label={t('partnerLocation')}>{selectedPartner.location}</Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={handleEditPartner}
              style={{ marginBottom: "8px", width: "100%" }}
            >
              {t('edit')}
            </Button>
            <Button type="primary" danger onClick={showDeletePartnerModal} style={{ width: "100%" }}>
              {t('delete')}
            </Button>
          </div>
        )}
        {isEditingPartner && (
          <Form
            form={partnerForm}
            layout="vertical"
            onFinish={handleSavePartner}
            initialValues={selectedPartner}
          >
            <Form.Item
              name="name"
              label={t('partnerName')}
              rules={[{ required: true, message: t('partnerNameWarning') }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="contact"
              label={t('partnerContact')}
              rules={[{ required: true, message: t('partnerContactWarning') }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="location"
              label={t('partnerLocation')}
              rules={[{ required: true, message: t('partnerAddressWarning') }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item>
              <Space style={{ width: "100%" }}>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  {t('save')}
                </Button>
                <Button onClick={handleCloseDrawer} style={{ width: "100%" }}>
                  {t('cancel')}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Drawer>
      <Drawer
        title={t('addPartnerTitle')}  
        placement="right"
        onClose={handleCloseAddPartnerDrawer}
        open={addPartnerDrawerVisible}
        height="60%"
      >
        <Form
          form={addPartnerForm}
          layout="vertical"
          onFinish={handleAddPartner}
        >
            <Form.Item
              name="name"
              label={t('partnerName')}
              rules={[{ required: true, message: t('partnerNameWarning') }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="contact"
              label={t('partnerContact')}
              rules={[{ required: true, message: t('partnerContactWarning') }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="location"
              label={t('partnerLocation')}
              rules={[{ required: true, message: t('partnerAddressWarning') }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item>
              <Space style={{ width: "100%" }}>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  {t('save')}
                </Button>
                <Button onClick={handleCloseDrawer} style={{ width: "100%" }}>
                  {t('cancel')}
                </Button>
              </Space>
            </Form.Item>
          <Form.Item>
            <Space style={{ width: "100%" }}>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                {t('save')}
              </Button>
              <Button onClick={handleCloseAddPartnerDrawer} style={{ width: "100%" }}>
                {t('cancel')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        title={t('deleteTitle')}
        open={deletePartnerModalVisible}
        onOk={handleDeletePartner}
        onCancel={() => setDeletePartnerModalVisible(false)}
        okText={t('delete')}
        cancelText={t('cancel')}
        okType="danger"
        centered
      >
        <p>{t('deleteWarning', { partnerName: selectedPartner?.name })}</p>
      </Modal>
    </div>
  );
}

export default PartnersDashboard;