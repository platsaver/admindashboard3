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
      partnerSearch: 'Finding with name, email, address or phone number ...',
      /*Personnel*/
      role: 'Role', 
      dob: 'Date of birth',
      retiredReason: 'Reason',
      working: 'Working',
      retired: 'Retired',
      personnelSearch: 'Finding with name, email, role or phone number ...',
      /*Standards*/
      type: 'Type', 
      description: 'Description',
      applied: 'Applied',
      required: 'Required',
      constructing: 'Constructing',
      standardSearch: 'Finding carbon standards ... ',
      international: 'International',
      laws: 'Laws',
      national: 'National',
      /*Metrics*/
      value: 'Value',
      metricSearch: "Searching for carbon metrics...",
      emission: 'Emission',
      offset: 'Compensation',
      carbonAsset: 'Carbon facilities',
      policy: 'Policy',
      /*Activities*/
      time: 'Time',
      complete: 'Complete',
      supervised: 'Supervised',
      expected: 'Expected',
      processing: 'Processing',
      searchActivities: 'Searching for activity ...',
      /*Drawer*/
      addingData: 'Add',
      editData: 'Edit data',
      detailData: 'Detail Information',
      confirmDelete: 'Are your sure to delete?',
      deleteBtn: 'Delete',
      editBtn: 'Edit',
      saveBtn: 'Save',
      cancelBtn: 'Cancel',
      isRequired: 'is required',
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
      partnerSearch: 'Tìm kiếm theo tên, email, địa chỉ hoặc số điện thoại...',
      /*Personnel*/
      role: 'Vai trò', 
      dob: 'Ngày sinh',
      staff: 'Nhân viên', 
      manager: 'Quản lý',
      professional: 'Hỗ trợ cấp chứng chỉ/Chuyên gia',
      admin: 'Quản trị viên',
      superAdmin: 'Siêu quản trị viên',
      retiredReason: 'Lý do',
      working: 'Đang làm việc',
      retired: 'Nghỉ việc',
      personnelSearch: 'Tìm kiếm theo tên, email, vai trò hoặc số điện thoại...',
      /*Standards*/
      type: 'Loại', 
      description: 'Mô tả',
      applied: 'Đã áp dụng',
      required: 'Bắt buộc',
      constructing: 'Đang xây dựng',
      standardSearch: 'Tìm kiếm tiêu chuẩn carbon ... ',
      international: 'Quốc tế',
      laws: 'Pháp lý',
      national: 'Quốc gia',
      /*Metrics*/
      value: 'Giá trị',
      metricSearch: "Tìm kiếm chỉ số carbon...",
      emission: 'Phát thải',
      offset: 'Bù trừ',
      carbonAsset: 'Tài sản carbon',
      policy: 'Chính sách',
      /*Activities*/
      time: 'Thời gian',
      complete: 'Hoàn thành',
      supervised: 'Đang theo dõi',
      expected: 'Dự kiến',
      processing: 'Đang thực hiện',
      searchActivities: 'Tìm kiếm hoạt động ...',
      /*Events*/
      searchEvents: 'Tìm kiếm sự kiện ...',
      upcoming: 'Sắp diễn ra',
      continuing: 'Đang diễn ra', 
      /*Drawer*/
      addingData: 'Thêm',
      editData: 'Chỉnh sửa thông tin',
      detailData: 'Thông tin chi tiết',
      confirmDelete: 'Bạn có chắc muốn xóa?',
      deleteBtn: 'Xóa',
      editBtn: 'Sửa',
      saveBtn: 'Lưu',
      cancelBtn: 'Hủy',
      isRequired: 'là bắt buộc',
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