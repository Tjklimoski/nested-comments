import resetComments from "@/prisma/resetComments";
import { NextResponse as res } from "next/server";

export async function GET(req) {
  try {
    await resetComments();
    return new res("Comment reset", { status: 200 });
  } catch (err) {
    return new res("Cron job - reset comments - failed", { status: 400 });
  }
}
