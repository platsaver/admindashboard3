import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      overview: "Overview",
      partners: "Partners List",
      personnel: "Personnel",
      standards: "Standards",
      metrics: "Metrics",
      operations: "Operations",
      activities: "Activities",
      reports: "Reports",
      events: "Events",
    },
  },
  vi: {
    translation: {
      overview: "Tổng quan",
      partners: "Danh sách đối tác",
      personnel: "Nhân sự",
      standards: "Bộ tiêu chuẩn",
      metrics: "Bộ chỉ số",
      operations: "Vận hành",
      activities: "Hoạt động",
      reports: "Báo cáo",
      events: "Sự kiện",
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