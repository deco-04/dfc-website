"""Generate the OG share image set for Denver Flooring Collective.

What this produces:
  public/og/dfc-share-1200x630.jpg     -- default (FB, Twitter, iMessage, WhatsApp, Slack)
  public/og/dfc-square-1200x1200.jpg   -- Instagram square + fallback
  public/og/dfc-story-1080x1920.jpg    -- IG/FB Story + iPhone share sheet
  public/og/dfc-reviews-1200x630.jpg   -- /reviews override (5.0-on-Google motif)
  public/og/dfc-book-1200x630.jpg      -- /book override (calendar motif)
  public/og/dfc-remote-1200x630.jpg    -- /remote-estimate override (photos motif)
  public/og/dfc-partner-1200x630.jpg   -- /work-with-us override (three-doors motif)
  public/og/dfc-lp-meta-1200x630.jpg   -- /lp/meta paid landing (offer-led)
  public/og/dfc-lp-google-1200x630.jpg -- /lp/google paid landing (offer-led)
  public/og/dfc-contact-1200x630.jpg   -- /contact (phone-led)

Brand tokens:
  sage          #567360   primary headline + dot accents
  sage-deep     #3F5547   italic accent
  walnut-deep   #6B3F1F   eyebrow + tagline rule
  flatiron      #9B5236   phone CTA pill
  linen         #F2EFE9   canvas
  linen-warm    #F6EFE3   inset card canvas
  espresso      #2B1810   bottom band
  camel         #B07B4E   subtle accents
  onyx          #1A1614   body text

Run:
  pnpm run og        (== python scripts/build_og.py)

Re-run any time the headline, phone number, or trust pill copy changes.
"""

from __future__ import annotations

import os
import urllib.request
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og"
ASSETS = ROOT / "scripts" / "og-assets"
FONTS = ASSETS / "fonts"
PHOTOS = ROOT / "public" / "photos"

OUT.mkdir(parents=True, exist_ok=True)
FONTS.mkdir(parents=True, exist_ok=True)

# Brand tokens (mirrors tailwind.config.ts)
SAGE = (86, 115, 96)
SAGE_DEEP = (63, 85, 71)
WALNUT_DEEP = (107, 63, 31)
FLATIRON = (155, 82, 54)
LINEN = (242, 239, 233)
LINEN_WARM = (246, 239, 227)
ESPRESSO = (43, 24, 16)
CAMEL = (176, 123, 78)
ONYX = (26, 22, 20)

# ---------- Font setup ---------------------------------------------------

# Fonts. Source: fontsource jsDelivr CDN (stable, served from npm packages).
# Each entry: target filename -> download URL (CDN). If a download 404s, fall
# back to a system font with a similar feel so the build always produces
# something usable.
FONT_URLS = {
    "Fraunces-SemiBold.ttf":
        "https://cdn.jsdelivr.net/gh/google/fonts/ofl/fraunces/Fraunces[SOFT,WONK,opsz,wght].ttf",
    "Fraunces-Italic-SemiBold.ttf":
        "https://cdn.jsdelivr.net/gh/google/fonts/ofl/fraunces/Fraunces-Italic[SOFT,WONK,opsz,wght].ttf",
    "Inter-Regular.ttf":
        "https://cdn.jsdelivr.net/gh/google/fonts/ofl/inter/Inter[opsz,wght].ttf",
    "Inter-SemiBold.ttf":
        "https://cdn.jsdelivr.net/gh/google/fonts/ofl/inter/Inter[opsz,wght].ttf",
    "Inter-Bold.ttf":
        "https://cdn.jsdelivr.net/gh/google/fonts/ofl/inter/Inter[opsz,wght].ttf",
    "Inter-Medium.ttf":
        "https://cdn.jsdelivr.net/gh/google/fonts/ofl/inter/Inter[opsz,wght].ttf",
    "Fraunces-Regular.ttf":
        "https://cdn.jsdelivr.net/gh/google/fonts/ofl/fraunces/Fraunces[SOFT,WONK,opsz,wght].ttf",
    "Fraunces-Italic-Regular.ttf":
        "https://cdn.jsdelivr.net/gh/google/fonts/ofl/fraunces/Fraunces-Italic[SOFT,WONK,opsz,wght].ttf",
}

# System-font fallbacks per font family. PIL ImageFont accepts a font
# variation index via .set_variation_by_name on variable fonts, but we
# match by weight via the file mapping above so this stays simple.
SYSTEM_FALLBACK = {
    "Fraunces-Regular.ttf":           "C:\\Windows\\Fonts\\georgia.ttf",
    "Fraunces-SemiBold.ttf":          "C:\\Windows\\Fonts\\georgiab.ttf",
    "Fraunces-Italic-Regular.ttf":    "C:\\Windows\\Fonts\\georgiai.ttf",
    "Fraunces-Italic-SemiBold.ttf":   "C:\\Windows\\Fonts\\georgiaz.ttf",
    "Inter-Regular.ttf":              "C:\\Windows\\Fonts\\segoeui.ttf",
    "Inter-Medium.ttf":               "C:\\Windows\\Fonts\\segoeui.ttf",
    "Inter-SemiBold.ttf":             "C:\\Windows\\Fonts\\seguisb.ttf",
    "Inter-Bold.ttf":                 "C:\\Windows\\Fonts\\segoeuib.ttf",
}


def ensure_fonts() -> None:
    for name, url in FONT_URLS.items():
        path = FONTS / name
        if path.exists() and path.stat().st_size > 1000:
            continue
        try:
            print(f"  downloading {name} ...")
            with urllib.request.urlopen(url, timeout=20) as r, path.open("wb") as f:
                f.write(r.read())
        except Exception as e:
            print(f"  WARN download failed for {name}: {e}")


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    """Load font by logical name. Prefer downloaded TTF, fall back to system."""
    p = FONTS / name
    if p.exists() and p.stat().st_size > 1000:
        return ImageFont.truetype(str(p), size=size)
    sys_path = SYSTEM_FALLBACK.get(name)
    if sys_path and os.path.exists(sys_path):
        return ImageFont.truetype(sys_path, size=size)
    # Last resort: PIL bundled DejaVu (always present).
    return ImageFont.load_default()


# ---------- Helpers ------------------------------------------------------

def grain(im: Image.Image, opacity: int = 8) -> Image.Image:
    """Subtle film-grain overlay so type does not look plasticky."""
    import random
    w, h = im.size
    noise = Image.new("L", (w // 2, h // 2))
    noise.putdata([random.randint(0, 255) for _ in range(noise.size[0] * noise.size[1])])
    noise = noise.resize((w, h), Image.BILINEAR).filter(ImageFilter.GaussianBlur(0.4))
    overlay = Image.new("RGB", im.size, (255, 255, 255))
    return Image.composite(overlay, im, noise.point(lambda v: opacity if v > 128 else 0))


def draw_text(d: ImageDraw.ImageDraw, xy, text, fontspec, fill, anchor="lt", tracking=0):
    """draw_text with optional letter-spacing (tracking)."""
    if tracking == 0:
        d.text(xy, text, font=fontspec, fill=fill, anchor=anchor)
        return
    x, y = xy
    for ch in text:
        bb = d.textbbox((0, 0), ch, font=fontspec, anchor="lt")
        d.text((x, y), ch, font=fontspec, fill=fill, anchor="lt")
        x += (bb[2] - bb[0]) + tracking


def trust_pill(d: ImageDraw.ImageDraw, cx: int, cy: int, text: str, fontspec, bg, fg, pad=22):
    """Pill-shaped trust band centered on (cx, cy)."""
    bb = d.textbbox((0, 0), text, font=fontspec)
    w = bb[2] - bb[0] + pad * 2
    h = bb[3] - bb[1] + pad
    d.rounded_rectangle(
        (cx - w // 2, cy - h // 2, cx + w // 2, cy + h // 2),
        radius=h // 2,
        fill=bg,
    )
    d.text((cx, cy), text, font=fontspec, fill=fg, anchor="mm")


def logo_mark(d: ImageDraw.ImageDraw, x: int, y: int, size: int, color):
    """Render the DFC stylized mountain mark + wordmark.

    Recreates the iconography of public/logo/logo-black.svg
    (circle ring + mountain peaks) at any size, without needing
    cairo to rasterize the SVG.
    """
    r = size // 2
    # Outer ring
    d.ellipse((x - r, y - r, x + r, y + r), outline=color, width=max(2, size // 32))
    # Mountain peaks inside the ring (two triangles)
    peak_h = int(r * 0.55)
    base_y = y + int(r * 0.25)
    # Back peak
    d.polygon([
        (x - int(r * 0.55), base_y),
        (x - int(r * 0.05), base_y - peak_h),
        (x + int(r * 0.45), base_y),
    ], fill=color)
    # Front peak (shorter, in front)
    d.polygon([
        (x - int(r * 0.10), base_y),
        (x + int(r * 0.25), base_y - int(peak_h * 0.7)),
        (x + int(r * 0.60), base_y),
    ], fill=color)


def fit_photo(path: Path, w: int, h: int) -> Image.Image:
    """Open, center-crop to w:h aspect, resize."""
    im = Image.open(path).convert("RGB")
    src_w, src_h = im.size
    target = w / h
    src = src_w / src_h
    if src > target:
        new_w = int(src_h * target)
        left = (src_w - new_w) // 2
        im = im.crop((left, 0, left + new_w, src_h))
    else:
        new_h = int(src_w / target)
        top = (src_h - new_h) // 2
        im = im.crop((0, top, src_w, top + new_h))
    return im.resize((w, h), Image.LANCZOS)


def save_jpg(im: Image.Image, path: Path, q: int = 88) -> None:
    im.save(path, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"  -> {path.relative_to(ROOT)}  ({path.stat().st_size // 1024} KB)")


# ---------- Layouts ------------------------------------------------------

def build_landscape(
    headline_pre: str,
    headline_accent: str,
    headline_post: str,
    eyebrow: str,
    photo: Path,
    trust: str = "LICENSED  ·  INSURED  ·  5.0 GOOGLE  ·  1-YR WARRANTY",
    phone: str = "720-599-1664",
) -> Image.Image:
    W, H = 1200, 630
    canvas = Image.new("RGB", (W, H), LINEN_WARM)
    d = ImageDraw.Draw(canvas)

    # Right-side photo card (40% width, full height, inset margins)
    photo_w = int(W * 0.42)
    photo_h = H - 80
    photo_im = fit_photo(photo, photo_w - 40, photo_h - 40)
    px = W - photo_w + 20
    py = 40
    canvas.paste(photo_im, (px, py))
    # Photo frame
    d.rectangle((px - 6, py - 6, px + photo_w - 40 + 6, py + photo_h - 40 + 6),
                outline=WALNUT_DEEP, width=1)

    # Left content column
    LX = 64
    # Logo mark + wordmark (top-left)
    logo_mark(d, LX + 26, 86, 52, SAGE)
    draw_text(d, (LX + 70, 76), "DENVER FLOORING",
              font("Inter-SemiBold.ttf", 17), WALNUT_DEEP, anchor="lt", tracking=2)
    draw_text(d, (LX + 70, 100), "COLLECTIVE",
              font("Inter-SemiBold.ttf", 17), WALNUT_DEEP, anchor="lt", tracking=2)

    # Eyebrow
    draw_text(d, (LX, 170), eyebrow,
              font("Inter-SemiBold.ttf", 16), WALNUT_DEEP, anchor="lt", tracking=4)

    # Headline (Fraunces) — drawn in three pieces so the accent word is italic.
    head_font = font("Fraunces-SemiBold.ttf", 78)
    head_italic = font("Fraunces-Italic-SemiBold.ttf", 78)
    y = 210
    d.text((LX, y), headline_pre, font=head_font, fill=SAGE, anchor="lt")
    y2 = y + 88
    d.text((LX, y2), headline_accent, font=head_italic, fill=SAGE_DEEP, anchor="lt")
    bb_acc = d.textbbox((LX, y2), headline_accent, font=head_italic)
    if headline_post:
        d.text((bb_acc[2] + 18, y2), headline_post, font=head_font, fill=SAGE, anchor="lt")

    # Tagline
    draw_text(d, (LX, 410), "Crafted floors.  Thoughtful process.  Built to last.",
              font("Fraunces-Italic-Regular.ttf", 26), WALNUT_DEEP)

    # Trust pill (lower left)
    trust_pill(d, LX + 240, 502, trust,
               font("Inter-SemiBold.ttf", 15), SAGE, LINEN, pad=24)

    # Phone band (bottom)
    draw_text(d, (LX, 560), phone,
              font("Inter-Bold.ttf", 30), FLATIRON)
    draw_text(d, (LX + 195, 568), "·  denverflooringcollective.com",
              font("Inter-Medium.ttf", 18), ONYX)

    return canvas


def build_square(headline_pre: str, headline_accent: str, headline_post: str, photo: Path,
                 phone: str = "720-599-1664") -> Image.Image:
    W, H = 1200, 1200
    canvas = Image.new("RGB", (W, H), LINEN_WARM)
    d = ImageDraw.Draw(canvas)

    # ----- Top band: logo + headline ---------------------------------
    logo_mark(d, 130, 110, 60, SAGE)
    draw_text(d, (180, 95), "DENVER FLOORING",
              font("Inter-SemiBold.ttf", 22), WALNUT_DEEP, anchor="lt", tracking=3)
    draw_text(d, (180, 126), "COLLECTIVE",
              font("Inter-SemiBold.ttf", 22), WALNUT_DEEP, anchor="lt", tracking=3)

    # Eyebrow
    draw_text(d, (80, 230), "DENVER  ·  AURORA  ·  FRONT RANGE",
              font("Inter-SemiBold.ttf", 18), WALNUT_DEEP, anchor="lt", tracking=4)

    # Headline (3 lines stacked for square)
    head = font("Fraunces-SemiBold.ttf", 96)
    head_it = font("Fraunces-Italic-SemiBold.ttf", 96)
    d.text((80, 270), headline_pre + ",", font=head, fill=SAGE, anchor="lt")
    d.text((80, 370), headline_accent, font=head_it, fill=SAGE_DEEP, anchor="lt")
    if headline_post:
        d.text((80, 470), headline_post + ".", font=head, fill=SAGE, anchor="lt")

    # ----- Middle band: photo card -----------------------------------
    photo_h = 380
    photo_w = W - 160
    photo_im = fit_photo(photo, photo_w, photo_h)
    canvas.paste(photo_im, (80, 620))
    d.rectangle((80 - 4, 620 - 4, 80 + photo_w + 4, 620 + photo_h + 4),
                outline=WALNUT_DEEP, width=1)

    # ----- Bottom band: espresso strip with phone + URL + trust ------
    band_y = 1030
    d.rectangle((0, band_y, W, H), fill=ESPRESSO)

    draw_text(d, (80, band_y + 36), "Crafted floors.  Built to last.",
              font("Fraunces-Italic-Regular.ttf", 30), CAMEL)
    draw_text(d, (80, band_y + 90), phone,
              font("Inter-Bold.ttf", 38), LINEN)
    draw_text(d, (350, band_y + 100), "·  denverflooringcollective.com",
              font("Inter-Medium.ttf", 20), CAMEL)

    # Trust strip
    draw_text(d, (80, band_y + 145),
              "LICENSED   ·   INSURED   ·   5.0 ON GOOGLE   ·   1-YR WARRANTY",
              font("Inter-SemiBold.ttf", 16), CAMEL, tracking=3)

    return canvas


def build_story(headline_pre: str, headline_accent: str, headline_post: str, photo: Path,
                phone: str = "720-599-1664") -> Image.Image:
    W, H = 1080, 1920
    canvas = Image.new("RGB", (W, H), LINEN_WARM)
    d = ImageDraw.Draw(canvas)

    # Logo top center
    logo_mark(d, W // 2, 160, 110, SAGE)
    draw_text(d, (W // 2, 250), "DENVER FLOORING COLLECTIVE",
              font("Inter-SemiBold.ttf", 22), WALNUT_DEEP, anchor="mm", tracking=4)

    # Eyebrow
    draw_text(d, (W // 2, 360), "DENVER  ·  AURORA  ·  FRONT RANGE",
              font("Inter-SemiBold.ttf", 18), WALNUT_DEEP, anchor="mm", tracking=4)

    # Headline
    head = font("Fraunces-SemiBold.ttf", 110)
    head_it = font("Fraunces-Italic-SemiBold.ttf", 110)
    d.text((W // 2, 470), headline_pre + ",", font=head, fill=SAGE, anchor="mm")
    d.text((W // 2, 600), headline_accent, font=head_it, fill=SAGE_DEEP, anchor="mm")
    if headline_post:
        d.text((W // 2, 730), headline_post + ".", font=head, fill=SAGE, anchor="mm")

    # Photo card
    photo_h = 700
    photo_w = W - 160
    photo_im = fit_photo(photo, photo_w, photo_h)
    canvas.paste(photo_im, (80, 900))
    d.rectangle((76, 896, 80 + photo_w + 4, 900 + photo_h + 4),
                outline=WALNUT_DEEP, width=1)

    # CTA + phone band (bottom espresso)
    band_y = 1700
    d.rectangle((0, band_y, W, H), fill=ESPRESSO)
    draw_text(d, (W // 2, band_y + 50), "Free on-site estimate. Same crew, every job.",
              font("Fraunces-Italic-Regular.ttf", 28), CAMEL, anchor="mm")
    draw_text(d, (W // 2, band_y + 110), phone,
              font("Inter-Bold.ttf", 56), LINEN, anchor="mm")
    draw_text(d, (W // 2, band_y + 175),
              "LICENSED  ·  INSURED  ·  5.0 ON GOOGLE  ·  1-YR WARRANTY",
              font("Inter-SemiBold.ttf", 16), CAMEL, anchor="mm", tracking=3)

    return canvas


# ---------- Variant builds ----------------------------------------------

VARIANTS = [
    # (filename, headline_pre, headline_accent, headline_post, eyebrow, photo, trust)
    ("dfc-share-1200x630.jpg",     "Flooring,", "installed right",   "",
     "DENVER  ·  AURORA  ·  FRONT RANGE",
     PHOTOS / "staircases-walnut-after--landscape_16x9.jpg",
     "LICENSED  ·  INSURED  ·  5.0 ON GOOGLE  ·  1-YR WARRANTY"),
    ("dfc-reviews-1200x630.jpg",   "Real",      "Denver",            "reviews.",
     "5.0 ON GOOGLE  ·  600+ PROJECTS",
     PHOTOS / "hardwood-petra-kitchen--landscape_16x9.jpg",
     "REAL CUSTOMERS  ·  REAL FLOORS  ·  REAL REVIEWS"),
    ("dfc-book-1200x630.jpg",      "Book a",    "free",              "estimate.",
     "ON-SITE OR REMOTE  ·  WITHIN 24 HOURS",
     PHOTOS / "hardwood-jason-entry--landscape_16x9.jpg",
     "FREE  ·  NO OBLIGATION  ·  SAME CREW WALKS THE SPACE"),
    ("dfc-remote-1200x630.jpg",    "Send your", "floorplan",         ".",
     "REMOTE ESTIMATE  ·  PHOTOS + MEASUREMENTS",
     PHOTOS / "hardwood-petra-stairs--landscape_16x9.jpg",
     "WRITTEN QUOTE  ·  24 HOUR TURNAROUND  ·  1-YR WARRANTY"),
    ("dfc-partner-1200x630.jpg",   "Work",      "with",              "us.",
     "INSTALLERS  ·  SUPPLIERS  ·  REFERRAL PARTNERS",
     PHOTOS / "basement-david-bathroom--landscape_16x9.jpg",
     "HIRING CREWS  ·  $100 REFERRAL  ·  CONTRACTOR PRICING"),
    ("dfc-lp-meta-1200x630.jpg",   "Denver",    "flooring",          "estimate.",
     "FREE QUOTE  ·  WITHIN 24 HOURS",
     PHOTOS / "hardwood-petra-kitchen--landscape_16x9.jpg",
     "600+ PROJECTS  ·  1-YR WARRANTY  ·  LICENSED + INSURED"),
    ("dfc-lp-google-1200x630.jpg", "Denver",    "flooring",          "estimate.",
     "FREE QUOTE  ·  WITHIN 24 HOURS",
     PHOTOS / "laminate-irena-stairs--landscape_16x9.jpg",
     "600+ PROJECTS  ·  1-YR WARRANTY  ·  LICENSED + INSURED"),
    ("dfc-contact-1200x630.jpg",   "Text us.",  "We pick up",        ".",
     "DENVER METRO  ·  720-599-1664",
     PHOTOS / "basement-kallie-shower--landscape_16x9.jpg",
     "MON-FRI 8-6  ·  TEXT OR CALL  ·  WE PICK UP"),
]


def main() -> None:
    print("Building OG image set ...")
    print(f"  output dir: {OUT}")
    ensure_fonts()
    default_photo = PHOTOS / "staircases-walnut-after--landscape_16x9.jpg"

    # All landscape variants
    for fname, pre, accent, post, eyebrow, photo, trust in VARIANTS:
        if not photo.exists():
            print(f"  WARN: photo missing {photo.name}, using default")
            photo = default_photo
        im = build_landscape(pre, accent, post, eyebrow, photo, trust=trust)
        save_jpg(im, OUT / fname)

    # Square
    sq = build_square("Flooring", "installed right", "the first time",
                      photo=default_photo)
    save_jpg(sq, OUT / "dfc-square-1200x1200.jpg")

    # Story
    st = build_story("Crafted floors", "Built to last", "",
                     photo=default_photo)
    save_jpg(st, OUT / "dfc-story-1080x1920.jpg")

    print("Done.")


if __name__ == "__main__":
    main()
