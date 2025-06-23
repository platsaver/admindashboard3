import { Card, Table, List, Row, Col } from "antd";
import { Bar, Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const CarbonMarketDashboard = () => {
  const {t} = useTranslation();
  const companyColumns = [
    { title: t('companies'), dataIndex: 'name', key: 'name' },
    { title: t('role'), dataIndex: 'role', key: 'role' },
  ];
  const companyData = [
    { key: '1', name: 'Shell', role: t('buy') },
    { key: '2', name: 'Verra', role: t('registrar') },
    { key: '3', name: 'EKI Energy Services Ltd.', role: t('trader') },
    { key: '4', name: 'South Pole', role: t('developer') },
    { key: '5', name: 'Microsoft', role: t('sell') },
  ];
  const tradingVolumeData = {
    labels: [t('domestic'), t('international'), t('global')],
    datasets: [
      {
        label: t('volume'),
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
        text: t('marketVolume'),
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
          max: 15000,  
          stepSize: 2500, 
        },
      },
      x: {
        title: {
          display: true,
          text: t('market'),
        },
      },
    },
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
        text: t('trending'),
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: t('price'),
        },
        ticks: {
          min: 79,
          max: 88,
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: t('days'),
        },
      },
    },
  };
  const priceData = {
    labels: ['2025-06-01', '2025-06-02', '2025-06-03', '2025-06-04', '2025-06-05'],
    datasets: [
      {
        label: t('price'),
        data: [80, 82, 85, 83, 87],
        borderColor: '#52c41a',
        backgroundColor: 'rgba(82, 196, 26, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const policies = t('policies', { returnObjects: true });
  const projects = t('projects', { returnObjects: true });

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Cột trái: Biểu đồ */}
        <Col xs={24} sm={24} md={12}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card title={t('priceCarbonChart')} style={{ width: '100%' }}>
                <div style={{ height: 300 }}>
                  <Line data={priceData} options={chartOptions} />
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card title={t('tradingvolume')} style={{ width: '100%' }}>
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
              <Card title={t('featuredcompanies')} style={{ width: '100%' }}>
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
              <Card title={t('recentpolicies')} style={{ width: '100%' }}>
                <List
                  dataSource={policies}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card title={t('recentprojects')} style={{ width: '100%' }}>
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