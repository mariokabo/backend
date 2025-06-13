import React from "react";
import "./Settings.css";

export default function Settings() {
  return (
    <div className="settings-main">
      <h2>الإعدادات</h2>
      <ul>
        <li>إعدادات الحساب</li>
        <li>إعدادات التطبيق</li>
        <li>الإحصائيات</li>
        <li>تسجيل الخروج</li>
      </ul>
    </div>
  );
}