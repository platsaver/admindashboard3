import { Card, Table, List, Row, Col } from "antd";
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const priceData = {
  labels: ['2025-06-01', '2025-06-02', '2025-06-03', '2025-06-04', '2025-06-05'],
  datasets: [
    {
      label: 'Giá (USD/tCO2e)',
      data: [80, 82, 85, 83, 87],
      borderColor: '#52c41a',
      backgroundColor: 'rgba(82, 196, 26, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Xu hướng giá tín chỉ carbon',
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      title: {
        display: true,
        text: 'Giá (USD/tCO2e)',
      },
      ticks: {
        min: 79,    // Dưới mức nhỏ nhất một chút để có khoảng cách
        max: 88,    // Trên mức lớn nhất một chút để có khoảng cách
        stepSize: 1, // Bước chia nhỏ để hiển thị chi tiết
      },
    },
    x: {
      title: {
        display: true,
        text: 'Ngày',
      },
    },
  },
};

const tradingVolumeData = {
  labels: ['Trong nước (Việt Nam)', 'Quốc tế (EU ETS)', 'Toàn cầu'],
  datasets: [
    {
      label: 'Khối lượng (MtCO2e)',
      data: [3000, 5000, 12500],
      backgroundColor: '#52c41a',
      borderColor: '#52c41a',
      borderWidth: 1,
    },
  ],
};

const tradingVolumeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Khối lượng giao dịch theo thị trường',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Khối lượng (MtCO2e)',
      },
      ticks: {
        max: 15000,  // Tăng max để bao gồm 12,500
        stepSize: 2500, // Bước chia hợp lý hơn
      },
    },
    x: {
      title: {
        display: true,
        text: 'Thị trường',
      },
    },
  },
};

const policies = [
  'Tháng 1 năm 2025: Việt Nam ban hành kế hoạch thiết lập hệ thống giao dịch phát thải (ETS) thí điểm bắt đầu từ tháng 6 năm 2025, với triển khai đầy đủ vào năm 2029.',
  'Tháng 12 năm 2024: Thỏa thuận COP29 ra mắt hệ thống giao dịch tín chỉ carbon quốc tế tập trung của Liên Hợp Quốc vào năm 2025.',
  'Tháng 9 năm 2023: Nền tảng giao dịch tín chỉ carbon ASEAN (CCTPA) ra mắt nền tảng giao dịch tín chỉ carbon đầu tiên của Việt Nam.',
];

const companyColumns = [
  { title: 'Công ty', dataIndex: 'name', key: 'name' },
  { title: 'Vai trò', dataIndex: 'role', key: 'role' },
];
const companyData = [
  { key: '1', name: 'Shell', role: 'Người mua/Người bán' },
  { key: '2', name: 'Verra', role: 'Đăng ký' },
  { key: '3', name: 'EKI Energy Services Ltd.', role: 'Người giao dịch' },
  { key: '4', name: 'South Pole', role: 'Nhà phát triển/Người giao dịch' },
  { key: '5', name: 'Microsoft', role: 'Người mua' },
];

const projects = [
  {
    title: 'Dự án trồng rừng Amazon (Brazil)',
    description: 'Mercuria hợp tác với Nature Conservancy để bảo vệ Amazon, tạo ra tín chỉ thông qua lâm nghiệp.',
  },
  {
    title: 'Dự án năng lượng tái tạo Việt Nam',
    description: 'Các dự án năng lượng mặt trời và gió đóng góp vào tín chỉ carbon cho ETS thí điểm của Việt Nam.',
  },
  {
    title: 'Tín chỉ năng lượng tái tạo Indonesia',
    description: 'Nền tảng IDX Carbon bổ sung 1.78 triệu tín chỉ từ năng lượng tái tạo vào năm 2024.',
  },
];

const CarbonMarketDashboard = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Cột trái: Biểu đồ */}
        <Col xs={24} sm={24} md={12}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card title="Biểu đồ giá tín chỉ carbon" style={{ width: '100%' }}>
                <div style={{ height: 300 }}>
                  <Line data={priceData} options={chartOptions} />
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Khối lượng giao dịch" style={{ width: '100%' }}>
                <div style={{ height: 300 }}>
                  <Bar data={tradingVolumeData} options={tradingVolumeOptions} />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Cột phải: Bảng + Danh sách */}
        <Col xs={24} sm={24} md={12}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card title="Các công ty nổi bật trong thị trường tín chỉ carbon" style={{ width: '100%' }}>
                <Table
                  columns={companyColumns}
                  dataSource={companyData}
                  pagination={false}
                  size="middle"
                  bordered
                  className="custom-table"
                  style={{ borderRadius: '8px', overflow: 'hidden' }}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Các chính sách gần đây (Việt Nam, 2025)" style={{ width: '100%' }}>
                <List
                  dataSource={policies}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Các dự án tín chỉ carbon gần đây" style={{ width: '100%' }}>
                <List
                  dataSource={projects}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta title={item.title} description={item.description} />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CarbonMarketDashboard;