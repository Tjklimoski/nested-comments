import { NextResponse as res } from "next/server";
import prisma from "@/prisma/client";

// UPDATE a specific comment's message on the requested post
export async function PATCH(req, { params }) {
  const { message } = await req.json();
  const { commentId } = params;
  const userId = req.cookies.get("userId")?.value;

  try {
    // check conditions
    if (message === "" || message == null)
      throw new Error("Message is required");
    if (!userId) throw new Error("No UserId");

    // validate the user who's making the edit is the one who created the comment
    const { userId: commentUserId } = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });
    if (commentUserId !== userId) throw new Error("You do not have permission");

    const comment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        message,
      },
      select: {
        message: true,
      },
    });

    return res.json(comment);
  } catch (err) {
    return new res(err.message ?? "Unknown error", { status: 400 });
  }
}

// DELETE a specific comment's message on the requested post
export async function DELETE(req, { params }) {
  const { commentId } = params;
  const userId = req.cookies.get("userId")?.value;

  try {
    // check conditions
    if (!userId) throw new Error("No UserId");

    // validate the user who's making the edit is the one who created the comment
    const { userId: commentUserId } = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });
    if (commentUserId !== userId) throw new Error("You do not have permission");

    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
      select: {
        id: true,
      },
    });

    return res.json(comment);
  } catch (err) {
    return new res(err.message ?? "Unknown error", { status: 400 });
  }
}
