"use client";

import { usePost } from "@/contexts/PostContext";

export default function PostPage() {
  const { post } = usePost();

  return <div>You&#39;re on post page {post.id}</div>;
}
