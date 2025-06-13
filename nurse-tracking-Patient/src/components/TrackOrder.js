import React from "react";
import MapSection from "./MapSection";
import "./TrackOrder.css";

export default function TrackOrder() {
  // بيانات تجريبية للحالة
  const status = "الممرض في الطريق، متبقي 7 دقائق...";
  // location يمكن ربطها بموقع الممرض لاحقاً
  return (
    <div className="track-main">
      <h2>متابعة الطلب</h2>
      <div className="track-status">{status}</div>
      <div className="track-map">
        <MapSection location={{lat: 30.0444, lng: 31.2357}} searching={false} />
      </div>
    </div>
  );
}