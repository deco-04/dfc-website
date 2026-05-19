"""Photo prep for DFC homepage.

For each source photo:
  - Optional crop to strip overlay text (stairs photo has handwritten "After")
  - Auto-level with mild cutoff
  - Slight warmth toward Linen palette
  - Sharpen with unsharp mask
  - Export multiple crops (hero portrait 3:4, project tile 4:3, thumbnail 4:3 small)

Then build the 1200x630 OG hero image: Linen surface, left text column, right photo plate.
"""

from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance, ImageFilter, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC  = ROOT / "scripts" / "photos-src"
OUT  = ROOT / "public" / "photos"
OG   = ROOT / "public" / "og"
OUT.mkdir(parents=True, exist_ok=True)
OG.mkdir(parents=True, exist_ok=True)

# DFC palette (from DFC_palette.pdf, Edition V)
LINEN    = (242, 239, 233)
SAGE     = (86, 115, 96)
WALNUT   = (133, 83, 45)
ONYX     = (13, 13, 13)
ESPRESSO = (43, 24, 16)
FLATIRON = (155, 82, 54)

# --------------------------------------------------------------------------
# Processing config per source photo
# --------------------------------------------------------------------------
# crop_box = (left, top, right, bottom) in *fraction* of source dims (0..1).
# None = use full image.
# warmth = +R/-B shift (0 = none, ~6 = subtle warmth)
PHOTOS = {
    # Hardwood Refinishing (4)
    "hardwood-jason-entry":     dict(crop_box=None,                     warmth=2,  contrast=1.05),
    "hardwood-petra-stairs":    dict(crop_box=None,                     warmth=2,  contrast=1.05),
    "hardwood-petra-kitchen":   dict(crop_box=None,                     warmth=2,  contrast=1.05),
    "hardwood-eddie-sanding":   dict(crop_box=(0.00, 0.25, 1.00, 1.00), warmth=3,  contrast=1.06),  # focus on the floor below

    # Luxury Vinyl Plank (9)
    "lvp-cherelle-bedroom":     dict(crop_box=None,                     warmth=2,  contrast=1.06),
    "lvp-christopher-hallway":  dict(crop_box=None,                     warmth=2,  contrast=1.05),
    "lvp-landon-teal":          dict(crop_box=None,                     warmth=2,  contrast=1.05),
    "lvp-michael-sage":         dict(crop_box=None,                     warmth=2,  contrast=1.05),
    "lvp-eddie-hallway":        dict(crop_box=None,                     warmth=2,  contrast=1.05),
    "lvp-rustic-room":          dict(crop_box=None,                     warmth=2,  contrast=1.08),
    "lvp-kelly-stairs":         dict(crop_box=None,                     warmth=2,  contrast=1.05),  # looking down honey-LVP stairs
    "lvp-trey-openplan":        dict(crop_box=None,                     warmth=2,  contrast=1.06),  # dark walnut LVP open kitchen-living
    "lvp-photos-living":        dict(crop_box=None,                     warmth=2,  contrast=1.05),  # styled lived-in living room

    # Tile & Shower (4)
    "tile-gray-kitchen":        dict(crop_box=(0.00, 0.18, 1.00, 1.00), warmth=1,  contrast=1.05),  # crop cluttered countertop
    "tile-hapa-sushi-1":        dict(crop_box=None,                     warmth=2,  contrast=1.06),
    "tile-shower":              dict(crop_box=None,                     warmth=2,  contrast=1.05),
    "tile-kelly-entry":         dict(crop_box=None,                     warmth=1,  contrast=1.05),  # porcelain plank tile entryway

    # Staircases (5)
    "staircases-walnut-after":  dict(crop_box=(0.00, 0.00, 1.00, 0.72), warmth=4,  contrast=1.06),  # drop "After" handwriting
    "staircases-dark-treads":   dict(crop_box=(0.00, 0.00, 1.00, 0.78), warmth=3,  contrast=1.06),  # drop "After" handwriting
    "staircases-classic-oak":   dict(crop_box=None,                     warmth=3,  contrast=1.05),
    "staircases-top-view":      dict(crop_box=None,                     warmth=3,  contrast=1.06),
    "staircases-spindle":       dict(crop_box=None,                     warmth=3,  contrast=1.05),

    # Basement Remodel (3)
    "basement-kallie-shower":   dict(crop_box=None,                     warmth=2,  contrast=1.05),
    "basement-david-bathroom":  dict(crop_box=None,                     warmth=2,  contrast=1.05),
    "basement-natalie-wide":    dict(crop_box=None,                     warmth=2,  contrast=1.06),

    # Laminate (3)
    "laminate-irena-stairs":    dict(crop_box=(0.00, 0.18, 1.00, 1.00), warmth=2,  contrast=1.05),  # crop person at top
    "laminate-warm-dining":     dict(crop_box=None,                     warmth=3,  contrast=1.04),
    "laminate-pale-landing":    dict(crop_box=None,                     warmth=2,  contrast=1.04),
}

def warm_shift(img, amount):
    """Add a touch of warmth: nudge R up and B down in midtones."""
    if amount <= 0:
        return img
    r, g, b = img.split()
    r = r.point(lambda v: min(255, int(v + amount)))
    b = b.point(lambda v: max(0,   int(v - amount * 0.5)))
    return Image.merge("RGB", (r, g, b))

def process(name, cfg):
    src_path = SRC / f"{name}.jpg"
    if not src_path.exists():
        src_path = SRC / f"{name}.JPG"
    img = Image.open(src_path).convert("RGB")
    img = ImageOps.exif_transpose(img)

    # Crop to strip overlay text or distracting bits
    if cfg["crop_box"]:
        w, h = img.size
        l, t, r, b = cfg["crop_box"]
        img = img.crop((int(w*l), int(h*t), int(w*r), int(h*b)))

    # Auto-level
    img = ImageOps.autocontrast(img, cutoff=1)

    # Slight warmth toward Linen
    img = warm_shift(img, cfg["warmth"])

    # Contrast bump
    img = ImageEnhance.Contrast(img).enhance(cfg["contrast"])

    # Subtle saturation bump
    img = ImageEnhance.Color(img).enhance(1.04)

    # Sharpen
    img = img.filter(ImageFilter.UnsharpMask(radius=1.4, percent=120, threshold=3))

    # Generate crops in multiple sizes
    crops = {
        "portrait_3x4":   crop_to_ratio(img, 3/4),    # hero plate
        "landscape_4x3":  crop_to_ratio(img, 4/3),    # project tile
        "landscape_16x9": crop_to_ratio(img, 16/9),   # banner / OG
    }
    sizes = {
        "portrait_3x4":   (900, 1200),
        "landscape_4x3":  (1200, 900),
        "landscape_16x9": (1600, 900),
    }
    for k, c in crops.items():
        w, h = sizes[k]
        out = c.resize((w, h), Image.LANCZOS)
        out_path = OUT / f"{name}--{k}.jpg"
        out.save(out_path, "JPEG", quality=88, optimize=True, progressive=True)
        print(f"  {out_path.name}  {w}x{h}  {out_path.stat().st_size//1024} KB")

def crop_to_ratio(img, target_ratio):
    """Center-crop img to target aspect ratio (w/h)."""
    w, h = img.size
    cur = w / h
    if cur > target_ratio:
        # too wide, crop sides
        new_w = int(h * target_ratio)
        x = (w - new_w) // 2
        return img.crop((x, 0, x + new_w, h))
    else:
        # too tall, crop top + bottom (favor keeping more of the floor = bottom)
        new_h = int(w / target_ratio)
        y = (h - new_h) // 2
        # bias 20% downward to keep the floor in frame
        y = min(h - new_h, y + new_h // 5)
        return img.crop((0, y, w, y + new_h))

# --------------------------------------------------------------------------
# Run per-photo processing
# --------------------------------------------------------------------------
print("Processing source photos:")
for name, cfg in PHOTOS.items():
    print(f"- {name}")
    process(name, cfg)

# --------------------------------------------------------------------------
# Categorized manifest emitter
# --------------------------------------------------------------------------
import json

CATEGORIES = {
    "hardwood":   {"label": "Hardwood Refinishing",   "items": []},
    "lvp":        {"label": "Luxury Vinyl Plank",     "items": []},
    "tile":       {"label": "Tile & Shower",          "items": []},
    "staircases": {"label": "Staircases",             "items": []},
    "basement":   {"label": "Basement Remodel",       "items": []},
    "laminate":   {"label": "Laminate",               "items": []},
}

for name in PHOTOS.keys():
    cat = name.split("-")[0]
    if cat in CATEGORIES:
        CATEGORIES[cat]["items"].append({
            "slug": name,
            "src_3x4":  f"/photos/{name}--portrait_3x4.jpg",
            "src_4x3":  f"/photos/{name}--landscape_4x3.jpg",
            "src_16x9": f"/photos/{name}--landscape_16x9.jpg",
            "alt": name.replace("-", " ").title(),
        })

(OUT / "manifest.json").write_text(json.dumps(CATEGORIES, indent=2))
print(f"Manifest: {sum(len(c['items']) for c in CATEGORIES.values())} photos")

# --------------------------------------------------------------------------
# Build OG image: 1200x630 Linen + left text + right photo plate
# --------------------------------------------------------------------------
def find_font(candidates, size):
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()

ITALIANA = find_font([
    "C:/Windows/Fonts/Italiana-Regular.ttf",
    "C:/Users/andre/AppData/Local/Microsoft/Windows/Fonts/Italiana-Regular.ttf",
    "C:/Windows/Fonts/Georgia.ttf",
], 92)
ITALIANA_S = find_font([
    "C:/Windows/Fonts/Italiana-Regular.ttf",
    "C:/Windows/Fonts/Georgia.ttf",
], 26)
PLEX = find_font([
    "C:/Windows/Fonts/IBMPlexSerif-Regular.ttf",
    "C:/Windows/Fonts/georgia.ttf",
], 24)
BIG = find_font([
    "C:/Windows/Fonts/BigShouldersDisplay-Bold.ttf",
    "C:/Windows/Fonts/Arial.ttf",
], 18)
EYEBROW = find_font([
    "C:/Windows/Fonts/BigShouldersDisplay-SemiBold.ttf",
    "C:/Windows/Fonts/Arial.ttf",
], 22)

W, H = 1200, 630
canvas = Image.new("RGB", (W, H), LINEN)
draw = ImageDraw.Draw(canvas)

# Right column: photo plate (540 wide)
right_w = 540
right_x = W - right_w
photo = Image.open(OUT / "staircases-walnut-after--portrait_3x4.jpg").convert("RGB")
ph_ratio = right_w / H
photo_cropped = crop_to_ratio(photo, ph_ratio).resize((right_w, H), Image.LANCZOS)
canvas.paste(photo_cropped, (right_x, 0))

# 8px Sage border-left on the photo plate
draw.rectangle([right_x, 0, right_x + 8, H], fill=SAGE)

# Left column text (padding 64px)
pad = 64
y = 64
# Eyebrow
draw.text((pad, y), "D E N V E R   ·   A U R O R A   ·   F R O N T  R A N G E", font=EYEBROW, fill=WALNUT)
y += 60
# H1 (two lines)
draw.text((pad, y), "Flooring,",                       font=ITALIANA, fill=SAGE)
y += 96
draw.text((pad, y), "installed right.",                font=ITALIANA, fill=SAGE)
y += 120
# Subhead
draw.text((pad, y), "Hardwood. LVP. Laminate. Tile.",  font=PLEX, fill=ONYX)
y += 32
draw.text((pad, y), "By the same crew, every job.",    font=PLEX, fill=ONYX)
y += 56
# Tagline
draw.text((pad, y), "Crafted floors. Thoughtful process. Built to last.", font=ITALIANA_S, fill=WALNUT)

# Bottom-left: real DFC circular logo mark
mono_d = 90
mono_x = pad
mono_y = H - pad - mono_d

logo_png_path = ROOT / "assets" / "logo" / "logo-black.png"
if logo_png_path.exists():
    logo = Image.open(logo_png_path).convert("RGBA")
    # The logo PNG is on transparent background already.
    # Square crop to the icon area (logo SVG renders the mark + wordmark inside a roughly square canvas)
    lw, lh = logo.size
    side = min(lw, lh)
    left = (lw - side) // 2
    top  = (lh - side) // 2
    logo_sq = logo.crop((left, top, left + side, top + side))
    logo_sq = logo_sq.resize((mono_d, mono_d), Image.LANCZOS)
    canvas.paste(logo_sq, (mono_x, mono_y), logo_sq)
else:
    # Fallback custom monogram
    draw.ellipse([mono_x, mono_y, mono_x + mono_d, mono_y + mono_d], outline=SAGE, width=2)

# Pill bottom-right of left column
pill_y = H - pad - 34
pill_text = "LICENSED  ·  INSURED  ·  5.0 GOOGLE"
pbbox = draw.textbbox((0, 0), pill_text, font=EYEBROW)
ptw = pbbox[2] - pbbox[0]
pth = pbbox[3] - pbbox[1]
pill_x = mono_x + mono_d + 20
pill_w = ptw + 32
pill_h = 36
draw.rounded_rectangle([pill_x, pill_y - pill_h//2 + 17, pill_x + pill_w, pill_y + pill_h//2 + 17], radius=18, fill=SAGE)
draw.text((pill_x + 16 - pbbox[0], pill_y - pth//2 + 12 - pbbox[1]), pill_text, font=EYEBROW, fill=LINEN)

og_path = OG / "dfc-share-1200x630.jpg"
canvas.save(og_path, "JPEG", quality=88, optimize=True, progressive=True)
print(f"\nOG image: {og_path}  {og_path.stat().st_size//1024} KB")

# Square 1200x1200 variant
square = Image.new("RGB", (1200, 1200), LINEN)
sphoto = Image.open(OUT / "staircases-walnut-after--portrait_3x4.jpg").convert("RGB")
sphoto_c = crop_to_ratio(sphoto, 1.0).resize((1200, 1200), Image.LANCZOS)
square.paste(sphoto_c, (0, 0))
# Bottom band with mono + text
band_h = 220
band = Image.new("RGBA", (1200, band_h), (242, 239, 233, 235))
square.paste(band, (0, 1200 - band_h), band)
sdraw = ImageDraw.Draw(square)
sdraw.text((64, 1200 - band_h + 36), "Flooring, installed right.", font=ITALIANA, fill=SAGE)
sdraw.text((64, 1200 - band_h + 150), "denverflooringcollective.com  ·  720-599-1664", font=PLEX, fill=ONYX)
square_path = OG / "dfc-square-1200x1200.jpg"
square.save(square_path, "JPEG", quality=88, optimize=True, progressive=True)
print(f"Square: {square_path}  {square_path.stat().st_size//1024} KB")

print("\nDone.")
