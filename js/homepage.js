document.addEventListener("DOMContentLoaded", function () {

    console.log("Homepage aktif");

    /* =========================
       CEK LOGIN
    ========================= */

    const loginStatus = localStorage.getItem("login_status");

    if (!loginStatus) {
        window.location.href = "/html/sign in.html";
    }



    /* =========================
       AMBIL DATA ANAK
    ========================= */

    const data = JSON.parse(localStorage.getItem("data_anak"));

    const emptyState = document.getElementById("emptyState");
    const cardsSection = document.getElementById("cardsSection");

    if (data) {

        emptyState.style.display = "none";
        cardsSection.style.display = "";

        const lahir = new Date(data.tglLahir);
        const sekarang = new Date();

        let bulan =
            (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
            (sekarang.getMonth() - lahir.getMonth());

        document.getElementById("usiaAnak").innerText = bulan + " bulan";

        document.getElementById("updateTerakhir").innerText = data.tglUkur;

        document.getElementById("statusBulan").innerText = "Sudah diisi";

    }



    /* =========================
       LOGOUT SYSTEM
    ========================= */

    const logoutBtn = document.getElementById("logoutBtn");
    const popup = document.getElementById("logoutPopup");
    const cancelBtn = document.getElementById("cancelLogout");
    const confirmBtn = document.getElementById("confirmLogout");

    logoutBtn.addEventListener("click", function () {

        popup.classList.add("active");

    });

    cancelBtn.addEventListener("click", function () {

        popup.classList.remove("active");

    });

    confirmBtn.addEventListener("click", function () {

        localStorage.removeItem("login_status");

        window.location.href = "/html/sign in.html";

    });



    /* =========================
       MILESTONE PROGRESS
    ========================= */

    const checkboxes = document.querySelectorAll(".milestone input");
    const progressText = document.getElementById("milestoneProgress");

    function updateProgress() {

        let total = checkboxes.length;
        let checked = 0;

        checkboxes.forEach(box => {

            if (box.checked) checked++;

        });

        progressText.innerText = checked + "/" + total + " Terselesaikan";

    }

    checkboxes.forEach(box => {

        box.addEventListener("change", updateProgress);

    });

});