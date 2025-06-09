import {
  Row,
  Col,
  Card,
  Table,
  Select,
  Button,
  Space,
  Progress,
  Typography,
  Drawer,
  Form,
  Input as FormInput,
} from "antd";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const { Title, Paragraph } = Typography;
const { Option } = Select;

const columns = [
  {
    title: "CHỈ SỐ",
    dataIndex: "name",
    key: "name",
    width: "30%",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "NHÓM",
    dataIndex: "group",
    key: "group",
    filters: [
      { text: "Chất lượng", value: "Chất lượng" },
      { text: "Tốc độ", value: "Tốc độ" },
      { text: "Hiệu suất", value: "Hiệu suất" },
    ],
    onFilter: (value, record) => record.group === value,
  },
  {
    title: "GIÁ TRỊ",
    dataIndex: "value",
    key: "value",
    sorter: (a, b) => a.value - b.value,
  },
  {
    title: "TIÊU CHUẨN",
    dataIndex: "target",
    key: "target",
  },
];

const initialData = [
  {
    key: "1",
    name: "Tỷ lệ lỗi sản phẩm",
    group: "Chất lượng",
    value: 2.5,
    target: 3.0,
  },
  {
    key: "2",
    name: "Thời gian giao hàng",
    group: "Tốc độ",
    value: 4.2,
    target: 5.0,
  },
  {
    key: "3",
    name: "Hiệu suất máy móc",
    group: "Hiệu suất",
    value: 85,
    target: 90,
  },
  {
    key: "4",
    name: "Tỷ lệ hoàn thành đơn hàng",
    group: "Hiệu suất",
    value: 95,
    target: 98,
  },
];

const trendData = [
  { date: "2025-01", value: 2.8 },
  { date: "2025-02", value: 2.6 },
  { date: "2025-03", value: 2.7 },
  { date: "2025-04", value: 2.4 },
  { date: "2025-05", value: 2.3 },
];

const pieData = [
  { name: "Chất lượng", value: 40 },
  { name: "Tốc độ", value: 30 },
  { name: "Hiệu suất", value: 30 },
];

const COLORS = ["#1A73E8", "#34C38F", "#F1B44C"]; // Muse-inspired colors

function Metrics() {
  const [data, setData] = useState(initialData);
  const [selectedGroup, setSelectedGroup] = useState("all");
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
    (item) => selectedGroup === "all" || item.group === selectedGroup
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Metrics");
    XLSX.writeFile(workbook, "metrics_report.xlsx");
  };

  // Helper function to convert Vietnamese to ASCII
  const vietnameseToAscii = (str) => {
    return str
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
      .replace(/[èéẹẻẽêềếệểễ]/g, "e")
      .replace(/[ìíịỉĩ]/g, "i")
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
      .replace(/[ùúụủũưừứựửữ]/g, "u")
      .replace(/[ỳýỵỷỹ]/g, "y")
      .replace(/[đ]/g, "d")
      .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, "A")
      .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, "E")
      .replace(/[ÌÍỊỈĨ]/g, "I")
      .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, "O")
      .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, "U")
      .replace(/[ỲÝỴỶỸ]/g, "Y")
      .replace(/[Đ]/g, "D");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(vietnameseToAscii("Báo cáo bộ chỉ số"), 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [
        [
          vietnameseToAscii("Chỉ số"),
          vietnameseToAscii("Nhóm"),
          vietnameseToAscii("Giá trị"),
          vietnameseToAscii("Tiêu chuẩn"),
        ],
      ],
      body: filteredData.map((item) => [
        vietnameseToAscii(item.name),
        vietnameseToAscii(item.group),
        item.value.toString(),
        item.target.toString(),
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 30 },
    });
    doc.save("metrics_report.pdf");
  };

  // Chart.js Pie Chart configuration
  const pieChartData = {
    labels: pieData.map((item) => item.name),
    datasets: [
      {
        data: pieData.map((item) => item.value),
        backgroundColor: COLORS,
        borderColor: COLORS,
        borderWidth: 1,
        borderRadius: 4, // Muse-inspired rounded edges
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            family: "'Poppins', sans-serif", // Muse-inspired font
            size: 12,
          },
          color: "#2e2e2e", // Dark text for visibility
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#2e2e2e",
        bodyColor: "#2e2e2e",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        titleFont: { family: "'Poppins', sans-serif" },
        bodyFont: { family: "'Poppins', sans-serif" },
      },
    },
  };

  // Chart.js Line Chart configuration
  const lineChartData = {
    labels: trendData.map((item) => item.date),
    datasets: [
      {
        label: "Tỷ lệ lỗi sản phẩm",
        data: trendData.map((item) => item.value),
        borderColor: "#8884d8",
        backgroundColor: "rgba(136, 132, 216, 0.2)",
        fill: true,
        tension: 0.4, // Smooth curve like Muse demo
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#8884d8",
        pointBorderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          },
          color: "#2e2e2e",
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#2e2e2e",
        bodyColor: "#2e2e2e",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        titleFont: { family: "'Poppins', sans-serif" },
        bodyFont: { family: "'Poppins', sans-serif" },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Clean look like Muse demo
        },
        ticks: {
          font: { family: "'Poppins', sans-serif" },
          color: "#2e2e2e",
        },
      },
      y: {
        grid: {
          color: "#e8e8e8",
          borderDash: [5, 5], // Dashed grid like Muse demo
        },
        ticks: {
          font: { family: "'Poppins', sans-serif" },
          color: "#2e2e2e",
        },
      },
    },
  };

  return (
    <div className="metrics p-8 bg-gray-50 min-h-screen">
      <Row gutter={[24, 24]}>
        {/* Bảng chỉ số */}
        <Col xs={24} md={16}>
          <Card
            className="criclebox tablespace mb-24  rounded-lg bg-white"
            title={<span className="text-lg font-poppins font-medium">Bảng Chỉ Số</span>}
            style={{ border: "1px solid #e8e8e8", borderRadius: 8 }}
            extra={
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddNew}
                  style={{ borderRadius: 6 }}
                >
                  Thêm Chỉ Số
                </Button>
                <Select
                  defaultValue="all"
                  style={{ width: 120 }}
                  onChange={handleGroupChange}
                  options={[
                    { value: "all", label: "Tất cả" },
                    { value: "Chất lượng", label: "Chất lượng" },
                    { value: "Tốc độ", label: "Tốc độ" },
                    { value: "Hiệu suất", label: "Hiệu suất" },
                  ]}
                />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={exportToExcel}
                  style={{ borderRadius: 6 }}
                >
                  Excel
                </Button>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={exportToPDF}
                  style={{ borderRadius: 6 }}
                >
                  PDF
                </Button>
              </Space>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredData}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>

        {/* Biểu đồ phân bố */}
        <Col xs={24} md={8}>
          <Card
            className="criclebox mb-24  rounded-lg bg-white"
            title={<span className="text-lg font-poppins font-medium">Phân bố Chỉ Số</span>}
            style={{ border: "1px solid #e8e8e8", borderRadius: 8 }}
          >
            <div style={{ height: 200 }}>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </Card>
        </Col>

        {/* Xu hướng */}
        <Col xs={24} md={12}>
          <Card
            className="criclebox mb-24  rounded-lg bg-white"
            title={<span className="text-lg font-poppins font-medium">Xu Hướng</span>}
            style={{ border: "1px solid #e8e8e8", borderRadius: 8 }}
          >
            <div style={{ height: 300 }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
            <div className="chart-vistior">
              <Paragraph className="lastweek font-poppins">
                Tỷ lệ lỗi sản phẩm giảm <span className="bnb2 text-green-500">-10%</span> so với tháng trước
              </Paragraph>
            </div>
          </Card>
        </Col>

        {/* Mức độ hoàn thành */}
        <Col xs={24} md={12}>
          <Card
            className="criclebox mb-24  rounded-lg bg-white"
            style={{ border: "1px solid #e8e8e8", borderRadius: 8 }}
          >
            <div style={{ marginTop: 24 }}>
              <Title level={4} className="font-poppins">
                Mức Độ Hoàn Thành
              </Title>
              {filteredData.map((item) => (
                <div key={item.key} style={{ marginBottom: 16 }}>
                  <Title level={5} className="font-poppins">{item.name}</Title>
                  <Progress
                    percent={((item.value / item.target) * 100).toFixed(0)}
                    status={item.value >= item.target ? "success" : "normal"}
                  />
                </div>
              ))}
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
            rules={[{ required: true, message: "Vui lòng nhập tên chỉ số!" }]}
          >
            <FormInput />
          </Form.Item>
          <Form.Item
            name="group"
            label="Nhóm"
            rules={[{ required: true, message: "Vui lòng chọn nhóm!" }]}
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
              { required: true, message: "Vui lòng nhập giá trị!" },
              { pattern: /^\d+(\.\d+)?$/, message: "Giá trị phải là số!" },
            ]}
          >
            <FormInput />
          </Form.Item>
          <Form.Item
            name="target"
            label="Tiêu chuẩn"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu chuẩn!" },
              { pattern: /^\d+(\.\d+)?$/, message: "Tiêu chuẩn phải là số!" },
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