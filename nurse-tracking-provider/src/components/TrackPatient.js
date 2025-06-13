import React, { useState } from "react";
import "./TrackPatient.css";

export default function TrackPatient() {
  // بيانات مكان المريض تجريبية
  const [location] = useState({ lat: 30.0444, lng: 31.2357, name: "مصر الجديدة" });
  const [patientName] = useState("أحمد محمد");

  return (
    <div className="track-main">
      <h2>تتبع المريض</h2>
      <div className="track-info">
        <b>اسم المريض:</b> {patientName}<br />
        <b>الموقع الحالي:</b> {location.name}
      </div>
      <div className="track-map">
        <iframe
          title="خريطة المريض"
          width="100%"
          height="300"
          style={{ borderRadius: "18px", marginTop: "12px" }}
          frameBorder="0"
          src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
          allowFullScreen
        />
      </div>
    </div>
  );
}