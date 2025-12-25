import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

const CONTENT_DIR = path.join(process.cwd(), "content/writing");

export default function WritingDetail({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(CONTENT_DIR, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "80px auto",
        padding: "0 20px",
        lineHeight: 1.8,
      }}
    >
      <h1 style={{ marginBottom: 8 }}>{data.title}</h1>

      <div style={{ color: "#999", fontSize: 14, marginBottom: 32 }}>
        {data.date}
      </div>

      {content.split("\n\n").map((p: string, i: number) => (
        <p key={i} style={{ marginBottom: 20 }}>
          {p}
        </p>
      ))}
    </main>
  );
}
