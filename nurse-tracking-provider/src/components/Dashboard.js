import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-main">
      <h2>مرحباً بك في لوحة مقدم الرعاية الصحية 👩‍⚕️</h2>
      <div className="dashboard-card">
        <p>
          يمكنك الآن استقبال طلبات المرضى، تحديث موقعك، وتتبع الحالات الطبية بسهولة وسرعة!
        </p>
        <ul>
          <li>راجع الطلبات الجديدة وقم بقبول أو رفض أي طلب</li>
          <li>تابع موقعك الجغرافي لحظيًا</li>
          <li>حدث بياناتك الشخصية في أي وقت</li>
        </ul>
      </div>
    </div>
  );
}