import React, { useState } from "react";
import "./OrderNow.css";

const nurseServices = [
  "قياس الضغط", "قياس السكر", "حقن عضل", "حقن وريد", "تعليق محاليل", "تركيب كانيولا", "تركيب قسطرة بول", "إزالة قسطرة بول", "خياطة جرح", "رعاية جرح", "تغيير جبس", "إزالة جبس", "قياس حرارة", "قياس معدل تنفس", "إعطاء أدوية بالفم", "رعاية مريض فراش", "مراقبة العلامات الحيوية", "رعاية بعد عمليات", "رعاية تقرحات الفراش", "رسم قلب منزلي"
];

const doctorSpecialties = [
  "باطنة", "أطفال", "عظام", "جلدية", "نساء وتوليد", "مخ وأعصاب", "جراحة عامة", "صدرية", "قلب وأوعية دموية", "أنف وأذن", "عيون", "أسنان", "مسالك بولية", "أورام", "نفسية وعصبية"
];

const pharmacistServices = [
  "وصفة طبية", "صرف روشتة", "دواء معين", "استشارة سريعة بدون روشتة"
];

export default function OrderNow() {
  const [form, setForm] = useState({
    patientName: "",
    locationText: "",
    phone: "",
    providerType: "ممرض",
    services: [],
    doctorService: "",
    doctorSpecialty: "",
    pharmacistService: "",
    prescriptionImage: null,
    lat: "",
    lng: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  // التقاط الموقع من الخريطة
  function handleMapClick(e) {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setForm((prev) => ({ ...prev, lat, lng }));
  }

  // استدعاء خريطة جوجل (بسيطة)
  React.useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 30.0444, lng: 31.2357 },
        zoom: 12,
      });
      let marker = null;
      map.addListener("click", (e) => {
        if (marker) marker.setMap(null);
        marker = new window.google.maps.Marker({
          position: e.latLng,
          map: map,
        });
        handleMapClick(e);
      });
    }
  }, []);

  // اختيار نوع مقدم الخدمة
  const providerTypes = ["ممرض", "طبيب", "فني", "علاج طبيعي", "صيدلي"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value, services: [], doctorService: "", doctorSpecialty: "", pharmacistService: "", prescriptionImage: null });
  };

  const handleServiceChange = (service) => {
    setForm((prev) => {
      const exists = prev.services.includes(service);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== service) };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };

  const handleDoctorServiceChange = (e) => {
    setForm({ ...form, doctorService: e.target.value });
  };

  const handleDoctorSpecialtyChange = (e) => {
    setForm({ ...form, doctorSpecialty: e.target.value });
  };

  const handlePharmacistServiceChange = (e) => {
    setForm({ ...form, pharmacistService: e.target.value });
  };

  const handlePrescriptionImage = (e) => {
    setForm({ ...form, prescriptionImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // تجهيز البيانات للإرسال
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => data.append(key, v));
      } else if (value !== null) {
        data.append(key, value);
      }
    });

    // إرسال للـ backend (غير الرابط عند النشر)
    fetch("https://b8fb2cfc-6b2e-4cfe-b8bc-80d780b52dd1-00-3ffyp5ubnqsg5.picard.replit.dev/api/request", {
  method: "POST",
  body: JSON.stringify(data),
})
      .then((res) => res.json())
      .then(() => {
        setSending(false);
        setDone(true);
        setForm({
          patientName: "",
          locationText: "",
          phone: "",
          providerType: "ممرض",
          services: [],
          doctorService: "",
          doctorSpecialty: "",
          pharmacistService: "",
          prescriptionImage: null,
          lat: "",
          lng: "",
        });
      })
      .catch(() => setSending(false));
  };

  // الخدمات حسب الاختيار
  let servicesSection = null;
  if (form.providerType === "ممرض") {
    servicesSection = (
      <div className="services-list">
        {nurseServices.map((service) => (
          <label className="service-checkbox" key={service}>
            <input
              type="checkbox"
              checked={form.services.includes(service)}
              onChange={() => handleServiceChange(service)}
            />
            {service}
          </label>
        ))}
      </div>
    );
  } else if (form.providerType === "طبيب") {
    servicesSection = (
      <>
        <label>اختر نوع الخدمة المطلوبة:</label>
        <select value={form.doctorService} onChange={handleDoctorServiceChange}>
          <option value="">اختر...</option>
          <option value="كشف منزلي">كشف منزلي</option>
          <option value="استشارة">استشارة</option>
        </select>
        <label>اختر التخصص:</label>
        <select value={form.doctorSpecialty} onChange={handleDoctorSpecialtyChange}>
          <option value="">اختر التخصص...</option>
          {doctorSpecialties.map((sp) => (
            <option key={sp} value={sp}>{sp}</option>
          ))}
        </select>
      </>
    );
  } else if (form.providerType === "صيدلي") {
    servicesSection = (
      <>
        <label>اختر الخدمة المطلوبة:</label>
        <select value={form.pharmacistService} onChange={handlePharmacistServiceChange}>
          <option value="">اختر...</option>
          {pharmacistServices.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {form.pharmacistService === "صرف روشتة" && (
          <div>
            <label>ارفع صورة الروشتة:</label>
            <input type="file" accept="image/*" onChange={handlePrescriptionImage} />
          </div>
        )}
      </>
    );
  } else {
    servicesSection = <div>الخدمات ستظهر هنا حسب نوع مقدم الخدمة</div>;
  }

  if (done)
    return (
      <div className="order-done-msg">
        ✅ تم إرسال الطلب بنجاح! <br />
        سيتم التواصل مع أقرب مقدم خدمة متاح.
        <br />
        <button onClick={() => setDone(false)}>طلب جديد</button>
      </div>
    );

  return (
    <div className="order-now-container">
      <h2 style={{ textAlign: "center", color: "#215175", marginBottom: 12 }}>احجز مقدم خدمة صحية</h2>
      {/* الخريطة */}
      <div id="map" style={{ width: "100%", height: "300px", borderRadius: "18px", marginBottom: "18px" }}></div>
      <form className="order-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="label">اسمك</label>
        <input type="text" name="patientName" value={form.patientName} onChange={handleChange} required />

        <label className="label">العنوان أو الموقع</label>
        <input type="text" name="locationText" value={form.locationText} onChange={handleChange} required />

        <label className="label">رقم التليفون</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} required />

        <label className="label">نوع مقدم الخدمة</label>
        <select name="providerType" value={form.providerType} onChange={handleChange}>
          {providerTypes.map((type) => (
            <option value={type} key={type}>{type}</option>
          ))}
        </select>

        <label className="label">الخدمات المطلوبة</label>
        {servicesSection}

        <button
          className="location-btn"
          type="submit"
          disabled={sending || (form.providerType === "ممرض" && form.services.length === 0) || (form.providerType === "طبيب" && (!form.doctorService || !form.doctorSpecialty)) || (form.providerType === "صيدلي" && !form.pharmacistService)}
        >
          {sending ? "جاري الإرسال..." : "إرسال الطلب"}
        </button>
      </form>
    </div>
  );
}