import React from "react";
import CommentList from "../CommentList/CommentList";
import styles from "./nestedComments.module.css";

export default function NestedComments({ comments, hidden, setHidden }) {
  function hideReplies() {
    setHidden(true);
  }

  function showReplies() {
    setHidden(false);
  }

  return (
    <>
      {!hidden && (
        <section className={styles.nestedCommentsStack}>
          <button
            className={styles.collapseLine}
            onClick={hideReplies}
            aria-label="Hide replies"
          />
          <div className={styles.nestedComments}>
            <CommentList comments={comments} />
          </div>
        </section>
      )}
      {hidden && (
        <button className="btn mt-2" onClick={showReplies}>
          Show replies
        </button>
      )}
    </>
  );
}
