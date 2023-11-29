"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useAsync } from "@/hooks/useAsync";
import { getPost } from "@/util/posts";

const PostContext = createContext();

export function usePost() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const { id } = useParams();
  // Get the post data for the id (using useAsync hook and request func)
  const { loading, error, value: post } = useAsync(() => getPost(id), [id]);
  const [comments, setComments] = useState([]);
  // Set comments from the post fetched
  useEffect(() => {
    if (post?.comment == null) return;
    setComments(post.comment);
  }, [post?.comment]);

  const commentsByParentId = useMemo(() => {
    // create an object that will contain parentId fields, with arrays of it's children
    const parentGroups = {};
    comments.forEach(comment => {
      // Set the field to an empty array if it doesn't exisit
      parentGroups[comment.parentId] ||= [];
      // Push the child comment to the array
      parentGroups[comment.parentId].push(comment);
    });
    return parentGroups;
  }, [comments]);

  const postContextValues = { id };

  return (
    <PostContext.Provider value={postContextValues}>
      {children}
    </PostContext.Provider>
  );
}
