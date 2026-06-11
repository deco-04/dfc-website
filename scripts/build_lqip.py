"""Generate LQIP (low-quality image placeholder) data URIs for gallery photos.

Reads every *--landscape_4x3.jpg in public/photos (the gallery tile crop),
shrinks it to 16px wide, and writes public/photos/lqip.json mapping the
public src path ("/photos/<name>--landscape_4x3.jpg") to a base64 JPEG data
URI. next/image consumes these as blurDataURL.

Idempotent. Run after build_photos.py whenever photos change:
    pnpm run lqip
"""

import base64
import io
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PHOTOS = ROOT / "public" / "photos"
OUT = PHOTOS / "lqip.json"

lqip: dict[str, str] = {}
for path in sorted(PHOTOS.glob("*--landscape_4x3.jpg")):
    img = Image.open(path).convert("RGB")
    w, h = img.size
    tiny = img.resize((16, max(1, round(16 * h / w))), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, "JPEG", quality=40)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    lqip[f"/photos/{path.name}"] = f"data:image/jpeg;base64,{b64}"
    print(f"  {path.name}  ->  {len(b64)} chars")

OUT.write_text(json.dumps(lqip, indent=0, sort_keys=True))
print(f"\nWrote {OUT} with {len(lqip)} entries.")
