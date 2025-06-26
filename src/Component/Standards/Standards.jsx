import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, SafetyCertificateOutlined, PlusOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';
import { useTranslation } from 'react-i18next';

const carbonStandards = [
  {
    key: '1',
    tenTieuChuan: 'Verra (VCS)',
    loai: 'international',
    moTa: 'Tiêu chuẩn xác minh tín chỉ carbon tự nguyện lớn nhất thế giới',
    trangThai: 'applied',
  },
  {
    key: '2',
    tenTieuChuan: 'Gold Standard',
    loai: 'international',
    moTa: 'Tiêu chuẩn carbon tập trung vào phát triển bền vững',
    trangThai: 'applied',
  },
  {
    key: '3',
    tenTieuChuan: 'CBAM (EU)',
    loai: 'laws',
    moTa: 'Thuế carbon biên giới do Liên minh châu Âu áp dụng từ 2026',
    trangThai: 'required',
  },
  {
    key: '4',
    tenTieuChuan: 'Tiêu chuẩn quốc gia (TCVN)',
    loai: 'national',
    moTa: 'Hệ thống tiêu chuẩn hóa do Bộ TN&MT ban hành',
    trangThai: 'constructing',
  },
];

const CarbonStandardList = () => {
  const { t } = useTranslation();
  const [,setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(carbonStandards);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = carbonStandards.filter(item =>
      item.tenTieuChuan.toLowerCase().includes(value.toLowerCase()) ||
      item.loai.toLowerCase().includes(value.toLowerCase()) ||
      item.moTa.toLowerCase().includes(value.toLowerCase())
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
    { name: 'tenTieuChuan', label: t('name') },
    {
    name: 'loai',
    label: t('type'),
    type: 'select',
    options: [
      { value: 'international', label: t('international') },
      { value: 'laws', label: t('laws') },
      { value: 'national', label: t('national') },
    ],
    },
    { name: 'moTa', label: t('description') },
    {
    name: 'trangThai',
    label: t('status'),
    type: 'select',
    options: [
      { value: 'applied', label: t('applied') },
      { value: 'required', label: t('required') },
      { value: 'constructing', label: t('constructing') },
    ],
    }
  ];

  const columns = [
    {
      title: t('name'),
      dataIndex: 'tenTieuChuan',
      key: 'tenTieuChuan',
      render: (text, record) => (
        <Space>
          <SafetyCertificateOutlined />
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
      title: t('description'),
      dataIndex: 'moTa',
      key: 'moTa',
    },
    {
      title: t('status'),
      dataIndex: 'trangThai', 
      key: 'trangThai',
      render: (status) => { 
        const color =
          status === 'required' ? 'red' :
          status === 'constructing' ? 'orange' :
          'green';

        const label =
          status === 'required' ? t('required') :
          status === 'constructing' ? t('constructing') :
          t('applied');

        return <Tag color={color}>{label}</Tag>;
      },
    }
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
                    placeholder={t('standardSearch')}
                    allowClear
                    enterButton={<Button icon={<SearchOutlined />} />}
                    onSearch={handleSearch}
                    onChange={(e) => {
                      if (!e.target.value) handleSearch('');
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

export default CarbonStandardList;