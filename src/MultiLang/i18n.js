import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      /*VerifyForm*/
      userVerification: 'User Verification',
      nationalID: 'National ID',
      nationalIdRequired: 'National ID is required',
      deviceIdRequired: 'Device ID is required',
      deviceID: 'Device ID',
      verify: 'Verify',
      /*LoginForm*/
      EnterPassword: 'Enter password',
      password: 'Password',
      passwordRequired: 'Password field must not be blank',
      login: 'Login',
      /*Partner*/
      name: 'Name',
      email: 'Email',
      address: 'Address',
      phone: 'Phone',
      status: 'Status',
      active: 'active',
      inactive: 'inactive',
      pending: 'Pending',
      partnerSearch: 'Finding with name, email, address or phone number ...',
      /*SideBar*/
      partners: 'Partners',
      personnel: 'Personnel',
      standards: 'Standards',
      metrics: 'Metrics',
      operations: 'Operations',
      activities: 'Activities',
      reports: 'Report',
      events: 'Event'
    },
  },
  vi: {
    translation: {
      /*VerifyForm*/
      userVerification: 'Xác minh người dùng',
      nationalID: 'Mã căn cước công dân',
      nationalIdRequired: 'Mã số căn cước công dân là bắt buộc',
      deviceIdRequired: 'Mã thiết bị là bắt buộc',
      deviceID: 'Mã thiết bị',
      verify: 'Xác minh',
      /*LoginForm*/
      EnterPassword: 'Nhập mật khẩu',
      password: 'Mật khẩu',
      passwordRequired: 'Trường mật khẩu không được để trống',
      login: 'Đăng nhập',
      /*Partner*/
      name: 'Tên',
      email: 'Email',
      address: 'Địa chỉ',
      phone: 'Số điện thoại',
      status: 'Trạng thái',
      active: 'Hoạt động',
      inactive: 'Ngừng hoạt động',
      pending: 'Chờ duyệt',
      partnerSearch: 'Tìm kiếm theo tên, email, địa chỉ hoặc số điện thoại...',
      /*SideBar*/
      partners: 'Đối tác',
      personnel: 'Nhân sự',
      standards: 'Tiêu chuẩn',
      metrics: 'Chỉ số',
      operations: 'Vận hành',
      activities: 'Hoạt động',
      reports: 'Báo cáo',
      events: 'Sự kiện'
    },
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "vi", 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;