const app = {
  state: {
    xp: 0,
    level: 1,
    completed: [false, false, false, false],
    cores: [false, false, false, false]
  },

  quizData: [
    {
      q: "Checkpoint 1: Why do modern Transformers outperform older Recurrent Neural Networks (RNNs) on long text?",
      opts: [
        "A) Transformers only process words one at a time to prevent overflows.",
        "B) Transformers compute Self-Attention dot-products across all tokens in parallel.",
        "C) Transformers store static dictionary files on computer hard drives."
      ],
      correct: 1,
      exp: "Correct! Self-Attention processes all sequence tokens in parallel via matrix multiplications."
    },
    {
      q: "Checkpoint 2: What is the student's responsibility when an AI generates a research paper citation?",
      opts: [
        "A) Paste the citation directly into the bibliography without checking.",
        "B) Verify the title, authors, and DOI in an established repository like PubMed or JSTOR.",
        "C) Ask the same AI model if it is confident in its citation."
      ],
      correct: 1,
      exp: "Correct! LLMs produce probabilistic text rather than indexed queries, making verification essential."
    },
    {
      q: "Checkpoint 3: If an automated admissions algorithm admits Group A at 80% and Group B at 50%, does this violate the Four-Fifths rule?",
      opts: [
        "A) Yes; 50/80 = 62.5%, which is below the 80% threshold and indicates disparate impact.",
        "B) No; any acceptance rate above 40% is legally fair.",
        "C) Disparate impact only applies to physical machinery."
      ],
      correct: 0,
      exp: "Correct! 50/80 is 62.5%, which violates the EEOC Four-Fifths (80%) disparate impact standard."
    },
    {
      q: "Capstone Scenario: A vendor offers an attendance risk model but refuses to share training data. What action should you recommend?",
      opts: [
        "A) Approve the contract immediately because proprietary software is reliable.",
        "B) Reject deployment until independent bias audits, explainability, and human oversight safeguards are verified.",
        "C) Delete all previous student attendance records."
      ],
      correct: 1,
      exp: "Correct! High-stakes school algorithms require independent bias audits and explainability safeguards."
    }
  ],

  load() {
    try {
      const saved = localStorage.getItem("nexus_ai_intermediate_v2");
      if (saved) this.state = JSON.parse(saved);
    } catch (e) {
      console.warn("Storage fallback initiated", e);
    }
  },

  save() {
    try {
      localStorage.setItem("nexus_ai_intermediate_v2", JSON.stringify(this.state));
    } catch (e) {
      console.warn("Storage write failure", e);
    }
  },

  navigate(tabName) {
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));

    const targetPanel = document.getElementById("tab-" + tabName);
    if (targetPanel) targetPanel.classList.add("active");

    const targetBtn = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
    if (targetBtn) targetBtn.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  collectCore(idx) {
    if (this.state.cores[idx]) return;

    this.state.cores[idx] = true;
    this.state.xp = Math.min(1000, this.state.xp + 50);
    this.save();
    this.syncUI();

    const box = document.getElementById("core" + idx);
    if (box) {
      box.classList.add("collected");
      box.innerHTML = `
        <span class="core-icon">✓</span>
        <div>
          <strong>Synapse Core Ω_${idx + 1} Harvested!</strong>
          <small>Added to your vault (+50 XP Secured)</small>
        </div>
      `;
    }
  },

  answerQuiz(quizIdx, choiceIdx, btnElement) {
    const data = this.quizData[quizIdx];
    const container = document.getElementById("quiz-opts-" + quizIdx);
    container.querySelectorAll(".choice-btn").forEach(b => b.disabled = true);

    const feedback = document.getElementById("fb" + quizIdx);

    if (choiceIdx === data.correct) {
      btnElement.classList.add("correct");
      feedback.style.color = "var(--green)";
      feedback.textContent = "✓ " + data.exp;

      if (!this.state.completed[quizIdx]) {
        this.state.completed[quizIdx] = true;
        this.state.xp = Math.min(1000, this.state.xp + 200);
        this.save();
        this.syncUI();
      }
    } else {
      btnElement.classList.add("wrong");
      container.children[data.correct].classList.add("correct");
      feedback.style.color = "var(--red)";
      feedback.textContent = "Review: " + data.exp;
    }
  },

  syncUI() {
    this.state.level = this.state.xp >= 750 ? 4 : this.state.xp >= 500 ? 3 : this.state.xp >= 250 ? 2 : 1;

    document.getElementById("hudLvl").textContent = this.state.level;
    document.getElementById("hudXp").textContent = this.state.xp;

    const glyphs = ["🧠", "⚡", "⚖️", "🧭"];
    for (let i = 0; i < 4; i++) {
      const slot = document.getElementById("v" + i);
      if (slot) slot.textContent = this.state.cores[i] ? glyphs[i] : "⚪";
    }

    const dashXp = document.getElementById("dashXp");
    const dashLvl = document.getElementById("dashLvl");
    const dashFill = document.getElementById("dashFill");
    if (dashXp) dashXp.textContent = this.state.xp;
    if (dashLvl) dashLvl.textContent = this.state.level;
    if (dashFill) dashFill.style.width = (this.state.xp / 10) + "%";

    for (let j = 0; j < 4; j++) {
      const progEl = document.getElementById("prog" + j);
      if (progEl) {
        progEl.textContent = this.state.completed[j] ? "100% Certified" : "0%";
        progEl.style.color = this.state.completed[j] ? "var(--green)" : "var(--blue)";
      }
      const badge = document.getElementById("b" + j);
      if (badge && this.state.completed[j]) badge.className = "card badge-box unlocked";
    }

    const cert = document.getElementById("certBanner");
    if (cert) cert.style.display = this.state.xp >= 1000 ? "flex" : "none";
  },

  judgeUnlock() {
    this.state = { xp: 1000, level: 4, completed: [true, true, true, true], cores: [true, true, true, true] };
    this.save();
    this.syncUI();
    alert("⚡ Judge Mode Activated: 1,000 XP granted, all badges unlocked, diploma verified.");
  },

  reset() {
    if (confirm("Reset local player progress back to Level 1?")) {
      this.state = { xp: 0, level: 1, completed: [false, false, false, false], cores: [false, false, false, false] };
      this.save();
      location.reload();
    }
  },

  updateTokens() {
    const input = document.getElementById("tokInput");
    const text = input ? input.value.trim() : "";
    const tray = document.getElementById("tokenOutput");
    const count = document.getElementById("tokenCount");
    if (!text) { if (tray) tray.innerHTML = ""; if (count) count.textContent = "0"; return; }

    const tokens = text.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+|[^\s\w]/g) || [text];
    if (count) count.textContent = tokens.length;
    if (tray) {
      tray.innerHTML = "";
      tokens.forEach(t => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = t;
        tray.appendChild(chip);
      });
    }
  },

  evaluatePrompt() {
    const input = document.getElementById("craftInput");
    const val = input ? input.value.toLowerCase() : "";
    const c = val.length > 25;
    const r = /act as|you are|tutor|teacher|expert|evaluator/.test(val);
    const a = /explain|analyze|break down|compare|solve|list/.test(val);
    const f = /bullet|table|json|paragraph|numbered/.test(val);
    const t = /high school|student|beginner|9th|10th/.test(val);

    document.getElementById("pContext").classList.toggle("active", c);
    document.getElementById("pRole").classList.toggle("active", r);
    document.getElementById("pAction").classList.toggle("active", a);
    document.getElementById("pFormat").classList.toggle("active", f);
    document.getElementById("pAudience").classList.toggle("active", t);

    const score = [c, r, a, f, t].filter(Boolean).length * 20;
    document.getElementById("craftScore").textContent = score + "%";
    const hint = document.getElementById("craftHint");
    hint.textContent = score === 100 ? "✓ Exemplary: All 5 C.R.A.F.T. parameters detected." : "Add missing parameters (e.g., Role or Format).";
    hint.style.color = score === 100 ? "var(--green)" : "var(--blue)";
  },

  updateBias() {
    const slider = document.getElementById("biasSlider");
    const val = parseInt(slider.value);
    const gA = val;
    const gB = 100 - val;
    document.getElementById("ratioLabel").textContent = `${gA}% Group A / ${gB}% Group B`;

    const confA = Math.min(95, Math.max(30, Math.round(gA * 1.05 + 10)));
    const confB = Math.min(95, Math.max(25, Math.round(gB * 1.05 + 10)));

    document.getElementById("fillA").style.width = confA + "%";
    document.getElementById("fillB").style.width = confB + "%";
    document.getElementById("confA").textContent = confA + "%";
    document.getElementById("confB").textContent = confB + "%";

    const diff = Math.abs(confA - confB);
    const badge = document.getElementById("parityBadge");
    const hint = document.getElementById("fairnessHint");

    if (diff <= 12) {
      badge.textContent = "Status: Balanced";
      badge.style.color = "var(--green)";
      hint.textContent = "Balanced distribution: model outputs achieve demographic parity under the 80% rule.";
    } else {
      badge.textContent = "Status: Skewed";
      badge.style.color = "var(--red)";
      hint.textContent = `Alert: ${diff}% disparity. The underrepresented cohort receives higher false rejections.`;
    }
  },

  inspectNode(key) {
    const data = {
      embed: {
        t: "1. Input & Positional Embeddings",
        m: "E = TokenEmbedding(x) + PositionalEncoding(pos)",
        d: "Maps tokens to 512-dimensional continuous vectors and injects sinusoidal waveforms to track word order.",
        in: "[Batch, Sequence]",
        out: "[Batch, Sequence, 512]"
      },
      mha: {
        t: "2. Multi-Head Self-Attention",
        m: "Attention(Q,K,V) = softmax((Q*K^T)/√d_k)*V",
        d: "Computes dot-product affinity matrices between every word pair in parallel, tracking sentence context.",
        in: "[Batch, Sequence, 512]",
        out: "[Batch, Sequence, 512]"
      },
      norm: {
        t: "3. Residual Add & Layer Normalization",
        m: "Output = LayerNorm(x + Sublayer(x))",
        d: "Skip-connections pass identity gradients directly around sublayers, preventing vanishing gradients.",
        in: "[Batch, Sequence, 512]",
        out: "[Batch, Sequence, 512]"
      },
      ffn: {
        t: "4. Feed-Forward Neural Network",
        m: "FFN(x) = max(0, x*W1 + b1)*W2 + b2",
        d: "Applies two dense linear transformations with GELU activation to expand features into 2,048 dimensions.",
        in: "[Batch, Sequence, 512]",
        out: "[Batch, Sequence, 2048]"
      }
    };
    const node = data[key];
    if (!node) return;
    document.getElementById("hudTitle").textContent = node.t;
    document.getElementById("hudMath").textContent = node.m;
    document.getElementById("hudDesc").textContent = node.d;
    document.getElementById("hudIn").textContent = node.in;
    document.getElementById("hudOut").textContent = node.out;
  },

  pulseNet() {
    neuralNetwork.isPulsing = true;
    neuralNetwork.pulseProgress = 0;
    document.getElementById("pulseText").textContent = "Transmitting activations...";
  }
};

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = 1.5;
  }

  update(width, height, mouse) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 100) {
        this.x -= (dx / dist) * 1.5;
        this.y -= (dy / dist) * 1.5;
      }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
    ctx.fill();
  }
}

const bgSimulation = {
  canvas: document.getElementById("bgCanvas"),
  ctx: null,
  particles: [],
  mouse: { x: null, y: null },

  init() {
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", e => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
    window.addEventListener("mouseout", () => { this.mouse.x = null; this.mouse.y = null; });
    this.animate();
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const count = Math.floor((this.canvas.width * this.canvas.height) / 18000);
    this.particles = Array.from({ length: count }, () => new Particle(this.canvas.width, this.canvas.height));
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.update(this.canvas.width, this.canvas.height, this.mouse);
      p.draw(this.ctx);

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 80) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(203, 213, 225, ${0.15 * (1 - dist / 80)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
    requestAnimationFrame(() => this.animate());
  }
};

const neuralNetwork = {
  canvas: document.getElementById("neuralCanvas"),
  ctx: null,
  nodes: [
    { x: 50, y: 50, layer: 0, label: "x₁" },
    { x: 50, y: 110, layer: 0, label: "x₂" },
    { x: 50, y: 170, layer: 0, label: "x₃" },
    { x: 190, y: 70, layer: 1, label: "h₁" },
    { x: 190, y: 130, layer: 1, label: "h₂" },
    { x: 330, y: 100, layer: 2, label: "y₁" }
  ],
  draggingNode: null,
  pulseProgress: 0,
  isPulsing: false,

  init() {
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.addEventListener("mousedown", e => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      this.nodes.forEach(n => {
        if (Math.hypot(n.x - mx, n.y - my) < 14) this.draggingNode = n;
      });
    });

    window.addEventListener("mousemove", e => {
      if (!this.draggingNode) return;
      const rect = this.canvas.getBoundingClientRect();
      this.draggingNode.x = Math.max(20, Math.min(this.canvas.width - 20, e.clientX - rect.left));
      this.draggingNode.y = Math.max(20, Math.min(this.canvas.height - 20, e.clientY - rect.top));
    });

    window.addEventListener("mouseup", () => { this.draggingNode = null; });
    this.animate();
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = 0; j < this.nodes.length; j++) {
        if (this.nodes[j].layer === this.nodes[i].layer + 1) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
          this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
          this.ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
          this.ctx.lineWidth = 1.2;
          this.ctx.stroke();
        }
      }
    }

    if (this.isPulsing) {
      this.pulseProgress += 0.035;
      const curLayer = Math.floor(this.pulseProgress * 2);
      const subProg = (this.pulseProgress * 2) - curLayer;
      if (curLayer < 2) {
        this.nodes.filter(n => n.layer === curLayer).forEach(src => {
          this.nodes.filter(n => n.layer === curLayer + 1).forEach(dst => {
            const px = src.x + (dst.x - src.x) * subProg;
            const py = src.y + (dst.y - src.y) * subProg;
            this.ctx.beginPath();
            this.ctx.arc(px, py, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = "#38bdf8";
            this.ctx.fill();
          });
        });
      } else {
        this.isPulsing = false;
        document.getElementById("pulseText").textContent = "Forward propagation verified.";
      }
    }

    this.nodes.forEach(n => {
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, 7, 0, Math.PI * 2);
      this.ctx.fillStyle = n.layer === 0 ? "#3b82f6" : n.layer === 1 ? "#a855f7" : "#059669";
      this.ctx.fill();
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "9px monospace";
      this.ctx.fillText(n.label, n.x - 5, n.y - 10);
    });

    requestAnimationFrame(() => this.animate());
  }
};

const attentionHeatmap = {
  words: ["The", "neural", "model", "analyzes", "scholarly", "text"],
  weights: [
    [0.85, 0.45, 0.30, 0.15, 0.05, 0.10],
    [0.20, 0.90, 0.65, 0.25, 0.10, 0.15],
    [0.15, 0.70, 0.95, 0.40, 0.15, 0.20],
    [0.10, 0.30, 0.45, 0.92, 0.35, 0.50],
    [0.05, 0.15, 0.20, 0.40, 0.88, 0.75],
    [0.10, 0.20, 0.25, 0.60, 0.80, 0.94]
  ],

  init() {
    const bar = document.getElementById("tokenSentenceBar");
    if (!bar) return;
    bar.innerHTML = "";
    this.words.forEach((w, i) => {
      const span = document.createElement("span");
      span.className = "token" + (i === 0 ? " active" : "");
      span.textContent = w;
      span.addEventListener("mouseenter", () => this.hoverWord(i));
      bar.appendChild(span);
    });
    this.hoverWord(0);
  },

  hoverWord(idx) {
    document.querySelectorAll(".token").forEach((t, i) => t.classList.toggle("active", i === idx));
    const grid = document.getElementById("heatmapGrid");
    if (!grid) return;
    grid.innerHTML = "";
    this.weights[idx].forEach(w => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.backgroundColor = `rgba(2, 132, 199, ${w * 0.85})`;
      cell.style.color = w > 0.4 ? "#ffffff" : "var(--text-main)";
      cell.textContent = w.toFixed(2);
      grid.appendChild(cell);
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  app.load();
  app.syncUI();

  app.quizData.forEach((item, qIdx) => {
    const titleEl = document.getElementById("quiz-q-" + qIdx);
    const optsContainer = document.getElementById("quiz-opts-" + qIdx);
    if (titleEl) titleEl.textContent = item.q;
    if (optsContainer) {
      optsContainer.innerHTML = "";
      item.opts.forEach((optText, optIdx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.textContent = optText;
        btn.onclick = () => app.answerQuiz(qIdx, optIdx, btn);
        optsContainer.appendChild(btn);
      });
    }
  });

  app.updateTokens();
  app.evaluatePrompt();
  app.updateBias();
  attentionHeatmap.init();
  bgSimulation.init();
  neuralNetwork.init();
});
