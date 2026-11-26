"use client";

import Link from "next/link";

const gold = "#c5a36a";

export default function Home() {
  return (
    <main className="site">
      <header className="nav">
        <Link href="/" className="brand"><span className="brand-mark">J</span><span><b>(주)종로캐피탈</b><small>JONGRO CAPITAL</small></span></Link>
        <nav className="nav-links">
          <a href="#about">회사소개</a><a href="#services">상담안내</a><a href="#process">상담절차</a><a href="#contact">오시는 길</a>
        </nav>
        <Link href="/apply" className="nav-cta">상담 신청</Link>
      </header>

      <section className="hero">
        <div className="hero-shade" />
        <div className="hero-inner">
          <p className="eyebrow">TRUST · CONSULTATION · SOLUTION</p>
          <h1>금융의 길을 함께 찾는<br/><em>종로캐피탈</em></h1>
          <p className="hero-copy">고객님의 상황을 먼저 듣고,<br className="mobile-only"/> 필요한 금융 상담을 차분하게 안내합니다.</p>
          <div className="hero-actions"><Link href="/apply" className="btn-gold">온라인 상담 신청 <span>↗</span></Link><span className="btn-outline">대표번호 개통 예정</span></div>
          <div className="hero-note">상담 신청은 금융상품 승인 또는 계약을 보장하지 않습니다.</div>
        </div>
        <div className="hero-bottom"><span>JONGRO CAPITAL</span><span>SEOUL · KOREA</span></div>
      </section>

      <section className="trust-strip">
        <div><b>01</b><span>충분한 설명을 바탕으로</span></div><div><b>02</b><span>고객 상황에 맞춘 상담</span></div><div><b>03</b><span>중요 조건을 꼼꼼히 확인</span></div>
      </section>

      <section id="about" className="section about">
        <div className="section-kicker">ABOUT JONGRO CAPITAL</div>
        <div className="about-grid"><div><h2>신뢰를 바탕으로<br/>상담의 처음부터 함께합니다.</h2></div><div className="about-text"><p>종로캐피탈은 고객님의 문의 내용을 듣고 금융 상담을 안내합니다. 모든 금융 거래는 조건과 책임을 충분히 이해한 뒤 신중하게 결정하실 수 있도록 정확한 안내를 중요하게 생각합니다.</p><p className="muted">상담 가능 여부와 조건은 개별 심사 및 계약 상대방의 기준에 따라 달라질 수 있습니다.</p></div></div>
      </section>

      <section id="services" className="section services">
        <div className="section-kicker">CONSULTATION GUIDE</div><h2>상담 안내</h2><p className="section-desc">문의 내용을 확인하고 필요한 상담 방향을 안내해 드립니다.</p>
        <div className="cards">
          <article className="info-card"><div className="card-no">01 / INQUIRY</div><div className="card-icon">⌕</div><h3>상담 문의</h3><p>온라인 신청 또는 전화로 궁금한 내용을 남겨 주세요.</p></article>
          <article className="info-card"><div className="card-no">02 / REVIEW</div><div className="card-icon">◇</div><h3>내용 확인</h3><p>전달해 주신 내용을 확인하고 상담에 필요한 사항을 안내합니다.</p></article>
          <article className="info-card"><div className="card-no">03 / GUIDANCE</div><div className="card-icon">✓</div><h3>조건 안내</h3><p>적용 조건과 비용, 상환 관련 내용을 충분히 확인한 후 결정하세요.</p></article>
        </div>
      </section>

      <section id="process" className="section process">
        <div className="process-copy"><div className="section-kicker">HOW TO START</div><h2>간편하게 상담을<br/>시작해 보세요.</h2><p>온라인 상담 신청서를 작성해 주시면 담당자가 내용을 확인한 후 연락드립니다.</p><Link href="/apply" className="btn-dark">상담 신청하기 <span>→</span></Link></div>
        <div className="steps"><div><b>1</b><span><strong>상담 신청서 작성</strong><small>필수 항목과 연락 가능한 정보를 입력합니다.</small></span></div><div><b>2</b><span><strong>신청 내용 확인</strong><small>접수된 문의 내용을 확인합니다.</small></span></div><div><b>3</b><span><strong>담당자 상담</strong><small>상담을 통해 조건과 유의사항을 안내받습니다.</small></span></div></div>
      </section>

      <section className="notice"><div className="section-kicker">IMPORTANT NOTICE</div><h2>금융 거래 전 꼭 확인해 주세요.</h2><div className="notice-grid"><p>법정 최고금리는 연 20%이며, 계약 전 적용 금리와 연체이자율을 확인하세요.</p><p>대출 중개 명목의 선입금이나 별도 수수료를 요구하는 행위에 유의하세요.</p><p>신청서 제출만으로 대출 승인이나 금융상품 계약이 확정되지 않습니다.</p></div></section>

      <section id="contact" className="section contact">
        <div><div className="section-kicker">CONTACT</div><h2>종로캐피탈에<br/>문의하세요.</h2><p>상담 관련 문의사항은 온라인 신청을 이용해 주세요. 대표번호는 개통 후 안내드리겠습니다.</p><Link href="/apply" className="btn-gold">온라인 상담 신청 <span>↗</span></Link></div>
        <div className="contact-panel"><div><small>대표번호</small><p className="phone-pending">대표번호 개통 예정</p></div><div><small>ADDRESS</small><p>서울특별시 종로구 삼봉로 81,<br/>두산위브파빌리온 715호</p></div><a className="map-link" href="https://map.naver.com/v5/search/서울특별시%20종로구%20삼봉로%2081" target="_blank" rel="noreferrer">네이버 지도에서 위치 확인 ↗</a></div>
      </section>

      <footer className="footer"><div className="footer-brand">(주)종로캐피탈 <span>JONGRO CAPITAL</span></div><p>상호 및 등록정보는 실제 계약 전 반드시 공식 등록부에서 확인하시기 바랍니다.</p><p>대표번호 개통 예정 · 서울특별시 종로구 삼봉로 81, 두산위브파빌리온 715호</p><p className="legal">금융상품 이용 시 귀하의 신용평점이 하락할 수 있습니다. 과도한 빚은 큰 불행을 안겨줄 수 있습니다.</p><small>© {new Date().getFullYear()} JONGRO CAPITAL. ALL RIGHTS RESERVED.</small></footer>

      <style jsx global>{`
        *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Arial,'Malgun Gothic',sans-serif;color:#17243a}.site{overflow:hidden;background:#fff}.nav{height:82px;padding:0 max(6vw,24px);display:flex;align-items:center;justify-content:space-between;background:#fff;position:relative;z-index:2}.brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:#15243b}.brand-mark{width:39px;height:39px;border:1px solid ${gold};display:grid;place-items:center;color:#a98245;font-family:Georgia,serif;font-size:25px}.brand b{display:block;font-size:17px;letter-spacing:-.5px}.brand small{display:block;font-size:9px;letter-spacing:2.4px;color:#9c835d;margin-top:4px}.nav-links{display:flex;gap:34px}.nav-links a{color:#38445a;text-decoration:none;font-size:13px}.nav-cta,.btn-dark{background:#172943;color:#fff;padding:14px 23px;text-decoration:none;font-size:13px;letter-spacing:.3px}.hero{min-height:600px;position:relative;display:flex;align-items:center;color:#fff;background-image:linear-gradient(90deg,rgba(8,20,39,.88),rgba(8,20,39,.52) 52%,rgba(8,20,39,.18)),url('/capital-bg.jpg');background-size:cover;background-position:center}.hero-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(9,21,39,.3),transparent 30%)}.hero-inner{position:relative;z-index:1;padding:80px max(10vw,28px);max-width:1000px}.eyebrow,.section-kicker{font-size:10px;letter-spacing:3px;color:#b99a68;font-weight:700}.hero h1{font-size:clamp(42px,6vw,68px);line-height:1.23;letter-spacing:-2px;margin:27px 0 20px;font-weight:600}.hero h1 em{font-style:normal;color:#d8bb88}.hero-copy{font-size:17px;line-height:1.9;color:#e0e6ef}.hero-actions{display:flex;gap:12px;margin-top:34px;flex-wrap:wrap}.btn-gold{display:inline-flex;gap:30px;align-items:center;padding:17px 23px;background:#b79258;color:#fff;text-decoration:none;font-size:13px;font-weight:700}.btn-outline{padding:16px 22px;border:1px solid #ffffff80;color:#fff;text-decoration:none;font-size:13px}.hero-note{margin-top:24px;color:#c6cfdb;font-size:11px}.hero-bottom{position:absolute;bottom:24px;left:6vw;right:6vw;display:flex;justify-content:space-between;color:#ffffff9c;font-size:9px;letter-spacing:2px}.trust-strip{display:flex;justify-content:center;gap:8vw;padding:27px 20px;background:#f5f3ef;color:#4b5668}.trust-strip div{display:flex;gap:13px;align-items:center;font-size:12px}.trust-strip b{color:#b28d55;font-family:Georgia,serif;font-size:17px}.section{padding:105px max(10vw,28px)}.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:9%;margin-top:25px}.section h2{font-size:38px;letter-spacing:-1.5px;line-height:1.35;margin:14px 0;color:#172943}.about-text{font-size:15px;line-height:2;color:#4c586b;padding-top:4px}.muted{color:#87909d;font-size:13px}.services{background:#f6f7f8}.section-desc{color:#7a8492;font-size:14px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:42px}.info-card{background:#fff;padding:30px 27px;min-height:230px;border:1px solid #e8e9eb}.card-no{font-size:9px;letter-spacing:2px;color:#b08b54}.card-icon{font-size:27px;color:#b08b54;margin:26px 0 15px}.info-card h3{font-size:18px;margin:0 0 12px}.info-card p{font-size:13px;line-height:1.8;color:#778191}.process{display:grid;grid-template-columns:1fr 1fr;gap:10%;align-items:center}.process-copy p,.contact p{color:#778191;font-size:14px;line-height:1.9;margin-bottom:27px}.btn-dark{display:inline-block}.steps{border-top:1px solid #e3e6ea}.steps>div{display:flex;gap:22px;padding:23px 0;border-bottom:1px solid #e3e6ea;align-items:center}.steps b{font-family:Georgia,serif;font-size:25px;color:#b18b55;font-weight:400}.steps strong,.steps small{display:block}.steps strong{font-size:14px;margin-bottom:7px}.steps small{color:#87909d;font-size:12px}.notice{background:#172943;color:#fff;padding:65px max(10vw,28px)}.notice h2{font-size:27px;margin:15px 0 30px}.notice-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}.notice-grid p{border-left:1px solid #b18b55;padding-left:16px;color:#d0d7e0;font-size:13px;line-height:1.8;margin:0}.contact{display:grid;grid-template-columns:1fr 1fr;gap:10%;align-items:center}.contact-panel{background:#f5f3ef;padding:32px}.contact-panel>div{margin-bottom:24px}.contact-panel small{display:block;color:#a1814e;font-size:9px;letter-spacing:2px;margin-bottom:8px}.contact-panel a:not(.map-link){color:#172943;text-decoration:none;font-size:25px;font-weight:700}.contact-panel p{margin:0;color:#4d596b;font-size:14px}.contact-panel .phone-pending{font-size:18px;font-weight:700;color:#172943}.map-link{display:inline-block;padding-top:18px;border-top:1px solid #ddd;width:100%;color:#947243;text-decoration:none;font-size:12px}.footer{background:#101d31;color:#b9c2ce;padding:43px max(6vw,24px);font-size:11px;line-height:1.8}.footer-brand{font-size:16px;color:#fff;font-weight:700}.footer-brand span{font-size:9px;letter-spacing:2px;color:#b99a68;margin-left:12px}.footer .legal{color:#8995a5;margin-top:20px}.footer small{display:block;margin-top:22px;color:#768396;letter-spacing:1px}.mobile-only{display:none}@media(max-width:760px){.nav{height:70px;padding:0 18px}.nav-links{display:none}.nav-cta{padding:11px 14px;font-size:11px}.brand b{font-size:15px}.hero{min-height:590px;background-position:58% center}.hero-inner{padding:70px 25px}.hero h1{font-size:43px}.hero-copy{font-size:15px}.mobile-only{display:block}.hero-actions{gap:9px}.btn-gold,.btn-outline{padding:15px 16px;font-size:12px}.trust-strip{display:grid;grid-template-columns:1fr;gap:13px;padding:23px 28px}.section{padding:70px 25px}.about-grid,.process,.contact{grid-template-columns:1fr;gap:28px}.section h2{font-size:31px}.about-text{font-size:14px}.cards,.notice-grid{grid-template-columns:1fr;gap:12px}.info-card{min-height:auto;padding:23px}.card-icon{margin:17px 0 10px}.notice{padding:55px 25px}.notice h2{font-size:24px}.notice-grid{gap:18px}.contact-panel{padding:25px}.hero-bottom{left:25px;right:25px}.footer{padding:38px 25px}}
      `}</style>
    </main>
  );
}
