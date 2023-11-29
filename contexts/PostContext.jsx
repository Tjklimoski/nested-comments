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
    // If the comment is a ROOT comment, the parenetId field will be null
    const parentGroups = {};
    comments.forEach(comment => {
      // Set the field to an empty array if it doesn't exisit
      parentGroups[comment.parentId] ||= [];
      // Push the child comment to the array
      parentGroups[comment.parentId].push(comment);
    });
    return parentGroups;
  }, [comments]);

  // get replies to a comment based on it's parentId
  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  // local functions are to optomistically update UI while request is sent to server/db
  // add a new comment to the comments array
  function createLocalComment(comment) {
    setComments(current => [comment, ...current]);
  }

  // update a comment in the comments array
  function updateLocalComment(id, message) {
    setComments(current => {
      return current.map(comment => {
        if (comment.id === id) return { ...comment, message };
        return comment;
      });
    });
  }

  // delete a comment in the comments array
  function deleteLocalComment(id) {
    setComments(current => current.filter(comment => comment.id !== id));
  }

  // toggle the like on a comment in the comments array
  function toggleLocalCommentLike(id, addLike) {
    setComments(current => {
      return current.map(comment => {
        if (id !== comment.id) return comment;
        if (addLike) {
          return {
            ...comment,
            likeCount: comment.likeCount + 1,
            likedByMe: true,
          };
        } else {
          return {
            ...comment,
            likeCount: comment.likeCount - 1,
            likedByMe: false,
          };
        }
      });
    });
  }

  const postContextValues = {
    post: { id, ...post },
    rootComments: commentsByParentId[null],
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    toggleLocalCommentLike,
  };

  return (
    <PostContext.Provider value={postContextValues}>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </PostContext.Provider>
  );
}
