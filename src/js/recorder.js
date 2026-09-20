// recorder.js - Perekam Suara Latihan Interaktif (MediaRecorder API)

export class AudioRehearsalRecorder {
  constructor(onTimerTick, onStateChange) {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioBlob = null;
    this.audioUrl = null;
    this.timerInterval = null;
    this.secondsElapsed = 0;
    this.isRecording = false;
    this.onTimerTick = onTimerTick || (() => {});
    this.onStateChange = onStateChange || (() => {});
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.audioBlob = new Blob(this.audioChunks, { type: "audio/webm;codecs=opus" });
        if (this.audioUrl) {
          URL.revokeObjectURL(this.audioUrl);
        }
        this.audioUrl = URL.createObjectURL(this.audioBlob);
        this.onStateChange("stopped", this.audioUrl);
        // Hentikan semua track mikrofon
        stream.getTracks().forEach(track => track.stop());
      };

      this.mediaRecorder.start(250); // potong per 250ms
      this.isRecording = true;
      this.secondsElapsed = 0;
      this.onTimerTick("00:00");
      this.onStateChange("recording", null);

      this.timerInterval = setInterval(() => {
        this.secondsElapsed++;
        const mins = String(Math.floor(this.secondsElapsed / 60)).padStart(2, "0");
        const secs = String(this.secondsElapsed % 60).padStart(2, "0");
        this.onTimerTick(`${mins}:${secs}`);
      }, 1000);

      return true;
    } catch (err) {
      console.error("Gagal mengakses mikrofon:", err);
      alert("Tidak dapat mengakses mikrofon. Pastikan Anda memberikan izin akses mikrofon di peramban (browser).");
      return false;
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      clearInterval(this.timerInterval);
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  getAudioBlob() {
    return this.audioBlob;
  }

  downloadRecording(filename = "latihan-mazmur.webm") {
    if (!this.audioUrl) return;
    const a = document.createElement("a");
    a.href = this.audioUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
