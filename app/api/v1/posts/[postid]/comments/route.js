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

// POST request to add comment on specific post
export async function POST(req, { params }) {
  const { message, parentId } = await req.json();
  const { postid } = params;
  const userId = req.cookies.get("userId")?.value;

  try {
    // check conditions
    if (message === "" || message == null)
      throw new Error("Message is required");
    if (!userId) throw new Error("No UserId");

    const comment = await prisma.comment.create({
      data: {
        message,
        userId,
        parentId,
        postId: postid,
      },
    });

    return res.json(post, { ...headers });
  } catch (err) {
    return new res(err.message ?? "Unknown error", { status: 400 });
  }
}
