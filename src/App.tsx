import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import CombinedView from "Pages/CombinedView";
import Header from "./Components/Header";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header title="Education Vertical"/>
        <Routes>
          <Route path="/" element={<Navigate to="/education" />} />
          <Route path="/education/*" element={<Dashboard />} />
          <Route path="/combined" element={<CombinedView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
