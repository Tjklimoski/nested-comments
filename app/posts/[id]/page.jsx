"use client";

import Post from "@/components/Post";
import CommentSection from "@/components/CommentSection/CommentSection";
import { usePost } from "@/contexts/PostContext";

export default function PostPage() {
  const { post } = usePost();

  return (
    <>
      <Post />
      <CommentSection />
    </>
  );
}
