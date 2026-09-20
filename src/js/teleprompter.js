// teleprompter.js - Pengendali Mode Mimbar & Teleprompter Interaktif

export class TeleprompterController {
  constructor(screenElement, psalmData) {
    this.screenEl = screenElement;
    this.psalmData = psalmData;
    this.isScrolling = false;
    this.scrollInterval = null;
    this.scrollSpeed = 2; // px per tick
    this.fontSize = 1.75; // rem
    this.activeVerseIndex = 0;
  }

  updateData(newPsalmData) {
    this.psalmData = newPsalmData;
    this.render();
  }

  setFontSize(delta) {
    this.fontSize = Math.min(Math.max(this.fontSize + delta, 1.2), 3.0);
    if (this.screenEl) {
      this.screenEl.style.setProperty("--prompter-font-size", `${this.fontSize}rem`);
    }
  }

  setSpeed(speedVal) {
    this.scrollSpeed = parseFloat(speedVal);
  }

  toggleScroll() {
    if (this.isScrolling) {
      this.stopScroll();
      return false;
    } else {
      this.startScroll();
      return true;
    }
  }

  startScroll() {
    if (this.isScrolling) return;
    this.isScrolling = true;
    this.scrollInterval = setInterval(() => {
      if (this.screenEl) {
        this.screenEl.scrollTop += this.scrollSpeed;
        // Jika sudah mentok bawah, berhenti
        if (this.screenEl.scrollTop + this.screenEl.clientHeight >= this.screenEl.scrollHeight - 5) {
          this.stopScroll();
        }
      }
    }, 40);
  }

  stopScroll() {
    this.isScrolling = false;
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }

  resetScroll() {
    this.stopScroll();
    if (this.screenEl) {
      this.screenEl.scrollTop = 0;
    }
  }

  highlightVerse(index) {
    this.activeVerseIndex = index;
    const blocks = this.screenEl.querySelectorAll(".prompter-verse-block");
    blocks.forEach((el, idx) => {
      if (idx === index) {
        el.classList.add("active-reading");
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        el.classList.remove("active-reading");
      }
    });
  }

  render() {
    if (!this.screenEl || !this.psalmData) return;

    const { title, subtitle, refren, verses, macroAnalysis } = this.psalmData;

    let html = `
      <div class="teleprompter-sheet">
        <div class="prompter-psalm-heading">
          <div style="display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 0.6rem;">
            <span class="badge badge-gold">MODE MIMBAR LEKTOR</span>
            <span class="badge badge-trust">STANDAR ALKITAB TB2 (LAI)</span>
          </div>
          <h1 class="prompter-title">${title}</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">${subtitle || ""}</p>
        </div>
    `;

    if (refren) {
      html += `
        <div class="prompter-refren-box">
          <div class="refren-label">REFREN / MAZMUR TANGGAPAN</div>
          <div class="refren-text">"${refren}"</div>
        </div>
      `;
    }

    verses.forEach((v, idx) => {
      html += `
        <div class="prompter-verse-block ${idx === 0 ? "active-reading" : ""}" data-verse-idx="${idx}">
          <div class="prompter-verse-meta">
            <span>AYAT ${v.number}</span>
            <span class="prompter-mood-badge">🕊️ ${v.nadaBatin.split(",")[0] || "Khidmat"}</span>
          </div>

          <div class="prompter-verse-text">
            ${v.annotatedHtml}
          </div>

          <div class="prompter-cue-aside">
            <div class="cue-item">🎙️ <strong>Vokal:</strong> ${v.vokal.split(",")[0]}</div>
            <div class="cue-item">👁️ <strong>Mata:</strong> ${v.ekspresi.split(",")[0]}</div>
            <div class="cue-item">
              🎵 <strong>Alur Nada:</strong> 
              ${v.phrasingData && v.phrasingData.length > 0 
                ? v.phrasingData.map(p => `<span class="pitch-cue pitch-${p.pitchType}" style="font-size: 0.72rem;">${p.pitchIcon} ${p.pitchLabel.split(" ")[0]} ${p.pitchLabel.split(" ")[1] || ""}</span>`).join(" ") 
                : ""}
            </div>
          </div>

          <div style="margin-top: 0.75rem; padding-top: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.08); font-family: var(--font-mono); font-size: 0.82rem; color: #fde68a;">
            ✂️ <strong>Penggalan Suku Kata:</strong> ${v.syllableText || v.rawText}
          </div>
        </div>
      `;
    });

    html += `
        <div style="text-align: center; padding: 4rem 1rem 2rem; color: var(--gold-light); font-family: var(--font-heading); font-size: 1.1rem; letter-spacing: 0.15em;">
          ✦ DEMIKIANLAH SABDA TUHAN ✦
        </div>
      </div>
    `;

    this.screenEl.innerHTML = html;

    // Attach click to highlight
    const blocks = this.screenEl.querySelectorAll(".prompter-verse-block");
    blocks.forEach((el, idx) => {
      el.addEventListener("click", () => {
        this.highlightVerse(idx);
      });
    });
  }
}
