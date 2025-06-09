import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./Layout/Main"; // Đường dẫn đến Main.jsx
import CarbonMarketDashboard from "./Component/Overview"; // Import CarbonMarketDashboard từ Overview.jsx
import "antd/dist/reset.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Main />}>
          <Route path="/dashboard" element={<CarbonMarketDashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;