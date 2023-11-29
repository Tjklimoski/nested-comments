import { usePost } from "@/contexts/PostContext";

export default function Post() {
  const { post } = usePost();

  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
    </>
  );
}
