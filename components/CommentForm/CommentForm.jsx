import { useState } from "react";

export default function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) {
  const [message, setMessage] = useState(initialValue);

  return (
    <form onSubmit={() => {}}>
      <div>
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className="btn" disabled={loading} type="submmit">
          {loading ? "..." : "POST"}
        </button>
      </div>
      <div>{error}</div>
    </form>
  );
}
