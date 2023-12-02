import { NextResponse } from "next/server";
export function GET(req) {
  console.log("/api/v1/cron/test RAN");
  return NextResponse.json(
    {
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    }
  );
}
