import { useState } from "react";
import styles from "./commentForm.module.css";

export default function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) {
  const [message, setMessage] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    // Submit user's comment to db, if succesful clear input field
    onSubmit(message).then(() => setMessage(""));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.commentFormRow}>
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={styles.messageInput}
        />
        <button
          className={`btn ${styles.postBtn}`}
          disabled={loading}
          type="submmit"
        >
          {loading ? "..." : "POST"}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
}
