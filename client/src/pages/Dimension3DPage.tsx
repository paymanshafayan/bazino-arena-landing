import React, { useEffect } from "react";

export default function Dimension3DPage() {
  useEffect(() => {
    document.title = "بازینو — پورتال سه‌بعدی و کلاب گیمینگ VIP | Bazino 3D Dimension";
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#06070a" }}>
      <iframe
        src="/bazino-3d.html"
        title="Bazino 3D Dimension"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block"
        }}
      />
    </div>
  );
}
