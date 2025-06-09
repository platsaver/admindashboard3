import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./Layout/Main"; 
import CarbonMarketDashboard from "./Component/Overview"; 
import Partners from './Component/Partners';
import Standards from './Component/Standards';
import PersonnelList from "./Component/Personnel";
import Metrics from './Component/Metrics';
import "antd/dist/reset.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Main />}>
          <Route path="/dashboard" element={<CarbonMarketDashboard />} />
          <Route path="/partners" element={<Partners/>} />
          <Route path="/standards" element={<Standards/>}/>
          <Route path="/personnel" element={<PersonnelList/>}/>
          <Route path="/metrics" element={<Metrics />}/>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;