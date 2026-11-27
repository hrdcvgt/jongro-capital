import crypto from "node:crypto";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
export function dbReady(){ return Boolean(url && key); }
export async function db(path, options={}) {
  if(!dbReady()) throw new Error("채팅 서버 설정이 아직 완료되지 않았습니다.");
  const response=await fetch(`${url}/rest/v1/${path}`,{
    ...options,
    headers:{
      apikey:key, Authorization:`Bearer ${key}`,
      "Content-Type":"application/json", Prefer:"return=representation",
      ...(options.headers||{})
    },
    cache:"no-store"
  });
  const body=await response.text();
  if(!response.ok) throw new Error(body||"데이터베이스 요청 실패");
  return body ? JSON.parse(body) : [];
}
export function hash(value){ return crypto.createHash("sha256").update(value).digest("hex"); }
export function sign(value){ return crypto.createHmac("sha256",process.env.CHAT_SESSION_SECRET||"").update(value).digest("hex"); }
export function safeEqual(a,b){
  const x=Buffer.from(String(a)), y=Buffer.from(String(b));
  return x.length===y.length && crypto.timingSafeEqual(x,y);
}
export function adminOk(request){
  const raw=request.cookies.get("jongro_admin")?.value||"";
  const [issued,signature]=raw.split(".");
  if(!issued||!signature||!process.env.CHAT_SESSION_SECRET) return false;
  const age=Date.now()-Number(issued);
  return age>=0 && age<12*60*60*1000 && safeEqual(signature,sign(issued));
}
