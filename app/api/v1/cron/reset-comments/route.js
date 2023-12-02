import { NextResponse as res } from "next/server";
import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await resetComments();
    return new res("Comment reset", { status: 200 });
  } catch (err) {
    return new res("Cron job - reset comments - failed", { status: 400 });
  }
}

async function resetComments() {
  console.log("IN RESETCOMMENTS FUNC");
  const deleteManyResults = await prisma.comment.deleteMany();

  console.log("delete many results: ", deleteManyResults);

  // Get the two user accounts so comments can be assigned to their ids
  const demo = await prisma.user.findFirst({ where: { name: "Demo User" } });
  const example = await prisma.user.findFirst({
    where: { name: "Example User" },
  });

  // Get the two posts so comments can be assigned to their ids
  const post1 = await prisma.post.findFirst({ where: { title: "Post 1" } });
  const post2 = await prisma.post.findFirst({ where: { title: "Post 2" } });

  console.log("post1: ", post1);

  const comment1 = await prisma.comment.create({
    data: {
      message: "Another root comment",
      userId: demo.id,
      postId: post1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      message:
        "this is a root comment on this post. Try replying to this comment by clicking the reply button below.",
      userId: example.id,
      postId: post1.id,
    },
  });

  // have no children comments so don't need to assign to a variable
  await prisma.comment.create({
    data: {
      message:
        "You can collapse the comments by clicking the line on the left of the block/section you want to hide. Give it a try!",
      parentId: comment2.id,
      userId: example.id,
      postId: post1.id,
    },
  });

  // have no children comments so don't need to assign to a variable
  await prisma.comment.create({
    data: {
      message:
        "Multiple users can reply to the same comment, and they will be nested as well.",
      parentId: comment2.id,
      userId: example.id,
      postId: post1.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      message:
        "This is a reply to the above comment. You're the creator of this comment so you can edit and delete it.",
      parentId: comment2.id,
      userId: demo.id,
      postId: post1.id,
    },
  });

  // have no children comments so don't need to assign to a variable
  await prisma.comment.create({
    data: {
      message:
        "You can also reply to your own comments. If you delete a comment, any nested comments will also be removed.",
      parentId: comment3.id,
      userId: demo.id,
      postId: post1.id,
    },
  });

  // have no children comments so don't need to assign to a variable
  await prisma.comment.create({
    data: {
      message: "A reply by another user. Try deleting your comment above.",
      parentId: comment1.id,
      userId: example.id,
      postId: post1.id,
    },
  });

  // have no children comments so don't need to assign to a variable
  await prisma.comment.create({
    data: {
      message: "The first comment on this post.",
      userId: example.id,
      postId: post2.id,
    },
  });
}
