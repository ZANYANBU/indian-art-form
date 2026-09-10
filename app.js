/* Kala Bhoomi · map interactions */
(() => {
  const $ = (id) => document.getElementById(id);

  /* ---- Map ---- */
  const map = L.map("map", { zoomControl: false, minZoom: 4, maxZoom: 16 }).setView([22.3, 80.5], 5);
  L.control.zoom({ position: "bottomleft" }).addTo(map);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const markers = {};
  const activeTypes = new Set(Object.keys(TYPES));
  let cur = 0;

  PLACES.forEach((p, i) => {
    const t = TYPES[p.type];
    const icon = L.divIcon({
      className: "",
      html: `<div class="marker" id="mk-${p.id}" style="--c:${t.color}"><span></span><b>${i + 1}</b></div>`,
      iconSize: [38, 38], iconAnchor: [19, 38], popupAnchor: [0, -40]
    });
    const m = L.marker(p.coords, { icon, title: p.name, riseOnHover: true }).addTo(map);
    m.bindPopup(`
      <div class="pop" style="--c:${t.color}">
        <img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'" />
        <div class="pop-body">
          <div class="type">${t.icon} ${t.label}</div>
          <h3>${p.name}</h3>
          <p>${p.tag}</p>
          <button class="btn btn-primary" data-open="${i}">Explore ${p.name} →</button>
        </div>
      </div>`, { closeButton: false, maxWidth: 280 });
    m.on("click", () => setActive(i));
    markers[p.id] = m;
  });
  map.on("popupopen", (e) => {
    const btn = e.popup.getElement().querySelector("[data-open]");
    if (btn) btn.addEventListener("click", () => openPanel(+btn.dataset.open));
  });

  /* ---- Sidebar list ---- */
  const list = $("locList");
  PLACES.forEach((p, i) => {
    const t = TYPES[p.type];
    const li = document.createElement("li");
    li.innerHTML = `
      <button class="loc" id="loc-${p.id}" data-type="${p.type}" style="--c:${t.color}" type="button">
        <img class="loc-img" src="${p.img.replace('width=900', 'width=300')}" alt="" onerror="this.style.visibility='hidden'" />
        <div class="loc-body">
          <div class="type">${t.icon} ${t.label}</div>
          <span class="num">${i + 1}</span><h3>${p.name}</h3>
          <p>${p.tag}</p>
        </div>
      </button>`;
    li.querySelector("button").addEventListener("click", () => { setActive(i); flyTo(i, true); closeSide(); });
    list.appendChild(li);
  });

  /* ---- Filters + legend ---- */
  const filters = $("filters"), legend = $("legend");
  const allChip = document.createElement("button");
  allChip.className = "chip active"; allChip.type = "button"; allChip.textContent = "All";
  allChip.addEventListener("click", () => { Object.keys(TYPES).forEach((k) => activeTypes.add(k)); applyFilters(); });
  filters.appendChild(allChip);
  Object.entries(TYPES).forEach(([k, t]) => {
    const c = document.createElement("button");
    c.className = "chip active"; c.type = "button"; c.dataset.type = k; c.style.setProperty("--c", t.color);
    c.innerHTML = `<i></i>${t.label}`;
    c.addEventListener("click", () => {
      // click = solo that type; click again when solo = show all
      const solo = activeTypes.size === 1 && activeTypes.has(k);
      activeTypes.clear();
      if (solo) Object.keys(TYPES).forEach((x) => activeTypes.add(x)); else activeTypes.add(k);
      applyFilters();
    });
    filters.appendChild(c);
    legend.insertAdjacentHTML("beforeend", `<div style="--c:${t.color}"><i></i>${t.label}</div>`);
  });
  function applyFilters() {
    filters.querySelectorAll(".chip").forEach((c) => {
      const k = c.dataset.type;
      c.classList.toggle("active", k ? activeTypes.has(k) : activeTypes.size === Object.keys(TYPES).length);
    });
    PLACES.forEach((p) => {
      const on = activeTypes.has(p.type);
      $("loc-" + p.id).classList.toggle("hidden", !on);
      if (on) markers[p.id].addTo(map); else map.removeLayer(markers[p.id]);
    });
  }

  /* ---- Active + fly ---- */
  function setActive(i) {
    cur = i;
    PLACES.forEach((p, j) => {
      $("loc-" + p.id).classList.toggle("active", j === i);
      const mk = document.getElementById("mk-" + p.id); if (mk) mk.classList.toggle("active", j === i);
    });
  }
  function flyTo(i, popup) {
    const p = PLACES[i];
    map.flyTo(p.coords, 9, { duration: 1.4 });
    if (popup) map.once("moveend", () => markers[p.id].openPopup());
  }

  /* ---- Detail panel ---- */
  const panel = $("panel");
  function openPanel(i) {
    setActive(i);
    const p = PLACES[i], t = TYPES[p.type];
    document.documentElement.style.setProperty("--accent", t.color);
    $("pImg").src = p.img; $("pImg").alt = p.name;
    $("pType").textContent = t.label;
    $("pState").textContent = p.state;
    $("pTitle").textContent = p.name;
    $("pTag").textContent = p.tag;
    $("pKv").innerHTML = [["Period", p.period], ["Style", p.style], ["Coordinates", p.coords.map((n) => n.toFixed(3)).join(", ")], ["Category", t.icon + " " + t.label]]
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    $("pMove").textContent = p.movement; $("pHist").textContent = p.history; $("pArt").textContent = p.artists;
    $("pWorks").innerHTML = p.works.map((w) => `<li>${w}</li>`).join("");
    $("pDyk").textContent = p.dyk;
    $("pCount").textContent = `${i + 1} / ${PLACES.length}`;
    panel.classList.add("open"); panel.setAttribute("aria-hidden", "false");
    panel.querySelector(".panel-card").scrollTop = 0;
    map.closePopup();
  }
  function closePanel() { panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true"); document.documentElement.style.setProperty("--accent", "#C4502F"); }
  panel.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closePanel));
  $("prevBtn").addEventListener("click", () => { const i = (cur - 1 + PLACES.length) % PLACES.length; openPanel(i); flyTo(i); });
  $("nextBtn").addEventListener("click", () => { const i = (cur + 1) % PLACES.length; openPanel(i); flyTo(i); });

  /* ---- About ---- */
  const about = $("about");
  $("aboutBtn").addEventListener("click", () => { about.classList.add("open"); about.setAttribute("aria-hidden", "false"); });
  about.querySelectorAll("[data-close-about]").forEach((el) => el.addEventListener("click", () => { about.classList.remove("open"); about.setAttribute("aria-hidden", "true"); }));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closePanel(); about.classList.remove("open"); stopTour(); }
    if (!panel.classList.contains("open")) return;
    if (e.key === "ArrowRight") $("nextBtn").click();
    if (e.key === "ArrowLeft") $("prevBtn").click();
  });

  /* ---- Tour ---- */
  let tourTimer = null, tourIdx = 0;
  const tourBtn = $("tourBtn");
  function stopTour() { if (tourTimer) { clearTimeout(tourTimer); tourTimer = null; tourBtn.classList.remove("running"); tourBtn.textContent = "▶ Take the tour"; } }
  function tourStep() {
    if (tourIdx >= PLACES.length) { stopTour(); map.flyTo([22.3, 80.5], 5, { duration: 1.6 }); return; }
    const i = tourIdx++;
    setActive(i); flyTo(i, true);
    tourTimer = setTimeout(tourStep, 4200);
  }
  tourBtn.addEventListener("click", () => {
    if (tourTimer) return stopTour();
    closePanel(); closeSide(); tourIdx = 0;
    tourBtn.classList.add("running"); tourBtn.textContent = "■ Stop tour";
    tourStep();
  });

  /* ---- Mobile sidebar ---- */
  const side = $("side"), toggle = $("sideToggle");
  function closeSide() { side.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  toggle.addEventListener("click", () => { const o = side.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(o)); });
  map.on("click", closeSide);
})();
