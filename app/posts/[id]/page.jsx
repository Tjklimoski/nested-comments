"use client";

import { usePost } from "@/contexts/PostContext";

export default function PostPage() {
  const { id } = usePost();

  return <div>You&#39;re on post page {id}</div>;
}
