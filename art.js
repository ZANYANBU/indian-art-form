/* ==========================================================================
   Sangam · procedural Warli × Kalamkari artwork
   Every motif is a small drawing function. render() composes them into
   layered <g> groups inside an SVG so the UI can toggle each tradition.
   ========================================================================== */
window.SangamArt = (() => {
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  const rng = (seed) => { let a = seed | 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const f = (n) => Math.round(n * 100) / 100;

  const PALETTES = {
    terracotta: { name: "Terracotta wall", bg: "#B7593B", bg2: "#A0482E", warli: "#FFF6E5", outline: "#3B1B14", maroon: "#6E1B2A", indigo: "#213A6E", mustard: "#F0C25A", green: "#2F5D3A", cream: "#FBEFD8", pink: "#E8958C", rust: "#D9744A" },
    ivory:      { name: "Ivory cloth",     bg: "#F3E4C4", bg2: "#E6D1A6", warli: "#7A2E1D", outline: "#3A1F1A", maroon: "#8B2332", indigo: "#24407E", mustard: "#D9A21B", green: "#3F6B3A", cream: "#FBF3E1", pink: "#D9737A", rust: "#C8642F" },
    indigo:     { name: "Indigo vat",      bg: "#1F2F5C", bg2: "#172445", warli: "#F7EBD3", outline: "#0E1730", maroon: "#C2384F", indigo: "#5A79BF", mustard: "#F2C14E", green: "#5FA37A", cream: "#F4E7C8", pink: "#E9A0A5", rust: "#E07A4B" }
  };

  const LAYERS = [
    { id: "bg",        name: "Ground & cloth texture",     from: "both",      desc: "A flat earth or cloth ground with a grain filter, recalling the mud wall of Warli and the cotton of Kalamkari." },
    { id: "border",    name: "Vine border",               from: "kalamkari", desc: "A four-sided creeper with alternating maroon and indigo rosettes and leaves, the classic Kalamkari frame." },
    { id: "corners",   name: "Corner paisleys",           from: "kalamkari", desc: "The mango-shaped paisley (ambi), a Persian motif absorbed by Kalamkari trade cloth." },
    { id: "sides",     name: "Side creepers",             from: "kalamkari", desc: "Vertical vines with larger flowers that close the frame on the left and right." },
    { id: "medallion", name: "Central medallion",         from: "kalamkari", desc: "A scalloped roundel like the centre of a temple cloth or prayer mat." },
    { id: "tree",      name: "Tree of life & birds",      from: "kalamkari", desc: "A flowering tree with a lotus crown and two peacocks, Kalamkari's most loved subject." },
    { id: "dancers",   name: "Tarpa dance ring",          from: "warli",     desc: "Hand-holding dancers circling a tarpa player, the signature Warli motif of community and rhythm." },
    { id: "village",   name: "Village band",              from: "warli",     desc: "Sun, moon, trees, huts and birds drawn in Warli's circle-triangle-line grammar." },
    { id: "farm",      name: "Farming & animals band",    from: "warli",     desc: "Farmers, deer, cattle and peacocks: the Warli painter's record of daily life." },
    { id: "scenes",    name: "Corner scenes",             from: "warli",     desc: "Small vignettes of women carrying water and birds in trees that fill the diagonals." }
  ];

  /* ---------------------------------------------------------------- Warli */
  function figure(g, x, y, h, pose, color, rot = 0, legs = "stand") {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)}) rotate(${f(rot)})`, fill: color, stroke: color, "stroke-width": f(h * 0.05), "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    el("circle", { cx: 0, cy: f(-h * 0.42), r: f(h * 0.09), stroke: "none" }, grp);
    el("polygon", { points: `${f(-h*0.17)},${f(-h*0.3)} ${f(h*0.17)},${f(-h*0.3)} 0,${f(-h*0.01)}`, stroke: "none" }, grp);
    el("polygon", { points: `0,${f(h*0.01)} ${f(-h*0.15)},${f(h*0.28)} ${f(h*0.15)},${f(h*0.28)}`, stroke: "none" }, grp);
    const L = (a, b, c, d) => el("line", { x1: f(a*h), y1: f(b*h), x2: f(c*h), y2: f(d*h) }, grp);
    const legSets = { stand: [[-0.15,0.28,-0.2,0.5],[0.15,0.28,0.2,0.5]], dance: [[-0.15,0.28,-0.3,0.45],[0.15,0.28,0.18,0.5]], walk: [[-0.15,0.28,-0.32,0.48],[0.15,0.28,0.26,0.5]] };
    legSets[legs].forEach((l) => L(...l));
    if (pose === "hold")  { L(-0.17,-0.3,-0.5,-0.26); L(0.17,-0.3,0.5,-0.26); }
    if (pose === "dance") { L(-0.17,-0.3,-0.42,-0.55); L(0.17,-0.3,0.42,-0.55); }
    if (pose === "down")  { L(-0.17,-0.3,-0.3,0.02); L(0.17,-0.3,0.3,0.02); }
    if (pose === "carry") { L(-0.17,-0.3,-0.12,-0.58); L(0.17,-0.3,0.12,-0.58); el("circle", { cx: 0, cy: f(-h*0.64), r: f(h*0.09), fill: "none" }, grp); }
    if (pose === "plough"){ L(-0.17,-0.3,-0.36,-0.1); L(0.17,-0.3,0.3,-0.12); }
    if (pose === "tarpa") { L(-0.17,-0.3,-0.3,-0.5); L(0.17,-0.3,0.35,-0.42);
      el("path", { d: `M${f(-0.3*h)} ${f(-0.5*h)} C ${f(-0.2*h)} ${f(-0.95*h)} ${f(0.35*h)} ${f(-1.0*h)} ${f(0.55*h)} ${f(-0.55*h)}`, fill: "none", "stroke-width": f(h*0.07) }, grp);
      el("circle", { cx: f(0.55*h), cy: f(-0.5*h), r: f(h*0.09), fill: "none" }, grp); }
    return grp;
  }
  function animal(g, x, y, s, color, kind = "deer", flip = false) {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)}) scale(${flip ? -1 : 1} 1)`, fill: color, stroke: color, "stroke-width": f(s * 0.05), "stroke-linecap": "round" }, g);
    const L = (a, b, c, d) => el("line", { x1: f(a*s), y1: f(b*s), x2: f(c*s), y2: f(d*s) }, grp);
    if (kind === "peacock") {
      el("polygon", { points: `${f(-0.2*s)},${f(0.1*s)} ${f(0.2*s)},${f(0.1*s)} 0,${f(-0.25*s)}`, stroke: "none" }, grp);
      el("circle", { cx: 0, cy: f(-0.33*s), r: f(0.06*s), stroke: "none" }, grp);
      L(0, -0.33, 0.12, -0.3); L(0, -0.4, -0.05, -0.5); L(0, -0.4, 0.05, -0.5);
      for (let i = -3; i <= 3; i++) { L(-0.1, 0.05, -0.1 + i*0.13, 0.7); el("circle", { cx: f((-0.1+i*0.13)*s), cy: f(0.72*s), r: f(0.03*s), stroke: "none" }, grp); }
      L(-0.08, 0.1, -0.08, 0.35); L(0.08, 0.1, 0.08, 0.35);
      return grp;
    }
    el("polygon", { points: `${f(-0.5*s)},${f(-0.16*s)} ${f(-0.5*s)},${f(0.16*s)} 0,0`, stroke: "none" }, grp);
    el("polygon", { points: `${f(0.5*s)},${f(-0.16*s)} ${f(0.5*s)},${f(0.16*s)} 0,0`, stroke: "none" }, grp);
    L(-0.45, 0.14, -0.5, 0.48); L(-0.35, 0.1, -0.3, 0.48); L(0.35, 0.1, 0.3, 0.48); L(0.45, 0.14, 0.5, 0.48);
    L(0.48, -0.12, 0.66, -0.4);
    el("polygon", { points: `${f(0.6*s)},${f(-0.42*s)} ${f(0.82*s)},${f(-0.36*s)} ${f(0.66*s)},${f(-0.28*s)}`, stroke: "none" }, grp);
    if (kind === "deer") { L(0.64, -0.42, 0.58, -0.62); L(0.66, -0.42, 0.76, -0.6); L(0.58, -0.62, 0.52, -0.7); L(0.76, -0.6, 0.84, -0.68); }
    if (kind === "ox")   { L(0.62, -0.44, 0.56, -0.56); L(0.68, -0.44, 0.76, -0.56); }
    L(-0.5, -0.1, -0.62, 0.1);
    return grp;
  }
  function wtree(g, x, y, h, color, rnd) {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)})`, stroke: color, "stroke-width": f(h * 0.04), "stroke-linecap": "round", fill: "none" }, g);
    el("line", { x1: 0, y1: 0, x2: 0, y2: f(-h) }, grp);
    const n = 4 + Math.floor(rnd() * 3);
    for (let i = 0; i < n; i++) {
      const yy = -h * (0.3 + 0.65 * i / n), len = h * (0.35 - 0.05 * i) * (0.8 + rnd() * 0.4);
      [-1, 1].forEach((d) => {
        el("line", { x1: 0, y1: f(yy), x2: f(d * len), y2: f(yy - len * 0.55) }, grp);
        for (let k = 1; k <= 4; k++) { const t = k / 5; el("line", { x1: f(d*len*t), y1: f(yy - len*0.55*t), x2: f(d*len*t + d*h*0.03), y2: f(yy - len*0.55*t - h*0.06) }, grp); el("line", { x1: f(d*len*t), y1: f(yy - len*0.55*t), x2: f(d*len*t - d*h*0.02), y2: f(yy - len*0.55*t - h*0.06) }, grp); }
      });
    }
    return grp;
  }
  function hut(g, x, y, s, color) {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)})`, stroke: color, fill: "none", "stroke-width": f(s * 0.05) }, g);
    el("rect", { x: f(-s*0.4), y: f(-s*0.45), width: f(s*0.8), height: f(s*0.45) }, grp);
    el("polygon", { points: `${f(-s*0.5)},${f(-s*0.45)} ${f(s*0.5)},${f(-s*0.45)} 0,${f(-s*1.0)}`, fill: color, stroke: "none" }, grp);
    for (let i = 1; i < 4; i++) el("line", { x1: f(-s*0.4), y1: f(-s*0.45 + i*s*0.11), x2: f(s*0.4), y2: f(-s*0.45 + i*s*0.11) }, grp);
    el("rect", { x: f(-s*0.08), y: f(-s*0.3), width: f(s*0.16), height: f(s*0.3), fill: color, stroke: "none" }, grp);
    return grp;
  }
  function sun(g, x, y, r, color) {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)})`, stroke: color, fill: color, "stroke-width": 2.2, "stroke-linecap": "round" }, g);
    el("circle", { r: f(r * 0.5), stroke: "none" }, grp);
    el("circle", { r: f(r * 0.72), fill: "none", "stroke-dasharray": "3 4" }, grp);
    for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; el("line", { x1: f(Math.cos(a)*r*0.8), y1: f(Math.sin(a)*r*0.8), x2: f(Math.cos(a)*r*(i%2?1.05:1.2)), y2: f(Math.sin(a)*r*(i%2?1.05:1.2)) }, grp); }
    return grp;
  }
  function moon(g, x, y, r, color) {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)})`, fill: color }, g);
    el("path", { d: `M0 ${f(-r)} A ${f(r)} ${f(r)} 0 1 1 0 ${f(r)} A ${f(r*1.25)} ${f(r*1.25)} 0 0 0 0 ${f(-r)} Z` }, grp);
    [[-r*1.3,-r*0.6],[-r*1.6,r*0.5],[-r*0.9,r*1.3]].forEach(([sx, sy]) => el("polygon", { points: `${f(sx)},${f(sy-5)} ${f(sx+1.6)},${f(sy-1.6)} ${f(sx+5)},${f(sy)} ${f(sx+1.6)},${f(sy+1.6)} ${f(sx)},${f(sy+5)} ${f(sx-1.6)},${f(sy+1.6)} ${f(sx-5)},${f(sy)} ${f(sx-1.6)},${f(sy-1.6)}` }, grp));
    return grp;
  }
  function bird(g, x, y, s, color) {
    el("path", { d: `M${f(x-s)} ${f(y)} Q ${f(x-s*0.5)} ${f(y-s*0.7)} ${f(x)} ${f(y)} Q ${f(x+s*0.5)} ${f(y-s*0.7)} ${f(x+s)} ${f(y)}`, fill: "none", stroke: color, "stroke-width": 2.2, "stroke-linecap": "round" }, g);
  }

  /* ------------------------------------------------------------ Kalamkari */
  const petalPath = (L, w) => `M0 0 C ${f(w)} ${f(-L*0.35)} ${f(w)} ${f(-L*0.75)} 0 ${f(-L)} C ${f(-w)} ${f(-L*0.75)} ${f(-w)} ${f(-L*0.35)} 0 0 Z`;
  function flower(g, x, y, r, pal, main, rot = 0, n = 8) {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)}) rotate(${rot})`, stroke: pal.outline, "stroke-width": f(Math.max(1.2, r * 0.05)), "stroke-linejoin": "round" }, g);
    for (let i = 0; i < n; i++) { const p = el("path", { d: petalPath(r, r * 0.42), fill: main, transform: `rotate(${f(360/n*i)})` }, grp); }
    for (let i = 0; i < n; i++) el("line", { x1: 0, y1: f(-r*0.25), x2: 0, y2: f(-r*0.8), transform: `rotate(${f(360/n*i)})`, "stroke-width": f(r*0.03) }, grp);
    for (let i = 0; i < n; i++) el("path", { d: petalPath(r * 0.58, r * 0.26), fill: pal.mustard, transform: `rotate(${f(360/n*i + 180/n)})` }, grp);
    el("circle", { r: f(r * 0.24), fill: pal.cream }, grp);
    el("circle", { r: f(r * 0.09), fill: pal.outline, stroke: "none" }, grp);
    for (let i = 0; i < 6; i++) el("circle", { cx: f(Math.cos(i/6*Math.PI*2)*r*0.17), cy: f(Math.sin(i/6*Math.PI*2)*r*0.17), r: f(r*0.03), fill: pal.outline, stroke: "none" }, grp);
    return grp;
  }
  function leaf(g, x, y, L, pal, rot = 0, fill) {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)}) rotate(${f(rot)})`, stroke: pal.outline, "stroke-width": f(Math.max(1.1, L * 0.045)) }, g);
    el("path", { d: `M0 0 C ${f(L*0.42)} ${f(-L*0.3)} ${f(L*0.42)} ${f(-L*0.7)} 0 ${f(-L)} C ${f(-L*0.42)} ${f(-L*0.7)} ${f(-L*0.42)} ${f(-L*0.3)} 0 0 Z`, fill: fill || pal.green }, grp);
    el("line", { x1: 0, y1: f(-L*0.1), x2: 0, y2: f(-L*0.88), "stroke-width": f(L*0.03) }, grp);
    for (let i = 1; i <= 3; i++) { const yy = -L * (0.2 + i * 0.18); el("line", { x1: 0, y1: f(yy), x2: f(L*0.18), y2: f(yy - L*0.12), "stroke-width": f(L*0.025) }, grp); el("line", { x1: 0, y1: f(yy), x2: f(-L*0.18), y2: f(yy - L*0.12), "stroke-width": f(L*0.025) }, grp); }
    return grp;
  }
  function lotus(g, x, y, r, pal) {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)})`, stroke: pal.outline, "stroke-width": f(r * 0.04), "stroke-linejoin": "round" }, g);
    const pet = (a, L, fill) => el("path", { d: `M0 0 C ${f(L*0.38)} ${f(-L*0.3)} ${f(L*0.3)} ${f(-L*0.8)} 0 ${f(-L)} C ${f(-L*0.3)} ${f(-L*0.8)} ${f(-L*0.38)} ${f(-L*0.3)} 0 0 Z`, fill, transform: `rotate(${a})` }, grp);
    [-70, 70, -45, 45].forEach((a) => pet(a, r * 0.8, pal.maroon));
    [-22, 22].forEach((a) => pet(a, r * 0.95, pal.pink));
    pet(0, r, pal.pink);
    el("ellipse", { cx: 0, cy: f(-r*0.02), rx: f(r*0.42), ry: f(r*0.14), fill: pal.mustard }, grp);
    return grp;
  }
  function paisley(g, x, y, s, pal, rot = 0) {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${f(s)})`, stroke: pal.outline, "stroke-width": f(2.2 / s), "stroke-linejoin": "round" }, g);
    const d = "M0 0.5 C -0.58 0.5 -0.6 -0.25 -0.22 -0.6 C 0.02 -0.82 0.2 -1.02 0.46 -0.96 C 0.66 -0.9 0.6 -0.72 0.44 -0.72 C 0.62 -0.42 0.56 0.12 0.35 0.36 C 0.25 0.48 0.12 0.5 0 0.5 Z";
    el("path", { d, fill: pal.maroon }, grp);
    el("path", { d, fill: pal.cream, transform: "translate(0 -0.03) scale(0.7)" }, grp);
    el("path", { d, fill: "none", transform: "translate(0 -0.04) scale(0.52)", "stroke-dasharray": `${f(0.06)} ${f(0.05)}`, "stroke-width": f(1.4 / s) }, grp);
    for (let i = 0; i < 6; i++) el("path", { d: "M0 0 C 0.07 -0.06 0.07 -0.14 0 -0.18 C -0.07 -0.14 -0.07 -0.06 0 0 Z", fill: i % 2 ? pal.indigo : pal.rust, transform: `translate(0.02 -0.02) rotate(${i * 60})`, "stroke-width": f(1.2 / s) }, grp);
    el("circle", { cx: 0.02, cy: -0.02, r: 0.045, fill: pal.mustard, "stroke-width": f(1.2 / s) }, grp);
    [[-0.3,-0.3],[0.2,-0.5],[0.25,0.22]].forEach(([px, py]) => el("circle", { cx: px, cy: py, r: 0.045, fill: pal.mustard, "stroke-width": f(1.2/s) }, grp));
    return grp;
  }
  function vine(g, length, band, pal, rnd, big = false) {
    const grp = el("g", {}, g);
    const step = big ? 92 : 64, amp = band * 0.28, n = Math.floor(length / step);
    let d = `M0 0`;
    for (let i = 1; i <= n; i++) { const x0 = (i - 1) * step, x1 = i * step, dir = i % 2 ? -1 : 1; d += ` C ${f(x0 + step*0.4)} ${f(dir*amp)} ${f(x1 - step*0.4)} ${f(dir*amp)} ${f(x1)} 0`; }
    el("path", { d, fill: "none", stroke: pal.outline, "stroke-width": big ? 4.5 : 3.6, "stroke-linecap": "round" }, grp);
    el("path", { d, fill: "none", stroke: pal.green, "stroke-width": big ? 2.4 : 1.8 }, grp);
    for (let i = 0; i <= n; i++) {
      const x = i * step, dir = i % 2 ? -1 : 1;
      if (i > 0 && i < n) { leaf(grp, x - step * 0.5, dir * amp * 0.1, big ? 30 : 22, pal, dir > 0 ? -150 : -30); leaf(grp, x - step * 0.5, -dir * amp * 0.1, big ? 24 : 18, pal, dir > 0 ? 30 : 150, pal.mustard); }
      if (i === 0 || i === n) continue;
      flower(grp, x, dir * amp * 0.5, big ? 24 : 16, pal, i % 4 === 1 ? pal.maroon : i % 4 === 3 ? pal.indigo : pal.rust, rnd() * 40, i % 2 ? 8 : 6);
    }
    return grp;
  }
  function peacock(g, x, y, s, pal, flip = false) {
    const grp = el("g", { transform: `translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})`, stroke: pal.outline, "stroke-width": f(1.8 / s), "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
    for (let i = 0; i < 5; i++) { const a = -20 + i * 14; el("path", { d: `M-10 0 C -40 ${-10 + i*3} -70 ${-30 + i*12} -78 ${-16 + i*12}`, fill: "none", stroke: pal.green, "stroke-width": f(9 / s), transform: `rotate(${a} -10 0)` }, grp); }
    for (let i = 0; i < 5; i++) { const a = -20 + i * 14, cx = -78, cy = -16 + i * 12; const e = el("g", { transform: `rotate(${a} -10 0)` }, grp); el("circle", { cx, cy, r: 6, fill: pal.mustard }, e); el("circle", { cx, cy, r: 2.6, fill: pal.indigo, stroke: "none" }, e); }
    el("ellipse", { cx: 0, cy: 0, rx: 24, ry: 14, fill: pal.indigo }, grp);
    el("path", { d: "M-6 -4 C 4 -8 14 -6 12 4", fill: "none", "stroke-width": f(1.4 / s) }, grp);
    el("path", { d: "M14 -6 C 22 -14 22 -26 20 -34", fill: "none", stroke: pal.indigo, "stroke-width": f(9 / s) }, grp);
    el("path", { d: "M14 -6 C 22 -14 22 -26 20 -34", fill: "none", "stroke-width": f(1.2 / s) }, grp);
    el("circle", { cx: 21, cy: -36, r: 7, fill: pal.indigo }, grp);
    el("polygon", { points: "27,-37 36,-34 27,-32", fill: pal.mustard }, grp);
    el("circle", { cx: 23, cy: -37, r: 1.4, fill: pal.cream, stroke: "none" }, grp);
    [[-6,-8],[0,-10],[6,-8]].forEach(([dx, dy]) => { el("line", { x1: 21, y1: -42, x2: 21 + dx, y2: -46 + dy }, grp); el("circle", { cx: 21 + dx, cy: -46 + dy, r: 1.6, fill: pal.maroon }, grp); });
    el("line", { x1: -6, y1: 13, x2: -8, y2: 24 }, grp); el("line", { x1: 6, y1: 13, x2: 8, y2: 24 }, grp);
    return grp;
  }

  /* ---------------------------------------------------------------- Scene */
  function render(svg, opts) {
    const pal = PALETTES[opts.palette] || PALETTES.terracotta;
    const rnd = rng(opts.seed || 1);
    const on = (id) => opts.layers[id] !== false;
    const W = pal.warli;
    svg.innerHTML = "";
    svg.setAttribute("viewBox", "0 0 1000 1000");
    const defs = el("defs", {}, svg);
    const filt = el("filter", { id: "grain", x: 0, y: 0, width: "100%", height: "100%" }, defs);
    el("feTurbulence", { type: "fractalNoise", baseFrequency: "0.9", numOctaves: "2", seed: String(opts.seed % 100), stitchTiles: "stitch", result: "n" }, filt);
    el("feColorMatrix", { in: "n", type: "matrix", values: "0 0 0 0 0.2  0 0 0 0 0.1  0 0 0 0 0.05  0 0 0 0.16 0" }, filt);
    const rg = el("radialGradient", { id: "ground", cx: "50%", cy: "50%", r: "70%" }, defs);
    el("stop", { offset: "0", "stop-color": pal.bg }, rg); el("stop", { offset: "1", "stop-color": pal.bg2 }, rg);
    const G = (id) => el("g", { id: "layer-" + id, "data-layer": id, style: on(id) ? "" : "display:none" }, svg);

    /* background */
    const bg = G("bg");
    el("rect", { width: 1000, height: 1000, fill: "url(#ground)" }, bg);

    /* dancers ring */
    const dancers = G("dancers");
    const N = Math.max(12, opts.count || 28), R = 300, cx = 500, cy = 500;
    const legPoses = ["stand", "dance", "walk"];
    for (let i = 1; i < N; i++) {
      const a = -Math.PI / 2 + (i / N) * Math.PI * 2;
      const rr = R + (rnd() - 0.5) * 8;
      figure(dancers, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 58, "hold", W, (a * 180) / Math.PI + 90, legPoses[Math.floor(rnd() * 3)]);
    }
    figure(dancers, cx, cy - R + 6, 72, "tarpa", W, 0, "stand");
    /* small inner ring of dots (Warli chauk dots) */
    for (let i = 0; i < 72; i++) { const a = (i / 72) * Math.PI * 2; el("circle", { cx: f(cx + Math.cos(a) * 262), cy: f(cy + Math.sin(a) * 262), r: i % 3 === 0 ? 2.6 : 1.4, fill: W }, dancers); }

    /* village band (top) */
    const village = G("village");
    sun(village, 215, 126, 26, W);
    moon(village, 800, 122, 18, W);
    const villageX = [];
    for (let x = 270; x <= 740; x += 62) villageX.push(x + (rnd() - 0.5) * 14);
    villageX.forEach((x, i) => {
      const k = i % 4;
      if (k === 0) wtree(village, x, 168, 66 + rnd() * 14, W, rnd);
      else if (k === 1) hut(village, x, 168, 50, W);
      else if (k === 2) figure(village, x, 145, 48, rnd() > 0.5 ? "carry" : "dance", W, 0, "walk");
      else { bird(village, x, 112 + rnd() * 10, 9, W); bird(village, x + 14, 128 + rnd() * 10, 7, W); figure(village, x, 148, 46, "down", W, 0, "stand"); }
    });
    for (let x = 180; x <= 820; x += 6) el("circle", { cx: x, cy: 176, r: 1.2, fill: W }, village);

    /* farming band (bottom) */
    const farm = G("farm");
    for (let x = 180; x <= 820; x += 6) el("circle", { cx: x, cy: 826, r: 1.2, fill: W }, farm);
    const farmItems = ["deer", "farmer", "ox", "peacock", "pair", "deer", "farmer", "ox", "peacock"];
    let fx = 200;
    farmItems.forEach((it, i) => {
      const flip = rnd() > 0.5;
      if (it === "deer") { animal(farm, fx + 30, 868, 56, W, "deer", flip); fx += 76; }
      else if (it === "ox") { animal(farm, fx + 34, 872, 62, W, "ox", flip); el("line", { x1: f(fx + (flip ? 4 : 64)), y1: 876, x2: f(fx + (flip ? -10 : 80)), y2: 892, stroke: W, "stroke-width": 2.4 }, farm); fx += 84; }
      else if (it === "farmer") { figure(farm, fx + 16, 868, 52, "plough", W, 0, "walk"); el("line", { x1: f(fx + 2), y1: 862, x2: f(fx - 12), y2: 892, stroke: W, "stroke-width": 2.4 }, farm); fx += 52; }
      else if (it === "peacock") { animal(farm, fx + 18, 858, 44, W, "peacock"); fx += 52; }
      else { figure(farm, fx + 10, 866, 50, "dance", W, 0, "dance"); figure(farm, fx + 36, 866, 50, "dance", W, 0, "dance"); fx += 66; }
    });
    for (let x = 200; x <= 800; x += 28) { el("line", { x1: x, y1: 900, x2: x + 6, y2: 888, stroke: W, "stroke-width": 1.6 }, farm); el("line", { x1: x + 6, y1: 900, x2: x + 12, y2: 888, stroke: W, "stroke-width": 1.6 }, farm); }

    /* corner scenes */
    const scenes = G("scenes");
    [[231, 231, 1], [769, 231, -1], [231, 769, 1], [769, 769, -1]].forEach(([x, y, d], i) => {
      wtree(scenes, x - d * 10, y + 34, 60, W, rnd);
      bird(scenes, x - d * 26, y - 30, 8, W);
      figure(scenes, x + d * 30, y + 8, 46, i < 2 ? "carry" : "dance", W, 0, "walk");
      if (i >= 2) animal(scenes, x + d * 34, y + 40 - 12, 30, W, "deer", d < 0);
    });

    /* medallion */
    const med = G("medallion");
    for (let i = 0; i < 40; i++) { const a = (i / 40) * Math.PI * 2; el("circle", { cx: f(cx + Math.cos(a) * 236), cy: f(cy + Math.sin(a) * 236), r: 15, fill: i % 2 ? pal.maroon : pal.indigo, stroke: pal.outline, "stroke-width": 2 }, med); }
    el("circle", { cx, cy, r: 232, fill: pal.cream, stroke: pal.outline, "stroke-width": 3 }, med);
    el("circle", { cx, cy, r: 222, fill: "none", stroke: pal.mustard, "stroke-width": 5 }, med);
    el("circle", { cx, cy, r: 222, fill: "none", stroke: pal.outline, "stroke-width": 1.2, "stroke-dasharray": "6 5" }, med);
    el("circle", { cx, cy, r: 214, fill: "none", stroke: pal.outline, "stroke-width": 1.2 }, med);
    for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; leaf(med, cx + Math.cos(a) * 208, cy + Math.sin(a) * 208, 20, pal, (a * 180) / Math.PI + 90, i % 2 ? pal.green : pal.rust); }

    /* tree of life */
    const tree = G("tree");
    el("path", { d: "M 380 700 Q 500 670 620 700 L 620 706 Q 500 682 380 706 Z", fill: pal.green, stroke: pal.outline, "stroke-width": 1.5 }, tree);
    for (let x = 392; x <= 608; x += 12) el("path", { d: `M${x} 698 q 3 -12 6 0`, fill: "none", stroke: pal.outline, "stroke-width": 1.1 }, tree);
    el("path", { d: "M486 700 C 476 630 500 560 494 470 L 506 470 C 500 560 524 630 514 700 Z", fill: pal.rust, stroke: pal.outline, "stroke-width": 2 }, tree);
    for (let y = 690; y > 480; y -= 22) el("path", { d: `M${f(490 - (690 - y) * 0.02)} ${y} q 10 -4 20 0`, fill: "none", stroke: pal.outline, "stroke-width": 1 }, tree);
    const branches = [
      [652, 380, 566, pal.maroon, 34], [652, 620, 566, pal.indigo, 34],
      [572, 395, 478, pal.indigo, 30], [572, 605, 478, pal.maroon, 30],
      [492, 430, 402, pal.rust, 26], [492, 570, 402, pal.rust, 26]
    ];
    branches.forEach(([y0, x1, y1, col, r], i) => {
      const dir = x1 < 500 ? -1 : 1;
      const d = `M500 ${y0} C ${f(500 + dir*40)} ${y0} ${f(x1 - dir*30)} ${f(y1 + 50)} ${x1} ${y1}`;
      el("path", { d, fill: "none", stroke: pal.outline, "stroke-width": 9, "stroke-linecap": "round" }, tree);
      el("path", { d, fill: "none", stroke: pal.rust, "stroke-width": 6, "stroke-linecap": "round" }, tree);
      const mx = (500 + x1) / 2, my = (y0 + y1) / 2 + 12;
      leaf(tree, mx, my, 34, pal, dir > 0 ? -60 : 60);
      leaf(tree, mx + dir * 10, my + 20, 26, pal, dir > 0 ? 120 : -120, pal.mustard);
      flower(tree, x1, y1, r, pal, col, i * 13, 8);
    });
    el("path", { d: "M500 470 C 500 440 500 420 500 400", fill: "none", stroke: pal.outline, "stroke-width": 8, "stroke-linecap": "round" }, tree);
    el("path", { d: "M500 470 C 500 440 500 420 500 400", fill: "none", stroke: pal.rust, "stroke-width": 5 }, tree);
    lotus(tree, 500, 398, 56, pal);
    [[452, 520, 20], [548, 520, 20], [470, 615, 16], [530, 615, 16]].forEach(([x, y, r]) => flower(tree, x, y, r, pal, pal.pink, 15, 6));
    peacock(tree, 400, 675, 0.62, pal, false);
    peacock(tree, 600, 675, 0.62, pal, true);

    /* border */
    const border = G("border");
    el("rect", { x: 20, y: 20, width: 960, height: 960, fill: "none", stroke: pal.outline, "stroke-width": 3 }, border);
    el("rect", { x: 26, y: 26, width: 948, height: 948, fill: "none", stroke: pal.mustard, "stroke-width": 4 }, border);
    el("rect", { x: 78, y: 78, width: 844, height: 844, fill: "none", stroke: pal.outline, "stroke-width": 2.5 }, border);
    el("rect", { x: 84, y: 84, width: 832, height: 832, fill: "none", stroke: pal.mustard, "stroke-width": 1.5, "stroke-dasharray": "5 4" }, border);
    const sideLen = 832;
    [["translate(84 52)", 0], ["translate(916 84) rotate(90)", 1], ["translate(916 948) rotate(180)", 2], ["translate(84 916) rotate(270)", 3]].forEach(([t]) => {
      const g = el("g", { transform: t }, border); vine(g, sideLen, 52, pal, rnd, false);
    });

    /* corner paisleys */
    const corners = G("corners");
    [[122, 122, 0], [878, 122, 90], [878, 878, 180], [122, 878, 270]].forEach(([x, y, r]) => {
      paisley(corners, x, y, 58, pal, r + 35);
      flower(corners, x + (x < 500 ? 46 : -46), y + (y < 500 ? 46 : -46), 13, pal, pal.indigo, 0, 6);
    });

    /* side creepers */
    const sides = G("sides");
    [["translate(120 190) rotate(90)"], ["translate(880 810) rotate(270)"]].forEach(([t]) => { const g = el("g", { transform: t }, sides); vine(g, 620, 64, pal, rnd, true); });

    /* texture overlay (part of bg layer visually, but always last) */
    const tex = el("g", { "data-layer": "bg", style: on("bg") ? "" : "display:none" }, svg);
    el("rect", { width: 1000, height: 1000, filter: "url(#grain)", opacity: 0.9, style: "mix-blend-mode:multiply" }, tex);
    return svg;
  }

  /* --------------------------------------------------------- Sample tiles */
  function sampleWarli(svg) {
    const pal = PALETTES.terracotta; svg.innerHTML = "";
    el("rect", { width: 200, height: 200, rx: 18, fill: pal.bg }, svg);
    sun(svg, 40, 40, 14, pal.warli);
    wtree(svg, 160, 118, 60, pal.warli, rng(7));
    figure(svg, 60, 118, 60, "hold", pal.warli, 0, "dance");
    figure(svg, 100, 118, 60, "hold", pal.warli, 0, "walk");
    figure(svg, 140, 122, 60, "hold", pal.warli, 0, "stand");
    animal(svg, 90, 170, 40, pal.warli, "deer");
    for (let x = 20; x <= 180; x += 8) el("circle", { cx: x, cy: 150, r: 1.3, fill: pal.warli }, svg);
  }
  function sampleKalam(svg) {
    const pal = PALETTES.ivory; svg.innerHTML = "";
    el("rect", { width: 200, height: 200, rx: 18, fill: pal.bg }, svg);
    el("rect", { x: 10, y: 10, width: 180, height: 180, rx: 12, fill: "none", stroke: pal.outline, "stroke-width": 2 }, svg);
    paisley(svg, 60, 78, 46, pal, 30);
    flower(svg, 140, 70, 34, pal, pal.maroon, 0, 8);
    leaf(svg, 120, 150, 40, pal, -120); leaf(svg, 96, 168, 34, pal, -60, pal.mustard);
    flower(svg, 62, 150, 22, pal, pal.indigo, 20, 6);
    el("path", { d: "M20 190 C 70 150 130 200 180 160", fill: "none", stroke: pal.green, "stroke-width": 3 }, svg);
  }

  return { render, sampleWarli, sampleKalam, PALETTES, LAYERS };
})();
