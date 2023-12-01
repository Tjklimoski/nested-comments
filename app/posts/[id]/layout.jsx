import { PostProvider } from "@/contexts/PostContext";
import React from "react";

export default function PostLayout({ children }) {
  return (
    <>
      <p style={{ color: "var(--success)", fontWeight: "bold" }}>
        Note: Comments reset daily, interact all you want!
      </p>
      <PostProvider>{children}</PostProvider>
    </>
  );
}
