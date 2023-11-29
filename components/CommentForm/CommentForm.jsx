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
    <form>
      <div>
        <textarea />
        <button>POST</button>
      </div>
      <div>error message</div>
    </form>
  );
}
