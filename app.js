// ===== PENGATURAN =====
// Tempel link Web App dari Google Apps Script (spreadsheet) di antara tanda kutip.
// Contoh: "https://script.google.com/macros/s/XXXXXXXX/exec"
// Kalau dikosongkan, website tetap jalan normal tanpa mencatat apa pun.
const WEB_APP_URL = "";

// ===== KODE (tidak perlu diubah) =====
function kirim(data) {
  if (!WEB_APP_URL) return;
  data.page = location.href;
  data.ua = navigator.userAgent;
  try {
    fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });
  } catch (err) {}
}

// Catat setiap kali website dibuka
kirim({ type: "kunjungan" });

// Catat setiap kali salah satu tombol ditekan
document.querySelectorAll("nav a").forEach(function (a) {
  a.addEventListener("click", function () {
    kirim({ type: "klik", target: a.textContent.trim() });
  });
});
