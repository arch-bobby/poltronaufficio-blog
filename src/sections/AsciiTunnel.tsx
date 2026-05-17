import { useRef, useEffect } from 'react';

const WORDS = ["SEDIA", "SCRIVANIA", "ERGONOMIA", "UFFICIO", "DESIGN", "ARREDO", "COMFORT", "STILE", "LAVORO", "SPAZIO"];
const SPACING = 1.0;
const PERSPECTIVE = 0.6;
const SPEED = 1.5;

interface LayoutRow {
  y: number;
  fontSize: number;
  alpha: number;
  color: string;
}

export default function AsciiTunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    offset: 0,
    lastTime: 0,
    cols: 0,
    rows: 0,
    cellW: 0,
    cellH: 0,
    startX: 0,
    startY: 0,
    layout: [] as LayoutRow[],
    width: 0,
    height: 0,
    fontsLoaded: false,
    animId: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      s.width = width;
      s.height = height;

      const baseSize = Math.min(width, height);
      const targetCols = width > height ? 40 : 24;
      s.cellW = (baseSize / targetCols) * SPACING;
      s.cols = Math.ceil(width / s.cellW);
      s.rows = Math.ceil(height / (s.cellW * 1.2));
      s.cellH = s.cellW * 1.2;
      s.startX = (width - s.cols * s.cellW) / 2;
      s.startY = (height - s.rows * s.cellH) / 2;
      buildLayout();
    }

    function buildLayout() {
      const layout: LayoutRow[] = [];
      let totalH = 0;
      for (let row = 0; row < s.rows; row++) {
        const t = (row + 1) / s.rows;
        const persp = PERSPECTIVE / (1 + t * 2);
        const rowH = s.cellH * persp;
        totalH += rowH;
        const y = s.startY + totalH - rowH / 2;
        const depth = t * t * t;
        const fontSize = 8 + 24 * depth;
        const alpha = 0.12 + 0.38 * depth;
        // Gray to black depth gradient
        const grayVal = Math.round(200 - 120 * depth);
        const color = `rgb(${grayVal},${grayVal},${grayVal})`;
        layout.push({ y, fontSize, alpha, color });
      }
      s.layout = layout;
    }

    function draw(timestamp: number) {
      s.animId = requestAnimationFrame(draw);
      const dt = Math.min((timestamp - s.lastTime) / 1000, 0.05);
      s.lastTime = timestamp;
      s.offset += SPEED * dt;
      s.offset %= WORDS[0].length;

      ctx!.fillStyle = "#FFFFFF";
      ctx!.fillRect(0, 0, s.width, s.height);

      const wordLen = WORDS[0].length;
      const offsetFloor = Math.floor(s.offset);

      for (let row = 0; row < s.rows; row++) {
        const l = s.layout[row];
        if (!l) continue;
        ctx!.font = `600 ${l.fontSize}px "Space Grotesk", monospace`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillStyle = l.color;
        ctx!.globalAlpha = l.alpha;

        for (let col = 0; col < s.cols; col++) {
          const charIdx = (col + row + offsetFloor) % wordLen;
          const wordIdx = (col + row) % WORDS.length;
          const char = WORDS[wordIdx][charIdx];
          ctx!.fillText(
            char,
            s.startX + col * s.cellW + s.cellW / 2,
            l.y
          );
        }
      }
      ctx!.globalAlpha = 1;
    }

    function startLoop() {
      s.lastTime = performance.now();
      s.animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);

    document.fonts.ready.then(() => {
      s.fontsLoaded = true;
      resize();
    });

    startLoop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(s.animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      role="img"
      aria-label="Animated office furniture typography tunnel"
    />
  );
}
