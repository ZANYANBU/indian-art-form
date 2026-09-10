/* Sangam · studio UI */
(() => {
  const { render, sampleWarli, sampleKalam, PALETTES, LAYERS } = window.SangamArt;
  const svg = document.getElementById("art");
  const state = { palette: "terracotta", seed: 2024, count: 28, layers: Object.fromEntries(LAYERS.map((l) => [l.id, true])) };
  const draw = () => { render(svg, state); document.getElementById("seedLabel").textContent = "scene #" + state.seed; };

  /* palettes */
  const palBox = document.getElementById("palettes");
  Object.entries(PALETTES).forEach(([k, p]) => {
    const b = document.createElement("button"); b.type = "button"; b.dataset.k = k;
    b.innerHTML = `<span class="dots">${[p.bg, p.warli, p.maroon, p.indigo, p.mustard].map((c) => `<i style="background:${c}"></i>`).join("")}</span>${p.name}`;
    b.addEventListener("click", () => { state.palette = k; palBox.querySelectorAll("button").forEach((x) => x.classList.toggle("active", x.dataset.k === k)); draw(); });
    if (k === state.palette) b.classList.add("active");
    palBox.appendChild(b);
  });

  /* layers */
  const layBox = document.getElementById("layers");
  const quick = document.createElement("div"); quick.className = "layer-quick";
  [["All", () => true], ["Warli only", (l) => l.from !== "kalamkari"], ["Kalamkari only", (l) => l.from !== "warli"]].forEach(([label, fn]) => {
    const b = document.createElement("button"); b.type = "button"; b.textContent = label;
    b.addEventListener("click", () => { LAYERS.forEach((l) => (state.layers[l.id] = fn(l))); syncChecks(); draw(); });
    quick.appendChild(b);
  });
  layBox.appendChild(quick);
  LAYERS.forEach((l) => {
    const lab = document.createElement("label");
    lab.innerHTML = `<input type="checkbox" checked data-id="${l.id}" /> ${l.name} <span class="tag ${l.from}">${l.from === "both" ? "both" : l.from}</span>`;
    lab.querySelector("input").addEventListener("change", (e) => { state.layers[l.id] = e.target.checked; draw(); });
    layBox.appendChild(lab);
  });
  const syncChecks = () => layBox.querySelectorAll("input").forEach((i) => (i.checked = state.layers[i.dataset.id]));

  /* dancers */
  const count = document.getElementById("count"), out = document.getElementById("countOut");
  count.addEventListener("input", () => { state.count = +count.value; out.textContent = count.value; draw(); });
  document.getElementById("regen").addEventListener("click", () => { state.seed = Math.floor(Math.random() * 9000) + 1000; draw(); });

  /* legend cards */
  const colors = { warli: "#B7593B", kalamkari: "#24407E", both: "#D9A21B" };
  const lg = document.getElementById("legendGrid");
  LAYERS.forEach((l) => {
    const d = document.createElement("div"); d.className = "legend-item"; d.style.setProperty("--c", colors[l.from]);
    d.title = "Click to isolate this layer in the artwork";
    d.innerHTML = `<span class="tag ${l.from}">${l.from}</span><h3>${l.name}</h3><p>${l.desc}</p>`;
    d.addEventListener("click", () => {
      LAYERS.forEach((x) => (state.layers[x.id] = x.id === l.id || x.id === "bg"));
      syncChecks(); draw(); document.getElementById("studio").scrollIntoView({ behavior: "smooth" });
    });
    lg.appendChild(d);
  });

  /* export */
  const serialise = () => {
    const clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "1000"); clone.setAttribute("height", "1000");
    return new XMLSerializer().serializeToString(clone);
  };
  const save = (href, name) => { const a = document.createElement("a"); a.href = href; a.download = name; document.body.appendChild(a); a.click(); a.remove(); };
  document.getElementById("dlSvg").addEventListener("click", () => {
    const url = URL.createObjectURL(new Blob([serialise()], { type: "image/svg+xml" }));
    save(url, `sangam-warli-kalamkari-${state.seed}.svg`); setTimeout(() => URL.revokeObjectURL(url), 2000);
  });
  document.getElementById("dlPng").addEventListener("click", () => {
    const img = new Image(), url = URL.createObjectURL(new Blob([serialise()], { type: "image/svg+xml" }));
    img.onload = () => {
      const c = document.createElement("canvas"); c.width = c.height = 2400;
      c.getContext("2d").drawImage(img, 0, 0, 2400, 2400);
      URL.revokeObjectURL(url);
      c.toBlob((b) => { const u = URL.createObjectURL(b); save(u, `sangam-warli-kalamkari-${state.seed}.png`); setTimeout(() => URL.revokeObjectURL(u), 2000); }, "image/png");
    };
    img.src = url;
  });

  /* copy buttons */
  document.querySelectorAll(".copy").forEach((b) => b.addEventListener("click", async () => {
    const txt = document.getElementById(b.dataset.copy).innerText;
    try { await navigator.clipboard.writeText(txt); b.textContent = "Copied ✓"; } catch { b.textContent = "Select & copy"; }
    setTimeout(() => (b.textContent = "Copy text"), 1800);
  }));

  sampleWarli(document.getElementById("sampleWarli"));
  sampleKalam(document.getElementById("sampleKalam"));
  draw();
})();
