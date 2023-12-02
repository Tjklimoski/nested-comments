import { NextResponse } from "next/server";
export function GET(request) {
  return new NextResponse("success", {
    status: 200,
  });
}
