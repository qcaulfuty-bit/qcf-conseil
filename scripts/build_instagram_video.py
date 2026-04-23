"""
Patrimolux — Instagram reel generator.
Produces a 1080x1080, 25s MP4 with word-by-word fade-in text
and an ambient piano audio bed.
"""

import math
import os
import shutil
import struct
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

# -------- configuration --------
ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "videos"
FRAMES_DIR = OUT_DIR / "_frames"
AUDIO_WAV = OUT_DIR / "_audio.wav"
FINAL_MP4 = OUT_DIR / "patrimolux_instagram.mp4"

FONT_BOLD = "/tmp/fonts/Playfair.ttf"
FONT_REGULAR = "/tmp/fonts/Playfair.ttf"

W, H = 1080, 1080
FPS = 30
DURATION = 25.0
TOTAL_FRAMES = int(round(DURATION * FPS))

NAVY = (15, 30, 46)          # #0F1E2E
NAVY_DEEP = (9, 19, 32)
GOLD = (184, 151, 90)        # #B8975A
GOLD_SOFT = (212, 184, 128)
WHITE = (245, 245, 242)

# -------- scenes --------
# Each scene has:
#   start, end: absolute seconds
#   lines: list of (text, style) where style is 'white' or 'gold'
#   subtitle (optional gold accent under)
#   fade_in: seconds, fade_out: seconds (for the overall block)
SCENES = [
    {
        "start": 0.0, "end": 5.0,
        "kind": "question",
        "lines": [
            ("Votre épargne", "white"),
            ("est-elle vraiment", "white"),
            ("protégée ?", "gold"),
        ],
        "size": 96,
    },
    {
        "start": 5.0, "end": 10.5,
        "kind": "problem",
        "eyebrow": "EN FRANCE",
        "lines": [
            ("Aucune garantie légale", "white"),
            ("en cas de faillite.", "white"),
        ],
        "size": 82,
    },
    {
        "start": 10.5, "end": 17.0,
        "kind": "solution",
        "eyebrow": "AU LUXEMBOURG",
        "lines": [
            ("Votre capital", "white"),
            ("est protégé à 100%", "gold"),
            ("par la loi.", "white"),
        ],
        "size": 84,
    },
    {
        "start": 17.0, "end": 21.0,
        "kind": "cta",
        "eyebrow": "OFFERT",
        "lines": [
            ("Analyse patrimoniale", "white"),
            ("gratuite", "gold"),
        ],
        "size": 92,
    },
    {
        "start": 21.0, "end": 25.0,
        "kind": "url",
        "lines": [
            ("patrimolux.fr", "gold"),
        ],
        "size": 132,
    },
]


# -------- helpers --------
def lerp(a, b, t):
    return a + (b - a) * t


def smoothstep(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def load_font(path, size, weight=None):
    f = ImageFont.truetype(path, size)
    if weight is not None:
        try:
            f.set_variation_by_axes([weight])
        except Exception:
            pass
    return f


def text_size(draw, text, font):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1], bbox[0], bbox[1]


_VIGNETTE_CACHE = {}


def _vignette_mask():
    if "m" in _VIGNETTE_CACHE:
        return _VIGNETTE_CACHE["m"]
    yy, xx = np.meshgrid(np.arange(H), np.arange(W), indexing="ij")
    cx, cy = W / 2, H / 2
    d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    max_d = math.hypot(W, H) / 2
    # soft edge fall-off
    m = np.clip(1.0 - (d / max_d) ** 2.2 * 0.75, 0.0, 1.0)
    _VIGNETTE_CACHE["m"] = m.astype(np.float32)
    return _VIGNETTE_CACHE["m"]


def draw_background(img, t):
    """Navy with subtle radial glow + vignette, shifting slowly."""
    yy, xx = np.meshgrid(np.arange(H), np.arange(W), indexing="ij")
    cx = W * (0.5 + 0.08 * math.sin(t * 0.3))
    cy = H * (0.45 + 0.05 * math.cos(t * 0.25))
    d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    max_r = math.hypot(W, H) * 0.7
    k = np.clip(1.0 - d / max_r, 0.0, 1.0) ** 2.4
    k = k.astype(np.float32)

    r = NAVY_DEEP[0] + (NAVY[0] - NAVY_DEEP[0]) * k + 22 * k
    g = NAVY_DEEP[1] + (NAVY[1] - NAVY_DEEP[1]) * k + 14 * k
    b = NAVY_DEEP[2] + (NAVY[2] - NAVY_DEEP[2]) * k + 7 * k
    arr = np.stack([r, g, b], axis=-1)

    # apply vignette
    v = _vignette_mask()
    dark = np.array([4, 8, 14], dtype=np.float32)
    arr = arr * v[..., None] + dark * (1.0 - v[..., None])

    # film grain
    grain = np.random.normal(0, 2.4, (H, W, 1)).astype(np.float32)
    arr = np.clip(arr + grain, 0, 255).astype(np.uint8)

    img.paste(Image.fromarray(arr))


def draw_corner_ornaments(img):
    """Thin gold corner brackets for premium feel."""
    d = ImageDraw.Draw(img, "RGBA")
    L = 70
    M = 60
    col = (*GOLD, 160)
    w = 2
    # top-left
    d.line([(M, M), (M + L, M)], fill=col, width=w)
    d.line([(M, M), (M, M + L)], fill=col, width=w)
    # top-right
    d.line([(W - M, M), (W - M - L, M)], fill=col, width=w)
    d.line([(W - M, M), (W - M, M + L)], fill=col, width=w)
    # bottom-left
    d.line([(M, H - M), (M + L, H - M)], fill=col, width=w)
    d.line([(M, H - M), (M, H - M - L)], fill=col, width=w)
    # bottom-right
    d.line([(W - M, H - M), (W - M - L, H - M)], fill=col, width=w)
    d.line([(W - M, H - M), (W - M, H - M - L)], fill=col, width=w)


def draw_brand(img, t, scene_kind):
    """Top brand mark + bottom tag persist across scenes."""
    d = ImageDraw.Draw(img, "RGBA")
    # top wordmark
    brand_font = load_font(FONT_BOLD, 30, weight=600)
    brand_text = "P A T R I M O L U X"
    tw, th, ox, oy = text_size(d, brand_text, brand_font)
    x = (W - tw) // 2 - ox
    y = 110
    d.text((x, y), brand_text, font=brand_font, fill=(*WHITE, 220))
    # gold underline
    uw = 80
    d.line([((W - uw) // 2, y + th + 18), ((W + uw) // 2, y + th + 18)],
           fill=(*GOLD, 220), width=2)


def render_word_fade(img, scene, t_local):
    """Render a scene's stacked lines with word-by-word fade in."""
    d = ImageDraw.Draw(img, "RGBA")
    size = scene["size"]
    lines = scene["lines"]
    kind = scene["kind"]

    # compute number of words
    words = []  # list of (text, color_key, line_idx, word_idx_global)
    for li, (line_text, color_key) in enumerate(lines):
        for w in line_text.split():
            words.append((w, color_key, li))

    n_words = len(words)
    duration = scene["end"] - scene["start"]
    # hold time reserved at the end of the scene so last word is readable
    hold = min(1.6, duration * 0.35)
    fade_band = duration - hold
    per_word = fade_band / max(1, n_words)
    word_fade = min(0.55, per_word * 1.3)

    def word_alpha(i):
        appear = i * per_word * 0.9  # slight overlap for flow
        local_t = t_local - appear
        if local_t <= 0:
            return 0.0
        if local_t >= word_fade:
            return 1.0
        return smoothstep(local_t / word_fade)

    def word_offset(i):
        # subtle rise from 10px below
        a = word_alpha(i)
        return (1.0 - a) * 14

    # choose fonts
    font_white = load_font(FONT_BOLD, size, weight=500)
    font_gold = load_font(FONT_BOLD, size, weight=600)

    # measure line widths
    line_widths = []
    line_heights = []
    for line_text, _ in lines:
        tw, th, _, _ = text_size(d, line_text, font_white)
        line_widths.append(tw)
        line_heights.append(th)

    # total block height
    line_gap = int(size * 0.32)
    total_h = sum(line_heights) + line_gap * (len(lines) - 1)

    # add eyebrow / url specific extras
    eyebrow_text = scene.get("eyebrow")
    eyebrow_h = 0
    eyebrow_font = None
    if eyebrow_text:
        eyebrow_font = load_font(FONT_BOLD, 34, weight=700)
        _, eyebrow_h, _, _ = text_size(d, eyebrow_text, eyebrow_font)
        total_h += eyebrow_h + 60

    # center the whole block vertically
    y = (H - total_h) // 2 + 20

    # draw eyebrow
    if eyebrow_text:
        a = smoothstep(min(1.0, t_local / 0.45))
        # spaced-out capitals with letter-spacing
        spaced = " ".join(list(eyebrow_text))
        etw, eth, eox, _ = text_size(d, spaced, eyebrow_font)
        ex = (W - etw) // 2 - eox
        d.text((ex, y), spaced, font=eyebrow_font,
               fill=(*GOLD, int(255 * a)))
        # thin divider under
        uw = 50
        d.line([((W - uw) // 2, y + eth + 24),
                ((W + uw) // 2, y + eth + 24)],
               fill=(*GOLD, int(220 * a)), width=1)
        y += eth + 60

    # draw lines word by word
    global_word_idx = 0
    for li, (line_text, color_key) in enumerate(lines):
        font = font_gold if color_key == "gold" else font_white
        color = GOLD if color_key == "gold" else WHITE
        line_words = line_text.split()
        # compute width with real spaces
        space_w, _, _, _ = text_size(d, " ", font)
        widths = []
        for w in line_words:
            ww, _, _, _ = text_size(d, w, font)
            widths.append(ww)
        total_line_w = sum(widths) + space_w * (len(line_words) - 1)
        x = (W - total_line_w) // 2
        for wi, word in enumerate(line_words):
            a = word_alpha(global_word_idx)
            dy = word_offset(global_word_idx)
            if a > 0:
                d.text((x, y + int(dy)), word, font=font,
                       fill=(*color, int(255 * a)))
            x += widths[wi] + space_w
            global_word_idx += 1
        y += line_heights[li] + line_gap

    # URL scene: add website tag under
    if kind == "url":
        sub_font = load_font(FONT_BOLD, 30, weight=500)
        sub = "Gestion de patrimoine — Luxembourg"
        a = smoothstep(min(1.0, max(0.0, (t_local - 0.8) / 0.8)))
        tw, _, ox, _ = text_size(d, sub, sub_font)
        d.text(((W - tw) // 2 - ox, y + 20), sub,
               font=sub_font, fill=(*WHITE, int(200 * a)))

    # CTA scene: add small decorative buttons hint
    if kind == "cta":
        sub_font = load_font(FONT_BOLD, 28, weight=500)
        sub = "Sur rendez-vous  ·  patrimolux.fr"
        a = smoothstep(min(1.0, max(0.0, (t_local - 1.2) / 0.8)))
        tw, _, ox, _ = text_size(d, sub, sub_font)
        d.text(((W - tw) // 2 - ox, y + 40), sub,
               font=sub_font, fill=(*GOLD_SOFT, int(220 * a)))


def draw_progress(img, t):
    """Thin gold progress bar at the bottom of the reel."""
    d = ImageDraw.Draw(img, "RGBA")
    total_w = int(W * 0.6)
    x0 = (W - total_w) // 2
    y = H - 130
    d.line([(x0, y), (x0 + total_w, y)], fill=(*WHITE, 50), width=2)
    progress = min(1.0, t / DURATION)
    d.line([(x0, y), (x0 + int(total_w * progress), y)],
           fill=(*GOLD, 230), width=2)


def scene_alpha(t, scene):
    """Global scene fade-in/out for seamless transitions."""
    f_in = 0.35
    f_out = 0.4
    local = t - scene["start"]
    dur = scene["end"] - scene["start"]
    if local < 0 or local > dur:
        return 0.0
    a = 1.0
    if local < f_in:
        a *= smoothstep(local / f_in)
    if local > dur - f_out:
        a *= smoothstep((dur - local) / f_out)
    return a


def render_frame(fidx):
    t = fidx / FPS
    img = Image.new("RGB", (W, H), NAVY)
    draw_background(img, t)

    # subtle "ken burns" scale on bg via paste — skip to keep crisp text
    draw_corner_ornaments(img)
    draw_brand(img, t, None)

    # find active scene (allow small overlap via fade)
    for sc in SCENES:
        a = scene_alpha(t, sc)
        if a <= 0:
            continue
        # draw on a transparent layer to apply global scene alpha
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        render_word_fade(layer, sc, t - sc["start"])
        if a < 1.0:
            # modulate alpha channel
            arr = np.array(layer, dtype=np.int16)
            arr[..., 3] = (arr[..., 3] * a).astype(np.int16)
            layer = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
        img.paste(layer, (0, 0), layer)

    draw_progress(img, t)
    return img


# -------- audio: ambient piano bed --------
def synth_piano_note(freq, duration, sr=44100, velocity=0.22):
    """Soft piano-ish tone: 4 harmonics + slow attack + long decay."""
    n = int(sr * duration)
    t = np.arange(n) / sr
    # harmonics with decreasing amplitude
    wave_ = (
        1.0 * np.sin(2 * np.pi * freq * t)
        + 0.5 * np.sin(2 * np.pi * 2 * freq * t)
        + 0.22 * np.sin(2 * np.pi * 3 * freq * t)
        + 0.12 * np.sin(2 * np.pi * 4 * freq * t)
        + 0.06 * np.sin(2 * np.pi * 6 * freq * t)
    )
    # soft attack / exponential decay
    attack = 0.03
    a_env = np.minimum(1.0, t / attack)
    decay = np.exp(-t * 1.6)
    env = a_env * decay
    return wave_ * env * velocity


def build_audio():
    sr = 44100
    total = int(sr * (DURATION + 0.5))
    track_l = np.zeros(total, dtype=np.float64)
    track_r = np.zeros(total, dtype=np.float64)

    # gentle chord progression (Am7 – Fmaj7 – Cmaj7 – G) in low octave
    A3 = 220.00
    C4 = 261.63
    E4 = 329.63
    G4 = 392.00
    F3 = 174.61
    D4 = 293.66
    B4 = 493.88
    F4 = 349.23

    progression = [
        # (time_s, notes, dur)
        (0.0,  [A3, E4, C4], 5.0),
        (5.0,  [F3, C4, E4], 5.5),
        (10.5, [C4, G4, E4, B4], 6.5),
        (17.0, [A3, E4, C4, G4], 4.0),
        (21.0, [F3, A3, C4, F4], 4.5),
    ]

    # base chord pad
    for start, notes, dur in progression:
        i0 = int(start * sr)
        for n in notes:
            sig = synth_piano_note(n, dur + 1.5, sr=sr,
                                   velocity=0.14)
            end = i0 + len(sig)
            if end > total:
                sig = sig[: total - i0]
                end = total
            # slight stereo spread based on freq
            pan = np.clip((n - 260) / 300.0, -0.6, 0.6)
            gl = (1 - pan) * 0.5 + 0.5
            gr = (1 + pan) * 0.5 + 0.5
            track_l[i0:end] += sig * gl
            track_r[i0:end] += sig * gr

    # arpeggiated top line — gentle dotted pattern
    arp_times = []
    step = 0.75  # seconds
    t_cur = 0.6
    while t_cur < DURATION - 0.3:
        arp_times.append(t_cur)
        t_cur += step
    arp_notes = [C4 * 2, E4 * 2, G4 * 2, E4 * 2,
                 B4, D4 * 2, G4 * 2, E4 * 2,
                 C4 * 2, G4 * 2, E4 * 2, C4 * 2,
                 A3 * 2, C4 * 2, E4 * 2, D4 * 2,
                 F4, A3 * 2, C4 * 2, F4,
                 G4, B4, D4 * 2, G4,
                 C4 * 2, E4 * 2, G4 * 2, B4,
                 C4 * 2, E4 * 2, G4 * 2, C4 * 2,
                 ]
    for i, at in enumerate(arp_times):
        freq = arp_notes[i % len(arp_notes)]
        sig = synth_piano_note(freq, 1.6, sr=sr, velocity=0.10)
        i0 = int(at * sr)
        end = i0 + len(sig)
        if end > total:
            sig = sig[: total - i0]
            end = total
        # pan alternates L/R
        pan = 0.35 if i % 2 == 0 else -0.35
        gl = (1 - pan) * 0.5 + 0.5
        gr = (1 + pan) * 0.5 + 0.5
        track_l[i0:end] += sig * gl
        track_r[i0:end] += sig * gr

    # soft low-pass via simple moving average twice (for warmth)
    def lp(x, k=3):
        kernel = np.ones(k) / k
        return np.convolve(x, kernel, mode="same")

    track_l = lp(track_l, 3)
    track_r = lp(track_r, 3)

    # gentle fade in/out
    fade_in = int(1.5 * sr)
    fade_out = int(2.5 * sr)
    fade_in_env = np.linspace(0, 1, fade_in)
    fade_out_env = np.linspace(1, 0, fade_out)
    track_l[:fade_in] *= fade_in_env
    track_r[:fade_in] *= fade_in_env
    # position the fade_out so audio ends at 25.0s exactly
    end_sample = int(DURATION * sr)
    track_l[end_sample - fade_out:end_sample] *= fade_out_env
    track_r[end_sample - fade_out:end_sample] *= fade_out_env
    track_l[end_sample:] = 0
    track_r[end_sample:] = 0

    # normalize to avoid clipping
    peak = max(np.max(np.abs(track_l)), np.max(np.abs(track_r)), 1e-6)
    norm = 0.78 / peak
    track_l *= norm
    track_r *= norm

    # write WAV 16-bit stereo
    left_i = np.clip(track_l * 32767, -32768, 32767).astype(np.int16)
    right_i = np.clip(track_r * 32767, -32768, 32767).astype(np.int16)
    inter = np.empty(len(left_i) * 2, dtype=np.int16)
    inter[0::2] = left_i
    inter[1::2] = right_i

    with wave.open(str(AUDIO_WAV), "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(inter.tobytes())


# -------- pipeline --------
def render_all_frames():
    if FRAMES_DIR.exists():
        shutil.rmtree(FRAMES_DIR)
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)
    for i in range(TOTAL_FRAMES):
        img = render_frame(i)
        img.save(FRAMES_DIR / f"f_{i:05d}.jpg", quality=92)
        if i % 30 == 0:
            print(f"  frame {i+1}/{TOTAL_FRAMES}", flush=True)


def mux():
    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(FPS),
        "-i", str(FRAMES_DIR / "f_%05d.jpg"),
        "-i", str(AUDIO_WAV),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "slow",
        "-crf", "18",
        "-profile:v", "high",
        "-movflags", "+faststart",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        str(FINAL_MP4),
    ]
    subprocess.check_call(cmd)


def main():
    print(">> generating audio bed…")
    build_audio()
    print(">> rendering frames…")
    render_all_frames()
    print(">> encoding final MP4…")
    mux()
    print(f"Done → {FINAL_MP4}")


if __name__ == "__main__":
    main()
