import {NextResponse} from "next/server";
import {adminOk} from "../../../../../lib/chat";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  const ok = adminOk(request);
  return NextResponse.json(
    { authenticated: ok },
    { status: ok ? 200 : 401, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
  );
}
