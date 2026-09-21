// main.js - Pengendali Utama Aplikasi BERMAZMUR

import { psalmPresets } from "./presets.js";
import { PsalmAnalyzer } from "./analyzer.js";
import { LiturgicalAudioEngine } from "./audio.js";
import { AudioRehearsalRecorder } from "./recorder.js";
import { TeleprompterController } from "./teleprompter.js";
import { VAIEPPEvaluator } from "./evaluator.js";

// Inisialisasi Instance
const analyzer = new PsalmAnalyzer();
const audioEngine = new LiturgicalAudioEngine();
const evaluator = new VAIEPPEvaluator();

// State Aplikasi & Penyimpanan Pustaka
const CUSTOM_LIB_KEY = "bermazmur_custom_library";
let practicedVerses = new Set();
let teleprompterCtrl = null;
let rehearsalRecorder = null;

// Helper Penyimpanan Pustaka (localStorage)
export function getCustomLibrary() {
  try {
    const raw = localStorage.getItem(CUSTOM_LIB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Gagal membaca Pustaka dari penyimpanan lokal:", e);
    return [];
  }
}

export function saveCustomLibrary(list) {
  try {
    localStorage.setItem(CUSTOM_LIB_KEY, JSON.stringify(list));
    updateLibraryCountBadge();
  } catch (e) {
    console.error("Gagal menyimpan Pustaka ke penyimpanan lokal:", e);
  }
}

export function showToast(message, icon = "✅") {
  const toast = document.getElementById("app-toast");
  if (!toast) return;
  toast.innerHTML = `<span style="font-size: 1.25rem;">${icon}</span> <span>${message}</span>`;
  toast.classList.add("active");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("active");
  }, 4200);
}

export function updateLibraryCountBadge() {
  const customs = getCustomLibrary();
  const totalCount = customs.length + psalmPresets.length;

  const headerBadge = document.getElementById("header-library-count");
  if (headerBadge) headerBadge.textContent = `${totalCount}`;

  const customBadge = document.getElementById("custom-psalms-count-badge");
  if (customBadge) customBadge.textContent = `${customs.length} Naskah`;
}

// Inisialisasi Mazmur Aktif (cek apakah ada naskah terakhir yang dibuka)
const savedCustoms = getCustomLibrary();
const allAvailablePsalms = [...savedCustoms, ...psalmPresets];
// Default mengutamakan Mazmur 14 (TB2) sebagai referensi masterclass liturgis
let currentPsalm = psalmPresets.find(p => p.id === "mzm-14") || psalmPresets[0];

try {
  const lastActiveId = localStorage.getItem("bermazmur_last_active_id");
  if (lastActiveId) {
    const found = allAvailablePsalms.find(p => p.id === lastActiveId);
    if (found) currentPsalm = found;
  }
} catch (e) {}

// State Latihan Pernapasan (4-4-6 breathing)
let breathingActive = false;
let breathingInterval = null;
let currentBreathPhase = "inhale"; // 'inhale' | 'hold' | 'exhale' | 'rest'
let breathPhaseSeconds = 4;
let breathCounter = 4;

// -------------------------------------------------------------
// DOM ELEMENTS
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Setup Controller & Event Listeners
  initAudioRecorder();
  initTeleprompter();
  initBreathingEngine();
  initTabNavigation();
  initModalListeners();
  initEvaluatorUI();
  initSoundbar();
  updateLibraryCountBadge();

  // Render Mazmur Awal
  loadPsalm(currentPsalm);
});

// -------------------------------------------------------------
// LOAD & RENDER MAZMUR
// -------------------------------------------------------------
function loadPsalm(psalmData) {
  currentPsalm = psalmData;
  practicedVerses.clear();

  try {
    localStorage.setItem("bermazmur_last_active_id", psalmData.id);
  } catch (e) {}

  // Render Banner & Makro
  renderPsalmBanner(psalmData);
  renderMacroAnalysis(psalmData);
  renderContemplation(psalmData);

  // Render Ayat demi Ayat
  renderVersePills(psalmData);
  renderVerseCards(psalmData);
  updateProgressBar();

  // Update Teleprompter
  if (teleprompterCtrl) {
    teleprompterCtrl.updateData(psalmData);
  }

  // Update Evaluasi & Diagnosis Khusus Mazmur Ini
  if (typeof updateEvaluationSummary === "function") {
    updateEvaluationSummary();
  }
}

function renderPsalmBanner(psalm) {
  const titleEl = document.getElementById("psalm-main-title");
  const subtitleEl = document.getElementById("psalm-main-subtitle");
  const tagsEl = document.getElementById("psalm-tags-container");

  if (titleEl) titleEl.textContent = psalm.title;
  if (subtitleEl) subtitleEl.textContent = psalm.subtitle || (psalm.refren ? `Refren: ${psalm.refren}` : "");

  if (tagsEl) {
    let genreBadgeClass = "badge-trust";
    if (psalm.category === "lament") genreBadgeClass = "badge-lament";
    if (psalm.category === "praise") genreBadgeClass = "badge-praise";
    if (psalm.category === "repentance") genreBadgeClass = "badge-genre";

    tagsEl.innerHTML = `
      <span class="badge badge-gold" style="box-shadow: 0 0 12px rgba(212,175,55,0.45); font-weight: 700;">✦ TB2 (Terjemahan Baru 2 - LAI)</span>
      <span class="badge ${genreBadgeClass}">📜 ${psalm.genre.split("(")[0]}</span>
      <span class="badge badge-trust">📖 ${psalm.verses.length} Ayat Lengkap</span>
      <span class="badge" style="background: rgba(255,255,255,0.08); color: #e2e8f0;">🕊️ VAIEPP Masterclass</span>
    `;
  }
}

function renderMacroAnalysis(psalm) {
  const macro = psalm.macroAnalysis;
  if (!macro) return;

  const container = document.getElementById("macro-grid-container");
  if (!container) return;

  container.innerHTML = `
    <div class="macro-box">
      <div class="macro-box-title">🧠 Psikologi Teks</div>
      <div class="macro-box-desc">${macro.psikologiGlobal}</div>
    </div>
    <div class="macro-box">
      <div class="macro-box-title">🕊️ Suasana Batin & Nada</div>
      <div class="macro-box-desc">${macro.suasanaBatin}</div>
    </div>
    <div class="macro-box">
      <div class="macro-box-title">🌊 Busur Emosi (Emotional Arc)</div>
      <div class="macro-box-desc">${macro.emotionalArc}</div>
    </div>
    <div class="macro-box">
      <div class="macro-box-title">🎙️ Kunci Utama VAIEPP</div>
      <div class="macro-box-desc">${macro.fokusUtamaVAIEPP}</div>
    </div>
  `;
}

function renderContemplation(psalm) {
  const quoteEl = document.getElementById("contemplation-quote-text");
  if (quoteEl && psalm.contemplationGuide) {
    quoteEl.textContent = `"${psalm.contemplationGuide}"`;
  }
}

function renderVersePills(psalm) {
  const pillsContainer = document.getElementById("verse-pills");
  if (!pillsContainer) return;

  let html = "";
  psalm.verses.forEach((v, idx) => {
    html += `
      <button class="verse-pill ${idx === 0 ? "active" : ""}" data-verse-num="${v.number}">
        Ayat ${v.number}
      </button>
    `;
  });
  pillsContainer.innerHTML = html;

  pillsContainer.querySelectorAll(".verse-pill").forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      pillsContainer.querySelectorAll(".verse-pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");

      const card = document.getElementById(`verse-card-${psalm.verses[idx].number}`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function renderVerseCards(psalm) {
  const container = document.getElementById("verse-cards-container");
  if (!container) return;

  let html = "";
  psalm.verses.forEach((v, idx) => {
    html += `
      <article class="verse-card" id="verse-card-${v.number}">
        <header class="verse-card-header">
          <div class="verse-num-badge">
            <div class="num-circle">${v.number}</div>
            <div>
              <div class="verse-status-tag">AYAT ${v.number} DARI ${psalm.verses.length}</div>
              <div style="font-weight: 700; color: #fff; font-size: 1.05rem;">${v.nadaBatin.split(",")[0] || "Khidmat"}</div>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm play-full-verse-speech" data-verse-idx="${idx}" title="Dengarkan contoh cara membaca satu ayat penuh dengan intonasi dan jeda nafas">
              <span class="voice-icon">🎙️</span>
              <span class="btn-voice-label">Contoh Baca Ayat Penuh</span>
            </button>
            <button class="btn btn-outline btn-sm play-full-verse-melody" data-verse-idx="${idx}" title="Dengarkan seluruh alur tangga nada liturgis ayat ini secara berurutan">
              <span class="melody-icon">🎵</span>
              <span class="btn-verse-melody-label">Melodi Alur Ayat</span>
            </button>
            <button class="btn btn-outline btn-sm play-verse-chime" data-verse-idx="${idx}" title="Bunyikan Genta Penyelaras Hati">
              🔔 Genta Hening
            </button>
          </div>
        </header>

        <!-- Scripture Highlight Box with Breath notations -->
        <div class="verse-text-box">
          <div class="verse-scripture">
            ${v.annotatedHtml}
          </div>

          <div class="verse-notation-legend">
            <div class="legend-item"><span class="breath-short">/</span> Jeda Nafas Pendek</div>
            <div class="legend-item"><span class="breath-long">//</span> Jeda Hening Panjang (Caesura)</div>
            <div class="legend-item"><span class="stress-word">Kata</span> Aksen Penekanan</div>
            <div class="legend-item"><span class="pitch-cue pitch-up">↗</span> Nada Naik</div>
            <div class="legend-item"><span class="pitch-cue pitch-down">↘</span> Nada Turun</div>
            <div class="legend-item"><span class="pitch-cue pitch-flat">→</span> Nada Datar</div>
          </div>
        </div>

        <!-- Peta Penggalan Suku Kata & Kontur Melodi Nada -->
        <div class="phrasing-map-card">
          <div class="phrasing-map-header">
            <div class="phrasing-map-title">
              <span>🎼</span>
              <span>Penggalan Suku Kata & Kontur Melodi Nada (Arah Suara)</span>
            </div>
            <span class="badge badge-gold" style="font-size: 0.72rem;">PANDUAN INTONASI LEKTOR</span>
          </div>

          <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.45rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">
            ✂️ Penggalan Suku Kata Baku Tiap Kata (Artikulasi):
          </div>
          <div class="syllable-display-box">
            ${v.syllableText || v.rawText}
          </div>

          <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">
            🎵 Alur Intonasi Frasa demi Frasa (Apakah Nada Naik ↗, Turun ↘, atau Datar →):
          </div>
          <div class="phrase-row-list">
            ${v.phrasingData && v.phrasingData.length > 0 ? v.phrasingData.map((p, pIdx) => `
              <div class="phrase-row-item" id="phrase-row-${v.number}-${pIdx}">
                <div class="phrase-text-block">
                  <div class="phrase-raw">"${p.text}" ${p.delimiter && p.delimiter !== '.' ? `<span style="color: #38bdf8; font-weight: bold;">[${p.delimiter}]</span>` : ''}</div>
                  <div class="phrase-syllables">✂️ Suku Kata: ${p.syllabified}</div>
                  <div class="phrase-reason">💡 ${p.reason}</div>
                </div>

                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.45rem;">
                  <span class="phrase-pitch-badge pitch-${p.pitchType}">
                    ${p.pitchIcon} ${p.pitchLabel}
                  </span>
                  <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap; justify-content: flex-end;">
                    <button class="btn-play-pitch play-melody-btn" data-pitch-type="${p.pitchType}" title="Dengarkan melodi arah nada ${p.pitchIcon} (${p.pitchLabel})">
                      <span>🎵 Melodi ${p.pitchIcon}</span>
                    </button>
                    <button class="btn-play-pitch play-phrase-speech-btn" data-phrase-text="${(p.text || '').replace(/"/g, '&quot;')}" data-pitch-type="${p.pitchType}" title="Dengarkan contoh suara lektor melafalkan frasa ini dengan intonasi ${p.pitchIcon}">
                      <span>🎙️ Contoh Baca</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join('') : '<p style="color: var(--text-muted); font-size: 0.85rem;">Data pemenggalan frasa sedang disiapkan.</p>'}
          </div>
        </div>

        <!-- Macro Psychology per Verse -->
        <div style="background: rgba(14, 22, 38, 0.7); border-radius: var(--radius-md); padding: 1.15rem; margin-bottom: 1.5rem; border-left: 3px solid var(--gold-primary);">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--gold-primary); font-weight: 700; letter-spacing: 0.08em; margin-bottom: 0.35rem;">
            🧠 Psikologi & Suasana Batin Teks
          </div>
          <div style="font-size: 0.92rem; color: #e2e8f0; line-height: 1.5;">
            ${v.psikologiAyat}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-gold); margin-top: 0.5rem;">
            🕊️ <strong>Sikap Nada Batin Pembaca:</strong> ${v.nadaBatin}
          </div>
        </div>

        <!-- VAIEPP 6-Pillar Coaching Grid -->
        <div class="vaiepp-grid">
          <!-- VOKAL -->
          <div class="vaiepp-box vaiepp-v">
            <div class="vaiepp-header">
              <div class="vaiepp-icon">🎙️</div>
              <div class="vaiepp-title">Vokal & Resonansi</div>
            </div>
            <div class="vaiepp-content">${v.vokal}</div>
          </div>

          <!-- ARTIKULASI -->
          <div class="vaiepp-box vaiepp-a">
            <div class="vaiepp-header">
              <div class="vaiepp-icon">🗣️</div>
              <div class="vaiepp-title">Artikulasi & Diksi</div>
            </div>
            <div class="vaiepp-content">${v.artikulasi}</div>
          </div>

          <!-- INTONASI -->
          <div class="vaiepp-box vaiepp-i">
            <div class="vaiepp-header">
              <div class="vaiepp-icon">🎵</div>
              <div class="vaiepp-title">Intonasi & Jeda</div>
            </div>
            <div class="vaiepp-content">${v.intonasi}</div>
          </div>

          <!-- EKSPRESI -->
          <div class="vaiepp-box vaiepp-e">
            <div class="vaiepp-header">
              <div class="vaiepp-icon">👁️</div>
              <div class="vaiepp-title">Ekspresi & Wajah</div>
            </div>
            <div class="vaiepp-content">${v.ekspresi}</div>
          </div>

          <!-- PENGHAYATAN -->
          <div class="vaiepp-box vaiepp-p">
            <div class="vaiepp-header">
              <div class="vaiepp-icon">🕊️</div>
              <div class="vaiepp-title">Penghayatan Rasa</div>
            </div>
            <div class="vaiepp-content">${v.penghayatan}</div>
          </div>

          <!-- PENAMPILAN -->
          <div class="vaiepp-box vaiepp-penampilan">
            <div class="vaiepp-header">
              <div class="vaiepp-icon">🏛️</div>
              <div class="vaiepp-title">Penampilan Mimbar</div>
            </div>
            <div class="vaiepp-content">${v.penampilan}</div>
          </div>
        </div>

        <!-- Footer Checklist & Practice Toggle -->
        <footer class="verse-footer-actions">
          <label class="checkbox-label">
            <input type="checkbox" class="verse-practice-check" data-verse-num="${v.number}">
            <span class="custom-checkbox">✓</span>
            <span>Tandai Ayat Ini Telah Dilatih</span>
          </label>

          <button class="btn btn-outline btn-sm practice-verse-teleprompter" data-verse-idx="${idx}">
            📖 Buka di Mode Mimbar
          </button>
        </footer>
      </article>
    `;
  });

  container.innerHTML = html;

  // Event Listeners for Cards
  container.querySelectorAll(".verse-practice-check").forEach(chk => {
    chk.addEventListener("change", (e) => {
      const vNum = parseInt(e.target.getAttribute("data-verse-num"), 10);
      const card = document.getElementById(`verse-card-${vNum}`);

      if (e.target.checked) {
        practicedVerses.add(vNum);
        if (card) card.classList.add("practiced");
      } else {
        practicedVerses.delete(vNum);
        if (card) card.classList.remove("practiced");
      }
      updateProgressBar();
    });
  });

  container.querySelectorAll(".play-verse-chime").forEach(btn => {
    btn.addEventListener("click", () => {
      audioEngine.playSingingBowl(216, 5.0);
    });
  });

  // Event listener untuk tombol dengar melodi nada liturgis per frasa (Web Audio API)
  container.querySelectorAll(".play-melody-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const pitchType = btn.getAttribute("data-pitch-type") || "naik";
      const rowItem = btn.closest(".phrase-row-item");
      
      // Berikan efek visual aktif pada tombol & baris frasa
      btn.classList.add("is-playing");
      if (rowItem) rowItem.classList.add("is-speaking-phrase");

      audioEngine.playPitchContour(pitchType);

      setTimeout(() => {
        btn.classList.remove("is-playing");
        if (rowItem) rowItem.classList.remove("is-speaking-phrase");
      }, 1200);
    });
  });

  // Event listener untuk tombol dengar contoh cara membaca per frasa (suara vokal + nada)
  container.querySelectorAll(".play-phrase-speech-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const text = btn.getAttribute("data-phrase-text") || "";
      const pitchType = btn.getAttribute("data-pitch-type") || "naik";
      const rowItem = btn.closest(".phrase-row-item");

      if (btn.classList.contains("is-playing")) {
        audioEngine.stopSpeaking();
        btn.classList.remove("is-playing");
        if (rowItem) rowItem.classList.remove("is-speaking-phrase");
        return;
      }

      // Reset status tombol lain yang sedang aktif
      container.querySelectorAll(".play-phrase-speech-btn.is-playing, .play-full-verse-speech.is-playing, .play-full-verse-melody.is-playing").forEach(b => {
        b.classList.remove("is-playing");
        const lbl = b.querySelector(".btn-voice-label");
        if (lbl) lbl.textContent = "Contoh Baca Ayat Penuh";
        const mLbl = b.querySelector(".btn-verse-melody-label");
        if (mLbl) mLbl.textContent = "Melodi Alur Ayat";
      });
      container.querySelectorAll(".phrase-row-item.is-speaking-phrase").forEach(r => r.classList.remove("is-speaking-phrase"));

      audioEngine.speakLectorPhrase(
        text,
        pitchType,
        () => {
          btn.classList.add("is-playing");
          if (rowItem) rowItem.classList.add("is-speaking-phrase");
        },
        () => {
          btn.classList.remove("is-playing");
          if (rowItem) rowItem.classList.remove("is-speaking-phrase");
        }
      );
    });
  });

  // Event listener untuk tombol dengar alur melodi seluruh ayat secara berurutan
  let activeMelodyCanceller = null;
  container.querySelectorAll(".play-full-verse-melody").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const vIdx = parseInt(btn.getAttribute("data-verse-idx"), 10);
      const targetVerse = currentPsalm.verses[vIdx];
      if (!targetVerse) return;

      const labelSpan = btn.querySelector(".btn-verse-melody-label");

      if (btn.classList.contains("is-playing")) {
        if (activeMelodyCanceller) activeMelodyCanceller();
        activeMelodyCanceller = null;
        btn.classList.remove("is-playing");
        if (labelSpan) labelSpan.textContent = "Melodi Alur Ayat";
        const card = document.getElementById("verse-card-" + targetVerse.number);
        if (card) card.querySelectorAll(".phrase-row-item").forEach(r => r.classList.remove("is-speaking-phrase"));
        return;
      }

      // Hentikan pemutaran lain
      audioEngine.stopSpeaking();
      if (activeMelodyCanceller) activeMelodyCanceller();
      container.querySelectorAll(".play-phrase-speech-btn.is-playing, .play-full-verse-speech.is-playing, .play-full-verse-melody.is-playing").forEach(b => {
        b.classList.remove("is-playing");
        const lbl = b.querySelector(".btn-voice-label");
        if (lbl) lbl.textContent = "Contoh Baca Ayat Penuh";
        const mLbl = b.querySelector(".btn-verse-melody-label");
        if (mLbl) mLbl.textContent = "Melodi Alur Ayat";
      });
      container.querySelectorAll(".phrase-row-item.is-speaking-phrase").forEach(r => r.classList.remove("is-speaking-phrase"));

      activeMelodyCanceller = audioEngine.playFullVerseMelody(
        targetVerse.phrasingData,
        () => {
          btn.classList.add("is-playing");
          if (labelSpan) labelSpan.textContent = "Hentikan Melodi ⏹️";
        },
        () => {
          btn.classList.remove("is-playing");
          if (labelSpan) labelSpan.textContent = "Melodi Alur Ayat";
          const card = document.getElementById("verse-card-" + targetVerse.number);
          if (card) card.querySelectorAll(".phrase-row-item").forEach(r => r.classList.remove("is-speaking-phrase"));
        },
        (phraseIdx) => {
          const card = document.getElementById("verse-card-" + targetVerse.number);
          if (card) {
            card.querySelectorAll(".phrase-row-item").forEach(r => r.classList.remove("is-speaking-phrase"));
            const targetRow = document.getElementById(`phrase-row-${targetVerse.number}-${phraseIdx}`);
            if (targetRow) {
              targetRow.classList.add("is-speaking-phrase");
              targetRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
          }
        }
      );
    });
  });

  // Event listener untuk tombol dengar contoh cara membaca 1 ayat penuh (Vokal + Nada + Jeda)
  let activeSpeechCanceller = null;
  container.querySelectorAll(".play-full-verse-speech").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const vIdx = parseInt(btn.getAttribute("data-verse-idx"), 10);
      const targetVerse = currentPsalm.verses[vIdx];
      if (!targetVerse) return;

      const labelSpan = btn.querySelector(".btn-voice-label");

      if (btn.classList.contains("is-playing")) {
        audioEngine.stopSpeaking();
        if (activeSpeechCanceller) activeSpeechCanceller();
        activeSpeechCanceller = null;
        btn.classList.remove("is-playing");
        if (labelSpan) labelSpan.textContent = "Contoh Baca Ayat Penuh";
        const card = document.getElementById("verse-card-" + targetVerse.number);
        if (card) card.querySelectorAll(".phrase-row-item").forEach(r => r.classList.remove("is-speaking-phrase"));
        return;
      }

      // Reset tombol & pemutaran lain
      audioEngine.stopSpeaking();
      if (activeMelodyCanceller) activeMelodyCanceller();
      container.querySelectorAll(".play-phrase-speech-btn.is-playing, .play-full-verse-speech.is-playing, .play-full-verse-melody.is-playing").forEach(b => {
        b.classList.remove("is-playing");
        const lbl = b.querySelector(".btn-voice-label");
        if (lbl) lbl.textContent = "Contoh Baca Ayat Penuh";
        const mLbl = b.querySelector(".btn-verse-melody-label");
        if (mLbl) mLbl.textContent = "Melodi Alur Ayat";
      });
      container.querySelectorAll(".phrase-row-item.is-speaking-phrase").forEach(r => r.classList.remove("is-speaking-phrase"));

      activeSpeechCanceller = audioEngine.speakFullVerse(
        targetVerse.rawText,
        targetVerse.phrasingData,
        () => {
          btn.classList.add("is-playing");
          if (labelSpan) labelSpan.textContent = "Hentikan Suara ⏹️";
        },
        () => {
          btn.classList.remove("is-playing");
          if (labelSpan) labelSpan.textContent = "Contoh Baca Ayat Penuh";
          const card = document.getElementById("verse-card-" + targetVerse.number);
          if (card) card.querySelectorAll(".phrase-row-item").forEach(r => r.classList.remove("is-speaking-phrase"));
        },
        (phraseIdx) => {
          const card = document.getElementById("verse-card-" + targetVerse.number);
          if (card) {
            card.querySelectorAll(".phrase-row-item").forEach(r => r.classList.remove("is-speaking-phrase"));
            const targetRow = document.getElementById(`phrase-row-${targetVerse.number}-${phraseIdx}`);
            if (targetRow) {
              targetRow.classList.add("is-speaking-phrase");
              targetRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
          }
        }
      );
    });
  });

  container.querySelectorAll(".practice-verse-teleprompter").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const vIdx = parseInt(e.target.getAttribute("data-verse-idx"), 10);
      switchTab("panel-teleprompter");
      if (teleprompterCtrl) {
        setTimeout(() => {
          teleprompterCtrl.highlightVerse(vIdx);
        }, 150);
      }
    });
  });
}

function updateProgressBar() {
  const total = currentPsalm.verses.length;
  const count = practicedVerses.size;
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  const textEl = document.getElementById("progress-count-text");
  const fillEl = document.getElementById("progress-bar-fill");

  if (textEl) textEl.textContent = `${count} dari ${total} ayat telah dilatih (${pct}%)`;
  if (fillEl) fillEl.style.width = `${pct}%`;

  // Update pills completion status
  const pillsContainer = document.getElementById("verse-pills");
  if (pillsContainer) {
    pillsContainer.querySelectorAll(".verse-pill").forEach(pill => {
      const num = parseInt(pill.getAttribute("data-verse-num"), 10);
      if (practicedVerses.has(num)) {
        pill.classList.add("completed");
      } else {
        pill.classList.remove("completed");
      }
    });
  }
}

// -------------------------------------------------------------
// TAB NAVIGATION
// -------------------------------------------------------------
function initTabNavigation() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      switchTab(targetId);
    });
  });

  // Action button in Psalm banner
  const btnWarmup = document.getElementById("btn-banner-warmup");
  if (btnWarmup) {
    btnWarmup.addEventListener("click", () => switchTab("panel-warmup"));
  }

  const btnTeleprompter = document.getElementById("btn-banner-teleprompter");
  if (btnTeleprompter) {
    btnTeleprompter.addEventListener("click", () => switchTab("panel-teleprompter"));
  }
}

function switchTab(panelId) {
  // Update Tab buttons
  document.querySelectorAll(".tab-btn").forEach(b => {
    if (b.getAttribute("data-target") === panelId) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });

  // Show Target Panel
  document.querySelectorAll(".section-panel").forEach(p => {
    if (p.id === panelId) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });

  // Scroll to view
  const targetPanel = document.getElementById(panelId);
  if (targetPanel && window.scrollY > 300) {
    targetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// -------------------------------------------------------------
// LATIHAN OLAH NAFAS (BREATHING ENGINE 4-4-6)
// -------------------------------------------------------------
function initBreathingEngine() {
  const box = document.getElementById("breathing-box");
  const phaseText = document.getElementById("breath-phase-text");
  const timerText = document.getElementById("breath-timer-text");
  const instText = document.getElementById("breath-instruction-text");
  const toggleBtn = document.getElementById("btn-toggle-breath");
  const bowlBtn = document.getElementById("btn-singing-bowl");

  if (bowlBtn) {
    bowlBtn.addEventListener("click", () => {
      audioEngine.playSingingBowl(216, 7.0);
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (breathingActive) {
        stopBreathing();
        toggleBtn.textContent = "Mulai Latihan Nafas";
        toggleBtn.className = "btn btn-primary";
      } else {
        startBreathing();
        toggleBtn.textContent = "Hentikan Latihan";
        toggleBtn.className = "btn btn-burgundy";
      }
    });
  }

  function startBreathing() {
    breathingActive = true;
    currentBreathPhase = "inhale";
    breathCounter = 4;
    audioEngine.playChime(528, 2.5);
    updateBreathUI();

    breathingInterval = setInterval(() => {
      breathCounter--;
      if (breathCounter <= 0) {
        // Ganti Fase
        if (currentBreathPhase === "inhale") {
          currentBreathPhase = "hold";
          breathCounter = 4;
          audioEngine.playChime(440, 1.5);
        } else if (currentBreathPhase === "hold") {
          currentBreathPhase = "exhale";
          breathCounter = 6;
          audioEngine.playChime(396, 2.0);
        } else {
          currentBreathPhase = "inhale";
          breathCounter = 4;
          audioEngine.playChime(528, 2.0);
        }
      }
      updateBreathUI();
    }, 1000);
  }

  function stopBreathing() {
    breathingActive = false;
    clearInterval(breathingInterval);
    if (box) box.className = "breathing-box";
    if (phaseText) phaseText.textContent = "Siap Mulai";
    if (timerText) timerText.textContent = "4s";
    if (instText) instText.textContent = "Tekan tombol 'Mulai Latihan Nafas' untuk menenangkan denyut jantung dan mengaktifkan rongga diafragma.";
  }

  function updateBreathUI() {
    if (!box) return;
    box.className = `breathing-box ${currentBreathPhase}`;

    if (currentBreathPhase === "inhale") {
      phaseText.textContent = "Tarik Nafas";
      instText.textContent = "Tarik nafas perlahan lewat hidung hingga rongga perut & diafragma mengembang. Bahu tetap rileks.";
    } else if (currentBreathPhase === "hold") {
      phaseText.textContent = "Tahan Hening";
      instText.textContent = "Tahan nafas dengan tenang di rongga perut. Rasakan energi keteduhan memenuhi dada Anda.";
    } else if (currentBreathPhase === "exhale") {
      phaseText.textContent = "Hembus 'Sssss'";
      instText.textContent = "Hembuskan nafas perlahan lewat sela bibir bersuara desis 'Sssss' yang stabil dan terkontrol.";
    }

    if (timerText) timerText.textContent = `${breathCounter}s`;
  }
}

// -------------------------------------------------------------
// TELEPROMPTER & MODE MIMBAR
// -------------------------------------------------------------
function initTeleprompter() {
  const screenEl = document.getElementById("teleprompter-screen");
  if (!screenEl) return;

  teleprompterCtrl = new TeleprompterController(screenEl, currentPsalm);
  teleprompterCtrl.render();

  // Toolbar actions
  const btnPlayScroll = document.getElementById("btn-prompter-scroll");
  const speedSlider = document.getElementById("prompter-speed-slider");
  const btnFontPlus = document.getElementById("btn-font-plus");
  const btnFontMinus = document.getElementById("btn-font-minus");
  const btnResetScroll = document.getElementById("btn-prompter-reset");

  if (btnPlayScroll) {
    btnPlayScroll.addEventListener("click", () => {
      const isRunning = teleprompterCtrl.toggleScroll();
      btnPlayScroll.textContent = isRunning ? "⏸ Jeda Gulir" : "▶ Gulir Otomatis";
      btnPlayScroll.className = isRunning ? "btn btn-burgundy btn-sm" : "btn btn-outline btn-sm";
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener("input", (e) => {
      teleprompterCtrl.setSpeed(e.target.value);
    });
  }

  if (btnFontPlus) {
    btnFontPlus.addEventListener("click", () => teleprompterCtrl.setFontSize(0.2));
  }

  if (btnFontMinus) {
    btnFontMinus.addEventListener("click", () => teleprompterCtrl.setFontSize(-0.2));
  }

  if (btnResetScroll) {
    btnResetScroll.addEventListener("click", () => {
      teleprompterCtrl.resetScroll();
      if (btnPlayScroll) {
        btnPlayScroll.textContent = "▶ Gulir Otomatis";
        btnPlayScroll.className = "btn btn-outline btn-sm";
      }
    });
  }
}

// -------------------------------------------------------------
// AUDIO REHEARSAL RECORDER & AUDIT STUDIO
// -------------------------------------------------------------
function initAudioRecorder() {
  const prompterRecBtn = document.getElementById("btn-teleprompter-rec");
  const prompterTimer = document.getElementById("rec-timer-display");
  const prompterAudio = document.getElementById("rehearsal-audio-player");
  const prompterEvalBtn = document.getElementById("btn-eval-recording");

  // Tab 4 (Evaluasi Studio) Elements
  const evalRecBtn = document.getElementById("btn-eval-record-toggle");
  const evalRecIcon = document.getElementById("eval-rec-icon");
  const evalRecLabel = document.getElementById("eval-rec-label");
  const evalTimer = document.getElementById("eval-timer-num");
  const evalVolumeFill = document.getElementById("eval-volume-fill");
  const evalSourceBadge = document.getElementById("eval-rec-source-badge");
  const evalSourceText = document.getElementById("eval-rec-source-text");
  const btnEvalSimulate = document.getElementById("btn-eval-simulate");
  const btnEvalGoPrompter = document.getElementById("btn-eval-go-prompter");
  const btnEvalRerecord = document.getElementById("btn-eval-rerecord");
  const btnReapply = document.getElementById("btn-reapply-recorded");

  rehearsalRecorder = new AudioRehearsalRecorder(
    // 1. On Timer Tick
    (timerStr) => {
      if (prompterTimer) prompterTimer.textContent = timerStr;
      if (evalTimer) evalTimer.textContent = timerStr;
    },
    // 2. On State Change
    (state, url, analysis) => {
      if (state === "recording") {
        if (prompterRecBtn) prompterRecBtn.classList.add("recording");
        if (prompterAudio) prompterAudio.classList.remove("active");
        if (prompterEvalBtn) prompterEvalBtn.style.display = "none";

        if (evalRecBtn) evalRecBtn.classList.add("is-recording");
        if (evalRecIcon) evalRecIcon.textContent = "⏹️";
        if (evalRecLabel) evalRecLabel.textContent = "Selesai & Analisis Rekaman";
        if (evalSourceBadge) evalSourceBadge.className = "eval-source-badge badge-recording";
        if (evalSourceText) evalSourceText.textContent = "Sedang Merekam Suara Lektor...";
      } else if (state === "stopped") {
        if (prompterRecBtn) prompterRecBtn.classList.remove("recording");
        if (prompterAudio && url) {
          prompterAudio.src = url;
          prompterAudio.classList.add("active");
        }
        if (prompterEvalBtn) prompterEvalBtn.style.display = "inline-flex";

        if (evalRecBtn) evalRecBtn.classList.remove("is-recording");
        if (evalRecIcon) evalRecIcon.textContent = "🔴";
        if (evalRecLabel) evalRecLabel.textContent = "Mulai Rekam Pembacaan Saya";
        if (evalVolumeFill) evalVolumeFill.style.width = "0%";

        if (analysis) {
          applyAnalysisToEvaluation(analysis, false);
        }
      }
    },
    // 3. On Live Volume Level (0 - 100 RMS)
    (volumeLevel) => {
      if (evalVolumeFill) {
        evalVolumeFill.style.width = `${volumeLevel}%`;
      }
    }
  );

  // Tab 3 Prompter Rec Button
  if (prompterRecBtn) {
    prompterRecBtn.addEventListener("click", async () => {
      if (rehearsalRecorder.isRecording) {
        rehearsalRecorder.stopRecording();
      } else {
        await rehearsalRecorder.startRecording();
      }
    });
  }

  if (prompterEvalBtn) {
    prompterEvalBtn.addEventListener("click", () => {
      switchTab("panel-eval");
    });
  }

  // Tab 4 Studio Rec Toggle Button
  if (evalRecBtn) {
    evalRecBtn.addEventListener("click", async () => {
      if (rehearsalRecorder.isRecording) {
        rehearsalRecorder.stopRecording();
      } else {
        const started = await rehearsalRecorder.startRecording();
        if (started) {
          showToast("🔴 Perekaman suara dimulai! Bacalah Mazmur dengan tenang & khidmat.", "🎙️");
        }
      }
    });
  }

  // Tab 4 Re-record Button
  if (btnEvalRerecord) {
    btnEvalRerecord.addEventListener("click", async () => {
      if (rehearsalRecorder.isRecording) {
        rehearsalRecorder.stopRecording();
      } else {
        const started = await rehearsalRecorder.startRecording();
        if (started) {
          showToast("🔴 Merekam ulang! Bacalah teks mazmur untuk mengoreksi nilai Anda.", "🎙️");
        }
      }
    });
  }

  // Tab 4 Simulate Button (Fallback Demo / Non-mic environments)
  if (btnEvalSimulate) {
    btnEvalSimulate.addEventListener("click", () => {
      const simReport = rehearsalRecorder.simulateRecording(currentPsalm);
      applyAnalysisToEvaluation(simReport, true);
    });
  }

  // Tab 4 Go to Prompter Button
  if (btnEvalGoPrompter) {
    btnEvalGoPrompter.addEventListener("click", () => {
      switchTab("panel-teleprompter");
      showToast("Gunakan mikrofon di atas untuk merekam sambil membaca naskah yang bergulir.", "📜");
    });
  }

  // Tab 4 Re-apply Recorded Scores Button
  if (btnReapply) {
    btnReapply.addEventListener("click", () => {
      if (evaluator.lastRecordingReport) {
        evaluator.evaluateFromRecording(evaluator.lastRecordingReport, currentPsalm);
        syncSlidersWithEvaluator();
        const originBadge = document.getElementById("eval-score-origin-badge");
        if (originBadge) {
          originBadge.textContent = "Skor Rekaman Suara Asli";
          originBadge.className = "badge badge-praise";
        }
        updateEvaluationSummary();
        showToast("↺ Skor diselaraskan kembali ke hasil rekaman suara Anda!", "🎙️");
      }
    });
  }
}

// Sinkronkan Posisi Slider dengan Skor Evaluator
function syncSlidersWithEvaluator() {
  document.querySelectorAll(".eval-range-slider").forEach(sl => {
    const id = sl.getAttribute("data-criteria-id");
    if (evaluator.scores[id] !== undefined) {
      sl.value = evaluator.scores[id];
      const valLabel = document.getElementById(`score-val-${id}`);
      if (valLabel) valLabel.textContent = `${evaluator.scores[id]} / 5`;
    }
  });
}

// Terapkan Laporan Analisis Rekaman Suara ke Panel Evaluasi Mandiri
function applyAnalysisToEvaluation(analysisReport, isSimulation = false) {
  if (!analysisReport) return;

  // 1. Jalankan kalkulasi obyektif VAIEPP dari rekaman suara nyata
  const evalResult = evaluator.evaluateFromRecording(analysisReport, currentPsalm);

  // 2. Sinkronkan slider dengan skor hasil rekaman
  syncSlidersWithEvaluator();

  // 3. Tampilkan dashboard hasil audit
  const auditDashboard = document.getElementById("eval-audit-dashboard");
  if (auditDashboard) auditDashboard.style.display = "block";

  // 4. Update pemutar audio
  const audioPlayer = document.getElementById("eval-audio-player");
  if (audioPlayer) {
    if (analysisReport.audioUrl) {
      audioPlayer.src = analysisReport.audioUrl;
      audioPlayer.style.display = "block";
    } else {
      audioPlayer.style.display = "none";
    }
  }

  // 5. Update label timestamp & sumber skor
  const timestampLabel = document.getElementById("audit-timestamp-label");
  if (timestampLabel) {
    const timeStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    timestampLabel.textContent = isSimulation 
      ? `⚡ Simulasi Audio (${timeStr})`
      : `🎙️ Rekaman Asli (${timeStr})`;
  }

  const sourceBadge = document.getElementById("eval-rec-source-badge");
  const sourceText = document.getElementById("eval-rec-source-text");
  if (sourceBadge && sourceText) {
    sourceBadge.className = isSimulation ? "eval-source-badge badge-template" : "eval-source-badge badge-recorded";
    sourceText.textContent = isSimulation
      ? "Status: Berdasarkan Simulasi Audio Realistis"
      : "Status: 100% Berdasarkan Hasil Rekaman Suara Anda";
  }

  const originBadge = document.getElementById("eval-score-origin-badge");
  if (originBadge) {
    originBadge.textContent = isSimulation ? "Skor Simulasi Rekaman" : "Skor Rekaman Suara Asli";
    originBadge.className = isSimulation ? "badge badge-trust" : "badge badge-praise";
  }

  const subtitleEl = document.getElementById("eval-slider-subtitle");
  if (subtitleEl) {
    subtitleEl.innerHTML = `Skor di bawah ini telah diselaraskan secara obyektif dari analisis rekaman suara Anda (${analysisReport.durationSeconds}s, ${evalResult.recordedFindings.wpm} WPM, ${evalResult.recordedFindings.wordAccuracyPct}% akurasi diksi TB2).`;
  }

  const btnReapply = document.getElementById("btn-reapply-recorded");
  if (btnReapply) btnReapply.style.display = "inline-flex";

  // 6. Render 5 Pilar Metrik Akustik & Diksi
  renderAuditMetricsGrid(analysisReport, evalResult.recordedFindings);

  // 7. Update ringkasan, rank, & diagnosa mendalam
  updateEvaluationSummary();

  // 8. Notifikasi toast
  if (isSimulation) {
    showToast("⚡ Simulasi rekaman selesai! Evaluasi dihitung dari parameter audio liturgis realistis.", "⚡");
  } else {
    showToast("✅ Rekaman berhasil dianalisis! Skor 6 pilar VAIEPP diselaraskan dari suara Anda.", "🎙️");
  }
}

// Render 5 Kotak Metrik Akustik & Fonetik
function renderAuditMetricsGrid(report, rf) {
  const container = document.getElementById("audit-metrics-row");
  if (!container || !rf) return;

  const wpmStatus = rf.wpm >= 65 && rf.wpm <= 85 
    ? `<span style="color: #34d399; font-weight: 700;">✓ Ideal Liturgis</span>` 
    : (rf.wpm > 85 ? `<span style="color: #f87171; font-weight: 700;">⚠️ Terlalu Cepat</span>` : `<span style="color: #fbbf24; font-weight: 700;">⚠️ Agak Lambat</span>`);

  const diksiStatus = rf.wordAccuracyPct >= 85 
    ? `<span style="color: #34d399; font-weight: 700;">✓ Sangat Fasih</span>`
    : `<span style="color: #fbbf24; font-weight: 700;">Perlu Penajaman</span>`;

  const stabilitasStatus = rf.stability >= 80 
    ? `<span style="color: #34d399; font-weight: 700;">✓ Stabil & Bulat</span>`
    : `<span style="color: #fbbf24; font-weight: 700;">Fluktuatif</span>`;

  const heningStatus = rf.initialPauseSec >= 1.2 && rf.finalSilenceSec >= 1.2
    ? `<span style="color: #34d399; font-weight: 700;">✓ Hening Agung</span>`
    : `<span style="color: #fbbf24; font-weight: 700;">Perlu Lebih Tenang</span>`;

  container.innerHTML = `
    <!-- Metric 1: WPM & Durasi -->
    <div class="audit-metric-pill">
      <div class="audit-metric-label">
        <span>⏱️</span>
        <span>Tempo & Durasi</span>
      </div>
      <div class="audit-metric-val">${rf.wpm} <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">WPM</span></div>
      <div class="audit-metric-sub">
        Durasi total <strong>${rf.durationSeconds} detik</strong> • ${wpmStatus}
      </div>
    </div>

    <!-- Metric 2: Jeda Sakral Liturgis -->
    <div class="audit-metric-pill">
      <div class="audit-metric-label">
        <span>⏸️</span>
        <span>Jeda Sakral (// & /)</span>
      </div>
      <div class="audit-metric-val">${rf.longPausesCount} <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">Caesura</span></div>
      <div class="audit-metric-sub">
        Total <strong>${rf.silenceCount} jeda hening</strong> (${rf.shortPausesCount || 0} jeda nafas pendek)
      </div>
    </div>

    <!-- Metric 3: Akurasi Diksi TB2 -->
    <div class="audit-metric-pill">
      <div class="audit-metric-label">
        <span>🗣️</span>
        <span>Kecocokan Diksi TB2</span>
      </div>
      <div class="audit-metric-val">${rf.wordAccuracyPct}%</div>
      <div class="audit-metric-sub">
        ${diksiStatus} • ${rf.matchedKeyWords && rf.matchedKeyWords.length > 0 ? `Kata kunci: <em>${rf.matchedKeyWords.slice(0, 2).join(", ")}</em>` : 'Pelafalan terverifikasi'}
      </div>
    </div>

    <!-- Metric 4: Stabilitas Vokal RMS -->
    <div class="audit-metric-pill">
      <div class="audit-metric-label">
        <span>🌊</span>
        <span>Stabilitas Vokal</span>
      </div>
      <div class="audit-metric-val">${rf.stability}%</div>
      <div class="audit-metric-sub">
        ${stabilitasStatus} • Resonansi rongga diafragma
      </div>
    </div>

    <!-- Metric 5: Ketenangan Mimbar -->
    <div class="audit-metric-pill">
      <div class="audit-metric-label">
        <span>🏛️</span>
        <span>Ketenangan Mimbar</span>
      </div>
      <div class="audit-metric-val">${rf.initialPauseSec}s / ${rf.finalSilenceSec}s</div>
      <div class="audit-metric-sub">
        ${heningStatus} • Hening awal & akhir sakral
      </div>
    </div>
  `;
}



function updateEvaluationSummary() {
  const result = evaluator.calculateTotal();
  const rankEl = document.getElementById("eval-rank-badge");
  const pctEl = document.getElementById("eval-percentage-text");
  const descEl = document.getElementById("eval-summary-desc");
  const weakListEl = document.getElementById("eval-weak-areas");

  if (rankEl) {
    rankEl.textContent = result.rank;
    rankEl.className = `badge ${result.badgeClass}`;
  }
  if (pctEl) pctEl.textContent = `${result.percentage}% (${result.totalScore}/${result.maxScore})`;
  if (descEl) descEl.textContent = result.summaryText;

  if (weakListEl) {
    if (result.percentage >= 95) {
      weakListEl.innerHTML = `<li style="color: #34d399; list-style: none;">✨ <strong>Luar Biasa!</strong> Seluruh pilar pembacaan Anda telah mencapai nilai sempurna. Jaga kerendahan hati batin dan kekudusan mimbar saat bertugas.</li>`;
    } else {
      const diagnostics = evaluator.getDeepDiagnostics(currentPsalm);
      const imperfect = diagnostics.filter(d => d.score < 5);
      weakListEl.innerHTML = imperfect.map(d => `
        <li style="margin-bottom: 0.6rem;">
          <strong style="color: var(--gold-light);">${d.label} (${d.score}/5):</strong>
          <span style="color: #e2e8f0;">Fokus pada <em>"${d.targetPhrase}"</em> (${d.criticalReason})</span>
        </li>
      `).join("");
    }
  }

  // Render Modul Bedah Diagnosis & Resep Nilai Sempurna
  renderDeepDiagnostics();
}

function renderDeepDiagnostics() {
  const container = document.getElementById("eval-diagnostics-container");
  if (!container) return;

  const diagnostics = evaluator.getDeepDiagnostics(currentPsalm);
  let html = "";

  diagnostics.forEach(d => {
    const isPerfect = d.score === 5;
    const badgeClass = isPerfect ? "badge-praise" : (d.score <= 2 ? "badge-lament" : "badge-solemn");
    const badgeText = isPerfect ? "Sempurna (5/5) ✦ Paripurna" : `Skor: ${d.score}/5 • Perlu Pembenahan`;

    html += `
      <div class="diag-card ${isPerfect ? 'is-perfect' : 'needs-work'}">
        <div class="diag-card-head">
          <div class="diag-pillar-name">
            <span>${d.icon}</span>
            <span>Pilar ${d.pillarName}</span>
          </div>
          <span class="diag-score-badge badge ${badgeClass}">
            ${badgeText}
          </span>
        </div>

        <div class="diag-subgrid">
          <!-- 1. APA YANG HARUS DIPERBAIKI DARI CARA MEMBACA -->
          <div class="diag-box diag-box-error">
            <div class="diag-box-label">
              <span>⚠️</span>
              <span>Apa yang Harus Diperbaiki dari Cara Membaca:</span>
            </div>
            <ul class="diag-error-list">
              ${d.commonErrors.map(err => `<li>${err}</li>`).join("")}
            </ul>
          </div>

          <!-- 2. DI TEKS MANA KESALAHAN INI SERING TERJADI -->
          <div class="diag-box diag-box-target">
            <div class="diag-box-label">
              <span>📍</span>
              <span>Di Bagian Teks Mana Kesalahan Ini Sering Terjadi? (${currentPsalm.title}):</span>
            </div>
            <div class="diag-target-verse-quote">
              "${d.targetPhrase}"
            </div>
            <p class="diag-target-reason">
              ${d.criticalReason}
            </p>
            <div style="margin-top: 0.75rem;">
              <button class="btn btn-outline btn-sm jump-to-verse-btn" data-verse-num="${d.targetVerseNum}">
                📖 Buka & Latih Ayat ${d.targetVerseNum} Ini di Studio
              </button>
            </div>
          </div>

          <!-- 3. MASUKAN CARA MEMBACA YANG BENAR AGAR MENDAPAT NILAI SEMPURNA -->
          <div class="diag-box diag-box-perfection">
            <div class="diag-box-label">
              <span>🏆</span>
              <span>Masukan Cara Membaca yang Benar agar Mendapat Nilai Sempurna (5/5):</span>
            </div>
            <div class="diag-perfection-steps">
              <div class="diag-step-item">
                <strong>1. Penempatan Fisik / Vokal:</strong>
                <span>${d.perfectionGuide.instruction}</span>
              </div>
              <div class="diag-step-item">
                <strong>2. Latihan Praktis Mandiri:</strong>
                <span>${d.perfectionGuide.practicalExercise}</span>
              </div>
              <div class="diag-step-item" style="margin-bottom: 0;">
                <strong>3. Standar Nilai Sempurna (5/5):</strong>
                <span style="color: #fed7aa;">${d.perfectionGuide.perfectionCriteria}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Jump to verse button handler
  container.querySelectorAll(".jump-to-verse-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const vNum = btn.getAttribute("data-verse-num");
      switchTab("panel-verses");
      setTimeout(() => {
        const card = document.getElementById(`verse-card-${vNum}`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "start" });
          card.style.outline = "2px solid var(--gold-primary)";
          setTimeout(() => { card.style.outline = ""; }, 2500);
        }
      }, 150);
    });
  });
}

// -------------------------------------------------------------
// FLOATING SOUNDBAR & AMBIENT DRONE
// -------------------------------------------------------------
function initSoundbar() {
  const droneToggle = document.getElementById("btn-ambient-drone");
  const chimeBtn = document.getElementById("btn-floating-chime");

  if (droneToggle) {
    droneToggle.addEventListener("click", () => {
      const isPlaying = audioEngine.toggleAmbientDrone();
      droneToggle.innerHTML = isPlaying 
        ? "<span>🔊</span> <span>Ambient Hening Batin (Aktif)</span>" 
        : "<span>🔇</span> <span>Ambient Hening Batin (Mati)</span>";
      droneToggle.style.color = isPlaying ? "#34d399" : "var(--gold-light)";
    });
  }

  if (chimeBtn) {
    chimeBtn.addEventListener("click", () => {
      audioEngine.playSingingBowl(216, 6.0);
    });
  }
}

// -------------------------------------------------------------
// MODALS (PUSTAKA PRESET & INPUT MAZMUR BARU)
// -------------------------------------------------------------
function renderLibraryLists(modal) {
  const customContainer = document.getElementById("custom-psalm-cards-container");
  const presetContainer = document.getElementById("preset-cards-container");
  const customList = getCustomLibrary();

  updateLibraryCountBadge();

  // 1. Render Pustaka Mazmur Saya (Kustom & Tersimpan Otomatis)
  if (customContainer) {
    if (customList.length === 0) {
      customContainer.innerHTML = `
        <div class="empty-custom-note">
          <span style="font-size: 1.3rem;">📂</span><br/>
          <strong style="color: var(--gold-light);">Pustaka Mazmur Anda Masih Kosong</strong><br/>
          <span style="font-size: 0.82rem; color: #94a3b8;">
            Teks Mazmur yang Anda masukkan pada formulir di bawah akan <strong>secara otomatis tersimpan di sini</strong> dan dapat dibuka kembali kapan saja.
          </span>
        </div>
      `;
    } else {
      let customHtml = "";
      customList.forEach(item => {
        const isActive = currentPsalm && currentPsalm.id === item.id;
        customHtml += `
          <div class="preset-card custom-preset ${isActive ? 'active-psalm' : ''}" data-psalm-id="${item.id}">
            <div>
              <div class="preset-card-head-row">
                <div class="badge badge-trust" style="font-size: 0.68rem;">⭐ PUSTAKA SAYA</div>
                <button class="btn-delete-psalm" data-delete-id="${item.id}" title="Hapus naskah ini dari Pustaka Saya">🗑️</button>
              </div>
              <div class="preset-card-title">${item.title}</div>
              <div class="preset-card-desc">${item.subtitle || (item.refren ? 'Refren: ' + item.refren : 'Naskah Mazmur TB2')}</div>
            </div>
            <div style="font-size: 0.72rem; color: #38bdf8; margin-top: 0.6rem; display: flex; align-items: center; justify-content: space-between; border-top: 1px dashed rgba(56,189,248,0.25); padding-top: 0.45rem;">
              <span>📖 ${item.verses.length} Ayat</span>
              <span style="color: #94a3b8;">${item.createdDateFormatted || 'Tersimpan'}</span>
            </div>
          </div>
        `;
      });
      customContainer.innerHTML = customHtml;

      // Listener klik untuk membuka mazmur kustom tersimpan
      customContainer.querySelectorAll(".preset-card").forEach(card => {
        card.addEventListener("click", (e) => {
          if (e.target.closest(".btn-delete-psalm")) return;
          const id = card.getAttribute("data-psalm-id");
          const found = customList.find(p => p.id === id);
          if (found) {
            loadPsalm(found);
            renderLibraryLists(modal);
            modal.classList.remove("active");
            switchTab("panel-verses");
            showToast(`Mazmur '${found.title}' dibuka dari Pustaka Saya.`, "📖");
          }
        });
      });

      // Listener klik tombol hapus naskah
      customContainer.querySelectorAll(".btn-delete-psalm").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const deleteId = btn.getAttribute("data-delete-id");
          const target = customList.find(p => p.id === deleteId);
          const targetTitle = target ? target.title : "Naskah Mazmur";

          if (confirm(`Apakah Anda yakin ingin menghapus '${targetTitle}' dari Pustaka Saya?`)) {
            const updated = customList.filter(p => p.id !== deleteId);
            saveCustomLibrary(updated);
            renderLibraryLists(modal);
            showToast(`'${targetTitle}' telah dihapus dari Pustaka.`, "🗑️");

            if (currentPsalm && currentPsalm.id === deleteId) {
              loadPsalm(psalmPresets[0]);
            }
          }
        });
      });
    }
  }

  // 2. Render Pustaka Preset Masterclass TB2 Resmi
  if (presetContainer) {
    let presetHtml = "";
    psalmPresets.forEach(preset => {
      const isActive = currentPsalm && currentPsalm.id === preset.id;
      presetHtml += `
        <div class="preset-card ${isActive ? 'active-psalm' : ''}" data-preset-id="${preset.id}">
          <div>
            <div class="badge badge-gold" style="font-size: 0.68rem; margin-bottom: 0.35rem;">🏛️ PRESET MASTERCLASS</div>
            <div class="preset-card-title">${preset.title}</div>
            <div class="preset-card-desc">${preset.subtitle}</div>
          </div>
          <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 0.6rem; display: flex; justify-content: space-between; border-top: 1px dashed rgba(212,175,55,0.25); padding-top: 0.45rem;">
            <span>📖 ${preset.verses.length} Ayat</span>
            <span style="color: var(--gold-light);">${preset.genre.split("(")[0]}</span>
          </div>
        </div>
      `;
    });
    presetContainer.innerHTML = presetHtml;

    presetContainer.querySelectorAll(".preset-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-preset-id");
        const found = psalmPresets.find(p => p.id === id);
        if (found) {
          loadPsalm(found);
          renderLibraryLists(modal);
          modal.classList.remove("active");
          switchTab("panel-verses");
          showToast(`Mazmur '${found.title}' berhasil dimuat.`, "📖");
        }
      });
    });
  }
}

function initModalListeners() {
  const modal = document.getElementById("modal-psalm-picker");
  const openBtn = document.getElementById("btn-open-picker");
  const closeBtn = document.getElementById("btn-close-picker");
  const analyzeBtn = document.getElementById("btn-run-analysis");
  const rawTextarea = document.getElementById("input-custom-text");
  const customTitleInput = document.getElementById("input-custom-title");
  const printBtn = document.getElementById("btn-print-sheet");

  // Print Action
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Open & Close Modal
  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      renderLibraryLists(modal);
      modal.classList.add("active");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });

  // Render awal isi pustaka
  renderLibraryLists(modal);

  // Handle Input Mazmur Baru -> Otomatis Analisis & Simpan ke Pustaka
  if (analyzeBtn && rawTextarea) {
    analyzeBtn.addEventListener("click", () => {
      const text = rawTextarea.value.trim();
      const title = customTitleInput ? customTitleInput.value.trim() : "";

      if (!text) {
        alert("Silakan masukkan teks bacaan Mazmur terlebih dahulu.");
        return;
      }

      try {
        analyzeBtn.textContent = "⏳ Membedah & Menyimpan ke Pustaka...";
        analyzeBtn.disabled = true;

        setTimeout(() => {
          const analyzedData = analyzer.analyzePsalm(text, title);
          analyzedData.isCustom = true;
          analyzedData.createdAt = new Date().toISOString();
          analyzedData.createdDateFormatted = new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }).format(new Date());

          // OTOMATIS TAMBAHKAN KE DAFTAR PUSTAKA MAZMUR (localStorage)
          const currentLib = getCustomLibrary();
          const existingIdx = currentLib.findIndex(
            p => p.title.toLowerCase() === analyzedData.title.toLowerCase() && p.verses.length === analyzedData.verses.length
          );

          if (existingIdx >= 0) {
            currentLib[existingIdx] = analyzedData;
          } else {
            currentLib.unshift(analyzedData);
          }

          saveCustomLibrary(currentLib);

          // Muat Mazmur ke Layar
          loadPsalm(analyzedData);

          // Perbarui tampilan Pustaka di modal
          renderLibraryLists(modal);

          // Kosongkan formulir input
          rawTextarea.value = "";
          if (customTitleInput) customTitleInput.value = "";

          // Tutup modal dan beralih ke tab ayat
          modal.classList.remove("active");
          switchTab("panel-verses");

          // Berikan notifikasi toast elegan
          showToast(`✨ Mazmur '${analyzedData.title}' berhasil dibedah dan otomatis ditambahkan ke Pustaka!`, "💾");

          analyzeBtn.textContent = "✦ Analisis & Otomatis Simpan ke Pustaka";
          analyzeBtn.disabled = false;
        }, 350);
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menganalisis teks: " + err.message);
        analyzeBtn.textContent = "✦ Analisis & Otomatis Simpan ke Pustaka";
        analyzeBtn.disabled = false;
      }
    });
  }
}
