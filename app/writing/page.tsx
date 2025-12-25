import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/writing");

type Post = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
};

export default function WritingPage() {
  const files = fs.readdirSync(CONTENT_DIR);

  const posts: Post[] = files.map((file) => {
    const slug = file.replace(".md", "");
    const fullPath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary,
    };
  });

  return (
    <main style={{ maxWidth: 720, margin: "80px auto", padding: "0 20px" }}>
      <h1>Writing</h1>

      <p style={{ color: "#666", marginBottom: 40 }}>
        生活记录 · 思考 · 长文
      </p>

      {posts.map((post) => (
        <article
          key={post.slug}
          style={{
            marginBottom: 48,
            paddingBottom: 24,
            borderBottom: "1px solid #eee",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>
            <a href={`/writing/${post.slug}`} style={{ color: "inherit" }}>
              {post.title}
            </a>
          </h2>

          <div style={{ fontSize: 14, color: "#999", marginBottom: 12 }}>
            {post.date}
          </div>

          {post.summary && (
            <p style={{ color: "#555" }}>{post.summary}</p>
          )}
        </article>
      ))}
    </main>
  );
}
