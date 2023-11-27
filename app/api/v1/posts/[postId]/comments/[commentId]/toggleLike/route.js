import { NextResponse as res } from "next/server";
import prisma from "@/prisma/client";

// POST to TOGGLE the like status of a comment by the current user
export async function POST(req, { params }) {
  const { commentId } = params;
  const userId = req.cookies.get("userId")?.value;

  try {
    // check conditions
    if (!userId) throw new Error("No UserId");

    const data = {
      commentId,
      userId,
    };

    const like = await prisma.like.findUnique({
      where: {
        userId_commentId: data,
      },
    });

    let result;
    if (like == null) {
      // ADD a like by the user to the comment
      result = await prisma.like.create({ data }).then(() => {
        return { addLike: true };
      });
    } else {
      // REMOVE the like by the user from the comment
      result = await prisma.like
        .delete({ where: { userId_commentId: data } })
        .then(() => {
          return { addLike: false };
        });
    }

    // check for no result
    if (result == null)
      throw new Error("Invalid data sent, unable to like comment");

    return res.json(result);
  } catch (err) {
    return new res(err.message ?? "Unknown error", { status: 400 });
  }
}
