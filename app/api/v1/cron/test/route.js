import { NextResponse as Response } from "next/server";

export const runtime = "edge";

export async function GET() {
  const result = await fetch(
    "http://worldtimeapi.org/api/timezone/America/Chicago",
    {
      cache: "no-store",
    }
  );
  const data = await result.json();

  console.log(data);

  return Response.json({ datetime: data.datetime });
}
