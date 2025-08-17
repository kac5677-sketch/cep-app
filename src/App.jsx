import React from "react";

export default function App() {
  return (
    <div style={{minHeight: "100vh", display:"grid", placeItems:"center", fontFamily:"system-ui, -apple-system, Segoe UI, Roboto"}}>
      <div style={{textAlign:"center"}}>
        <h1 style={{fontSize: "40px", marginBottom: 8}}>CEP Profile</h1>
        <p style={{opacity:.7, marginBottom: 16}}>Find Your Color, Flow Your Energy</p>
        <p style={{marginTop: 8}}>✅ Smoke Test OK — Vercel & React are working.</p>
        <p style={{marginTop: 8}}>이 화면이 보이면 배포 환경은 정상입니다.<br/>이제 App.jsx를 본 버전으로 교체하세요.</p>
      </div>
    </div>
  );
}
