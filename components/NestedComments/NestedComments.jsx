import React from "react";

export default function NestedComments({ comments, hidden, toggleHidden }) {
  return (
    <>
      <section>
        <button>hide replies</button>
        <div>comments listed</div>
      </section>
      <button>Show replies</button>
    </>
  );
}
