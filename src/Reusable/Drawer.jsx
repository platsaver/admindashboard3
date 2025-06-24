import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, Button, Space, Popconfirm, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CarbonDrawer = ({ visible, onClose, record, onUpdate, onAdd, onDelete, fieldsConfig, isAdding }) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(isAdding);

  useEffect(() => {
    if (isAdding) {
      form.resetFields();
      setIsEditing(true);
    } else if (record) {
      form.setFieldsValue(record);
      setIsEditing(false);
    }
  }, [isAdding, record, form]);

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(record);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
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
      title={isAdding ? 'Thêm tiêu chuẩn mới' : isEditing ? 'Chỉnh sửa thông tin' : 'Thông tin chi tiết'}
      width={400}
      onClose={onClose}
      open={visible}
      styles={{ paddingBottom: 80 }}
      footer={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          {isEditing ? (
            <>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="primary" onClick={handleSave}>
                Lưu
              </Button>
            </>
          ) : (
            <>
              <Popconfirm
                title="Bạn có chắc muốn xóa?"
                onConfirm={handleDelete}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Xóa
                </Button>
              </Popconfirm>
              <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                Chỉnh sửa
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
              rules={field.rules || [{ required: true, message: `${field.label} là bắt buộc` }]}
            >
              <Input />
            </Form.Item>
          ))}
        </Form>
      ) : (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {fieldsConfig.map((field) => (
            <div key={field.name}>
              <Text strong>{field.label}: </Text>
              <Text>{record ? record[field.name] : ''}</Text>
            </div>
          ))}
        </Space>
      )}
    </Drawer>
  );
};

export default CarbonDrawer;