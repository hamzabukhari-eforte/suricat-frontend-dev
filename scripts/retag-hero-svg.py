"""Retag Hero-section-01.svg animation classes by spatial role (fixed scoping)."""
from __future__ import annotations

import re
from pathlib import Path

path = Path(r"c:\Users\efortepc1\Downloads\suricat-frontend\public\assets\images\Hero-section-01.svg")
text = path.read_text(encoding="utf-8")

# Fix any broken style-after-slash from prior run
text = re.sub(r'\s*/\s*style="(--i:\d+)"\s*/?>', r' style="\1" />', text)
text = re.sub(r'\s+style="--i:\d+"\s*style="(--i:\d+)"', r' style="\1"', text)

RESET = {
    "hero-input": "hero-ep",
    "hero-output": "hero-ep",
    "hero-engine": "hero-hub",
    "hero-review": "hero-hub",
    "hero-flow-in": "hero-line",
    "hero-flow-mid": "hero-line",
    "hero-flow-out": "hero-line",
    "hero-arrow": "hero-line",
}

def reset_classes(s: str) -> str:
    def repl(m: re.Match) -> str:
        classes = m.group(1).split()
        out = [RESET.get(c, c) for c in classes]
        cleaned = []
        has_hero = False
        for c in out:
            if c.startswith("hero-"):
                if has_hero:
                    continue
                has_hero = True
            cleaned.append(c)
        return f'class="{" ".join(cleaned)}"'
    return re.sub(r'class="([^"]*)"', repl, s)

text = reset_classes(text)
text = re.sub(r'\s*style="--i:[^"]*"', "", text)

pattern = re.compile(
    r"<(g|rect|path|circle|line|polyline|polygon)"
    r'([^>]*class="[^"]*hero-(?:hub|ep|line)[^"]*"[^>]*)>',
    re.M,
)

STROKE_FLOW_CLS = {"cls-5", "cls-6", "cls-7", "cls-8", "cls-9", "cls-10", "cls-11"}

def collect_coords(chunk: str):
    xs, ys = [], []
    for rx, axis in [
        (r'\bx="(-?\d+\.?\d*)"', "x"),
        (r'\bcx="(-?\d+\.?\d*)"', "x"),
        (r'\bx1="(-?\d+\.?\d*)"', "x"),
        (r'\bx2="(-?\d+\.?\d*)"', "x"),
        (r'\by="(-?\d+\.?\d*)"', "y"),
        (r'\bcy="(-?\d+\.?\d*)"', "y"),
        (r'\by1="(-?\d+\.?\d*)"', "y"),
        (r'\by2="(-?\d+\.?\d*)"', "y"),
    ]:
        for hit in re.finditer(rx, chunk):
            (xs if axis == "x" else ys).append(float(hit.group(1)))
    for hit in re.finditer(r'\bpoints="([^"]+)"', chunk):
        nums = [float(n) for n in re.findall(r"-?\d+\.?\d*", hit.group(1))]
        xs.extend(nums[0::2][:8])
        ys.extend(nums[1::2][:8])
    for hit in re.finditer(r'\bd="M\s*(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)', chunk):
        xs.append(float(hit.group(1)))
        ys.append(float(hit.group(2)))
    xmin = min(xs) if xs else 700.0
    xmax = max(xs) if xs else 700.0
    ymin = min(ys) if ys else 400.0
    ymax = max(ys) if ys else 400.0
    return xmin, xmax, ymin, ymax

def group_inner(src: str, start: int) -> str:
    depth = 1
    i = start
    while i < len(src) and depth > 0:
        next_open = src.find("<g", i)
        next_close = src.find("</g>", i)
        if next_close == -1:
            return src[start : start + 800]
        if next_open != -1 and next_open < next_close:
            depth += 1
            i = next_open + 2
        else:
            depth -= 1
            if depth == 0:
                return src[start:next_close]
            i = next_close + 4
    return src[start : start + 800]

NEW_CSS = r'''
            /* ---- Story loop: Inputs → Engine → Human Review → Outputs ---- */
      .hero-input,
      .hero-engine,
      .hero-review,
      .hero-output,
      .hero-flow-in,
      .hero-flow-mid,
      .hero-flow-out {
        transform-box: fill-box;
        transform-origin: center;
        opacity: 0;
      }

      path.hero-flow-in,
      path.hero-flow-out,
      line.hero-flow-mid,
      polyline.hero-flow-mid,
      polyline.hero-flow-out {
        stroke-dasharray: 1200;
        stroke-dashoffset: 1200;
      }

      @keyframes heroInputIn {
        0%, 2% { opacity: 0; transform: translateX(-28px) scale(0.94); }
        8%, 88% { opacity: 1; transform: translateX(0) scale(1); }
        94%, 100% { opacity: 0; transform: translateX(-12px) scale(0.97); }
      }

      @keyframes heroFlowDraw {
        0%, 14% { opacity: 0; stroke-dashoffset: 1200; }
        15% { opacity: 1; stroke-dashoffset: 1200; }
        22%, 88% { opacity: 1; stroke-dashoffset: 0; }
        94%, 100% { opacity: 0; stroke-dashoffset: 0; }
      }

      @keyframes heroFlowFade {
        0%, 14% { opacity: 0; }
        18%, 88% { opacity: 1; }
        94%, 100% { opacity: 0; }
      }

      @keyframes heroEngineIn {
        0%, 22% { opacity: 0; transform: scale(0.78); filter: drop-shadow(0 0 0 rgba(25, 211, 197, 0)); }
        30% { opacity: 1; transform: scale(1.05); filter: drop-shadow(0 0 18px rgba(25, 211, 197, 0.55)); }
        36%, 88% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 10px rgba(25, 211, 197, 0.28)); }
        94%, 100% { opacity: 0; transform: scale(0.92); filter: drop-shadow(0 0 0 rgba(25, 211, 197, 0)); }
      }

      @keyframes heroFlowMid {
        0%, 36% { opacity: 0; stroke-dashoffset: 1200; }
        37% { opacity: 1; stroke-dashoffset: 1200; }
        44%, 88% { opacity: 1; stroke-dashoffset: 0; }
        94%, 100% { opacity: 0; stroke-dashoffset: 0; }
      }

      @keyframes heroReviewIn {
        0%, 42% { opacity: 0; transform: translateY(24px) scale(0.94); }
        50%, 88% { opacity: 1; transform: translateY(0) scale(1); }
        94%, 100% { opacity: 0; transform: translateY(10px) scale(0.97); }
      }

      @keyframes heroFlowOut {
        0%, 52% { opacity: 0; stroke-dashoffset: 1200; }
        53% { opacity: 1; stroke-dashoffset: 1200; }
        60%, 88% { opacity: 1; stroke-dashoffset: 0; }
        94%, 100% { opacity: 0; stroke-dashoffset: 0; }
      }

      @keyframes heroOutputIn {
        0%, 58% { opacity: 0; transform: translateX(28px) scale(0.94); }
        66%, 88% { opacity: 1; transform: translateX(0) scale(1); }
        94%, 100% { opacity: 0; transform: translateX(12px) scale(0.97); }
      }

      /* 1) Inputs load first (staggered top → bottom) */
      .hero-input {
        animation: heroInputIn 11s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        animation-delay: calc(var(--i, 0) * 0.18s);
      }

      /* Flow into Suricat Engine */
      path.hero-flow-in {
        animation: heroFlowDraw 11s ease-in-out infinite;
        animation-delay: calc(var(--i, 0) * 0.08s);
      }
      .hero-flow-in:not(path) {
        animation: heroFlowFade 11s ease-in-out infinite;
      }

      /* 2) Suricat Engine receives inputs */
      .hero-engine {
        animation: heroEngineIn 11s cubic-bezier(0.22, 1, 0.36, 1) infinite;
      }

      /* Bridge toward Human Review */
      .hero-flow-mid {
        animation: heroFlowMid 11s ease-in-out infinite;
      }

      /* 3) Human Review */
      .hero-review {
        animation: heroReviewIn 11s cubic-bezier(0.22, 1, 0.36, 1) infinite;
      }

      /* Flow out to results */
      path.hero-flow-out,
      polyline.hero-flow-out {
        animation: heroFlowOut 11s ease-in-out infinite;
      }
      .hero-flow-out:not(path):not(polyline) {
        animation: heroFlowOut 11s ease-in-out infinite;
      }

      /* 4) Outputs last (staggered) */
      .hero-output {
        animation: heroOutputIn 11s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        animation-delay: calc(var(--i, 0) * 0.16s);
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-input,
        .hero-engine,
        .hero-review,
        .hero-output,
        .hero-flow-in,
        .hero-flow-mid,
        .hero-flow-out {
          opacity: 1 !important;
          animation: none !important;
          transform: none !important;
          filter: none !important;
          stroke-dasharray: none !important;
          stroke-dashoffset: 0 !important;
        }
      }

'''

out = []
pos = 0
role_counts = {}

for m in pattern.finditer(text):
    out.append(text[pos : m.start()])
    tag = m.group(1)
    attrs = m.group(2)
    self_close = attrs.rstrip().endswith("/")
    if self_close:
        attrs = attrs.rstrip()[:-1].rstrip()

    if tag == "g" and not self_close:
        chunk = attrs + " " + group_inner(text, m.end())
    else:
        chunk = attrs

    xmin, xmax, ymin, ymax = collect_coords(chunk)
    xmid = (xmin + xmax) / 2
    ymid = (ymin + ymax) / 2

    old_class_m = re.search(r'class="([^"]*)"', attrs)
    old_class = old_class_m.group(1)
    classes = [c for c in old_class.split() if not c.startswith("hero-")]
    class_set = set(classes)

    is_flow = tag in ("line", "polyline") or (
        "hero-line" in old_class and bool(class_set & STROKE_FLOW_CLS)
    )

    if is_flow:
        if xmid < 550:
            role = "hero-flow-in"
        elif xmid > 950:
            role = "hero-flow-out"
        else:
            role = "hero-flow-mid"
    elif ymin >= 620 and 480 <= xmid <= 1000:
        role = "hero-review"
    elif xmax < 480 or xmid < 480:
        role = "hero-input"
    elif xmin > 1000 or xmid > 1050:
        role = "hero-output"
    else:
        role = "hero-engine"

    classes.append(role)
    role_counts[role] = role_counts.get(role, 0) + 1

    if role in ("hero-input", "hero-output"):
        band = max(0, min(4, int((ymid - 40) / 140)))
        stagger = f' style="--i:{band}"'
    elif role == "hero-flow-in":
        band = max(0, min(4, int((ymid - 100) / 140)))
        stagger = f' style="--i:{band}"'
    else:
        stagger = ""

    new_attrs = re.sub(r'class="[^"]*"', f'class="{" ".join(classes)}"', attrs, count=1)
    new_attrs = re.sub(r'\s*style="--(?:i|d):[^"]*"', "", new_attrs)
    closer = " /" if self_close else ""
    out.append(f"<{tag}{new_attrs}{stagger}{closer}>")
    pos = m.end()

out.append(text[pos:])
new_text = "".join(out)

# Replace any existing hero animation CSS block
new_text2, n = re.subn(
    r"/\* ---- (?:staged story|Story loop):.*?@media \(prefers-reduced-motion: reduce\) \{.*?\}\s*\n",
    NEW_CSS.lstrip("\n"),
    new_text,
    count=1,
    flags=re.S,
)
if n == 0:
    raise SystemExit("CSS block not replaced")
new_text = new_text2

path.write_text(new_text, encoding="utf-8")
print("retag counts:")
for role, count in sorted(role_counts.items()):
    print(f"  {role}: {count}")
print("CSS replaced:", n)
# validate a few tags
bad = list(re.finditer(r'/\s*style=', new_text))
print("broken style-after-slash:", len(bad))
for m in re.finditer(r'<path class="[^"]*hero-flow-in[^"]*"[^>]*>', new_text):
    print(" flow-in:", m.group(0)[:160])
for m in re.finditer(r'<rect class="[^"]*hero-input[^"]*"[^>]*>', new_text):
    print(" input-rect:", m.group(0)[:140])
    break
