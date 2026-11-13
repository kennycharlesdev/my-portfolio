/* =========================================
   KINY ST CHARLES — PORTFOLIO V4
   Motion, belts and live GitHub automation
========================================= */

(() => {
  const GITHUB_USER = "kennycharlesdev";
  const GITHUB_REPO = "my-portfolio";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- year ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- menu ---------- */
  const menuToggle = $(".menu-toggle");
  const navLinks = $(".nav-links");

  function setMenu(open) {
    if (!menuToggle || !navLinks) return;
    navLinks.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("menu-open", open);
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("active")));
    $$("a", navLinks).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
    window.matchMedia("(min-width: 801px)").addEventListener("change", (e) => e.matches && setMenu(false));
  }

  /* ---------- hero title: split into animated words ---------- */
  const title = $("[data-split]");
  if (title) {
    const words = title.textContent.trim().split(/\s+/);
    const accentFrom = words.length - 2; // "actually ship."
    title.setAttribute("aria-label", words.join(" "));
    title.innerHTML = words
      .map(
        (w, i) =>
          `<span class="word${i >= accentFrom ? " accent" : ""}" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`
      )
      .join(" ");
    requestAnimationFrame(() => requestAnimationFrame(() => title.classList.add("is-visible")));
  }

  /* ---------- reveal on scroll (staggered) ---------- */
  const revealItems = $$(".reveal");
  // stagger siblings that enter together
  revealItems.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const idx = siblings.indexOf(el);
    if (idx > 0) el.style.setProperty("--delay", `${Math.min(idx, 5) * 90}ms`);
  });

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach((el) => io.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- rotating "currently building" ---------- */
  const rotator = $(".rotator");
  const rotatorWords = [
    "a creator video platform",
    "an AI command center",
    "MCP tools for coding agents",
    "a CRM for small teams",
    "a Roku TV dashboard",
    "a delivery app for Nassau",
    "a self-hosted AI homelab",
  ];
  if (rotator && !reduceMotion) {
    let r = 0;
    setInterval(() => {
      const current = $(".rotator-word", rotator);
      current.classList.add("out");
      setTimeout(() => {
        r = (r + 1) % rotatorWords.length;
        rotator.innerHTML = `<span class="rotator-word">${rotatorWords[r]}</span>`;
      }, 380);
    }, 2800);
  }

  /* ---------- typing terminal ---------- */
  const term = $("#terminal-code");
  const script = [
    { t: "$ ", c: "t-prompt" },
    { t: "hq claim_build_job --worker claude-01\n", type: true },
    { t: "→ claimed ", c: "t-dim" },
    { t: "job #142", c: "t-key" },
    { t: " · refresh portfolio projects\n\n", c: "t-dim" },
    { t: "$ ", c: "t-prompt" },
    { t: "npm test\n", type: true },
    { t: "✓ auth routes · csrf · org isolation\n", c: "t-ok" },
    { t: "✓ 48 passing (1.9s)\n\n", c: "t-ok" },
    { t: "$ ", c: "t-prompt" },
    { t: "git push origin main\n", type: true },
    { t: "→ GitHub Pages building…\n", c: "t-dim" },
    { t: "✓ deployed in 41s\n\n", c: "t-ok" },
    { t: "$ ", c: "t-prompt" },
    { t: "hq log_update --kind deploy\n", type: true },
    { t: "✓ HQ notified · dashboard, Mac, iPhone, TV\n", c: "t-ok" },
  ];

  const esc = (s) => s.replace(/[&<>]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[ch]);

  function renderAll() {
    term.innerHTML = script.map((p) => (p.c ? `<span class="${p.c}">${esc(p.t)}</span>` : esc(p.t))).join("");
  }

  async function typeLoop() {
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
    // eslint-disable-next-line no-constant-condition
    while (true) {
      term.innerHTML = "";
      for (const part of script) {
        const span = document.createElement("span");
        if (part.c) span.className = part.c;
        term.appendChild(span);
        if (part.type) {
          for (const ch of part.t) {
            span.textContent += ch;
            await sleep(ch === "\n" ? 260 : 38 + Math.random() * 45);
          }
        } else {
          span.textContent = part.t;
          await sleep(part.t.includes("\n") ? 220 : 60);
        }
      }
      await sleep(4200);
    }
  }

  if (term) {
    if (reduceMotion) renderAll();
    else {
      const termIO = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          termIO.disconnect();
          typeLoop();
        }
      });
      termIO.observe(term);
    }
  }

  /* ---------- counters ---------- */
  const counters = $$(".count");
  const runCounter = (el) => {
    const to = Number(el.dataset.to);
    if (reduceMotion) {
      el.textContent = to;
      return;
    }
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          runCounter(e.target);
          cio.unobserve(e.target);
        }
      });
    });
    counters.forEach((c) => cio.observe(c));
  } else counters.forEach(runCounter);

  /* ---------- belts: fill + clone for a seamless loop ---------- */
  function buildBelts() {
    $$(".belt-track").forEach((track) => {
      if (!track.dataset.base) track.dataset.base = track.innerHTML;
      track.innerHTML = track.dataset.base;
      const group = $(".belt-group", track);
      const needed = window.innerWidth * 1.2;
      const baseItems = group.innerHTML;
      let guard = 0;
      while (group.scrollWidth < needed && guard++ < 10) group.insertAdjacentHTML("beforeend", baseItems);
      const clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }
  buildBelts();
  let beltTimer;
  window.addEventListener("resize", () => {
    clearTimeout(beltTimer);
    beltTimer = setTimeout(buildBelts, 250);
  });

  /* ---------- scroll: progress, header, scrollspy ---------- */
  const header = $(".site-header");
  const progress = $(".scroll-progress span");
  const sections = $$("main section[id]");
  const navMap = new Map($$(".nav-links a[href^='#']").map((a) => [a.getAttribute("href").slice(1), a]));

  let ticking = false;
  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    if (progress) progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);
    header?.classList.toggle("scrolled", y > 20);

    let current = "";
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top < window.innerHeight * 0.4) current = s.id;
    });
    navMap.forEach((a, id) => a.classList.toggle("active", id === current && !a.classList.contains("nav-cta")));
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------- light / dark toggle ---------- */
  const themeBtn = $(".theme-toggle");
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const syncTheme = () => {
    const light = document.documentElement.dataset.theme === "light";
    themeBtn?.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    metaTheme?.setAttribute("content", light ? "#fbf6ea" : "#031217");
  };
  syncTheme();
  themeBtn?.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    if (!reduceMotion) {
      root.classList.add("theme-anim");
      setTimeout(() => root.classList.remove("theme-anim"), 400);
    }
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    syncTheme();
  });

  /* ---------- demo videos: play only while visible ---------- */
  const videos = $$(".demo-video");
  if (videos.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      videos.forEach((v) => {
        v.controls = true;
        v.preload = "metadata";
      });
    } else {
      const vio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const v = e.target;
            if (e.isIntersecting) {
              if (v.preload === "none") v.preload = "auto";
              v.play().catch(() => (v.controls = true));
            } else v.pause();
          });
        },
        { threshold: 0.35 }
      );
      videos.forEach((v) => vio.observe(v));
    }
  }

  /* ---------- timeline line draws as you scroll ---------- */
  const timeline = $(".timeline");
  if (timeline) {
    if (reduceMotion) timeline.classList.add("static");
    else {
      const drawLine = () => {
        const r = timeline.getBoundingClientRect();
        const p = (window.innerHeight * 0.75 - r.top) / r.height;
        timeline.style.setProperty("--tl", Math.max(0, Math.min(1, p)).toFixed(3));
      };
      window.addEventListener("scroll", () => requestAnimationFrame(drawLine), { passive: true });
      drawLine();
    }
  }

  /* ---------- pointer effects (desktop only) ---------- */
  if (finePointer && !reduceMotion) {
    const glow = $(".cursor-glow");
    window.addEventListener(
      "pointermove",
      (e) => {
        if (glow) {
          glow.style.setProperty("--gx", `${e.clientX}px`);
          glow.style.setProperty("--gy", `${e.clientY}px`);
        }
      },
      { passive: true }
    );

    $$(".spotlight").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });

    $$(".tilt").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });

    $$(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }

  /* ---------- toast + copy email ---------- */
  const toast = $(".toast");
  let toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  const emailBtn = $(".contact-email");
  if (emailBtn) {
    emailBtn.addEventListener("click", async () => {
      const email = emailBtn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        showToast("Email copied ✓");
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  /* ---------- live GitHub automation ---------- */
  const rel = (iso) => {
    const s = (Date.now() - new Date(iso).getTime()) / 1000;
    const units = [
      ["year", 31536000],
      ["month", 2592000],
      ["week", 604800],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
    ];
    const fmt = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    for (const [u, sec] of units) if (s >= sec) return fmt.format(-Math.floor(s / sec), u);
    return "just now";
  };

  async function cachedJSON(url) {
    const key = `gh:${url}`;
    try {
      const hit = JSON.parse(sessionStorage.getItem(key) || "null");
      if (hit && Date.now() - hit.at < 10 * 60 * 1000) return hit.data;
    } catch {
      /* storage unavailable */
    }
    const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const data = await res.json();
    try {
      sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
    } catch {
      /* ignore */
    }
    return data;
  }

  async function loadLive() {
    const deployed = $("#live-deployed");
    const deployedAt = $("#live-deployed-at");
    const check = $("#live-check");
    const checkSub = $("#live-check-sub");
    const list = $("#live-commits");
    if (!deployed) return;

    const api = "https://api.github.com";
    const [repo, commits, runs] = await Promise.allSettled([
      cachedJSON(`${api}/repos/${GITHUB_USER}/${GITHUB_REPO}`),
      cachedJSON(`${api}/repos/${GITHUB_USER}/${GITHUB_REPO}/commits?per_page=5`),
      cachedJSON(`${api}/repos/${GITHUB_USER}/${GITHUB_REPO}/actions/workflows/site-check.yml/runs?per_page=1`),
    ]);

    if (repo.status === "fulfilled") {
      deployed.textContent = rel(repo.value.pushed_at);
      deployedAt.textContent = new Date(repo.value.pushed_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } else {
      deployed.textContent = "–";
      deployedAt.textContent = "GitHub is unreachable right now";
    }

    const run = runs.status === "fulfilled" && runs.value.workflow_runs && runs.value.workflow_runs[0];
    if (run && check) {
      const label =
        run.status !== "completed" ? "Running…" : run.conclusion === "success" ? "Passing ✓" : "Needs a look";
      check.textContent = label;
      check.classList.toggle("is-pass", run.conclusion === "success");
      checkSub.textContent = `Last run ${rel(run.updated_at)} on GitHub Actions`;
    }

    if (commits.status === "fulfilled" && Array.isArray(commits.value)) {
      list.innerHTML = "";
      commits.value.forEach((c, i) => {
        const li = document.createElement("li");
        li.style.setProperty("--i", i);
        const a = document.createElement("a");
        a.href = c.html_url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        const sha = document.createElement("span");
        sha.className = "commit-sha";
        sha.textContent = c.sha.slice(0, 7);
        const msg = document.createElement("span");
        msg.className = "commit-msg";
        msg.textContent = c.commit.message.split("\n")[0];
        const time = document.createElement("span");
        time.className = "commit-time";
        time.textContent = rel(c.commit.author.date);
        a.append(sha, msg, time);
        li.appendChild(a);
        list.appendChild(li);
      });
    } else {
      list.innerHTML = `<li class="muted">Couldn’t reach GitHub. <a href="https://github.com/${GITHUB_USER}/${GITHUB_REPO}/commits" target="_blank" rel="noopener noreferrer">See commits ↗</a></li>`;
    }
  }

  const liveSection = $("#live");
  if (liveSection && "IntersectionObserver" in window) {
    const lio = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          lio.disconnect();
          loadLive();
        }
      },
      { rootMargin: "400px" }
    );
    lio.observe(liveSection);
  } else loadLive();
})();
