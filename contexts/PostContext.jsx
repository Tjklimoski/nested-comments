"use client";

import { createContext, useContext } from "react";
import { useParams } from "next/navigation";

const PostContext = createContext();

export function usePost() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const { id } = useParams();

  const postContextValues = { id };

  return (
    <PostContext.Provider value={postContextValues}>
      {children}
    </PostContext.Provider>
  );
}
