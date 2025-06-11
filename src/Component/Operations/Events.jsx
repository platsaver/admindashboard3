import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Space,
  Tag,
  Drawer,
  Button,
  Descriptions,
  Form,
  Input as FormInput,
  Select,
  Modal,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Option } = Select;

const initialEvents = [
  {
    id: '1',
    title: 'Họp ban điều hành',
    start: '2024-01-15T09:00:00',
    end: '2024-01-15T11:00:00',
    priority: 'Cao',
    description: 'Họp định kỳ ban điều hành công ty',
    location: 'Phòng họp A',
    attendees: 'Ban điều hành',
  },
  {
    id: '2',
    title: 'Đào tạo ISO 9001',
    start: '2024-01-16T14:00:00',
    end: '2024-01-16T17:00:00',
    priority: 'Trung bình',
    description: 'Khóa đào tạo về tiêu chuẩn ISO 9001',
    location: 'Phòng đào tạo',
    attendees: 'Nhân viên phòng QA',
  },
  {
    id: '3',
    title: 'Kiểm tra chất lượng sản phẩm',
    start: '2024-01-17T08:00:00',
    end: '2024-01-17T12:00:00',
    priority: 'Cao',
    description: 'Kiểm tra chất lượng lô hàng mới',
    location: 'Nhà máy sản xuất',
    attendees: 'Đội QC',
  },
  {
    id: '4',
    title: 'Đánh giá nhà cung cấp',
    start: '2024-01-18T13:30:00',
    end: '2024-01-18T16:30:00',
    priority: 'Thấp',
    description: 'Đánh giá hiệu suất nhà cung cấp quý 4',
    location: 'Phòng họp B',
    attendees: 'Phòng mua hàng',
  },
  {
    id: '5',
    title: 'Audit nội bộ',
    start: '2024-01-19T09:00:00',
    end: '2024-01-19T17:00:00',
    priority: 'Cao',
    description: 'Audit nội bộ hệ thống quản lý chất lượng',
    location: 'Toàn công ty',
    attendees: 'Đội audit nội bộ',
  },
  {
    id: '6',
    title: 'Họp đánh giá tháng',
    start: '2024-01-20T10:00:00',
    end: '2024-01-20T12:00:00',
    priority: 'Trung bình',
    description: 'Đánh giá kết quả hoạt động tháng 1',
    location: 'Phòng họp chính',
    attendees: 'Toàn bộ nhân viên',
  },
];

const priorityColors = {
  'Cao': 'red',
  'Trung bình': 'orange',
  'Thấp': 'green',
};

const columns = [
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
    width: "25%",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Ngày giờ",
    dataIndex: "start",
    key: "start",
    width: "20%",
    render: (start) => new Date(start).toLocaleString('vi-VN'),
    sorter: (a, b) => new Date(a.start) - new Date(b.start),
  },
  {
    title: "Độ ưu tiên",
    dataIndex: "priority",
    key: "priority",
    filters: [
      { text: "Cao", value: "Cao" },
      { text: "Trung bình", value: "Trung bình" },
      { text: "Thấp", value: "Thấp" },
    ],
    width: "10%",
    onFilter: (value, record) => record.priority === value,
    render: (priority) => (
      <Tag color={priorityColors[priority]}>{priority}</Tag>
    ),
  },
  {
    title: "Địa điểm",
    dataIndex: "location",
    key: "location",
    width: "20%",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    width: "35%",
  },
];

function EventsList() {
  const [events, setEvents] = useState(initialEvents);
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleRowClick = (record) => {
    setSelectedEvent(record);
    setDrawerVisible(true);
    setIsEditing(false);
    setIsAdding(false);
    form.setFieldsValue({
      ...record,
      start: new Date(record.start).toISOString().slice(0, 16),
      end: new Date(record.end).toISOString().slice(0, 16),
    });
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedEvent(null);
    setIsEditing(false);
    setIsAdding(false);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setIsAdding(false);
    form.setFieldsValue({
      ...record,
      start: new Date(record.start).toISOString().slice(0, 16),
      end: new Date(record.end).toISOString().slice(0, 16),
    });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedEvent(null);
    setDrawerVisible(true);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (isAdding) {
        const newEvent = {
          id: (events.length + 1).toString(),
          ...values,
          start: new Date(values.start).toISOString(),
          end: new Date(values.end).toISOString(),
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      } else {
        setEvents((prevEvents) =>
          prevEvents.map((item) =>
            item.id === selectedEvent.id
              ? {
                  ...item,
                  ...values,
                  start: new Date(values.start).toISOString(),
                  end: new Date(values.end).toISOString(),
                }
              : item
          )
        );
        setSelectedEvent({
          ...selectedEvent,
          ...values,
          start: new Date(values.start).toISOString(),
          end: new Date(values.end).toISOString(),
        });
      }
      setIsEditing(false);
      setIsAdding(false);
      setDrawerVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((item) => item.id !== selectedEvent.id)
    );
    setDeleteModalVisible(false);
    setDrawerVisible(false);
    setSelectedEvent(null);
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const filteredEvents = events.filter((item) => {
    const matchesPriority =
      filterPriority === "all" || item.priority === filterPriority;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="events-list-container">
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card
            className="criclebox tablespace"
            title="Danh Sách Sự Kiện"
            extra={
              <Space>
                <Button 
                  type="primary" 
                  onClick={handleAddNew}
                  style={{ backgroundColor: "green" }}
                >
                  Thêm sự kiện
                </Button>
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  onChange={(value) => {
                    setFilterPriority(value);
                    setCurrentPage(1);
                  }}
                >
                  <Option value="all">Tất cả mức độ</Option>
                  <Option value="Cao">Cao</Option>
                  <Option value="Trung bình">Trung bình</Option>
                  <Option value="Thấp">Thấp</Option>
                </Select>
                <Input
                  placeholder="Tìm kiếm sự kiện"
                  prefix={<SearchOutlined />}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: 200 }}
                />
              </Space>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredEvents}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: filteredEvents.length,
                  onChange: handlePaginationChange,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20"],
                }}
                className="ant-border-space"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
                rowKey="id"
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Drawer
        title={
          isAdding
            ? "Thêm sự kiện mới"
            : isEditing
            ? "Chỉnh sửa sự kiện"
            : selectedEvent?.title || "Chi tiết sự kiện"
        }
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        width={500}
      >
        {selectedEvent && !isEditing && !isAdding && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Tiêu đề">
                {selectedEvent.title}
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian bắt đầu">
                {new Date(selectedEvent.start).toLocaleString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian kết thúc">
                {new Date(selectedEvent.end).toLocaleString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Mức độ quan trọng">
                <Tag color={priorityColors[selectedEvent.priority]}>
                  {selectedEvent.priority}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Địa điểm">
                {selectedEvent.location}
              </Descriptions.Item>
              <Descriptions.Item label="Người tham gia">
                {selectedEvent.attendees}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                {selectedEvent.description}
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={() => handleEdit(selectedEvent)}
              style={{ marginBottom: "8px" }}
            >
              Chỉnh sửa
            </Button>
            <Button type="primary" danger onClick={showDeleteModal}>
              Xóa
            </Button>
          </div>
        )}

        {(isEditing || isAdding) && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
          >
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="start"
              label="Thời gian bắt đầu"
              rules={[{ required: true, message: "Vui lòng chọn thời gian bắt đầu!" }]}
            >
              <FormInput type="datetime-local" />
            </Form.Item>
            <Form.Item
              name="end"
              label="Thời gian kết thúc"
              rules={[{ required: true, message: "Vui lòng chọn thời gian kết thúc!" }]}
            >
              <FormInput type="datetime-local" />
            </Form.Item>
            <Form.Item
              name="priority"
              label="Mức độ quan trọng"
              rules={[{ required: true, message: "Vui lòng chọn mức độ quan trọng!" }]}
            >
              <Select>
                <Option value="Cao">Cao</Option>
                <Option value="Trung bình">Trung bình</Option>
                <Option value="Thấp">Thấp</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="location"
              label="Địa điểm"
              rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="attendees"
              label="Người tham gia"
              rules={[{ required: true, message: "Vui lòng nhập người tham gia!" }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <FormInput.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Button onClick={handleCloseDrawer}>Hủy</Button>
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
      >
        <p>
          Bạn có chắc chắn muốn xóa sự kiện "{selectedEvent?.title}" không?
        </p>
      </Modal>
    </div>
  );
}

export default EventsList;