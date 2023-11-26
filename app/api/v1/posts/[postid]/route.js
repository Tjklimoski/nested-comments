import { NextResponse as res } from "next/server";
import prisma from "@/prisma/client";
import setCookies from "@/app/util/setCookie";

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

// GET a specified post with Comment data, User who posted the comments, and comment likes
export async function GET(req, { params }) {
  const { postid } = params;

  // get set-cookie header to add userId
  const headers = await setCookies(req);

  const userId = req.cookies.get("userId")?.value;

  const post = await prisma.post
    .findUnique({
      where: { id: postid },
      select: {
        body: true,
        title: true,
        Comments: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            ...COMMENT_SELECT_FIELDS,
            _count: { select: { likes: true } },
          },
        },
      },
    })
    .then(async post => {
      // get the likes that are made by the current user that are on the comments in the current post. (this is faster and less intensive then getting all likes on every comment and then checking for the userId in that list)
      const likes = await prisma.like.findMany({
        where: {
          userId,
          commentId: { in: post.Comments.map(comment => comment.id) },
        },
      });

      return {
        ...post,
        // Modify Comments by including a likedByMe boolean field, and likeCount from _count created by Prisma
        Comments: post.Comments.map(comment => {
          const { _count, ...commentFields } = comment;
          return {
            ...commentFields,
            likedByMe: likes.find(like => like.commentId === comment.id),
            likeCount: _count.likes,
          };
        }),
      };
    });

  return res.json(post, { ...headers });
}
