import { usePost } from "@/contexts/PostContext";

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

  return <div>Comment</div>;
}
