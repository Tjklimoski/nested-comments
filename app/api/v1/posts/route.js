import { NextResponse as res } from "next/server";
import prisma from "@/prisma/client";
import setCookies from "@/util/setCookie";

export async function GET(req) {
  try {
    // get set-cookie header to add userId
    const headers = await setCookies(req);

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    return res.json(posts, { ...headers });
  } catch (err) {
    return new res(err.message ?? "Unknown error", { status: 400 });
  }
}
