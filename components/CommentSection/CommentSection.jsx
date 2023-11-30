import { usePost } from "@/contexts/PostContext";
import CommentForm from "../CommentForm/CommentForm";
import styles from "./commentSection.module.css";
import { useAsyncFn } from "@/hooks/useAsync";
import { createComment } from "@/util/comments";
import CommentList from "../CommentList/CommentList";

export default function CommentSection() {
  const { post, rootComments, createLocalComment } = usePost();
  // Get a function we can call to send a POST request to our API
  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

  function onCreateComment(message) {
    // called when user submits comment
    return createCommentFn({ postId: post.id, message }).then(comment =>
      createLocalComment(comment)
    );
  }

  console.log("ROOTCOMMENTS: ", rootComments);

  return (
    <>
      <h2 className={styles.commentsTitle}>Comments</h2>
      <section>
        <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCreateComment}
        />
        {rootComments && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  );
}
