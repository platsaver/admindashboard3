import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./Layout/Main";
import Partners from './Component/Partners/Partners';
import Standards from './Component/Standards/Standards';
import PersonnelList from "./Component/Partners/Personnel";
import Metrics from './Component/Standards/Metrics';
import Activities from './Component/Operations/Activities';
import Events from './Component/Operations/Events';
import Reports from './Component/Operations/Reports';
import VerifyForm from './Authorization/VerifyForm';
import LoginForm from './Authorization/LoginForm';
import PrivateRoute from './Authorization/PrivateRoute';
import "antd/dist/reset.css";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public route */}
        <Route path="/verify" element={<VerifyForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Main />}>
            <Route path="/partners" element={<Partners />} />
            <Route path="/standards" element={<Standards />} />
            <Route path="/personnel" element={<PersonnelList />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/events" element={<Events />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/verify" replace />} />
      </Routes>
    </div>
  );
}

export default App;
