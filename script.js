(function () {
  "use strict";
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- header scroll state ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", function () {
    var open = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.innerHTML = open
      ? '<svg aria-hidden="true"><use href="#i-close"/></svg>'
      : '<svg aria-hidden="true"><use href="#i-menu"/></svg>';
  });
  mainNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.innerHTML =
        '<svg aria-hidden="true"><use href="#i-menu"/></svg>';
    });
  });

  /* ---------- hero floating particles ---------- */
  var particleHost = document.getElementById("heroParticles");
  if (particleHost && !reduceMotion) {
    for (var p = 0; p < 14; p++) {
      var s = document.createElement("span");
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 8 + "s";
      s.style.animationDuration = 7 + Math.random() * 6 + "s";
      s.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
      particleHost.appendChild(s);
    }
  }

  /* ---------- rangoli mandala generator ----------
     Builds a radially-symmetric dot-and-petal motif, reused at
     several sizes/opacities across the page as the brand's signature mark. */
  function drawRangoli(svg, opts) {
    opts = opts || {};
    var petals = opts.petals || 10;
    var colors = opts.colors || ["#E2691B", "#6E1F2E", "#155E52", "#C9952F"];
    var cx = 300,
      cy = 300;
    var ns = "http://www.w3.org/2000/svg";
    function el(tag, attrs) {
      var e = document.createElementNS(ns, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }
    var groups = [];

    /* outer dot ring */
    var ring1 = el("g", {});
    for (var i = 0; i < petals * 2; i++) {
      var a = (i / (petals * 2)) * Math.PI * 2;
      var r = 252;
      var d = el("circle", {
        cx: cx + Math.cos(a) * r,
        cy: cy + Math.sin(a) * r,
        r: 4.5,
        fill: colors[i % colors.length],
      });
      ring1.appendChild(d);
    }
    svg.appendChild(ring1);
    groups.push(ring1);

    /* outer petals */
    var ring2 = el("g", {});
    for (var j = 0; j < petals; j++) {
      var ang = (j / petals) * 360;
      var path = el("path", {
        d: "M300,210 C330,150 330,90 300,40 C270,90 270,150 300,210 Z",
        fill: colors[j % colors.length],
        opacity: 0.88,
        transform: "rotate(" + ang + " 300 300)",
      });
      ring2.appendChild(path);
    }
    svg.appendChild(ring2);
    groups.push(ring2);

    /* mid arc ring */
    var ring3 = el("g", {});
    for (var k = 0; k < petals; k++) {
      var ang2 = (k / petals) * 360 + 360 / petals / 2;
      var arc = el("path", {
        d: "M300,150 a90,90 0 0 1 60,150",
        fill: "none",
        stroke: colors[(k + 1) % colors.length],
        "stroke-width": 3,
        "stroke-linecap": "round",
        transform: "rotate(" + ang2 + " 300 300)",
        opacity: 0.55,
      });
      ring3.appendChild(arc);
    }
    svg.appendChild(ring3);
    groups.push(ring3);

    /* inner petals (smaller, offset) */
    var ring4 = el("g", {});
    for (var m = 0; m < petals; m++) {
      var ang3 = (m / petals) * 360 + 360 / petals / 2;
      var path2 = el("path", {
        d: "M300,230 C318,195 318,165 300,135 C282,165 282,195 300,230 Z",
        fill: colors[(m + 2) % colors.length],
        opacity: 0.9,
        transform: "rotate(" + ang3 + " 300 300)",
      });
      ring4.appendChild(path2);
    }
    svg.appendChild(ring4);
    groups.push(ring4);

    /* inner dot ring */
    var ring5 = el("g", {});
    for (var n = 0; n < petals; n++) {
      var a2 = (n / petals) * Math.PI * 2;
      var r2 = 118;
      var d2 = el("circle", {
        cx: cx + Math.cos(a2) * r2,
        cy: cy + Math.sin(a2) * r2,
        r: 5,
        fill: colors[(n + 3) % colors.length],
      });
      ring5.appendChild(d2);
    }
    svg.appendChild(ring5);
    groups.push(ring5);

    /* center bindi */
    var center = el("g", {});
    center.appendChild(
      el("circle", {
        cx: cx,
        cy: cy,
        r: 46,
        fill: "none",
        stroke: colors[3] || "#C9952F",
        "stroke-width": 2,
      }),
    );
    center.appendChild(
      el("circle", { cx: cx, cy: cy, r: 26, fill: colors[0] }),
    );
    svg.appendChild(center);
    groups.push(center);

    return groups;
  }

  /* hero mandala — large, vivid, animated entrance */
  var heroSvg = document.getElementById("heroMandala");
  if (heroSvg) {
    var heroGroups = drawRangoli(heroSvg, { petals: 10 });
    if (window.gsap && !reduceMotion) {
      gsap.set(heroGroups, { transformOrigin: "300px 300px" });
      gsap.from(heroGroups, {
        opacity: 0,
        scale: 0.4,
        rotate: -30,
        duration: 1.4,
        ease: "back.out(1.4)",
        stagger: 0.14,
        delay: 0.2,
      });
      gsap.to(heroSvg, {
        rotation: 360,
        duration: 160,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    }
  }

  /* subtle watermark mandalas behind section headers */
  ["aboutMandala", "whyMandala", "contactMandala"].forEach(function (id) {
    var svg = document.getElementById(id);
    if (svg) drawRangoli(svg, { petals: 8 });
  });

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* safety net — guarantees nothing stays invisible forever,
 regardless of viewport quirks, blocked scripts or slow connections */
  window.setTimeout(function () {
    document
      .querySelectorAll(".reveal:not(.is-visible)")
      .forEach(function (el) {
        el.classList.add("is-visible");
      });
  }, 2000);

  /* ---------- count-up stats ---------- */
  var counters = document.querySelectorAll(".count-up");
  var countedOnce = new WeakSet();
  function animateCount(el) {
    if (countedOnce.has(el)) return;
    countedOnce.add(el);
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    if (reduceMotion) {
      el.textContent = target;
      return;
    }
    var start = 0,
      duration = 1200,
      startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      el.textContent = Math.floor(progress * (target - start) + start);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var ioCount = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) animateCount(entry.target);
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach(function (c) {
      ioCount.observe(c);
    });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- service tabs ---------- */
  var tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      document.querySelectorAll(".tab-panel").forEach(function (panel) {
        panel.hidden = true;
        panel.classList.remove("is-active");
      });
      var target = document.getElementById(
        "panel-" + tab.getAttribute("data-tab"),
      );
      if (target) {
        target.hidden = false;
        target.classList.add("is-active");
      }
    });
  });

  /* ---------- circuit scroll controls ---------- */
  var track = document.getElementById("circuitTrack");
  var prevBtn = document.getElementById("circuitPrev");
  var nextBtn = document.getElementById("circuitNext");
  if (track && prevBtn && nextBtn) {
    var scrollAmt = function () {
      return Math.min(320, track.clientWidth * 0.85);
    };
    prevBtn.addEventListener("click", function () {
      track.scrollBy({ left: -scrollAmt(), behavior: "smooth" });
    });
    nextBtn.addEventListener("click", function () {
      track.scrollBy({ left: scrollAmt(), behavior: "smooth" });
    });
  }

  /* ---------- contact form (no backend — opens a pre-filled WhatsApp / mail) ---------- */
  var form = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var interest = form.interest.value;
      var message = form.message.value.trim();
      var text =
        "Hi Rangoli Properties, I am " +
        name +
        " (" +
        phone +
        "). I am interested in: " +
        interest +
        ". " +
        message;
      var url = "https://wa.me/919528268564?text=" + encodeURIComponent(text);
      formNote.textContent =
        "Opening WhatsApp with your enquiry — send the message to reach our team.";
      window.open(url, "_blank", "noopener");
    });
  }
})();
