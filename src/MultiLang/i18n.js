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
      english: "English",
      vietnamese: "Vietnamese",
      featuredcompanies: "Featured Companies in carbon credit market",
      recentpolicies: "Recent Policies",
      recentprojects: "Recent Carbon Credits Projects",
      tradingvolume: "Trading Volume",
      priceCarbonChart: "Carbon Credit Price Chart",
      companies: "Companies",
      role: "Role",
      buy: "Buyer",
      sell: "Seller",
      registrar: "Registrar",
      trader: "Trader",
      developer: "Developer",
      volume: "Volume (MtCO2e)",
      marketVolume: "Market Trading Volume",
      market: "Market",
      trending: "Price carbon credits trend",
      price: "Price (USD/tCO2e)",
      days: "Days",
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
      english: "Tiếng Anh",
      vietnamese: "Tiếng Việt", 
      featuredcompanies: "Các công ty nổi bật trong thị trường tín chỉ carbon",
      recentpolicies: "Các chính sách gần đây",
      recentprojects: "Các dự án tín chỉ carbon gần đây",
      tradingvolume: "Khối lượng giao dịch",
      priceCarbonChart: "Biểu đồ giá tín chỉ carbon",
      companies: "Các công ty",
      role: "Vai trò",
      buy: "Người mua",
      sell: "Người bán",
      registrar: "Người đăng ký",
      trader: "Người giao dịch",
      developer: "Nhà phát triển",
      volume: "Khối lượng (MtCO2e)",
      marketVolume: "Khối lượng giao dịch theo thị trường",
      market: "Thị trường",
      trending: "Xu hướng giá tín chỉ carbon",
      price: "Giá (USD/tCO2e)",
      days: "Ngày",
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