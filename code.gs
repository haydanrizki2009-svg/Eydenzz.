// Tempel kode ini di spreadsheet: Extensions > Apps Script
// Lalu Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone)

const SHEET_NAME = "Log";

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["Waktu", "Jenis", "Tombol", "Halaman", "Perangkat"]);
    sh.setFrozenRows(1);
  }
  return sh;
}

// Menerima data dari app.js dan menyimpannya sebagai baris baru
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const d = JSON.parse(e.postData.contents);
    getSheet_().appendRow([new Date(), d.type || "", d.target || "", d.page || "", d.ua || ""]);
  } catch (err) {
    // abaikan data yang tidak valid
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

// Untuk mengecek web app aktif: buka link-nya di browser
function doGet() {
  return json_({ ok: true, message: "Web app aktif" });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
