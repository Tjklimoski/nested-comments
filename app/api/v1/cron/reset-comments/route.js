import { NextResponse as res } from "next/server";
import resetComments from "@/prisma/resetComments";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await resetComments();
    return new res("Comments reset", { status: 200 });
  } catch (err) {
    return new res("Cron job - reset comments - failed", { status: 400 });
  }
}
