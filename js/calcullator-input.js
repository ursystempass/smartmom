document.addEventListener("DOMContentLoaded", function () {

    let user = JSON.parse(localStorage.getItem("smartmom_user"));

    // =========================
    // CEK LOGIN
    // =========================
    if (!user) {
        alert("Silakan login terlebih dahulu");
        window.location.href = "sign in.html";
        return;
    }

    // =========================
    // AMBIL ELEMENT
    // =========================
    const namaInput = document.getElementById("namaAnak");
    const lahirInput = document.getElementById("tglLahir");
    const tglUkurInput = document.getElementById("tglUkur");

    const beratInput = document.getElementById("berat");
    const tinggiInput = document.getElementById("tinggi");
    const kepalaInput = document.getElementById("kepala");

    const genderButtons = document.querySelectorAll(".gender");
    const usiaText = document.querySelector(".text-sm");

    let selectedGender = "";

    // =========================
    // LOAD DATA JIKA ADA
    // =========================
    if (user.anak) {
        namaInput.value = user.anak.nama;
        lahirInput.value = user.anak.tglLahir;

        namaInput.disabled = true;
        lahirInput.disabled = true;

        selectedGender = user.anak.gender || "";

        // auto isi tanggal hari ini
        tglUkurInput.value = new Date().toISOString().split("T")[0];
    }

    // =========================
    // HITUNG USIA OTOMATIS
    // =========================
    lahirInput.addEventListener("change", () => {

        const lahir = new Date(lahirInput.value);
        const sekarang = new Date();

        let bulan =
            (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
            (sekarang.getMonth() - lahir.getMonth());

        if (!isNaN(bulan)) {
            usiaText.innerText = "Usia anak : " + bulan + " bulan";
        }
    });

    // =========================
    // PILIH GENDER
    // =========================
    genderButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            genderButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            selectedGender = btn.innerText;
        });
    });

    // =========================
    // SIMPAN DATA
    // =========================
    document.getElementById("btnSimpan").addEventListener("click", function () {

        const nama = namaInput.value.trim();
        const tglLahir = lahirInput.value;
        const tglUkur = tglUkurInput.value;

        const berat = parseFloat(beratInput.value);
        const tinggi = parseFloat(tinggiInput.value);
        const kepala = parseFloat(kepalaInput.value);

        // =========================
        // VALIDASI
        // =========================
        if (!nama || !tglLahir || !tglUkur) {
            alert("Lengkapi data anak terlebih dahulu!");
            return;
        }

        if (!berat || !tinggi || !kepala) {
            alert("Lengkapi data pengukuran!");
            return;
        }

        if (!selectedGender) {
            alert("Pilih jenis kelamin!");
            return;
        }

        if (berat <= 0 || tinggi <= 0 || kepala <= 0) {
            alert("Data tidak valid!");
            return;
        }

        // =========================
        // SIMPAN KE USER
        // =========================
        if (!user.anak) {
            user.anak = {
                nama: nama,
                tglLahir: tglLahir,
                gender: selectedGender,
                pengukuran: []
            };
        }

        user.anak.pengukuran.push({
            tgl: tglUkur,
            berat: berat,
            tinggi: tinggi,
            kepala: kepala
        });

        localStorage.setItem("smartmom_user", JSON.stringify(user));

        // =========================
        // REDIRECT
        // =========================
        window.location.href = "calcullator-analisis.html";

    });

});