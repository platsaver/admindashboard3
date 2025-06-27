import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Space } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '@ant-design/v5-patch-for-react-19';

const VerifyForm = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onFinish = (values) => {
    axios.post('https://api.tinchicarbon.com/v1/auth/cknid', {
      national_id: values.username,
      device_id: values.deviceId,
      language: i18n.language,
    }, {
      headers: {
        'x-device-id': values.deviceId,
        'x-forwarded-for': '127.0.0.1',
        'x-app-version': '1.0.0',
        'x-location-info': 'unknown',
        'accept-language': i18n.language,
        'the-timezone-iana': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    })
    .then((res) => {
      const { data, meta } = res.data;
      if (meta?.success && data?.access_code) {
        message.success(meta.message || t('Verify Success'));
        navigate('/login', {
          state: {
            accessCode: data.access_code,
            nationalId: values.username,
            deviceId: values.deviceId,
            language: i18n.language,
          }
        });
      }
    })
    .catch((error) => { 
      message.error(t('Server Error'));
      console.error(error); 
    });
  };

  return (
    <Card
      title={
        <Space style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>{t('userVerification')}</span>
          <Space>
            <Button onClick={() => changeLanguage('vi')}>VI</Button>
            <Button onClick={() => changeLanguage('en')}>EN</Button>
          </Space>
        </Space>
      }
      style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={t('nationalID')}
          name="username"
          rules={[{ required: true, message: t('nationalIdRequired') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('deviceID')}
          name="deviceId"
          rules={[{ required: true, message: t('deviceIdRequired') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t('verify')}
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center', marginTop: -12 }}>
          <span>{t('forgotPrompt')}&nbsp;</span>
          <a onClick={() => navigate('/forgot')}>
            {t('forgotPassword')}
          </a>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default VerifyForm;
