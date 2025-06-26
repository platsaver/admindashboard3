import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessCode, nationalId, deviceId, language } = location.state || {};

  const onFinish = (values) => {
    console.log('National ID:', nationalId);
    console.log('Device ID:', deviceId);
    console.log('Language:', language);
    console.log('Access Code:', accessCode);
    console.log('Password:', values.password);
    axios.post('https://api.tinchicarbon.com/v1/auth/login', {
        national_id: nationalId,
        device_id: deviceId,
        language,
        password: values.password,
        access_code: accessCode,
    }, {
        headers: {
        'x-device-id': deviceId,
        'x-forwarded-for': '127.0.0.1',
        'x-app-version': '1.0.0',
        'x-location-info': 'unknown',
        'accept-language': navigator.language || 'vi',
        'the-timezone-iana': Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
    })
    .then((res) => {
        const { data, meta } = res.data;
        if (meta?.success && data?.access_token) {
          console.log('Access token:', data.access_token);
          localStorage.setItem('access_token', data.access_token);
          message.success(meta.message || 'Đăng nhập thành công');
          navigate('/partners');
        } else {
        message.error(meta.message || 'Đăng nhập thất bại');
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
        message.error('Lỗi khi gửi yêu cầu đăng nhập');
        }
        console.log(error.config);
    });
    };

  return (
    <Card title="Đăng nhập bằng mật khẩu" style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Nhập mật khẩu' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Đăng nhập</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
