"use client";
import {useEffect,useRef,useState} from "react";

export default function AdminChat(){
 const [password,setPassword]=useState("");
 const [logged,setLogged]=useState(false);
 const [conversations,setConversations]=useState([]);
 const [messages,setMessages]=useState([]);
 const [selected,setSelected]=useState("");
 const [draft,setDraft]=useState("");
 const [error,setError]=useState("");
 const [unread,setUnread]=useState({});
 const [soundEnabled,setSoundEnabled]=useState(false);
 const knownCustomerIds=useRef(null);
 const audioContext=useRef(null);
 const readThrough=useRef(null);

 function readSaved(){
  try{return JSON.parse(localStorage.getItem("jongro-chat-read")||"{}");}
  catch{return {};}
 }
 function saveRead(value){
  readThrough.current=value;
  try{localStorage.setItem("jongro-chat-read",JSON.stringify(value));}catch{}
 }
 function playAlert(){
  try{
   const AudioCtx=window.AudioContext||window.webkitAudioContext;
   if(!AudioCtx)return;
   const ctx=audioContext.current||new AudioCtx();
   audioContext.current=ctx;
   if(ctx.state==="suspended")ctx.resume();
   const osc=ctx.createOscillator();
   const gain=ctx.createGain();
   osc.type="sine";
   osc.frequency.setValueAtTime(880,ctx.currentTime);
   osc.frequency.setValueAtTime(660,ctx.currentTime+0.16);
   gain.gain.setValueAtTime(0.0001,ctx.currentTime);
   gain.gain.exponentialRampToValueAtTime(0.22,ctx.currentTime+0.025);
   gain.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.38);
   osc.connect(gain);gain.connect(ctx.destination);
   osc.start();osc.stop(ctx.currentTime+0.4);
  }catch{}
 }
 async function enableAlerts(){
  try{
   const AudioCtx=window.AudioContext||window.webkitAudioContext;
   if(AudioCtx){
    audioContext.current=new AudioCtx();
    await audioContext.current.resume();
   }
   if("Notification" in window && Notification.permission==="default"){
    await Notification.requestPermission();
   }
   setSoundEnabled(true);
   playAlert();
  }catch{setSoundEnabled(true);}
 }
 async function load(){
  try{
   const r=await fetch("/api/chat/admin",{cache:"no-store",credentials:"same-origin"});
   const d=await r.json();
   if(r.status===401){setLogged(false);return;}
   if(!r.ok){setError(d.error||"상담 데이터를 불러오지 못했습니다.");return;}
   setError("");
   const nextMessages=d.messages||[];
   if(readThrough.current===null)readThrough.current=readSaved();
   const known=knownCustomerIds.current;
   const incoming=known===null?[]:nextMessages.filter(m=>m.sender==="customer"&&!known.has(String(m.id)));
   if(known===null){
    knownCustomerIds.current=new Set(nextMessages.filter(m=>m.sender==="customer").map(m=>String(m.id)));
   }else{
    incoming.forEach(m=>known.add(String(m.id)));
   }
   const read={...readThrough.current};
   if(selected){
    const visible=nextMessages.filter(m=>String(m.conversation_id)===String(selected));
    if(visible.length)read[String(selected)]=String(visible[visible.length-1].id);
    saveRead(read);
   }
   const counts={};
   for(const m of nextMessages){
    if(m.sender!=="customer")continue;
    const last=read[String(m.conversation_id)];
    if(last===undefined||Number(m.id)>Number(last)){
     counts[String(m.conversation_id)]=(counts[String(m.conversation_id)]||0)+1;
    }
   }
   setUnread(counts);
   if(incoming.length){
    const newForOther=incoming.filter(m=>String(m.conversation_id)!==String(selected));
    if(newForOther.length){
     if(soundEnabled)playAlert();
     if("Notification" in window && Notification.permission==="granted" && document.hidden){
      const names=new Map((d.conversations||[]).map(c=>[String(c.id),c.customer_name]));
      new Notification("종로캐피탈 새 상담 메시지",{body:(names.get(String(newForOther[newForOther.length-1].conversation_id))||"고객")+" 고객이 메시지를 보냈습니다."});
     }
    }
   }
   setConversations(d.conversations||[]);
   setMessages(nextMessages);
  }catch{setError("서버 연결을 확인해 주세요.");}
 }
 useEffect(()=>{
  fetch("/api/chat/admin/session",{cache:"no-store",credentials:"same-origin"}).then(r=>{if(r.ok)setLogged(true)}).catch(()=>{});
 },[]);
 useEffect(()=>{
  let t;
  if(logged){load();t=setInterval(load,2500);}
  return()=>clearInterval(t);
 },[logged,selected,soundEnabled]);
 async function login(e){
  e.preventDefault();setError("");
  const r=await fetch("/api/chat/admin/login",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
  const d=await r.json();
  if(!r.ok){setError(d.error);return;}
  const check=await fetch("/api/chat/admin/session",{cache:"no-store",credentials:"same-origin"});
  if(!check.ok){setError("로그인 확인에 실패했습니다. 새로고침 후 다시 시도해 주세요.");return;}
  readThrough.current=readSaved();knownCustomerIds.current=null;
  setLogged(true);setPassword("");
 }
 function chooseConversation(id){
  const key=String(id);
  setSelected(key);
  const visible=messages.filter(m=>String(m.conversation_id)===key);
  if(visible.length){
   const read={...readThrough.current,[key]:String(visible[visible.length-1].id)};
   saveRead(read);
   setUnread(prev=>({...prev,[key]:0}));
  }
 }
 async function reply(e){
  e.preventDefault();if(!draft.trim()||!selected)return;
  const r=await fetch("/api/chat/admin",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:selected,message:draft})});
  const d=await r.json();if(!r.ok){setError(d.error);return;}
  setDraft("");load();
 }
 async function logout(){
  await fetch("/api/chat/admin/logout",{method:"POST",credentials:"same-origin"});
  setLogged(false);
 }
 const current=conversations.find(c=>String(c.id)===String(selected));
 const totalUnread=Object.values(unread).reduce((sum,n)=>sum+(Number(n)||0),0);
 useEffect(()=>{
  if(typeof document!=="undefined")document.title=totalUnread?("(" + totalUnread + ") 새 메시지 · 종로캐피탈 상담"):"종로캐피탈 상담 관리자";
 },[totalUnread]);
 if(!logged)return <main className="login"><form onSubmit={login}><h1>종로캐피탈 상담 관리자</h1><p>관리자 비밀번호를 입력해 주세요.</p><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="관리자 비밀번호" required/><button>로그인</button>{error&&<small>{error}</small>}</form><style jsx>{`.login{min-height:100vh;display:grid;place-items:center;background:#f3f4f6;font-family:Arial,'Malgun Gothic',sans-serif}.login form{width:min(380px,90vw);background:white;padding:30px;border-radius:15px;box-shadow:0 8px 30px #0001}.login h1{font-size:21px;color:#172943}.login p,.login small{font-size:13px;color:#687386}.login input{width:100%;padding:13px;border:1px solid #ddd;border-radius:8px;margin:10px 0}.login button{width:100%;padding:13px;background:#172943;color:white;border:0;border-radius:8px;cursor:pointer}`}</style></main>;
 return <main className="admin"><header><div><b>(주)종로캐피탈 · 상담 관리자</b>{totalUnread>0&&<span className="total">새 메시지 {totalUnread}건</span>}</div><div className="head-actions"><button className={soundEnabled?"enabled":""} onClick={enableAlerts}>{soundEnabled?"알림 켜짐":"🔔 소리·알림 켜기"}</button><button onClick={logout}>로그아웃</button></div></header><div className="layout"><aside><h2>상담 목록 {totalUnread>0&&<em>{totalUnread}</em>}</h2>{conversations.map(c=><button key={c.id} className={String(c.id)===String(selected)?"active":""} onClick={()=>chooseConversation(c.id)}><b>{c.customer_name}</b>{unread[String(c.id)]>0&&<strong className="unread">{unread[String(c.id)]} 안 읽음</strong>}<small>{new Date(c.created_at).toLocaleString("ko-KR")}</small></button>)}</aside><section><h2>{current?current.customer_name+" 고객 상담":"상담을 선택해 주세요"}</h2><div className="thread">{messages.filter(m=>String(m.conversation_id)===String(selected)).map(m=><article key={m.id} className={m.sender==="admin"?"admin-msg":"customer-msg"}><small>{m.sender==="admin"?"관리자":"고객"} · {new Date(m.created_at).toLocaleString("ko-KR")}</small><p>{m.message}</p></article>)}</div><form onSubmit={reply}><textarea value={draft} onChange={e=>setDraft(e.target.value)} placeholder="답장 내용을 입력하세요" disabled={!selected}/><button disabled={!selected||!draft.trim()}>답장 보내기</button></form>{error&&<small className="error">{error}</small>}</section></div><style jsx>{`.admin{font-family:Arial,'Malgun Gothic',sans-serif;color:#172943;min-height:100vh;background:#f4f5f7}.admin header{min-height:65px;background:#172943;color:white;padding:10px 25px;display:flex;justify-content:space-between;align-items:center;gap:12px}.admin header>div,.head-actions{display:flex;align-items:center;gap:12px}.admin header button{background:transparent;color:white;border:1px solid #ffffff70;padding:8px 13px;border-radius:6px;cursor:pointer}.admin header button.enabled{background:#245c49;border-color:#8bd1ad}.total{background:#bd3434;color:white;border-radius:20px;padding:5px 10px;font-size:12px}.layout{display:grid;grid-template-columns:300px 1fr;min-height:calc(100vh - 65px)}aside{background:white;border-right:1px solid #e5e7eb;padding:20px}h2{font-size:17px;margin:5px 0 18px}aside h2 em{font-style:normal;background:#c73535;color:white;border-radius:12px;padding:2px 8px;font-size:12px}aside button{display:block;width:100%;text-align:left;padding:13px;border:0;border-bottom:1px solid #eee;background:white;cursor:pointer;color:#26354b}aside button.active{background:#f1e8d9}aside small{display:block;color:#87909d;font-size:10px;margin-top:5px}.unread{float:right;background:#c73535;color:white;border-radius:12px;padding:3px 7px;font-size:10px}.layout>section{padding:22px;display:flex;flex-direction:column}.thread{flex:1;min-height:300px;max-height:calc(100vh - 220px);overflow:auto;background:white;border-radius:12px;padding:20px}.thread article{max-width:75%;margin:12px 0}.thread article p{padding:11px 14px;border-radius:10px;background:#f1f3f6;white-space:pre-wrap}.thread article small{color:#87909d;font-size:10px}.thread .admin-msg{margin-left:auto;text-align:right}.thread .admin-msg p{background:#e9d9bd;text-align:left}.layout form{display:flex;gap:10px;margin-top:12px}.layout textarea{flex:1;min-height:65px;padding:12px;border:1px solid #dce1e8;border-radius:8px}.layout form button{background:#172943;color:white;border:0;border-radius:8px;padding:0 18px}.layout form button:disabled{opacity:.4}.error{color:#b42318}@media(max-width:700px){.admin header{align-items:flex-start;flex-direction:column;padding:12px}.head-actions{width:100%;justify-content:space-between}.layout{grid-template-columns:1fr}aside{max-height:220px;overflow:auto}.thread{max-height:55vh}.layout>section{padding:13px}}`}</style></main>;
}
