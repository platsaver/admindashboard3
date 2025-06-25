import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import '@ant-design/v5-patch-for-react-19';

const LoginForm = () => {
  const onFinish = (values) => {
    const userAgent = navigator.userAgent;
    const language = navigator.language || 'vi';
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const ip = '127.0.0.1'; // ⚠️ placeholder
    const locationInfo = 'unknown';

    axios.post(
      'https://api.tinchicarbon.com/v1/auth/cknid',
      {
        national_id: values.username,
        device_id: values.deviceId,
        language: 'vi'
      },
      {
        headers: {
          'x-device-id': values.deviceId,
          'x-forwarded-for': ip,
          'x-app-version': '1.0.0',
          'x-location-info': locationInfo,
          'accept-language': language,
          'the-timezone-iana': timezone
        }
      }
    )
    .then((response) => {
      const { data, meta } = response.data;
      if (meta?.success) {
        message.success(meta.message || 'Đăng nhập thành công');
        console.log('Access Code:', data.access_code);
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '/partners';
      } else {
        message.error(meta.message || 'Đăng nhập thất bại');
      }
    })

    .catch((error) => {
      if (error.response) {
        console.log('Server responded with an error:', error.response);
        message.error(error.response.data?.meta?.message || 'Lỗi từ máy chủ');
      } else if (error.request) {
        console.log('No response received:', error.request);
        message.error('Không nhận được phản hồi từ máy chủ');
      } else {
        console.log('Error setting up request:', error.message);
        message.error('Lỗi khi gửi yêu cầu đăng nhập');
      }
      console.log('Error config:', error.config);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card title="Đăng nhập" style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
      <Form
        name="loginForm"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Mã căn cước công dân"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập mã căn cước công dân!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Device ID"
          name="deviceId"
          rules={[{ required: true, message: 'Vui lòng nhập Device ID!' }]}
        >
          <Input placeholder="Nhập device_id ở định dạng UUID" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
