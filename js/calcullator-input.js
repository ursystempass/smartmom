document.addEventListener("DOMContentLoaded", function () {

    let data = JSON.parse(localStorage.getItem("data_anak"));

    const namaInput = document.getElementById("namaAnak");
    const lahirInput = document.getElementById("tglLahir");
    const tglUkurInput = document.getElementById("tglUkur");

    const beratInput = document.getElementById("berat");
    const tinggiInput = document.getElementById("tinggi");
    const kepalaInput = document.getElementById("kepala");

    const genderButtons = document.querySelectorAll(".gender");


    /* =====================
    CEK DATA ANAK
    ===================== */

    if (data) {

        namaInput.value = data.nama;
        lahirInput.value = data.tglLahir;

        namaInput.disabled = true;
        lahirInput.disabled = true;

    }


    /* =====================
    PILIH GENDER
    ===================== */

    genderButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            genderButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

        });

    });


    /* =====================
    SIMPAN DATA
    ===================== */

    document.getElementById("btnSimpan").addEventListener("click", function () {

        let gender = "";

        genderButtons.forEach(btn => {
            if (btn.classList.contains("active")) {
                gender = btn.innerText;
            }
        });


        let dataAnak = JSON.parse(localStorage.getItem("data_anak"));

        if (!dataAnak) {

            dataAnak = {

                nama: namaInput.value,
                tglLahir: lahirInput.value,
                gender: gender,
                pengukuran: []

            };

        }


        dataAnak.pengukuran.push({

            tgl: tglUkurInput.value,
            berat: beratInput.value,
            tinggi: tinggiInput.value,
            kepala: kepalaInput.value

        });


        localStorage.setItem("data_anak", JSON.stringify(dataAnak));

        window.location.href = "calcullator-analisis.html";

    });

});