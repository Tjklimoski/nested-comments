import { IconBtn } from "./IconBtn";
import { FaEdit, FaHeart, FaReply, FaTrash, FaRegHeart } from "react-icons/fa";
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
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const childComments = getReplies(id);
  const createCommentFn = useAsyncFn(createComment);
  const updateCommentFn = useAsyncFn(updateComment);
  const deleteCommentFn = useAsyncFn(deleteComment);
  const toggleCommentLikeFn = useAsyncFn(toggleCommentLike);

  return (
    <>
      {/* Comment */}
      <article>
        <header>
          <span>{user.name}</span>
          <span>{dateFormatter.format(Date.parse(createdAt))}</span>
        </header>

        <div>{message}</div>
        <div>comment form for user to edit this message</div>

        <footer>
          {/* LIKE COMMENT */}
          <IconBtn
            onClick={() => {}}
            disabled={toggleCommentLikeFn.loading}
            Icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? "Unlike" : "Like"}
          >
            {likeCount}
          </IconBtn>

          {/* REPLY TO COMMENT */}
          <IconBtn onClick={() => {}}></IconBtn>

          {/* EDIT YOUR COMMENT */}
          <IconBtn onClick={() => {}}></IconBtn>

          {/* DELETE YOUR COMMENT */}
          <IconBtn onClick={() => {}}></IconBtn>
        </footer>
      </article>

      {/* CommentForm for replying to this comment */}
      <div>comment form</div>

      {/* All children comments to this comment */}
      <>
        <section>
          <button>hide replies</button>
          <div>comments listed</div>
        </section>
        <button>Show replies</button>
      </>
    </>
  );
}
