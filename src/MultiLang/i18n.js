import { all } from 'axios';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
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