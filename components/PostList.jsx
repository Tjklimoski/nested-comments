import { getPosts } from "../services/posts";
import Link from "next/link";
import { useAsync } from "../hooks/useAsync";

export function PostList() {
  const { loading, error, value: posts } = useAsync(getPosts);

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1 className="error-msg">{error}</h1>;

  return posts.map(post => {
    return (
      <h1 key={post.id}>
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h1>
    );
  });
}
