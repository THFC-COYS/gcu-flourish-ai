// Pixel-art SVG brand mark for MoltED — "education molting its skin"
// 280×280 viewBox · all <rect> elements · strict symmetry across x=140
// Phoenix wings (gold/scarlet) rise from a cracked graduation mortarboard

export default function MoltedPixelMark({
  size = 280,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 280"
      width={size}
      height={size}
      className={className}
      style={{ imageRendering: 'pixelated' }}
      aria-label="MoltED mark"
      role="img"
    >
      {/* Background */}
      <rect x="0" y="0" width="280" height="280" fill="#080410" />

      {/* ── SECTION 1: CENTER COLUMN / BODY ─────────────────────────────
          x=128–152 (24px), y=10–144 · bright gold spine              */}
      <rect x="128" y="10" width="24" height="135" fill="#F5B740" />
      {/* Specular center stripe */}
      <rect x="136" y="10" width="8"  height="135" fill="#FDD67A" />

      {/* ── SECTION 2: LEFT WING ROWS ───────────────────────────────────
          Inner edge fixed at x=128. Each row h=8. Base: #E8A020       */}
      <rect x="56"  y="16" width="72" height="8" fill="#E8A020" />
      <rect x="56"  y="16" width="8"  height="8" fill="#F5B740" />
      <rect x="48"  y="24" width="80" height="8" fill="#E8A020" />
      <rect x="48"  y="24" width="8"  height="8" fill="#F5B740" />
      <rect x="40"  y="32" width="88" height="8" fill="#E8A020" />
      <rect x="40"  y="32" width="8"  height="8" fill="#F5B740" />
      <rect x="40"  y="40" width="88" height="8" fill="#E8A020" />
      <rect x="40"  y="40" width="8"  height="8" fill="#F5B740" />
      <rect x="48"  y="48" width="80" height="8" fill="#E8A020" />
      <rect x="48"  y="48" width="8"  height="8" fill="#F5B740" />
      <rect x="72"  y="56" width="56" height="8" fill="#E8A020" />
      <rect x="72"  y="56" width="8"  height="8" fill="#F5B740" />
      <rect x="88"  y="64" width="40" height="8" fill="#E8A020" />
      <rect x="104" y="72" width="24" height="8" fill="#E8A020" />
      <rect x="112" y="80" width="16" height="8" fill="#E8A020" />
      <rect x="120" y="88" width="8"  height="8" fill="#E8A020" />

      {/* ── SECTION 3: RIGHT WING ROWS ──────────────────────────────────
          All start at x=152 (right edge of center column). Mirror of left. */}
      <rect x="152" y="16" width="72" height="8" fill="#E8A020" />
      <rect x="216" y="16" width="8"  height="8" fill="#F5B740" />
      <rect x="152" y="24" width="80" height="8" fill="#E8A020" />
      <rect x="224" y="24" width="8"  height="8" fill="#F5B740" />
      <rect x="152" y="32" width="88" height="8" fill="#E8A020" />
      <rect x="232" y="32" width="8"  height="8" fill="#F5B740" />
      <rect x="152" y="40" width="88" height="8" fill="#E8A020" />
      <rect x="232" y="40" width="8"  height="8" fill="#F5B740" />
      <rect x="152" y="48" width="80" height="8" fill="#E8A020" />
      <rect x="224" y="48" width="8"  height="8" fill="#F5B740" />
      <rect x="152" y="56" width="56" height="8" fill="#E8A020" />
      <rect x="200" y="56" width="8"  height="8" fill="#F5B740" />
      <rect x="152" y="64" width="40" height="8" fill="#E8A020" />
      <rect x="152" y="72" width="24" height="8" fill="#E8A020" />
      <rect x="152" y="80" width="16" height="8" fill="#E8A020" />
      <rect x="152" y="88" width="8"  height="8" fill="#E8A020" />

      {/* ── SECTION 4: SCARLET ACCENTS (#E8170F) ────────────────────────
          Inner-upper wing, rows 0–3                                    */}
      <rect x="96"  y="16" width="8" height="8" fill="#E8170F" />
      <rect x="88"  y="24" width="8" height="8" fill="#E8170F" />
      <rect x="80"  y="32" width="8" height="8" fill="#E8170F" />
      <rect x="80"  y="40" width="8" height="8" fill="#E8170F" />
      {/* Right mirror (280 - left_x - 8) */}
      <rect x="176" y="16" width="8" height="8" fill="#E8170F" />
      <rect x="184" y="24" width="8" height="8" fill="#E8170F" />
      <rect x="192" y="32" width="8" height="8" fill="#E8170F" />
      <rect x="192" y="40" width="8" height="8" fill="#E8170F" />

      {/* ── SECTION 5: CRACK GLOW (y=144–168) ──────────────────────────
          Gold burst at the molt split point                            */}
      <rect x="112" y="144" width="8"  height="8" fill="#E8A020" fillOpacity="0.35" />
      <rect x="160" y="144" width="8"  height="8" fill="#E8A020" fillOpacity="0.35" />
      <rect x="120" y="144" width="8"  height="8" fill="#E8A020" fillOpacity="0.55" />
      <rect x="152" y="144" width="8"  height="8" fill="#E8A020" fillOpacity="0.55" />
      <rect x="128" y="144" width="24" height="8" fill="#FDD67A" />
      <rect x="136" y="144" width="8"  height="8" fill="#FFFFFF" fillOpacity="0.7" />
      <rect x="120" y="152" width="8"  height="8" fill="#E8A020" fillOpacity="0.4" />
      <rect x="152" y="152" width="8"  height="8" fill="#E8A020" fillOpacity="0.4" />
      <rect x="128" y="152" width="24" height="8" fill="#F5B740" />
      <rect x="132" y="160" width="16" height="8" fill="#E8A020" />

      {/* ── SECTION 6: LEFT CAP HALF ────────────────────────────────────
          Mortarboard shell, staircase tilt going left                  */}
      <rect x="52"  y="168" width="40" height="8" fill="#525258" />
      <rect x="48"  y="176" width="40" height="8" fill="#3A3A40" />
      <rect x="44"  y="184" width="40" height="8" fill="#3A3A40" />
      <rect x="40"  y="192" width="40" height="8" fill="#3A3A40" />
      <rect x="40"  y="200" width="40" height="8" fill="#1E1E2E" />
      {/* Brim */}
      <rect x="32"  y="208" width="64" height="8" fill="#525258" />
      <rect x="32"  y="216" width="64" height="8" fill="#3A3A40" />
      <rect x="32"  y="224" width="64" height="4" fill="#1E1E2E" />
      {/* Tassel */}
      <rect x="44"  y="200" width="8"  height="8" fill="#E8A020" />
      <rect x="40"  y="208" width="8"  height="8" fill="#F5B740" />
      <rect x="36"  y="216" width="8"  height="8" fill="#E8A020" />
      <rect x="32"  y="224" width="8"  height="8" fill="#E8A020" />
      <rect x="40"  y="224" width="8"  height="8" fill="#F5B740" />

      {/* ── SECTION 7: RIGHT CAP HALF (mirror, no tassel) ───────────────
          Mirror: right_x = 280 - left_x - width                       */}
      <rect x="188" y="168" width="40" height="8" fill="#525258" />
      <rect x="192" y="176" width="40" height="8" fill="#3A3A40" />
      <rect x="196" y="184" width="40" height="8" fill="#3A3A40" />
      <rect x="200" y="192" width="40" height="8" fill="#3A3A40" />
      <rect x="200" y="200" width="40" height="8" fill="#1E1E2E" />
      {/* Brim */}
      <rect x="184" y="208" width="64" height="8" fill="#525258" />
      <rect x="184" y="216" width="64" height="8" fill="#3A3A40" />
      <rect x="184" y="224" width="64" height="4" fill="#1E1E2E" />

      {/* ── SECTION 8: VOID BETWEEN CAP HALVES ─────────────────────────
          Crack glow fading down into the gap                           */}
      <rect x="132" y="168" width="16" height="8"  fill="#E8A020" fillOpacity="0.5" />
      <rect x="134" y="176" width="12" height="8"  fill="#E8A020" fillOpacity="0.3" />
      <rect x="136" y="184" width="8"  height="8"  fill="#E8A020" fillOpacity="0.15" />
      {/* Inner void shadows */}
      <rect x="96"  y="168" width="36" height="60" fill="#0C0618" />
      <rect x="148" y="168" width="36" height="60" fill="#0C0618" />
    </svg>
  );
}
