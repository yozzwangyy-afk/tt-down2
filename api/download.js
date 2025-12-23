export default async function handler(req, res) {
  const { url, filename } = req.query;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).send("Failed to fetch file");
    }

    const buffer = await response.arrayBuffer();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename || "download"}"`
    );
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Cache-Control", "no-store");

    return res.send(Buffer.from(buffer));
  } catch (err) {
    return res.status(500).send("Download error");
  }
}
