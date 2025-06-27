import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, Button, Space, Popconfirm, Typography, message, DatePicker, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const CarbonDrawer = ({ visible, onClose, record, onUpdate, onAdd, onDelete, fieldsConfig, isAdding }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(isAdding);

  useEffect(() => {
    if (isAdding) {
      form.resetFields();
      setIsEditing(true);
    } else if (record) {
      const initialValues = { ...record };
      if (record.thoiGian) {
        initialValues.thoiGian = dayjs(record.thoiGian);
      }
      form.setFieldsValue(initialValues);
      setIsEditing(false);
    }
  }, [isAdding, record, form]);

  const handleEdit = () => {
    setIsEditing(true);
    if (record) {
      const initialValues = { ...record };
      if (record.thoiGian) {
        ['thoiGian', 'dob'].forEach((field) => {
          const raw = record?.[field];
          const parsed = dayjs(raw, 'DD/MM/YYYY', true);
          if (parsed.isValid()) {
            initialValues[field] = parsed;
          }
        });
      }
      form.setFieldsValue(initialValues);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (values.thoiGian) {
        values.thoiGian = values.thoiGian.format('DD/MM/YYYY');
      }

      if (isAdding) {
        onAdd(values);
        message.success('Thêm mới thành công');
      } else {
        onUpdate({ ...record, ...values });
        message.success('Cập nhật thành công');
      }

      setIsEditing(false);
      onClose();
    } catch (error) {
      message.error(isAdding ? 'Thêm mới thất bại' : 'Cập nhật thất bại');
    }
  };

  const handleDelete = () => {
    onDelete(record.key);
    onClose();
    message.success('Xóa thành công');
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    if (isAdding) onClose();
  };

  return (
    <Drawer
      title={isAdding ? t('addingData') : isEditing ? t('editData') : t('detailData')}
      width={400}
      onClose={onClose}
      open={visible}
      styles={{ paddingBottom: 80 }}
      footer={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          {isEditing ? (
            <>
              <Button onClick={handleCancel}>{t('cancelBtn')}</Button>
              <Button type="primary" onClick={handleSave}>
                {t('saveBtn')}
              </Button>
            </>
          ) : (
            <>
              <Popconfirm
                title={t('confirmDelete')}
                onConfirm={handleDelete}
                okText={t('deleteBtn')}
                cancelText={t('cancelBtn')}
              >
                <Button danger icon={<DeleteOutlined />}>
                  {t('deleteBtn')}
                </Button>
              </Popconfirm>
              <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                {t('editBtn')}
              </Button>
            </>
          )}
        </Space>
      }
    >
      {isEditing ? (
        <Form form={form} layout="vertical">
          {fieldsConfig.map((field) => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              {...(field.rules ? { rules: field.rules } : {})}
            >
              {field.type === 'date' ? (
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              ) : field.type === 'select' && field.options ? (
                <Select style={{ width: '100%' }}>
                  {field.options.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Input />
              )}
            </Form.Item>
          ))}
        </Form>
      ) : (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {fieldsConfig.map((field) => (
            <div key={field.name}>
              <Text strong>{field.label}: </Text>
              <Text>
                {['thoiGian', 'dob'].includes(field.name) && record?.[field.name]
                  ? dayjs(record[field.name], 'DD/MM/YYYY').format('DD/MM/YYYY')
                  : ['loai', 'status', 'trangThai', 'vaiTro'].includes(field.name) && record?.[field.name]
                  ? t(record[field.name])
                  : record?.[field.name] || ''}
              </Text>
            </div>
          ))}
        </Space>
      )}
    </Drawer>
  );
};

export default CarbonDrawer;
