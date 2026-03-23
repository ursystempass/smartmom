document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("smartmom_user"));

    if (!user || !user.anak) {
        alert("Data anak belum diisi");
        window.location.href = "calcullator-input.html";
        return;
    }

    const data = user.anak;

    if (!data.pengukuran || data.pengukuran.length === 0) {
        alert("Belum ada data pengukuran");
        window.location.href = "calcullator-input.html";
        return;
    }

    const pengukuran = data.pengukuran[data.pengukuran.length - 1];

    const berat = pengukuran.berat;
    const tinggi = pengukuran.tinggi;
    const kepala = pengukuran.kepala;

    const lahir = new Date(data.tglLahir);
    const sekarang = new Date();

    let bulan =
        (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
        (sekarang.getMonth() - lahir.getMonth());

    document.getElementById("namaAnak").innerText =
        data.nama + " - " + bulan + " Bulan";

    let statusBerat = (bulan < 12)
        ? (berat < 7 ? "Kurang" : "Normal")
        : (berat < 8.5 ? "Kurang" : "Normal");

    let statusTinggi = (bulan < 12)
        ? (tinggi < 65 ? "Kurang" : "Normal")
        : (tinggi < 72 ? "Kurang" : "Normal");

    let statusKepala = kepala < 40 ? "Kurang" : "Normal";

    document.getElementById("statusBerat").innerText = statusBerat;
    document.getElementById("statusTinggi").innerText = statusTinggi;
    document.getElementById("statusKepala").innerText = statusKepala;

    let current = 0;
    let target = Math.min(score, 100);

    const scoreText = document.getElementById("score");

    const interval = setInterval(() => {

        if (current >= target) {
            clearInterval(interval);
            scoreText.innerText = target; 
            return;
        }

        current++;
        scoreText.innerText = current;

    }, 20);

    let jumlahKurang = [statusBerat, statusTinggi, statusKepala]
        .filter(s => s === "Kurang").length;

    let statusUtama = "";

    if (jumlahKurang === 0) {
        statusUtama = "Pertumbuhan Optimal";
    } else if (jumlahKurang === 1) {
        statusUtama = "Perlu Perhatian";
    } else {
        statusUtama = "Perlu Evaluasi";
    }

    document.getElementById("statusUtama").innerText = statusUtama;
    const circle = document.querySelector(".score-circle");

    if (score >= 80) {
        circle.style.background = "conic-gradient(#4ade80 0deg, #4ade80 360deg)";
    } else if (score >= 60) {
        circle.style.background = "conic-gradient(#facc15 0deg, #facc15 360deg)";
    } else {
        circle.style.background = "conic-gradient(#f87171 0deg, #f87171 360deg)";
    }

    let insight = "";

    if (statusUtama === "Pertumbuhan Optimal") {
        insight = "Perkembangan anak sangat baik 👍 Pertahankan pola makan dan stimulasi yang konsisten.";
    }
    else if (statusUtama === "Perlu Perhatian") {
        insight = "Ada indikator yang perlu diperhatikan. Tingkatkan asupan nutrisi dan stimulasi anak.";
    }
    else {
        insight = "Beberapa indikator kurang optimal. Disarankan konsultasi dengan tenaga kesehatan.";
    }

    document.getElementById("insightText").innerText = insight;

    let rekomendasi = [];

    // Berdasarkan usia
    if (bulan < 6) {
        rekomendasi.push("Fokus pada ASI eksklusif dan bonding dengan ibu");
        rekomendasi.push("Lakukan tummy time untuk melatih otot bayi");
    }
    else if (bulan <= 12) {
        rekomendasi.push("Mulai MPASI dengan protein tinggi dan zat besi");
        rekomendasi.push("Latih duduk, merangkak, dan motorik kasar");
    }
    else {
        rekomendasi.push("Berikan makanan keluarga dengan gizi seimbang");
        rekomendasi.push("Ajak anak aktif bermain dan eksplorasi lingkungan");
    }

    if (statusBerat === "Kurang") {
        rekomendasi.push("Tambahkan protein seperti telur, ikan, dan ayam");
    }

    if (statusTinggi === "Kurang") {
        rekomendasi.push("Perhatikan asupan kalsium dan vitamin D");
    }

    if (statusKepala === "Kurang") {
        rekomendasi.push("Segera konsultasikan dengan tenaga kesehatan");
    }

    if (score < 60) {
        rekomendasi.push("Lakukan evaluasi pertumbuhan secara rutin setiap bulan");
    }

    if (jumlahKurang === 0) {
        rekomendasi.push("Pertahankan pola makan dan stimulasi anak 👍");
    }

    const list = document.getElementById("rekomendasiList");
    list.innerHTML = "";

    rekomendasi.forEach(item => {
        const li = document.createElement("li");
        li.innerText = "• " + item;
        list.appendChild(li);
    });

});