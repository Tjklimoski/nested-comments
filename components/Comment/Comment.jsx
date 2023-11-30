import React from "react";

export default function Comment({ commentData }) {
  const { id, message, user, createdAt, likeCount, likedByMe } = commentData;

  return <div>Comment</div>;
}
