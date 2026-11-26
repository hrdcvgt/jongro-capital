
export const metadata = {
  title: "(주)종로캐피탈",
  description: "종로캐피탈 상담 신청",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
