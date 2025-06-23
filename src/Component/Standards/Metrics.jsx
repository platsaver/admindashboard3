import {
  Row,
  Col,
  Card,
  Table,
  Select,
  Button,
  Space,
  Drawer,
  Form,
  Input as FormInput,
} from 'antd';
import { useState } from 'react';

const { Option } = Select;

const columns = [
  {
    title: 'CHỈ SỐ',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'NHÓM',
    dataIndex: 'group',
    key: 'group',
    filters: [
      { text: 'Chất lượng', value: 'Chất lượng' },
      { text: 'Tốc độ', value: 'Tốc độ' },
      { text: 'Hiệu suất', value: 'Hiệu suất' },
    ],
    onFilter: (value, record) => record.group === value,
  },
  {
    title: 'GIÁ TRỊ',
    dataIndex: 'value',
    key: 'value',
    sorter: (a, b) => a.value - b.value,
  },
  {
    title: 'TIÊU CHUẨN',
    dataIndex: 'target',
    key: 'target',
  },
];

// Danh sách chỉ số cố định, tương tự companyData trong Overview.jsx
const fixedData = [
  { key: '1', name: 'Tỷ lệ lỗi sản phẩm', group: 'Chất lượng', value: 2.5, target: 3.0 },
  { key: '2', name: 'Thời gian giao hàng', group: 'Tốc độ', value: 4.2, target: 5.0 },
  { key: '3', name: 'Hiệu suất máy móc', group: 'Hiệu suất', value: 85, target: 90 },
  { key: '4', name: 'Tỷ lệ hoàn thành đơn hàng', group: 'Hiệu suất', value: 95, target: 98 },
];

function Metrics() {
  const [data, setData] = useState(fixedData);
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
  };

  const handleAddNew = () => {
    setDrawerVisible(true);
    form.resetFields();
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newMetric = {
        key: (data.length + 1).toString(),
        ...values,
        value: parseFloat(values.value),
        target: parseFloat(values.target),
      };
      setData((prevData) => [...prevData, newMetric]);
      setDrawerVisible(false);
      form.resetFields();
    });
  };

  const filteredData = data.filter(
    (item) => selectedGroup === 'all' || item.group === selectedGroup
  );

  return (
    <div className="metrics p-8 bg-gray-50 min-h-screen">
      <Row gutter={[16, 16]}>
        {/* Bảng chỉ số */}
        <Col xs={24} md={24}>
          <Card
            className="criclebox tablespace mb-24 rounded-lg bg-white"
            title={<span className="text-lg font-poppins font-medium">Bảng Chỉ Số</span>}
            style={{ border: '1px solid #e8e8e8', borderRadius: 8 }}
            extra={
              <Space
                direction="horizontal"
                style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}
              >
                <Button
                  type="primary"
                  onClick={handleAddNew}
                  style={{ borderRadius: 6, backgroundColor: 'green', whiteSpace: 'nowrap' }}
                >
                  Thêm
                </Button>
                <Select
                  defaultValue="all"
                  style={{ width: 120, minWidth: '80px', whiteSpace: 'nowrap' }}
                  onChange={handleGroupChange}
                  options={[
                    { value: 'all', label: 'Tất cả' },
                    { value: 'Chất lượng', label: 'Chất lượng' },
                    { value: 'Tốc độ', label: 'Tốc độ' },
                    { value: 'Hiệu suất', label: 'Hiệu suất' },
                  ]}
                />
              </Space>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredData}
                pagination={false}
                className="ant-border-space"
                bordered
                style={{ borderRadius: '8px', overflow: 'hidden' }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Drawer for Adding New Metric */}
      <Drawer
        title={<span className="font-poppins">Thêm Chỉ Số Mới</span>}
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="name"
            label="Chỉ số"
            rules={[{ required: true, message: 'Vui lòng nhập tên chỉ số!' }]}
          >
            <FormInput />
          </Form.Item>
          <Form.Item
            name="group"
            label="Nhóm"
            rules={[{ required: true, message: 'Vui lòng chọn nhóm!' }]}
          >
            <Select>
              <Option value="Chất lượng">Chất lượng</Option>
              <Option value="Tốc độ">Tốc độ</Option>
              <Option value="Hiệu suất">Hiệu suất</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="value"
            label="Giá trị"
            rules={[
              { required: true, message: 'Vui lòng nhập giá trị!' },
              { pattern: /^\d+(\.\d+)?$/, message: 'Giá trị phải là số!' },
            ]}
          >
            <FormInput />
          </Form.Item>
          <Form.Item
            name="target"
            label="Tiêu chuẩn"
            rules={[
              { required: true, message: 'Vui lòng nhập tiêu chuẩn!' },
              { pattern: /^\d+(\.\d+)?$/, message: 'Tiêu chuẩn phải là số!' },
            ]}
          >
            <FormInput />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
                Lưu
              </Button>
              <Button onClick={handleCloseDrawer} style={{ borderRadius: 6 }}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default Metrics;