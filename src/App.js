import { Routes, Route, Navigate } from "react-router-dom";
import Main from './Layout/Main'; // Verify this path
import "antd/dist/reset.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Main />}>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;