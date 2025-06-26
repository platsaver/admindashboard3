import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, CloudOutlined, FireOutlined, PlusOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';
import { useTranslation } from 'react-i18next';

const carbonData = [
  { key: '1', tenChiSo: 'Lượng phát thải CO₂ (tháng 6)', loai: 'emission', giaTri: '128' },
  { key: '2', tenChiSo: 'Tín chỉ carbon đã mua', loai: 'offset', giaTri: '150' },
  { key: '3', tenChiSo: 'Tín chỉ khả dụng', loai: 'carbonAsset', giaTri: '42' },
  { key: '4', tenChiSo: 'Tỉ lệ tuân thủ CBAM', loai: 'policy', giaTri: '100%' },
];

const CarbonCreditDashboard = () => {
  const { t } = useTranslation();
  const [,setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(carbonData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = carbonData.filter(item =>
      item.tenChiSo.toLowerCase().includes(value.toLowerCase()) ||
      item.loai.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleUpdate = (updatedRecord) => {
    setFilteredData((prev) =>
      prev.map((item) => (item.key === updatedRecord.key ? updatedRecord : item))
    );
  };

  const handleAdd = (newRecord) => {
    setFilteredData((prev) => [...prev, { ...newRecord, key: `${prev.length + 1}` }]);
  };

  const handleDelete = (key) => {
    setFilteredData((prev) => prev.filter((item) => item.key !== key));
  };

  const fieldsConfig = [
    { name: 'tenChiSo', label: t('name') },
    { name: 'loai', label: t('type') },
    { name: 'giaTri', label: t('value') },
  ];

  const columns = [
    {
      title: t('name'),
      dataIndex: 'tenChiSo',
      key: 'tenChiSo',
      render: (text, record) => (
        <Space>
          <CloudOutlined />
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: t('type'),
      dataIndex: 'loai',
      key: 'loai',
      render: (text) => <Tag color="blue">{t(text)}</Tag>,
    },
    {
      title: t('value'),
      dataIndex: 'giaTri',
      key: 'giaTri',
      render: (value) => (
        <Space>
          <FireOutlined />
          {value}
        </Space>
      ),
    },
  ];

  const handleOpenAddDrawer = () => {
    setIsAdding(true);
    setSelectedRecord(null);
    setDrawerVisible(true);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          title={
            <Row justify="end" gutter={[8, 8]}>
              <Col xs={24} sm={16} md={12} lg={8} xl={6}>
                <Space>
                  <Input.Search
                    placeholder={t('metricSearch')}
                    allowClear
                    enterButton={<Button icon={<SearchOutlined />} />}
                    onSearch={handleSearch}
                    onChange={(e) => {
                      if (!e.target.value) {
                        handleSearch('');
                      }
                    }}
                    style={{ width: '100%' }}
                  />
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleOpenAddDrawer}
                    className="force-color"
                  >
                  </Button>
                </Space>
              </Col>
            </Row>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              responsive: true,
              pageSize: 5,
            }}
            scroll={{ x: 'max-content' }}
            size="middle"
            onRow={(record) => ({
              onClick: () => {
                setSelectedRecord(record);
                setIsAdding(false);
                setDrawerVisible(true);
              },
              style: { cursor: 'pointer' },
            })}
          />
          <CarbonDrawer
            visible={drawerVisible}
            onClose={() => {
              setDrawerVisible(false);
              setIsAdding(false);
            }}
            record={selectedRecord}
            onUpdate={handleUpdate}
            onAdd={handleAdd}
            onDelete={handleDelete}
            fieldsConfig={fieldsConfig}
            isAdding={isAdding}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default CarbonCreditDashboard;