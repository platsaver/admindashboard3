import { Flex, Card, Typography, Table, List } from "antd";
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Text } = Typography;

const priceData = {
  labels: ['2025-06-01', '2025-06-02', '2025-06-03', '2025-06-04', '2025-06-05'],
  datasets: [
    {
      label: 'Price (USD/tCO2e)',
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
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Carbon Credit Price Trends',
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      title: {
        display: true,
        text: 'Price (USD/tCO2e)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Date',
      },
    },
  },
};

const tradingVolumeData = {
  labels: ['Domestic (Vietnam)', 'International (EU ETS)', 'Global'],
  datasets: [
    {
      label: 'Volume (MtCO2e)',
      data: [1000, 5000, 12500],
      backgroundColor: '#52c41a',
      borderColor: '#52c41a',
      borderWidth: 1,
    },
  ],
};

const tradingVolumeOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Trading Volume by Market',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Volume (MtCO2e)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Market',
      },
    },
  },
};

const policies = [
  'Jan 2025: Vietnam sanctions a plan to establish a pilot ETS starting June 2025, with full implementation by 2029.',
  'Dec 2024: COP29 agreement to launch a centralized UN trading system for international carbon credits in 2025.',
  'Sep 2023: ASEAN Carbon Credit Trading Platform (CCTPA) launches Vietnam’s first carbon credit trading platform.',
];

const companyColumns = [
  { title: 'Company', dataIndex: 'name', key: 'name' },
  { title: 'Role', dataIndex: 'role', key: 'role' },
];
const companyData = [
  { key: '1', name: 'Shell', role: 'Buyer/Seller' },
  { key: '2', name: 'Verra', role: 'Registry' },
  { key: '3', name: 'EKI Energy Services Ltd.', role: 'Trader' },
  { key: '4', name: 'South Pole', role: 'Developer/Trader' },
  { key: '5', name: 'Microsoft', role: 'Buyer' },
];

const projects = [
  {
    title: 'Amazon Reforestation Project (Brazil)',
    description: 'Mercuria partners with Nature Conservancy to preserve the Amazon, generating credits via forestry.',
  },
  {
    title: 'Vietnam Renewable Energy Project',
    description: 'Solar and wind projects contributing to carbon credits for Vietnam’s pilot ETS.',
  },
  {
    title: 'Indonesia Renewable Energy Credits',
    description: 'IDX Carbon Platform added 1.78M credits from renewable energy in 2024.',
  },
];

const CarbonMarketDashboard = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Flex gap="24px" style={{ marginBottom: '24px' }}>
        <Card title="Carbon Credit Price Chart" style={{ flex: 1 }}>
          <Text>Daily/Weekly/Monthly Price Trends (USD/tCO2e)</Text>
          <Line data={priceData} options={chartOptions} />
        </Card>

        <Flex vertical gap="24px" style={{ flex: 1 }}>
          <Card title="Trading Volume">
            <Bar data={tradingVolumeData} options={tradingVolumeOptions} />
          </Card>
          <Card title="Recent Policies (Vietnam, 2025)">
            <List
              dataSource={policies}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Flex>
      </Flex>

      <Flex gap="24px">
        <Card title="Notable Companies in Carbon Credit Market" style={{ flex: 1 }}>
          <Table
            columns={companyColumns}
            dataSource={companyData}
            pagination={false}
            size="small"
          />
        </Card>
        <Card title="Recent Carbon Credit Projects" style={{ flex: 1 }}>
          <List
            dataSource={projects}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.title} description={item.description} />
              </List.Item>
            )}
          />
        </Card>
      </Flex>
    </div>
  );
};

export default CarbonMarketDashboard;