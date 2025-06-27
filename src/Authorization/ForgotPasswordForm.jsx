import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Space, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import '@ant-design/v5-patch-for-react-19';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.tinchicarbon.com/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-agent': navigator.userAgent,
          'x-forwarded-for': '127.0.0.1',
          'x-app-version': '1.0.0',
          'x-location-info': 'unknown',
          'accept-language': i18n.language,
          'the-timezone-iana': Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        body: JSON.stringify({
          national_id: values.username,
          device_id: values.deviceId,
          date_of_birth: values.dob.format('YYYY-MM-DD'),
          new_password: values.newPassword,
        }),
      });

      const res = await response.json();
      const { meta } = res;

      if (meta?.success) {
        message.success(meta.message || 'Password reset successful');
        navigate('/verify');
      } else {
        message.error(meta?.message || 'Reset failed');
      }
    } catch (err) {
      console.error(err);
      message.error('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={
        <Space style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>{t('forgotPassword')}</span>
          <Space>
            <Button onClick={() => changeLanguage('vi')}>VI</Button>
            <Button onClick={() => changeLanguage('en')}>EN</Button>
          </Space>
        </Space>
      }
      style={{ maxWidth: 450, margin: 'auto', marginTop: 100 }}
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
        <Form.Item
          label={t('dob')}
          name="dob"
          rules={[{ required: true, message: t('dobRequired') }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={t('newPassword')}
          name="newPassword"
          rules={[{ required: true, message: t('newPasswordRequired') }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {t('saveBtn')}
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center', marginTop: -12 }}>
          <Button
            type="link"
            onClick={() => navigate('/verify')}
          >
            {t('backToVerify')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ForgotPasswordForm;
