"use client";

import Post from "@/components/Post/Post";
import { usePost } from "@/contexts/PostContext";

export default function PostPage() {
  const { post } = usePost();

  return (
    <>
      <Post />
      {/* CommentSection */}
    </>
  );
}
