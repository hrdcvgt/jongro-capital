import {NextResponse} from "next/server";
export async function POST(){
 const response=NextResponse.json({ok:true});
 response.cookies.set("jongro_admin","",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:0});
 return response;
}
