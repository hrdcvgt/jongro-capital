import {NextResponse} from "next/server";
import crypto from "node:crypto";
import {db,hash,dbReady} from "../../../../lib/chat";

export async function POST(request){
  try{
    if(!dbReady()) return NextResponse.json({error:"상담 채팅 준비 중입니다. 잠시 후 다시 이용해 주세요."},{status:503});
    const {name,message}=await request.json();
    if(typeof name!=="string"||name.trim().length<1||name.trim().length>40) return NextResponse.json({error:"이름을 1~40자로 입력해 주세요."},{status:400});
    if(typeof message!=="string"||message.trim().length<1||message.trim().length>2000) return NextResponse.json({error:"문의 내용을 1~2,000자로 입력해 주세요."},{status:400});
    const token=crypto.randomBytes(32).toString("hex");
    const rows=await db("chat_conversations",{method:"POST",body:JSON.stringify({customer_name:name.trim(),token_hash:hash(token),status:"open"})});
    const conversation=rows[0];
    await db("chat_messages",{method:"POST",body:JSON.stringify({conversation_id:conversation.id,sender:"customer",message:message.trim()})});
    return NextResponse.json({conversationId:conversation.id,token});
  }catch(e){return NextResponse.json({error:e.message||"채팅을 시작하지 못했습니다."},{status:500});}
}
