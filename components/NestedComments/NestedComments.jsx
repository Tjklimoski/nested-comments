import React from "react";
import CommentList from "../CommentList/CommentList";

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
        <section>
          <button onClick={hideReplies}>hide replies</button>
          <div>
            <CommentList comments={comments} />
          </div>
        </section>
      )}
      {hidden && (
        <button className="btn mt-1" onClick={showReplies}>
          Show replies
        </button>
      )}
    </>
  );
}
