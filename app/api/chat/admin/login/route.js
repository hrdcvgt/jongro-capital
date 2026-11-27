import {NextResponse} from "next/server";
import {sign,safeEqual} from "../../../../../../lib/chat";

export async function POST(request){
  try{
    const {password}=await request.json();
    const expected=process.env.CHAT_ADMIN_PASSWORD;
    if(!expected||typeof password!=="string"||!safeEqual(password,expected)) return NextResponse.json({error:"비밀번호가 올바르지 않습니다."},{status:401});
    if(!process.env.CHAT_SESSION_SECRET) return NextResponse.json({error:"관리자 인증 설정이 필요합니다."},{status:503});
    const issued=String(Date.now());
    const response=NextResponse.json({ok:true});
    response.cookies.set("jongro_admin",issued+"."+sign(issued),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/admin",maxAge:43200});
    return response;
  }catch(e){return NextResponse.json({error:"로그인에 실패했습니다."},{status:500});}
}
