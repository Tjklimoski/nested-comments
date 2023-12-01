import { FaEdit, FaHeart, FaReply, FaTrash, FaRegHeart } from "react-icons/fa";
import IconBtn from "../IconBtn/IconBtn";
import { usePost } from "@/contexts/PostContext";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { useAsyncFn } from "@/hooks/useAsync";
import {
  createComment,
  updateComment,
  deleteComment,
  toggleCommentLike,
} from "@/util/comments";
import styles from "./comment.module.css";
import CommentForm from "../CommentForm/CommentForm";
import NestedComments from "../NestedComments/NestedComments";

// to format the date and time the post was created. undefined use's user's timezone/locale.
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
});

export default function Comment({ commentData }) {
  const { id, message, user, createdAt, likeCount, likedByMe } = commentData;
  const {
    post,
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    toggleLocalCommentLike,
  } = usePost();
  const currentUser = useUser();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const childComments = getReplies(id);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const createCommentFn = useAsyncFn(createComment);
  const updateCommentFn = useAsyncFn(updateComment);
  const deleteCommentFn = useAsyncFn(deleteComment);
  const toggleCommentLikeFn = useAsyncFn(toggleCommentLike);

  function onToggleCommentLike() {
    // addLike is returned by the API request with true of false depending on the result
    return toggleCommentLikeFn
      .execute({ commentId: id, postId: post.id })
      .then(({ addLike }) => toggleLocalCommentLike(id, addLike));
  }

  function onCommentDelete() {
    return deleteCommentFn
      .execute({ postId: post.id, commentId: id })
      .then(comment => deleteLocalComment(comment.id));
  }

  function onCommentUpdate(message) {
    return updateCommentFn
      .execute({ postId: post.id, message, commentId: id })
      .then(comment => {
        setIsEditing(false);
        updateLocalComment(id, comment.message);
      });
  }

  function onCommentReply(message) {
    return createCommentFn
      .execute({ postId: post.id, message, parentId: id })
      .then(comment => {
        setIsReplying(false);
        createLocalComment(comment);
      });
  }

  return (
    <>
      {/* Comment */}
      <article className={styles.comment}>
        <header className={styles.header}>
          <span className={styles.name}>{user.name}</span>
          <span>{dateFormatter.format(Date.parse(createdAt))}</span>
        </header>

        {/* Show edit form or comment message depending on isEditing state */}
        {isEditing ? (
          <CommentForm
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
            onSubmit={onCommentUpdate}
            autoFocus
            initialValue={message}
          />
        ) : (
          <div className={styles.message}>{message}</div>
        )}

        <footer className={styles.footer}>
          {/* LIKE COMMENT */}
          <IconBtn
            onClick={onToggleCommentLike}
            disabled={toggleCommentLikeFn.loading}
            Icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? "Unlike" : "Like"}
          >
            {likeCount}
          </IconBtn>

          {/* REPLY TO COMMENT */}
          <IconBtn
            onClick={() => setIsReplying(current => !current)}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel reply" : "Reply"}
          />

          {user.id === currentUser.id && (
            <>
              {/* EDIT YOUR COMMENT */}
              <IconBtn
                onClick={() => setIsEditing(current => !current)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel edit" : "Edit"}
              />

              {/* DELETE YOUR COMMENT */}
              <IconBtn
                onClick={onCommentDelete}
                disabled={deleteCommentFn.loading}
                Icon={FaTrash}
                aria-label="Delete"
                color="danger"
              />
            </>
          )}
          {deleteCommentFn.error && <div>{deleteCommentFn.error}</div>}
        </footer>
      </article>

      {/* CommentForm for replying to this comment */}
      {isReplying && (
        <div className="mt-1 ml-6">
          <CommentForm
            autoFocus
            onSubmit={onCommentReply}
            loading={createCommentFn.loading}
            error={createCommentFn.error}
          />
        </div>
      )}

      {/* All children comments to this comment */}
      <NestedComments />
    </>
  );
}
