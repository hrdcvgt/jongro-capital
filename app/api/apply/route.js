
export async function POST(request) {
  try {
    const data = await request.json();

    const required = [
      "name",
      "contactMethod",
      "contactValue",
      "region",
      "amount",
      "existingLoans",
      "request"
    ];

    for (const key of required) {
      if (!data[key]) {
        return Response.json(
          { error: "필수 항목을 입력해 주세요." },
          { status: 400 }
        );
      }
    }

    if (data.privacyConsent !== "yes") {
      return Response.json(
        { error: "개인정보 수집 및 이용 동의가 필요합니다." },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return Response.json(
        { error: "서버 알림 설정이 완료되지 않았습니다." },
        { status: 500 }
      );
    }

    const message = [
      "📩 종로캐피탈 신규 상담 신청",
      "━━━━━━━━━━━━━━",
      `이름: ${data.name}`,
      `연락 방법: ${data.contactMethod === "phone" ? "휴대폰" : "카카오톡"}`,
      `연락처: ${data.contactValue}`,
      `거주 지역: ${data.region}`,
      `희망 신청금액: ${data.amount}만원`,
      `기대출 여부: ${data.existingLoans}`,
      `상담 내용: ${data.request}`,
      "━━━━━━━━━━━━━━"
    ].join("\n");

    const telegram = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      }
    );

    const result = await telegram.json();

    if (!telegram.ok || !result.ok) {
      throw new Error("텔레그램 알림 전송에 실패했습니다.");
    }

    return Response.json({
      success: true,
      telegramSent: true
    });

  } catch (error) {
    return Response.json(
      { error: error.message || "신청 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

