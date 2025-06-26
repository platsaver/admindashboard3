import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessCode, nationalId, deviceId, language } = location.state || {};
  const { t } = useTranslation();

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
          message.success(meta.message || 'Login successful');
          navigate('/partners');
        } else {
        message.error(meta.message || 'Login unsuccessful');
        }
    })
    .catch(function (error) {
        if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        message.error(error.response.data?.meta?.message || 'Error response from the server');
        } else if (error.request) {
        console.log(error.request);
        message.error('Cannot receive response from server');
        } else {
        console.log('Error', error.message);
        message.error('Error when sending request');
        }
        console.log(error.config);
    });
    };

  return (
    <Card title={t('EnterPassword')} style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label={t('password')} name="password" rules={[{ required: true, message: t('passwordRequired') }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>{t('login')}</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
