import {NextResponse} from "next/server";
import {db,adminOk} from "../../../../lib/chat";

export async function GET(request){
  if(!adminOk(request)) return NextResponse.json({error:"관리자 인증이 필요합니다."},{status:401});
  try{
    const conversations=await db("chat_conversations?select=id,customer_name,status,created_at&order=created_at.desc");
    const messages=await db("chat_messages?select=id,conversation_id,sender,message,created_at&order=created_at.asc");
    return NextResponse.json({conversations,messages});
  }catch(e){return NextResponse.json({error:"상담 목록을 불러오지 못했습니다."},{status:500});}
}
export async function POST(request){
  if(!adminOk(request)) return NextResponse.json({error:"관리자 인증이 필요합니다."},{status:401});
  try{
    const {id,message}=await request.json();
    if(!id||typeof message!=="string"||!message.trim()||message.length>2000) return NextResponse.json({error:"메시지를 확인해 주세요."},{status:400});
    await db("chat_messages",{method:"POST",body:JSON.stringify({conversation_id:id,sender:"admin",message:message.trim()})});
    return NextResponse.json({ok:true});
  }catch(e){return NextResponse.json({error:"답장을 보내지 못했습니다."},{status:500});}
}
