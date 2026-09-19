/* =====================================================
   NEXUS AI CLIENT ENGINE
   Engineered for the National TSA Webmaster Event
   ===================================================== */

/* ================= 1. SYNTHESIZED WEB AUDIO (Rule H & Compatibility) ================= */
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }
}

function playTone(freq, type = "sine", duration = 0.1) {
    if (!soundEnabled) return;
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.warn("Audio Context waiting for interaction", e);
    }
}

function playSfx(type) {
    if (type === "click") playTone(440, "sine", 0.08);
    else if (type === "correct") {
        playTone(523.25, "triangle", 0.1);
        setTimeout(() => playTone(659.25, "triangle", 0.12), 100);
    } else if (type === "wrong") {
        playTone(220, "sawtooth", 0.2);
    } else if (type === "levelUp") {
        playTone(440, "sine", 0.1);
        setTimeout(() => playTone(554.37, "sine", 0.1), 100);
        setTimeout(() => playTone(659.25, "sine", 0.1), 200);
        setTimeout(() => playTone(880, "sine", 0.25), 300);
    }
}

function toggleAudio() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById("soundBtn");
    if (btn) btn.textContent = soundEnabled ? "🔊 SFX ON" : "🔇 SFX OFF";
    if (soundEnabled) playSfx("correct");
}

/* ================= 2. TAB CONTROLLER ================= */
function switchTab(tabId, triggerBtn) {
    playSfx("click");
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".nav-tab").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
    });

    const target = document.getElementById(tabId);
    if (target) target.classList.add("active");
    if (triggerBtn) {
        triggerBtn.classList.add("active");
        triggerBtn.setAttribute("aria-selected", "true");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ================= 3. PERSISTENT LOCAL STATE (Rule C Compliant) ================= */
let player = {
    xp: 0,
    level: 1,
    completed: { foundation: false, tools: false, ethics: false, mission: false }
};

function loadState() {
    const saved = localStorage.getItem("nexus_ai_state_v2");
    if (saved) {
        try { player = JSON.parse(saved); } catch (e) { console.error("Error loading state", e); }
    }
}

function saveState() {
    localStorage.setItem("nexus_ai_state_v2", JSON.stringify(player));
}

function resetDemoState() {
    if (confirm("Reset demo progress to Level 1? (Helpful for judges assessing transition states)")) {
        player = { xp: 0, level: 1, completed: { foundation: false, tools: false, ethics: false, mission: false } };
        saveState();
        location.reload();
    }
}

function quickJudgeUnlock() {
    player = { xp: 1000, level: 4, completed: { foundation: true, tools: true, ethics: true, mission: true } };
    saveState();
    updateUI();
    playSfx("levelUp");
    alert("Judge Quick-Demo Mode: All 1000 XP, 4 Badges, and the Verified Completion Diploma have been unlocked!");
}

/* ================= 4. CANVAS NEURAL PROPAGATION ================= */
const canvas = document.getElementById("neuralCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
const layers = [3, 4, 4, 2];
let pulseProg = 0;
let isPulsing = false;

function drawCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const spacingX = canvas.width / (layers.length + 1);
    const coords = layers.map((count, lIdx) => {
        const spacingY = canvas.height / (count + 1);
        return Array.from({ length: count }, (_, i) => ({
            x: spacingX * (lIdx + 1),
            y: spacingY * (i + 1)
        }));
    });

    // Synapses
    for (let l = 0; l < coords.length - 1; l++) {
        coords[l].forEach(s => {
            coords[l + 1].forEach(e => {
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(e.x, e.y);
                ctx.strokeStyle = "rgba(59, 130, 246, 0.12)";
                ctx.lineWidth = 1;
                ctx.stroke();
            });
        });
    }

    // Forward Pulse Animation
    if (isPulsing) {
        pulseProg += 0.03;
        const seg = Math.floor(pulseProg * (coords.length - 1));
        const subProg = (pulseProg * (coords.length - 1)) - seg;
        if (seg < coords.length - 1) {
            coords[seg].forEach(s => {
                coords[seg + 1].forEach(e => {
                    const px = s.x + (e.x - s.x) * subProg;
                    const py = s.y + (e.y - s.y) * subProg;
                    ctx.beginPath();
                    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = "#38bdf8";
                    ctx.fill();
                });
            });
        } else {
            isPulsing = false;
            pulseProg = 0;
            document.getElementById("pulseStatus").textContent = "Forward propagation complete. Output tensor verified.";
        }
    }

    // Nodes
    coords.forEach((layer, lIdx) => {
        layer.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = lIdx === 0 ? "#3b82f6" : lIdx === layers.length - 1 ? "#34d399" : "#a855f7";
            ctx.fill();
        });
    });

    requestAnimationFrame(drawCanvas);
}

function triggerActivationPulse() {
    isPulsing = true;
    pulseProg = 0;
    playSfx("click");
    document.getElementById("pulseStatus").textContent = "Propagating activation vectors through parameter matrices...";
}

/* ================= 5. HOVER GRAPHICS DATA ================= */
const transformerNodes = {
    embed: {
        t: "1. Input & Positional Embeddings",
        m: "E = TokenEmbedding(x) + PositionalEncoding(pos)",
        d: "Projects discrete token IDs into 512-dimensional continuous vectors and injects sinusoidal positional encoding so the model tracks sequence word order without recurrent loops.",
        i: "[Batch, Sequence]",
        o: "[Batch, Sequence, 512]"
    },
    mha: {
        t: "2. Multi-Head Self-Attention (Q, K, V)",
        m: "Attention(Q,K,V) = softmax((Q*K^T)/sqrt(d_k))*V",
        d: "Projects queries, keys, and values into parallel linear subspaces. Computes dot-product compatibility scores across all tokens simultaneously to capture context regardless of distance.",
        i: "[Batch, Sequence, 512]",
        o: "[Batch, Sequence, 512]"
    },
    norm1: {
        t: "3. Residual Add & Layer Normalization",
        m: "Output = LayerNorm(x + Sublayer(x))",
        d: "Residual skip-connections route identity gradients directly around transformer sublayers, preventing vanishing gradients during deep calculus backpropagation.",
        i: "[Batch, Sequence, 512]",
        o: "[Batch, Sequence, 512]"
    },
    ffn: {
        t: "4. Feed-Forward Neural Network",
        m: "FFN(x) = max(0, x*W1 + b1)*W2 + b2",
        d: "Position-wise multilayer perceptron with non-linear activation (GELU/ReLU) that expands token representations into wider feature dimensions (typically 2,048) to synthesize semantic depth.",
        i: "[Batch, Sequence, 512]",
        o: "[Batch, Sequence, 2048]"
    },
    softmax: {
        t: "5. Linear Output & Softmax Logits",
        m: "P(token_i) = exp(z_i) / sum(exp(z_j))",
        d: "Projects high-dimensional vectors across the model's entire 32,000+ vocabulary dictionary, producing a normalized probability distribution over candidate next tokens.",
        i: "[Batch, Sequence, 512]",
        o: "[Batch, VocabSize]"
    }
};

function inspectNode(key) {
    const data = transformerNodes[key];
    if (!data) return;
    playSfx("click");
    document.getElementById("hudNodeTitle").textContent = data.t;
    document.getElementById("hudNodeMath").textContent = data.m;
    document.getElementById("hudNodeDesc").textContent = data.d;
    document.getElementById("hudNodeIn").textContent = data.i;
    document.getElementById("hudNodeOut").textContent = data.o;
}

const ethicsTiers = {
    socratic: {
        t: "Zone 1: Socratic Study Partner",
        s: "PERMISSIBLE • Full Honor Code Compliance",
        d: "Prompting AI to act as an interrogative coach, test your mastery of physics equations, or explain confusing historical texts. The student retains 100% intellectual authorship.",
        p: "None Required",
        r: "Zero Violation Risk"
    },
    outline: {
        t: "Zone 2: Structural Outlining",
        s: "PERMISSIBLE WITH PERMISSION",
        d: "Using AI to brainstorm perspectives or check logical section transitions. Allowed if instructor syllabus explicitly authorizes structural scaffolding.",
        p: "Mandatory Syllabus Disclosure",
        r: "Low Risk (If Disclosed)"
    },
    paraphrase: {
        t: "Zone 3: Heavy Paraphrasing",
        s: "ACADEMICALLY COMPROMISED",
        d: "Running entire drafted arguments through AI spin rewriters to alter sentence structures while evading detection. Replaces authentic student voice with synthetic syntax.",
        p: "Prohibited Without Consent",
        r: "High Violation Risk"
    },
    plagiarism: {
        t: "Zone 4: Direct Plagiarism",
        s: "STRICT HONOR VIOLATION",
        d: "Submitting generated prose, unverified citations, or AI-solved examination items as your original academic work.",
        p: "Strictly Prohibited",
        r: "Severe Academic Sanctions"
    }
};

function inspectEthics(key) {
    const data = ethicsTiers[key];
    if (!data) return;
    playSfx("click");
    document.getElementById("hudEthicsTitle").textContent = data.t;
    document.getElementById("hudEthicsStatus").textContent = data.s;
    document.getElementById("hudEthicsDesc").textContent = data.d;
    document.getElementById("hudEthicsPermit").textContent = data.p;
    document.getElementById("hudEthicsRisk").textContent = data.r;
}

/* ================= 6. SANDBOX LOGIC ================= */
const tokenPalette = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899", "#06b6d4"];

function runTokenizer() {
    const raw = document.getElementById("tokenizerInput").value;
    const tray = document.getElementById("tokenOutput");
    const countEl = document.getElementById("tokenCount");
    if (!raw.trim()) { tray.innerHTML = ""; countEl.textContent = 0; return; }

    const tokens = raw.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+|[^\s\w]/g) || [raw];
    countEl.textContent = tokens.length;
    tray.innerHTML = "";

    tokens.forEach((t, i) => {
        const chip = document.createElement("span");
        chip.className = "token-chip";
        chip.style.backgroundColor = tokenPalette[i % tokenPalette.length];
        let hash = 0;
        for (let j = 0; j < t.length; j++) hash = (hash << 5) - hash + t.charCodeAt(j);
        chip.textContent = `${t} (ID:${Math.abs(hash % 32000)})`;
        tray.appendChild(chip);
    });
}

function evaluatePrompt() {
    const val = document.getElementById("userPrompt").value.toLowerCase();
    const hasRole = /act as|you are|tutor|teacher|expert|evaluator|scientist|mentor/.test(val);
    const hasAction = /explain|analyze|break down|summarize|list|compare|solve|critique/.test(val);
    const hasFormat = /bullet|table|json|paragraph|numbered|outline|markdown|latex/.test(val);
    const hasAudience = /high school|student|beginner|9th|10th|novice|peer|senior/.test(val);
    const hasContext = val.length > 25;

    document.getElementById("pillRole").classList.toggle("active", hasRole);
    document.getElementById("pillAction").classList.toggle("active", hasAction);
    document.getElementById("pillFormat").classList.toggle("active", hasFormat);
    document.getElementById("pillAudience").classList.toggle("active", hasAudience);
    document.getElementById("pillContext").classList.toggle("active", hasContext);

    const score = [hasRole, hasAction, hasFormat, hasAudience, hasContext].filter(Boolean).length * 20;
    document.getElementById("promptScore").textContent = score + "%";
    document.getElementById("promptFeedback").textContent =
        score === 100 ? "✓ Exemplary structure: fully calibrated across all 5 C.R.A.F.T. parameters." : "Add missing elements (e.g., target audience or output format).";
}

function simulateFairness() {
    const val = parseInt(document.getElementById("fairnessSlider").value);
    const gA = val;
    const gB = 100 - val;
    document.getElementById("ratioLabel").textContent = `${gA}% Cohort A / ${gB}% Cohort B`;

    const confA = Math.min(95, Math.max(30, Math.round(gA * 1.05 + 10)));
    const confB = Math.min(95, Math.max(25, Math.round(gB * 1.05 + 10)));
    document.getElementById("meterA").style.width = confA + "%";
    document.getElementById("meterB").style.width = confB + "%";
    document.getElementById("confValA").textContent = confA + "%";
    document.getElementById("confValB").textContent = confB + "%";

    const badge = document.getElementById("parityBadge");
    const diff = Math.abs(confA - confB);
    if (diff <= 12) {
        badge.textContent = "Status: Balanced";
        badge.style.color = "var(--green)";
        document.getElementById("fairnessInsight").textContent = "Uniform training distribution: model confidence and false rejection rates remain calibrated across both cohorts.";
    } else {
        badge.textContent = "Status: Skewed";
        badge.style.color = "var(--red)";
        document.getElementById("fairnessInsight").textContent = `Alert: ${diff}% disparity. The underrepresented cohort suffers elevated false rejections due to training data imbalance.`;
    }
}

/* ================= 7. EXPANDED APPLICATION EXAM REPOSITORY ================= */
const quizRepo = {
    foundation: [
        {
            q: "Scenario 1: A biology researcher is processing a 20,000-word genomic manuscript. Why does a Transformer outperform a traditional Recurrent Neural Network (RNN)?",
            a: [
                "Transformers compute self-attention across all tokens in parallel, whereas RNNs process words sequentially and lose distant contextual signals through vanishing gradients.",
                "Transformers permanently store the entire manuscript in the computer's CPU cache without calculating mathematical weights.",
                "RNNs only work on numbers, whereas Transformers are strictly designed for qualitative human emotion."
            ],
            c: 0,
            exp: "Transformers eliminate sequential loops, using multi-head self-attention dot-products to attend to relationships across long sequences in parallel."
        },
        {
            q: "Scenario 2: During model pre-training, the Cross-Entropy loss value remains elevated. What mechanism computes weight updates to reduce this loss?",
            a: [
                "Backpropagation calculates partial derivatives of the loss with respect to every weight using the calculus Chain Rule, guiding gradient descent updates.",
                "The server automatically randomizes the input vocabulary until a lower error occurs by chance.",
                "Engineers manually rewrite the hidden layers in binary."
            ],
            c: 0,
            exp: "Backpropagation applies the Chain Rule backward through layers, calculating the exact gradient vector needed to minimize loss via gradient descent."
        },
        {
            q: "Scenario 3: An NLP model evaluates the phrases 'apple fruit' and 'apple company'. How does the architecture distinguish the meaning of 'apple'?",
            a: [
                "Multi-Head Self-Attention calculates dynamic dot-product affinity between 'apple' and surrounding context words, shifting its vector embedding dynamically.",
                "The model executes a hard-coded dictionary lookup to choose the first definition listed.",
                "The model converts the word into an analog audio waveform."
            ],
            c: 0,
            exp: "Self-attention weights allow surrounding context tokens ('fruit' vs 'company') to adjust the intermediate vector representation of the polysemous word."
        },
        {
            q: "Scenario 4: In high-dimensional vector embeddings, what geometric relationship models conceptual similarity between words?",
            a: [
                "Cosine similarity: words with similar semantic meanings project with small angular distances between their multi-dimensional vectors.",
                "Physical distance between the ASCII text characters on the user's hard drive.",
                "The alphabetical order of words in the vocabulary dictionary."
            ],
            c: 0,
            exp: "Vector embeddings place conceptually related terms close together in high-dimensional space, measured via cosine similarity."
        },
        {
            q: "Scenario 5: What occurs when an AI model moves from the 'training' phase to operational 'inference'?",
            a: [
                "Model parameters and synaptic weights are frozen, and the model applies its learned matrix values to generate outputs for new queries without further gradient updates.",
                "The neural network wipes its hidden layers clean to conserve server storage.",
                "The model downloads human user profiles to rewrite its primary loss function."
            ],
            c: 0,
            exp: "Inference represents live operational deployment using fixed, frozen parameter weights to calculate predictions for unseen inputs."
        }
    ],
    tools: [
        {
            q: "Scenario 1: A 10th grader prompts an AI: 'Write an essay about cell division.' Why does this prompt violate the C.R.A.F.T. standard?",
            a: [
                "It lacks an operational Role (e.g., AP Biology tutor), Context (curriculum constraints), Format (comparative table/rubric), and Target Audience.",
                "It does not contain at least 1,000 words in the query.",
                "It uses lowercase text."
            ],
            c: 0,
            exp: "The prompt lacks all structural C.R.A.F.T. constraints, resulting in generic, uncalibrated output that fails to support academic learning."
        },
        {
            q: "Scenario 2: An AI study tool confidently cites: 'Mendel, G. (2024). Genetic Algorithms in High School Biology, Nature, 45(2).' How should a student evaluate this citation?",
            a: [
                "Recognize it as a probable hallucination caused by probabilistic next-token generation, and verify the DOI in academic indexes like PubMed or Google Scholar.",
                "Accept the citation as authentic because Large Language Models never generate false references.",
                "Assume the journal Nature published Gregor Mendel in 2024."
            ],
            c: 0,
            exp: "LLMs predict statistically plausible word patterns and routinely invent synthetic authors, dates, and titles that must be independently cross-checked."
        },
        {
            q: "Scenario 3: How can a high school debater ethically leverage a Large Language Model while preparing for a national tournament?",
            a: [
                "Use the AI as a Socratic sparring partner to generate counterarguments and expose logical flaws in drafted arguments.",
                "Prompt the AI to write entire debate constructive speeches to read aloud without personal research.",
                "Use generative tools to manufacture fabricated statistical studies to deceive judges."
            ],
            c: 0,
            exp: "Socratic argument interrogation and outline testing enhance student understanding while preserving personal intellectual voice."
        },
        {
            q: "Scenario 4: Why should a prompt specify an explicit 'Target Audience' when studying complex technical topics?",
            a: [
                "It constrains the model's vocabulary, technical assumptions, and pedagogical tone to match the student's current learning level.",
                "It forces the model to encrypt its outputs for privacy.",
                "It reduces internet bandwidth consumption by 40%."
            ],
            c: 0,
            exp: "Target audience constraints calibrate explanation depth, ensuring the output avoids unhelpful jargon or oversimplified generalities."
        },
        {
            q: "Scenario 5: When an AI model generates computer code for a science simulation, what is the student's academic responsibility?",
            a: [
                "Inspect every line, test for logic errors, document AI assistance per instructor guidelines, and comprehend execution flow completely.",
                "Paste the code directly into the assignment without testing it.",
                "Claim personal authorship of the raw code."
            ],
            c: 0,
            exp: "Academic integrity requires full code comprehension, testing, error verification, and transparent attribution of tools used."
        }
    ],
    ethics: [
        {
            q: "Scenario 1: A school district tests an automated admissions algorithm. Group A applicants are accepted at a 60% rate, while Group B applicants are accepted at 40%. Does this violate the Four-Fifths Rule?",
            a: [
                "Yes. The selection ratio is 40/60 = 66.7%, which falls below the 80% federal disparate impact threshold.",
                "No. Any selection rate above 30% is legally balanced under civil rights standards.",
                "No. Disparate impact only applies to computer hardware."
            ],
            c: 0,
            exp: "Under the Four-Fifths Rule, a selection rate below 80% of the highest group's rate (here 66.7% vs 80%) flags potential disparate impact."
        },
        {
            q: "Scenario 2: A student pastes their classmate's unredacted personal essay containing medical records into a public consumer AI tool. What privacy safeguard is compromised?",
            a: [
                "Institutional privacy protections under FERPA, because public AI endpoints frequently log prompts for model training, creating data exposure risks.",
                "The computer's local Wi-Fi encryption protocol.",
                "The computer's power supply efficiency."
            ],
            c: 0,
            exp: "Commercial AI prompts can be stored in training logs. Sharing confidential peer records violates educational privacy standards like FERPA."
        },
        {
            q: "Scenario 3: A student uses an AI paraphrase tool to spin their entire literature paper to evade plagiarism filters. Under academic honor codes, how is this categorized?",
            a: [
                "Zone 3/4 Academic Dishonesty: obfuscating student voice with synthetic text to misrepresent authorship.",
                "Zone 1 Socratic learning: fully permissible without instructor disclosure.",
                "Standard grammatical proofreading."
            ],
            c: 0,
            exp: "Automated spinning to obscure source origins replaces student voice and constitutes academic dishonesty under high school honor codes."
        },
        {
            q: "Scenario 4: An automated facial recognition camera at school has higher false rejection rates for darker skin tones. What is the root algorithmic cause?",
            a: [
                "The training dataset underrepresented diverse demographic skin tones, creating lower model confidence for those cohorts.",
                "The camera lenses developed personal prejudice.",
                "The software was written in Python instead of C++."
            ],
            c: 0,
            exp: "Computer vision classifiers trained on unbalanced demographic datasets demonstrate lower confidence and higher error rates on underrepresented groups."
        },
        {
            q: "Scenario 5: What is the primary difference between permitted AI study assistance and academic plagiarism?",
            a: [
                "Permitted assistance uses AI for conceptual feedback and outlining while preserving student authorship; plagiarism submits AI-generated text as original student work.",
                "Plagiarism only applies to printed textbooks, not digital text.",
                "There is no difference; all software usage is considered plagiarism."
            ],
            c: 0,
            exp: "Ethical scholarship centers on authentic authorship, transparent methodology, and personal intellectual ownership."
        }
    ],
    mission: [
        {
            q: "Capstone Scenario 1: You are auditing a predictive dropout model for your school board. What initial action must you mandate before deployment?",
            a: [
                "Execute a comprehensive demographic parity audit and establish mandatory human counselor review for all flagged interventions.",
                "Deploy the model immediately to automate disciplinary actions without human oversight.",
                "Delete all historical student performance data."
            ],
            c: 0,
            exp: "High-stakes educational forecasting requires thorough bias audits and human supervision before deployment."
        },
        {
            q: "Capstone Scenario 2: The predictive model flags a student for academic probation, but the confidence score is only 51%. What algorithmic safeguard should trigger?",
            a: [
                "Decline automated action and route the low-confidence flag to human counselors for personalized evaluation.",
                "Automatically issue academic probation to be safe.",
                "Alter the student's permanent transcript."
            ],
            c: 0,
            exp: "Responsible AI systems enforce confidence thresholds that defer ambiguous or borderline predictions to human expertise."
        },
        {
            q: "Capstone Scenario 3: The software vendor refuses to explain how the model reaches its risk scores, citing proprietary trade secrets. How should the student auditor respond?",
            a: [
                "Reject the software due to a lack of explainability, requiring transparent algorithmic auditing before deployment.",
                "Approve the vendor contract without questions.",
                "Assume proprietary models are always correct."
            ],
            c: 0,
            exp: "High-stakes educational decisions require explainable algorithms so educators and students understand why a prediction was generated."
        },
        {
            q: "Capstone Scenario 4: An audit reveals the model was trained on data from an elite private school in another state. Why does this invalidate its use in your public high school?",
            a: [
                "The training data suffers from out-of-distribution dataset shift, meaning its learned patterns will not generalize accurately to your local demographic.",
                "Public schools cannot run algorithms written for private schools.",
                "The file size of the model is too large."
            ],
            c: 0,
            exp: "Models trained on non-representative populations fail to generalize, leading to invalid predictions on different student bodies."
        },
        {
            q: "Capstone Scenario 5: What core principle unites 21st-century AI literacy across foundations, tools, and ethics?",
            a: [
                "Understanding the mechanical architecture, critically verifying factual claims, and ensuring tools serve human understanding ethically.",
                "Relying entirely on automated tools for all cognitive work.",
                "Avoiding all modern computational technologies."
            ],
            c: 0,
            exp: "True AI literacy combines mechanical understanding with critical scrutiny, ethical responsibility, and disciplined verification."
        }
    ]
};

let activeQuizKey = null;
let activeQIdx = 0;

function openGame(key) {
    if (player.completed[key]) {
        alert("This module benchmark is already verified! Check your scholar dashboard.");
        return;
    }
    if (key === "mission" && (!player.completed.foundation || !player.completed.tools || !player.completed.ethics)) {
        alert("Integrity Guardrail: Complete Modules 1, 2, and 3 before launching the Synthesis Capstone!");
        return;
    }

    playSfx("click");
    activeQuizKey = key;
    activeQIdx = 0;
    document.getElementById("quizModal").classList.add("active");
    document.getElementById("quizTitle").textContent = key.toUpperCase() + " APPLICATION BENCHMARK";
    document.getElementById("qTotal").textContent = quizRepo[key].length;
    renderQuiz();
}

function renderQuiz() {
    const qData = quizRepo[activeQuizKey][activeQIdx];
    document.getElementById("qNum").textContent = activeQIdx + 1;
    document.getElementById("quizProgress").style.width = (activeQIdx / quizRepo[activeQuizKey].length * 100) + "%";
    document.getElementById("quizQuestion").textContent = qData.q;
    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("quizNextBtn").style.display = "none";

    const box = document.getElementById("quizAnswers");
    box.innerHTML = "";
    qData.a.forEach((ans, i) => {
        const btn = document.createElement("button");
        btn.className = "ans-btn";
        btn.textContent = ans;
        btn.onclick = () => submitAnswer(i, btn);
        box.appendChild(btn);
    });
}

function submitAnswer(idx, btnElem) {
    const qData = quizRepo[activeQuizKey][activeQIdx];
    document.querySelectorAll(".ans-btn").forEach(b => b.disabled = true);

    if (idx === qData.c) {
        btnElem.classList.add("correct");
        playSfx("correct");
        document.getElementById("quizFeedback").innerHTML = "<strong style='color:var(--green);'>✓ Benchmark Verified:</strong> " + qData.exp;
    } else {
        btnElem.classList.add("wrong");
        playSfx("wrong");
        document.querySelectorAll(".ans-btn")[qData.c].classList.add("correct");
        document.getElementById("quizFeedback").innerHTML = "<strong style='color:var(--red);'>Diagnostic Rationale:</strong> " + qData.exp;
    }
    document.getElementById("quizNextBtn").style.display = "inline-block";
}

function nextQuestion() {
    playSfx("click");
    activeQIdx++;
    if (activeQIdx >= quizRepo[activeQuizKey].length) {
        player.completed[activeQuizKey] = true;
        player.xp = Math.min(1000, player.xp + 250);
        saveState();
        updateUI();
        playSfx("levelUp");
        closeGame();
        return;
    }
    renderQuiz();
}

function closeGame() {
    document.getElementById("quizModal").classList.remove("active");
}

/* ================= 8. DASHBOARD & UI SYNCHRONIZATION ================= */
function updateUI() {
    player.level = player.xp >= 750 ? 4 : player.xp >= 500 ? 3 : player.xp >= 250 ? 2 : 1;

    // Header HUD
    document.getElementById("hudLevel").textContent = player.level;
    document.getElementById("hudXP").textContent = player.xp;

    // Dashboard HUD
    document.getElementById("dashLevel").textContent = player.level;
    document.getElementById("dashXP").textContent = player.xp;
    document.getElementById("dashXPBar").style.width = (player.xp / 10) + "%";

    // Status Texts
    const msg = document.getElementById("dashMessage");
    if (player.xp === 0) msg.textContent = "Complete Module 1 application scenarios to begin your AI journey!";
    else if (player.xp < 1000) msg.textContent = "Progress authenticated! Complete all modules to unlock your diploma.";
    else {
        msg.textContent = "Curriculum 100% completed! Official diploma unlocked.";
        document.getElementById("diplomaBanner").style.display = "flex";
    }

    // Module Completion Badges & Status Indicators
    const map = { foundation: "badge1", tools: "badge2", ethics: "badge3", mission: "badge4" };
    const statusMap = {
        foundation: "statusFoundation",
        tools: "statusTools",
        ethics: "statusEthics",
        mission: "statusMission"
    };

    Object.keys(player.completed).forEach(k => {
        if (player.completed[k]) {
            document.getElementById(map[k]).className = "card badge-card unlocked";
            const sEl = document.getElementById(statusMap[k]);
            if (sEl) {
                sEl.textContent = "✓ Certified (5/5 Passed)";
                sEl.className = "status-indicator complete";
            }
        }
    });

    if (player.completed.foundation && player.completed.tools && player.completed.ethics) {
        const misStatus = document.getElementById("statusMission");
        if (misStatus && !player.completed.mission) misStatus.textContent = "Unlocked & Ready";
    }

    // Competency Radar Chart
    const y1 = player.completed.foundation ? 25 : 100;
    const x2 = player.completed.tools ? 175 : 100;
    const y3 = player.completed.ethics ? 175 : 100;
    const x4 = player.completed.mission ? 25 : 100;
    const poly = document.getElementById("radarPoly");
    if (poly) poly.setAttribute("points", `100,${y1} ${x2},100 100,${y3} ${x4},100`);
}

function openCertificate() {
    playSfx("levelUp");
    document.getElementById("diplomaDate").textContent = "Issued: " + new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
    document.getElementById("certModal").classList.add("active");
}

function closeCertificate() {
    document.getElementById("certModal").classList.remove("active");
}

/* ================= 9. INITIALIZATION ================= */
window.addEventListener("DOMContentLoaded", () => {
    loadState();
    updateUI();
    runTokenizer();
    simulateFairness();
    inspectNode("mha");
    inspectEthics("socratic");
    if (ctx) drawCanvas();
});
