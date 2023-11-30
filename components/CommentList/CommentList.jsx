import Comment from "../Comment/Comment";
import styles from "./commentList.module.css";

// Takes an array of comments at the same depth (same parent) and wraps them in a comment stack
export default function CommentList({ comments }) {
  return comments.map(comment => {
    return (
      <div key={comment.id} className={styles.commentStack}>
        <Comment commentData={comment} />
      </div>
    );
  });
}
