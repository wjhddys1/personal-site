import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content/writing");

export default async function WritingDetail({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(CONTENT_DIR, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "80px auto",
        padding: "0 20px",
        lineHeight: 1.9,
        fontSize: 16,
      }}
    >
      <h1 style={{ marginBottom: 8 }}>{data.title}</h1>

      <div style={{ color: "#999", fontSize: 14, marginBottom: 40 }}>
        {data.date}
      </div>

      <article
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}

