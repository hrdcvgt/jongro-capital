import {NextResponse} from "next/server";
import {db,hash,adminOk} from "../../../../lib/chat";

export async function GET(request){
  try{
    const {searchParams}=new URL(request.url);
    const id=searchParams.get("id"), token=searchParams.get("token");
    if(!id||!token) return NextResponse.json({error:"접근 정보가 없습니다."},{status:400});
    const rows=await db(`chat_conversations?id=eq.${encodeURIComponent(id)}&select=id,token_hash`);
    if(!rows[0]||rows[0].token_hash!==hash(token)) return NextResponse.json({error:"대화에 접근할 수 없습니다."},{status:403});
    const messages=await db(`chat_messages?conversation_id=eq.${encodeURIComponent(id)}&select=id,sender,message,created_at&order=created_at.asc`);
    return NextResponse.json({messages});
  }catch(e){return NextResponse.json({error:"메시지를 불러오지 못했습니다."},{status:500});}
}
export async function POST(request){
  try{
    const {id,token,message}=await request.json();
    if(!id||!token||typeof message!=="string"||!message.trim()||message.length>2000) return NextResponse.json({error:"메시지를 확인해 주세요."},{status:400});
    const rows=await db(`chat_conversations?id=eq.${encodeURIComponent(id)}&select=id,token_hash,status`);
    if(!rows[0]||rows[0].token_hash!==hash(token)||rows[0].status==="closed") return NextResponse.json({error:"대화에 답장할 수 없습니다."},{status:403});
    await db("chat_messages",{method:"POST",body:JSON.stringify({conversation_id:id,sender:"customer",message:message.trim()})});
    return NextResponse.json({ok:true});
  }catch(e){return NextResponse.json({error:"메시지를 보내지 못했습니다."},{status:500});}
}
