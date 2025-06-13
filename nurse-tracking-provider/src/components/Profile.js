import React, { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState({
    name: "محمود خالد",
    role: "ممرض",
    address: "مصر الجديدة",
    phone: "01000000000",
    email: "example@email.com",
    photo: "",
    idImage: ""
  });

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }
  function handleSave() {
    setEdit(false);
    // هنا يمكنك مستقبلا إرسال البيانات للسيرفر
  }

  return (
    <div className="profile-main">
      <div className="profile-card">
        <img src={profile.photo || "/user-placeholder.png"} alt="صورة المستخدم" className="profile-img" />
        {edit ? (
          <>
            <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="الاسم" />
            <input type="text" name="role" value={profile.role} onChange={handleChange} placeholder="الوظيفة" />
            <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="العنوان" />
            <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="رقم الهاتف" />
            <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="البريد الإلكتروني" />
            <button onClick={handleSave}>حفظ</button>
          </>
        ) : (
          <>
            <h3>{profile.name}</h3>
            <div>{profile.role}</div>
            <div>العنوان: {profile.address}</div>
            <div>رقم الهاتف: {profile.phone}</div>
            <div>البريد الإلكتروني: {profile.email}</div>
            <button onClick={() => setEdit(true)}>تعديل البيانات</button>
          </>
        )}
      </div>
    </div>
  );
}