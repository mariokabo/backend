import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Requests.css";

const socket = io("https://b8fb2cfc-6b2e-4cfe-b8bc-80d780b52dd1-00-3ffyp5ubnqsg5.picard.replit.dev/api/request"); // غير العنوان إذا كنت على دومين

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // تعريف الممرض أونلاين عند فتح الصفحة
    socket.emit("providerOnline", { name: "اسم الممرض" });

    // استقبال إشعار طلب جديد
    socket.on("requestNotification", (requestData) => {
      setRequests((prev) => [requestData, ...prev]);
      alert("طلب جديد من مريض: " + requestData.patientName);
    });

    // تنظيف عند الخروج
    return () => socket.disconnect();
  }, []);

  function handleAccept(idx) {
    setRequests((reqs) =>
      reqs.map((req, i) =>
        i === idx ? { ...req, status: "مقبول" } : req
      )
    );
  }
  function handleReject(idx) {
    setRequests((reqs) =>
      reqs.map((req, i) =>
        i === idx ? { ...req, status: "مرفوض" } : req
      )
    );
  }

  return (
    <div className="requests-main">
      <h2>الطلبات الجديدة</h2>
      {requests.length === 0 && (
        <div className="empty">لا يوجد طلبات حالياً.</div>
      )}
      {requests.map((req, idx) => (
        <div className="request-card" key={idx}>
          <div>
            <b>اسم المريض:</b> {req.patientName}
          </div>
          <div>
            <b>العنوان:</b> {req.location}
          </div>
          <div>
            <b>رقم الهاتف:</b> {req.phone}
          </div>
          <div>
            <b>الخدمات المطلوبة:</b> {req.services && req.services.join(", ")}
          </div>
          <div>
            <b>الحالة:</b>{" "}
            <span className={"status-" + (req.status || "جديد")}>
              {req.status || "جديد"}
            </span>
          </div>
          {(!req.status || req.status === "جديد") && (
            <div className="req-actions">
              <button
                onClick={() => handleAccept(idx)}
                className="accept-btn"
              >
                قبول
              </button>
              <button
                onClick={() => handleReject(idx)}
                className="reject-btn"
              >
                رفض
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}