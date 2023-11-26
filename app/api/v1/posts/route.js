import { NextResponse as res } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req) {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return res.json(posts);
}
