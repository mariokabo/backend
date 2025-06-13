import React from "react";
import "./Navbar.css";

export default function Navbar({activeTab, setActiveTab}) {
  const navs = [
    {key: "dashboard", label: "الرئيسية", icon: "🏠"},
    {key: "requests", label: "الطلبات", icon: "📋"},
    {key: "track", label: "تتبع مريض", icon: "📍"},
    {key: "profile", label: "حسابي", icon: "👤"},
    {key: "settings", label: "الإعدادات", icon: "⚙️"},
  ];
  return (
    <nav className="bottom-navbar">
      {navs.map((nav) => (
        <button
          key={nav.key}
          className={activeTab === nav.key ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab(nav.key)}
        >
          <span className="nav-icon">{nav.icon}</span>
          <span>{nav.label}</span>
        </button>
      ))}
    </nav>
  );
}