import React, { useState } from "react";
import "./Profile.css";

export default function Profile() {
  // بيانات تجريبية (يمكنك ربطها بـ backend لاحقاً)
  const [role, setRole] = useState("مريض");
  return (
    <div className="profile-main">
      <div className="profile-card">
        <img src="/user-placeholder.png" alt="صورة المستخدم" className="profile-img" />
        <h3>محمد علي</h3>
        <p className="profile-role">{role}</p>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option>مريض</option>
          <option>ممرض</option>
          <option>دكتور</option>
          <option>صيدلي</option>
          <option>فني</option>
          <option>علاج طبيعي</option>
          <option>تخصص آخر</option>
        </select>
        <div className="profile-info">
          <div>العنوان: القاهرة الجديدة</div>
          <div>رقم الهاتف: 01000000000</div>
          <div>البريد الإلكتروني: example@email.com</div>
          <div>التحقق: <img src="/id-card.png" alt="بطاقة شخصية" style={{height: 32, verticalAlign: "middle"}}/></div>
        </div>
      </div>
    </div>
  );
}