document.addEventListener("DOMContentLoaded", function () {

    const data = JSON.parse(localStorage.getItem("data_anak"));

    if (!data) {
        alert("Data anak belum diisi");
        window.location.href = "calcullator-input.html";
        return;
    }

    const nama = data.nama;
    const tglLahir = data.tglLahir;

    const berat = data.pengukuran.berat;
    const tinggi = data.pengukuran.tinggi;
    const kepala = data.pengukuran.kepala;

    /* =========================
       HITUNG USIA
    ========================= */

    const lahir = new Date(tglLahir);
    const sekarang = new Date();

    let bulan =
        (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
        (sekarang.getMonth() - lahir.getMonth());



    /* =========================
       MASUKKAN KE HTML
    ========================= */

    document.querySelector("h2").innerText =
        nama + " - " + bulan + " Bulan";



    /* =========================
       ANALISIS SEDERHANA
    ========================= */

    let statusBerat = "Normal";
    let statusTinggi = "Normal";
    let statusKepala = "Normal";

    if (berat < 7) statusBerat = "Kurang";
    if (tinggi < 65) statusTinggi = "Kurang";
    if (kepala < 40) statusKepala = "Kurang";



    const cards = document.querySelectorAll(".mini-card span");

    cards[0].innerText = statusBerat;
    cards[1].innerText = statusTinggi;
    cards[2].innerText = statusKepala;

});