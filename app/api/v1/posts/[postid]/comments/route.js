import { NextResponse as res } from "next/server";
import prisma from "@/prisma/client";

const COMMENT_SELECT_FIELDS = {
  id: true,
  message: true,
  parentId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
};

export async function POST(req, { params }) {
  const { postid } = params;
  const userId = req.cookies.get("userId")?.value;

  try {
    return res.json(post, { ...headers });
  } catch (err) {
    return new res(err.message ?? "Unknown error", { status: 400 });
  }
}
