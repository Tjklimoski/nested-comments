import { NextResponse as res } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req) {
  async function setCookies(req, res) {
    const user = await prisma.user.findFirst({
      where: {
        name: "Demo User",
      },
    });
    const userId = user?.id;

    if (req.cookies.get("userId") !== userId) {
      req.cookies.set("userId", userId);
      return {
        headers: { "Set-Cookie": `userId=${userId};SameSite=Strict;Path=/` },
      };
    }
    return {};
  }

  const options = await setCookies(req, res);

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return res.json(posts, { ...options });
}
