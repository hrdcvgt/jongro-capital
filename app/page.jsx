"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    contactMethod: "phone",
    contactValue: "",
    region: "",
    amount: "",
    existingLoans: "",
    request: "",
    privacyConsent: ""
  });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const update = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  async function submit(event) {
    event.preventDefault();
    setStatus("");
    setSending(true);
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "신청 중 오류가 발생했습니다.");
      setStatus("상담 신청이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.");
      setForm({
        name: "", contactMethod: "phone", contactValue: "", region: "",
        amount: "", existingLoans: "", request: "", privacyConsent: ""
      });
    } catch (error) {
      setStatus(error.message || "신청을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSending(false);
    }
  }

  const field = {
    width: "100%", padding: "14px 15px", border: "1px solid #d8dee8",
    borderRadius: 10, fontSize: 15, background: "#fff", color: "#172033",
    boxSizing: "border-box", outlineColor: "#b58b45"
  };
  const label = { display: "block", fontWeight: 700, marginBottom: 8, color: "#273247", fontSize: 14 };
  const section = { marginBottom: 19 };

  return (
    <main style={{ minHeight: "100vh", padding: "38px 16px 60px", boxSizing: "border-box", background: "linear-gradient(135deg, #101b31 0%, #1e3150 48%, #101a2c 100%)", fontFamily: "Arial, 'Malgun Gothic', sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <header style={{ textAlign: "center", color: "#fff", marginBottom: 28 }}>
          <div style={{ color: "#d7b477", letterSpacing: 5, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>TRUST · CONSULTATION · SOLUTION</div>
          <h1 style={{ fontSize: 30, margin: "0 0 10px", letterSpacing: -1 }}>(주)종로캐피탈</h1>
          <p style={{ margin: 0, color: "#d5dbea", fontSize: 15 }}>고객님의 상황을 듣고 상담을 도와드립니다.</p>
        </header>

        <div style={{ background: "#fff", borderRadius: 20, padding: "30px 26px", boxShadow: "0 22px 60px #0005" }}>
          <div style={{ borderBottom: "1px solid #e8ebf0", paddingBottom: 19, marginBottom: 23 }}>
            <h2 style={{ margin: "0 0 7px", color: "#17243a", fontSize: 22 }}>상담 신청</h2>
            <p style={{ margin: 0, color: "#687386", fontSize: 13, lineHeight: 1.6 }}>아래 내용을 작성해 주시면 확인 후 안내드리겠습니다. 필수 항목을 빠짐없이 입력해 주세요.</p>
          </div>

          <form onSubmit={submit}>
            <div style={section}>
              <label style={label} htmlFor="name">성함 *</label>
              <input id="name" style={field} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="성함을 입력해 주세요" required />
            </div>

            <div style={section}>
              <label style={label}>연락 방법 *</label>
              <div style={{ display: "flex", gap: 10 }}>
                {["phone", "kakao"].map((method) => (
                  <button key={method} type="button" onClick={() => update("contactMethod", method)} style={{ flex: 1, padding: 13, borderRadius: 10, border: form.contactMethod === method ? "2px solid #a77b38" : "1px solid #d8dee8", background: form.contactMethod === method ? "#fbf6ed" : "#fff", color: "#253148", fontWeight: 700, cursor: "pointer" }}>
                    {method === "phone" ? "휴대폰 전화" : "카카오톡"}
                  </button>
                ))}
              </div>
            </div>

            <div style={section}>
              <label style={label} htmlFor="contactValue">{form.contactMethod === "phone" ? "휴대폰 번호 *" : "카카오톡 연락처 *"}</label>
              <input id="contactValue" style={field} value={form.contactValue} onChange={(e) => update("contactValue", e.target.value)} placeholder={form.contactMethod === "phone" ? "예: 010-1234-5678" : "카카오톡 ID 또는 연락 가능한 번호"} required />
            </div>

            <div style={section}>
              <label style={label} htmlFor="region">거주 지역 *</label>
              <input id="region" style={field} value={form.region} onChange={(e) => update("region", e.target.value)} placeholder="예: 서울 종로구" required />
            </div>

            <div style={section}>
              <label style={label} htmlFor="amount">희망 상담 금액 *</label>
              <select id="amount" style={field} value={form.amount} onChange={(e) => update("amount", e.target.value)} required>
                <option value="">금액을 선택해 주세요</option>
                {["300만원 이하", "300~500만원", "500~1,000만원", "1,000~3,000만원", "3,000만원 이상", "금액 상담 후 결정"].map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <div style={section}>
              <label style={label} htmlFor="existingLoans">현재 대출 여부 *</label>
              <select id="existingLoans" style={field} value={form.existingLoans} onChange={(e) => update("existingLoans", e.target.value)} required>
                <option value="">선택해 주세요</option>
                {["없음", "있음", "잘 모르겠음"].map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <div style={section}>
              <label style={label} htmlFor="request">상담 요청 내용 *</label>
              <textarea id="request" style={{ ...field, minHeight: 110, resize: "vertical" }} value={form.request} onChange={(e) => update("request", e.target.value)} placeholder="상담받고 싶은 내용을 적어 주세요." required />
            </div>

            <div style={{ background: "#f7f8fa", border: "1px solid #e7eaf0", borderRadius: 12, padding: 15, marginBottom: 18 }}>
              <details>
                <summary style={{ cursor: "pointer", color: "#253148", fontWeight: 700 }}>개인정보 수집·이용 안내 및 상담 약관 보기</summary>
                <div style={{ color: "#5c6678", fontSize: 13, lineHeight: 1.8, marginTop: 12 }}>
                  <p><b>수집 항목</b>: 성함, 연락처, 거주 지역, 희망 상담 금액, 대출 관련 상담 내용</p>
                  <p><b>이용 목적</b>: 상담 신청 확인, 본인 의사 확인 및 상담 연락</p>
                  <p><b>보유 및 이용 기간</b>: 상담 목적 달성 후 지체 없이 파기합니다. 다만 관계 법령에 보존 의무가 있는 경우 해당 기간 동안 보관합니다.</p>
                  <p><b>동의 거부 권리</b>: 개인정보 수집·이용 동의를 거부할 수 있으며, 필수 항목 동의 거부 시 온라인 상담 신청이 제한됩니다.</p>
                  <p><b>상담 유의사항</b>: 본 신청은 상담 요청이며 대출 승인이나 금융상품 계약을 보장하지 않습니다. 금리, 수수료, 상환 조건 및 취급 주체를 충분히 확인한 후 결정하시기 바랍니다.</p>
                </div>
              </details>
            </div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#344054", fontSize: 14, lineHeight: 1.5, marginBottom: 20, cursor: "pointer" }}>
              <input type="checkbox" checked={form.privacyConsent === "yes"} onChange={(e) => update("privacyConsent", e.target.checked ? "yes" : "")} required style={{ marginTop: 3, width: 17, height: 17, accentColor: "#a77b38" }} />
              <span>개인정보 수집 및 이용 안내를 확인했으며 이에 동의합니다. (필수)</span>
            </label>

            <button type="submit" disabled={sending} style={{ width: "100%", border: 0, borderRadius: 11, padding: 16, background: sending ? "#9aa3b2" : "linear-gradient(90deg, #9a7136, #c6a56c)", color: "#fff", fontSize: 16, fontWeight: 800, cursor: sending ? "wait" : "pointer" }}>
              {sending ? "신청 전송 중..." : "상담 신청하기"}
            </button>
            {status && <p role="status" style={{ margin: "16px 0 0", padding: 13, borderRadius: 9, background: status.includes("접수") ? "#edf8f0" : "#fff2f0", color: status.includes("접수") ? "#216b39" : "#a12b20", lineHeight: 1.6, fontSize: 14 }}>{status}</p>}
          </form>
        </div>
        <footer style={{ textAlign: "center", color: "#c1cada", fontSize: 12, lineHeight: 1.7, marginTop: 20 }}>
          <p>본 페이지는 상담 신청을 위한 안내 페이지입니다.</p>
          <p>금융상품 이용 전 계약 상대방, 등록 여부, 금리 및 수수료를 반드시 확인하세요.</p>
        </footer>
      </div>
    </main>
  );
}
