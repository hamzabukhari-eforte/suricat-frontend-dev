import re
import zipfile
from pathlib import Path

p = Path("THE PLATFORM-page-Document-12-Oct-2026.docx")
with zipfile.ZipFile(p) as z:
    xml = z.read("word/document.xml").decode("utf-8")
    rels = z.read("word/_rels/document.xml.rels").decode("utf-8")

rid_map = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="([^"]+)"', rels))
parts = re.split(r"(<w:t[^>]*>.*?</w:t>|<a:blip[^/]*/>)", xml)
buf: list[str] = []
out: list[str] = []
for part in parts:
    t = re.search(r"<w:t[^>]*>(.*?)</w:t>", part)
    if t:
        buf.append(t.group(1))
        continue
    b = re.search(r'r:embed="(rId\d+)"', part)
    if b:
        text = "".join(buf).strip()
        if text:
            out.append("TEXT: " + text[-160:].replace("\n", " "))
        out.append("IMG: " + rid_map.get(b.group(1), b.group(1)))
        buf = []
if buf:
    out.append("TEXT: " + "".join(buf)[-160:])

Path("_platform_doc_order.txt").write_text("\n".join(out), encoding="utf-8")
print("wrote", len(out), "lines")
