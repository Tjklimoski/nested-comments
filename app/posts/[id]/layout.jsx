import { PostProvider } from "@/contexts/PostContext";
import React from "react";

export default function PostLayout({ children }) {
  return <PostProvider>{children}</PostProvider>;
}
