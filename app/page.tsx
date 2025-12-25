export default function Home() {
  return (
    <main style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
      <h1>Personal Site</h1>
      <p>
        这是一个多用途个人网站底层：
        <br />
        - 工作 / 项目
        <br />
        - 生活记录 / 感悟
        <br />
        - 图片 / 相册
      </p>

      <p style={{ marginTop: 24, color: "#666" }}>
        下一步：接入 Writing / Projects / Photos（MDX 内容系统）
      </p>
    </main>
  );
}
