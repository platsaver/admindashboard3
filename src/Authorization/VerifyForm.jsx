import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';

const VerifyForm = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios.post('https://api.tinchicarbon.com/v1/auth/cknid', {
      national_id: values.username,
      device_id: values.deviceId,
      language: 'vi',
    }, {
      headers: {
        'x-device-id': values.deviceId,
        'x-forwarded-for': '127.0.0.1',
        'x-app-version': '1.0.0',
        'x-location-info': 'unknown',
        'accept-language': navigator.language || 'vi',
        'the-timezone-iana': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    })
    .then((res) => {
      const { data, meta } = res.data;
      if (meta?.success && data?.access_code) {
        message.success(meta.message || 'Xác minh thành công');
        console.log('National ID:', values.username);
        console.log('Device ID:', values.deviceId);
        console.log('Access Code:', data.access_code);
        navigate('/login', {
          state: {
            accessCode: data.access_code,
            nationalId: values.username,
            deviceId: values.deviceId,
            language: 'vi',
          }
        });
      } else {
        message.error(meta.message || 'Không xác minh được');
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        message.error(error.response.data?.meta?.message || 'Lỗi phản hồi từ máy chủ');
      } else if (error.request) {
        console.log(error.request);
        message.error('Không nhận được phản hồi từ máy chủ');
      } else {
        console.log('Error', error.message);
        message.error('Lỗi khi gửi yêu cầu xác minh');
      }
      console.log(error.config);
    });
  };

  return (
    <Card title="Xác minh người dùng" style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="CCCD" name="username" rules={[{ required: true, message: 'Nhập CCCD' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Device ID" name="deviceId" rules={[{ required: true, message: 'Nhập Device ID' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Xác minh</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default VerifyForm;
