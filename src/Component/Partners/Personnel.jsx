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
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const initialPersonnel = [
  {
    key: '1',
    name: 'Nguyen Van A',
    role: 'Manager',
    email: 'nguyen.a@techcorp.vn',
    status: 'Active',
    partner: 'TechCorp Hanoi',
  },
  {
    key: '2',
    name: 'Tran Thi B',
    role: 'Developer',
    email: 'tran.b@techcorp.vn',
    status: 'Active',
    partner: 'TechCorp Hanoi',
  },
  {
    key: '3',
    name: 'Le Minh C',
    role: 'Consultant',
    email: 'le.c@greensolutions.vn',
    status: 'Active',
    partner: 'GreenSolutions HCMC',
  },
  {
    key: '4',
    name: 'Pham D',
    role: 'Analyst',
    email: 'pham.d@greensolutions.vn',
    status: 'Inactive',
    partner: 'GreenSolutions HCMC',
  },
  {
    key: '5',
    name: 'Hoang E',
    role: 'Logistics Manager',
    email: 'hoang.e@bluewave.vn',
    status: 'Active',
    partner: 'BlueWave Danang',
  },
];

const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: '25%',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'Active' ? 'green' : 'red'}>
        {status}
      </Tag>
    ),
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'Inactive', value: 'Inactive' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: 'Đối tác',
    dataIndex: 'partner',
    key: 'partner',
    width: '20%',
    filters: [
      { text: 'TechCorp Hanoi', value: 'TechCorp Hanoi' },
      { text: 'GreenSolutions HCMC', value: 'GreenSolutions HCMC' },
      { text: 'BlueWave Danang', value: 'BlueWave Danang' },
    ],
    onFilter: (value, record) => record.partner === value,
  },
];

const PersonnelList = () => {
  const [personnelData, setPersonnelData] = useState(initialPersonnel);
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
          key: (personnelData.length + 1).toString(),
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
    });
  };

  const handleDelete = () => {
    setPersonnelData((prevData) =>
      prevData.filter((item) => item.key !== selectedPersonnel.key)
    );
    setDeleteModalVisible(false);
    setDrawerVisible(false);
    setSelectedPersonnel(null);
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const filteredPersonnel = personnelData.filter((person) => {
    const matchesStatus =
      filterStatus === 'all' || person.status === filterStatus;
    const matchesSearch = person.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            className="criclebox tablespace mb-24 rounded-lg bg-white"
            title="Danh sách Nhân sự"
            style={{ border: '1px solid #e8e8e8' }}
            extra={
              <Space direction="horizontal" style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <Button type="primary" onClick={handleAddNew} style={{ backgroundColor: 'green', whiteSpace: 'nowrap' }}>
                  Thêm
                </Button>
                <Select
                  defaultValue="all"
                  style={{ width: 100, minWidth: '100px', whiteSpace: 'nowrap' }}
                  onChange={(value) => {
                    setFilterStatus(value);
                    setCurrentPage(1);
                  }}
                >
                  <Option value="all">Tất cả</Option>
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
                <Input
                  placeholder="Tìm kiếm nhân sự"
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
        title={isAdding ? 'Thêm nhân sự mới' : isEditing ? 'Chỉnh sửa nhân sự' : (selectedPersonnel?.name || 'Chi tiết nhân sự')}
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        height={isEditing || isAdding ? '80%' : '50%'}
      >
        {selectedPersonnel && !isEditing && !isAdding && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Tên">{selectedPersonnel.name}</Descriptions.Item>
              <Descriptions.Item label="Vai trò">{selectedPersonnel.role}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedPersonnel.email}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={selectedPersonnel.status === 'Active' ? 'green' : 'red'}>
                  {selectedPersonnel.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Đối tác">{selectedPersonnel.partner}</Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={() => handleEdit(selectedPersonnel)}
              style={{ marginBottom: '8px', width: '100%' }}
            >
              Chỉnh sửa
            </Button>
            <Button
              type="primary"
              danger
              onClick={showDeleteModal}
              style={{ width: '100%' }}
            >
              Xóa
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
              label="Tên"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng nhập vai trò!' }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            >
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="partner"
              label="Đối tác"
              rules={[{ required: true, message: 'Vui lòng chọn đối tác!' }]}
            >
              <Select>
                <Option value="TechCorp Hanoi">TechCorp Hanoi</Option>
                <Option value="GreenSolutions HCMC">GreenSolutions HCMC</Option>
                <Option value="BlueWave Danang">BlueWave Danang</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Space style={{ width: '100%' }}>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Lưu
                </Button>
                <Button onClick={handleCloseDrawer} style={{ width: '100%' }}>
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Drawer>
      <Modal
        title="Xác nhận xóa"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okType="danger"
        centered
      >
        <p>
          Bạn có chắc chắn muốn xóa nhân sự "{selectedPersonnel?.name}" không?
        </p>
      </Modal>
    </>
  );
};

export default PersonnelList;