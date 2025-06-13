import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import OrderNow from "./components/OrderNow";
import TrackOrder from "./components/TrackOrder";
import Settings from "./components/Settings";
import "./App.css";

export default function App() {
  // الصفحة النشطة: 'order', 'profile', 'track', 'settings'
  const [activeTab, setActiveTab] = useState("order");

  // إظهار شاشة الترحيب أول مرة فقط
  const [showWelcome, setShowWelcome] = useState(true);

  React.useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  return (
    <div className="app-root">
      {showWelcome ? (
        <div className="welcome-screen">
          <h1>أهلاً بيك في <span style={{color: "#38b2ac"}}>MarioSNurse</span> للرعاية الصحية</h1>
        </div>
      ) : (
        <div className="main-layout">
          <div className="main-content">
            {activeTab === "order" && <OrderNow />}
            {activeTab === "profile" && <Profile />}
            {activeTab === "track" && <TrackOrder />}
            {activeTab === "settings" && <Settings />}
          </div>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      )}
    </div>
  );
}