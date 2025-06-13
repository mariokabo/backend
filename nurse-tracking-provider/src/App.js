import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Requests from "./components/Requests";
import Profile from "./components/Profile";
import TrackPatient from "./components/TrackPatient";
import Settings from "./components/Settings";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="app-root">
      <div className="main-layout">
        <div className="main-content">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "requests" && <Requests />}
          {activeTab === "track" && <TrackPatient />}
          {activeTab === "profile" && <Profile />}
          {activeTab === "settings" && <Settings />}
        </div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}