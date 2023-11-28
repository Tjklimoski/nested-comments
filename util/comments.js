import { makeRequest } from "./makeRequest";

export function createComment({ postId, message, parentId }) {
  return makeRequest(`/posts/${postId}/comments`, {
    method: "POST",
    data: { message, parentId },
  });
}

export function updateComment({ postId, message, commentId }) {
  return makeRequest(`/posts/${postId}/comments/${commentId}`, {
    method: "PATCH",
    data: { message },
  });
}

export function deleteComment({ postId, commentId }) {
  return makeRequest(`/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
  });
}

export function toggleCommentLike({ postId, commentId }) {
  return makeRequest(`/posts/${postId}/comments/${commentId}/toggleLike`, {
    method: "POST",
  });
}
