import { NextResponse as res } from "next/server";
import prisma from "@/prisma/client";
import setCookies from "@/app/util/setCookie";

export async function GET(req) {
  // get set-cookie header to add userId
  const headers = await setCookies(req);

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return res.json(posts, { ...headers });
}
