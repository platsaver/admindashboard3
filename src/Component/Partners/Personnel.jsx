import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Input,
  Space,
  Tag,
  Drawer,
  Descriptions,
  Form,
  Input as FormInput,
  Select,
  Modal,
} from 'antd';
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const PersonnelList = () => {
  const { t } = useTranslation();
  const [personnelData, setPersonnelData] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();

  const initialPersonnel = [
  {
      key: '1',
      name: 'Nguyen Van A',
      role: t('Manager'),
      email: 'nguyen.a@techcorp.vn',
      status: 'Active',
      partner: 'TechCorp Hanoi',
    },
    {
      key: '2',
      name: 'Tran Thi B',
      role: t('Developer'),
      email: 'tran.b@techcorp.vn',
      status: 'Active',
      partner: 'TechCorp Hanoi',
    },
    {
      key: '3',
      name: 'Le Minh C',
      role: t('Consultant'),
      email: 'le.c@greensolutions.vn',
      status: 'Active',
      partner: 'GreenSolutions HCMC',
    },
    {
      key: '4',
      name: 'Pham D',
      role: t('Analyst'),
      email: 'pham.d@greensolutions.vn',
      status: 'Inactive',
      partner: 'GreenSolutions HCMC',
    },
    {
      key: '5',
      name: 'Hoang E',
      role: t('LogisticsManager'),
      email: 'hoang.e@bluewave.vn',
      status: 'Active',
      partner: 'BlueWave Danang',
    },
  ];
  useEffect(() => {
    setPersonnelData(initialPersonnel);
  }, []);

  const columns = [
    {
      title: t('personnelName'),
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('personnelRole'),
      dataIndex: 'role',
      key: 'role',
      width: '20%',
    },
    {
      title: t('personnelEmail'),
      dataIndex: 'email',
      key: 'email',
      width: '25%',
    },
    {
      title: t('personnelStatus'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {t(`personnel${status}`)}
        </Tag>
      ),
      filters: [
        { text: t('personnelActive'), value: 'Active' },
        { text: t('personnelInactive'), value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: t('personnelPartner'),
      dataIndex: 'partner',
      key: 'partner',
      width: '20%',
      filters: [
        { text: t('personnel.filters.partner.techCorpHanoi'), value: 'TechCorp Hanoi' },
        { text: t('personnel.filters.partner.greenSolutionsHCMC'), value: 'GreenSolutions HCMC' },
        { text: t('personnel.filters.partner.blueWaveDanang'), value: 'BlueWave Danang' },
      ],
      onFilter: (value, record) => record.partner === value,
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleRowClick = (record) => {
    setSelectedPersonnel(record);
    setDrawerVisible(true);
    setIsEditing(false);
    setIsAdding(false);
    form.setFieldsValue(record);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedPersonnel(null);
    setIsEditing(false);
    setIsAdding(false);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setIsAdding(false);
    form.setFieldsValue(record);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedPersonnel(null);
    setDrawerVisible(true);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (isAdding) {
        const newPersonnel = {
          key: Date.now().toString(),
          ...values,
        };
        setPersonnelData((prevData) => [...prevData, newPersonnel]);
      } else {
        setPersonnelData((prevData) =>
          prevData.map((item) =>
            item.key === selectedPersonnel.key ? { ...item, ...values } : item
          )
        );
        setSelectedPersonnel({ ...selectedPersonnel, ...values });
      }
      setIsEditing(false);
      setIsAdding(false);
      setDrawerVisible(false);
      form.resetFields();
    }).catch((error) => {
      console.log('Validation failed:', error);
    });
  };

  const handleDelete = () => {
    setPersonnelData((prevData) =>
      prevData.filter((item) => item.key !== selectedPersonnel.key)
    );
    setDeleteModalVisible(false);
    setDrawerVisible(false);
    setSelectedPersonnel(null);
    setCurrentPage(1);
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const filteredPersonnel = personnelData
    ? personnelData.filter((person) => {
        const matchesStatus =
          filterStatus === 'all' || person.status === filterStatus;
        const matchesSearch = person.name
          .toLowerCase()
          .includes(searchText.toLowerCase());
        return matchesStatus && matchesSearch;
      })
    : [];

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="tabled">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            className="criclebox tablespace mb-24 rounded-lg bg-white"
            title={t('personnelList')}
            style={{ border: '1px solid #e8e8e8' }}
            extra={
              <Space direction="horizontal" style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <Button
                  type="primary"
                  onClick={handleAddNew}
                  style={{ backgroundColor: 'green', whiteSpace: 'nowrap' }}
                >
                  {t('addPersonnel')}
                </Button>
                <Select
                  defaultValue="all"
                  style={{ width: 100, minWidth: '100px', whiteSpace: 'nowrap' }}
                  onChange={(value) => {
                    setFilterStatus(value);
                    setCurrentPage(1);
                  }}
                >
                  <Option value="all">{t('personnelAllOption')}</Option>
                  <Option value="Active">{t('personnelActiveOption')}</Option>
                  <Option value="Inactive">{t('personnelInactiveOption')}</Option>
                </Select>
                <Input
                  placeholder={t('searchPersonnel')}
                  prefix={<SearchOutlined />}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: '100%', maxWidth: '200px', whiteSpace: 'nowrap' }}
                />
              </Space>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredPersonnel}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: filteredPersonnel.length,
                  onChange: handlePaginationChange,
                  showSizeChanger: true,
                  pageSizeOptions: ['5', '10', '20'],
                }}
                className="ant-border-space"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
                scroll={{ x: 500 }}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Drawer
        title={
          isAdding
            ? t('addPersonnel')
            : isEditing
            ? t('editPersonnel')
            : selectedPersonnel?.name || t('personnelDetails')
        }
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        height={isEditing || isAdding ? '80%' : '50%'}
      >
        {selectedPersonnel && !isEditing && !isAdding && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label={t('personnelName')}>
                {selectedPersonnel.name}
              </Descriptions.Item>
              <Descriptions.Item label={t('personnelRole')}>
                {selectedPersonnel.role}
              </Descriptions.Item>
              <Descriptions.Item label={t('personnelEmail')}>
                {selectedPersonnel.email}
              </Descriptions.Item>
              <Descriptions.Item label={t('personnelStatus')}>
                <Tag color={selectedPersonnel.status === 'Active' ? 'green' : 'red'}>
                  {t(`personnel${selectedPersonnel.status}`)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('personnelPartner')}>
                {selectedPersonnel.partner}
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={() => handleEdit(selectedPersonnel)}
              style={{ marginBottom: '8px', width: '100%' }}
            >
              {t('editPersonnel')}
            </Button>
            <Button
              type="primary"
              danger
              onClick={showDeleteModal}
              style={{ width: '100%' }}
            >
              {t('deletePersonnel')}
            </Button>
          </div>
        )}
        {(isEditing || isAdding) && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={isAdding ? {} : selectedPersonnel}
          >
            <Form.Item
              name="name"
              label={t('personnelName')}
              rules={[{ required: true, message: t('personnelNameWarning') }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="role"
              label={t('personnelRole')}
              rules={[{ required: true, message: t('personnelRoleWarning') }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="email"
              label={t('personnelEmail')}
              rules={[
                { required: true, message: t('personnelEmailWarning') },
                { type: 'email', message: t('personnelInvalidEmailWarning') },
              ]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="status"
              label={t('personnelStatus')}
              rules={[{ required: true, message: t('personnelStatusWarning') }]}
            >
              <Select>
                <Option value="Active">{t('personnelActive')}</Option>
                <Option value="Inactive">{t('personnelInactive')}</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="partner"
              label={t('personnelPartner')}
              rules={[{ required: true, message: t('personnelPartnerWarning') }]}
            >
              <FormInput/>
            </Form.Item>
            <Form.Item>
              <Space style={{ width: '100%' }}>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  {t('save')}
                </Button>
                <Button onClick={handleCloseDrawer} style={{ width: '100%' }}>
                  {t('cancel')}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Drawer>
      <Modal
        title={t('personnelDeleteTitle')}
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText={t('deletePersonnel')}
        cancelText={t('cancel')}
        okType="danger"
        centered
      >
        <p>
          {t('personnelDeleteWarning', { name: selectedPersonnel?.name })}
        </p>
      </Modal>
    </div>
  );
};

export default PersonnelList;