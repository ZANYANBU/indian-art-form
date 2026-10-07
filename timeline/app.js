/* Chitra Kaal · timeline interactions */
(() => {
  const spine = document.getElementById("spine");
  const eraNav = document.getElementById("eraNav");
  const flat = []; // flattened artifacts for modal navigation

  /* --- hero mandala petals --- */
  const petals = document.getElementById("petals");
  const cols = ["#E8843A", "#F2B632", "#B52B65", "#2E3A87", "#0F7C7A", "#4C8C3E"];
  for (let ring = 0; ring < 3; ring++) {
    const n = 12 + ring * 6, r = 70 + ring * 42, len = 40 + ring * 8;
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", `M0 0 C ${len*0.35} ${-len*0.35}, ${len*0.35} ${-len}, 0 ${-len - 10} C ${-len*0.35} ${-len}, ${-len*0.35} ${-len*0.35}, 0 0 Z`);
      p.setAttribute("transform", `translate(200 200) rotate(${a}) translate(0 ${-r})`);
      p.setAttribute("fill", cols[(i + ring) % cols.length]);
      p.setAttribute("opacity", ring === 2 ? ".55" : ring === 1 ? ".75" : ".95");
      petals.appendChild(p);
    }
  }

  /* --- build era chips + timeline --- */
  ERAS.forEach((era, ei) => {
    const chip = document.createElement("a");
    chip.className = "chip"; chip.href = "#" + era.id; chip.style.setProperty("--c", era.color);
    chip.innerHTML = `<i></i>${era.name}`;
    eraNav.appendChild(chip);

    const sec = document.createElement("section");
    sec.className = "era"; sec.id = era.id; sec.style.setProperty("--c", era.color);
    sec.innerHTML = `
      <div class="era-marker">
        <div class="dates">${era.dates}</div>
        <h3>${era.name}</h3>
        <p class="tag">${era.tagline}</p>
      </div>
      <div class="era-items"></div>`;
    const items = sec.querySelector(".era-items");

    era.artifacts.forEach((a) => {
      const idx = flat.length;
      flat.push({ ...a, era });
      const card = document.createElement("button");
      card.className = "card"; card.type = "button"; card.dataset.idx = idx;
      card.setAttribute("aria-label", "Open " + a.title);
      card.innerHTML = `
        <div class="card-media">
          <span class="fallback">${era.name.charAt(0)}</span>
          <img loading="lazy" src="${a.img}" alt="${a.title}" onerror="this.remove()" />
          <span class="card-pill">${era.name}</span>
        </div>
        <div class="card-body">
          <div class="date">${a.date}</div>
          <h3>${a.title}</h3>
          <p>${a.desc}</p>
          <span class="card-link">View artifact</span>
        </div>`;
      card.addEventListener("click", () => openModal(idx));
      items.appendChild(card);
    });
    spine.appendChild(sec);
  });
  document.getElementById("statEras").textContent = ERAS.length;
  document.getElementById("statArtifacts").textContent = flat.length;

  /* --- reveal on scroll --- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 });
  document.querySelectorAll(".card").forEach((c) => io.observe(c));

  /* --- active chip on scroll --- */
  const chips = [...eraNav.children];
  const eraIO = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { chips.forEach((c) => c.classList.toggle("active", c.getAttribute("href") === "#" + e.target.id)); } });
  }, { rootMargin: "-40% 0px -50% 0px" });
  document.querySelectorAll(".era").forEach((s) => eraIO.observe(s));

  /* --- modal --- */
  const modal = document.getElementById("modal");
  const $ = (id) => document.getElementById(id);
  let cur = 0;
  function openModal(i) {
    cur = (i + flat.length) % flat.length;
    const a = flat[cur];
    document.documentElement.style.setProperty("--accent", a.era.color);
    $("mImg").src = a.img; $("mImg").alt = a.title;
    $("mEra").textContent = a.era.name;
    $("mDate").textContent = a.date;
    $("mTitle").textContent = a.title;
    $("mFacts").innerHTML = [["Place", a.place], ["Material", a.material], ["Size", a.size], ["Where it is now", a.location]]
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    $("mDesc").textContent = a.desc; $("mContext").textContent = a.context; $("mSig").textContent = a.sig; $("mDyk").textContent = a.dyk;
    $("mCount").textContent = `${cur + 1} / ${flat.length}`;
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-card").scrollTop = 0;
    modal.querySelector(".modal-close").focus({ preventScroll: true });
  }
  function closeModal() {
    modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.documentElement.style.setProperty("--accent", "#E8843A");
  }
  modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
  $("prevBtn").addEventListener("click", () => openModal(cur - 1));
  $("nextBtn").addEventListener("click", () => openModal(cur + 1));
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") openModal(cur + 1);
    if (e.key === "ArrowLeft") openModal(cur - 1);
  });
  document.getElementById("randomBtn").addEventListener("click", () => openModal(Math.floor(Math.random() * flat.length)));
})();
