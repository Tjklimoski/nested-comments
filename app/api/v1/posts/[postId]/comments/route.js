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
  const { postId } = params;
  const userId = req.cookies.get("userId")?.value;

  try {
    // check conditions
    if (message === "" || message == null)
      throw new Error("Message is required");
    if (!userId) throw new Error("No UserId");

    const comment = await prisma.comment
      .create({
        data: {
          message,
          userId,
          parentId,
          postId,
        },
        // To return the user data when creating local comment in post context
        select: COMMENT_SELECT_FIELDS,
      })
      .then(comment => ({ ...comment, likeCount: 0, likedByMe: false }));

    return res.json(comment);
  } catch (err) {
    return new res(err.message ?? "Unknown error", { status: 400 });
  }
}
