document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       CEK LOGIN
    ========================= */

    const loginStatus = localStorage.getItem("login_status");

    if (!loginStatus) {
        window.location.href = "/html/sign in.html";
        return;
    }

    const user = JSON.parse(localStorage.getItem("smartmom_user"));

    if (!user) {
        window.location.href = "/html/sign in.html";
        return;
    }

    /* =========================
       GREETING USER
    ========================= */

    const logoText = document.querySelector(".logo span");

    if (logoText && user.nama) {
        logoText.innerText = "Hi, " + user.nama;
    }

    /* =========================
       DATA ANAK
    ========================= */

    const data = user.anak;

    const emptyState = document.getElementById("emptyState");
    const cardsSection = document.getElementById("cardsSection");

    if (!data) {

        // BELUM ADA DATA
        if (emptyState) emptyState.style.display = "block";
        if (cardsSection) cardsSection.style.display = "none";

    } else {

        // ADA DATA
        if (emptyState) emptyState.style.display = "none";
        if (cardsSection) cardsSection.style.display = "grid";

        /* =========================
           HITUNG USIA
        ========================= */

        const lahir = new Date(data.tglLahir);
        const sekarang = new Date();

        let usiaBulan =
            (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
            (sekarang.getMonth() - lahir.getMonth());

        const usiaEl = document.getElementById("usiaAnak");

        if (usiaEl) {
            usiaEl.innerText = usiaBulan + " bulan";
        }

        /* =========================
           UPDATE TERAKHIR
        ========================= */

        if (data.pengukuran && data.pengukuran.length > 0) {

            const terakhir = data.pengukuran[data.pengukuran.length - 1];

            const updateEl = document.getElementById("updateTerakhir");

            if (updateEl) {
                updateEl.innerText = terakhir.tgl;
            }
        }
    }

    /* =========================
       LOGOUT SYSTEM
    ========================= */

    const logoutBtn = document.getElementById("logoutBtn");
    const popup = document.getElementById("logoutPopup");
    const cancelBtn = document.getElementById("cancelLogout");
    const confirmBtn = document.getElementById("confirmLogout");

    if (logoutBtn && popup) {
        logoutBtn.addEventListener("click", function () {
            popup.classList.add("active");
        });
    }

    if (cancelBtn && popup) {
        cancelBtn.addEventListener("click", function () {
            popup.classList.remove("active");
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener("click", function () {

            localStorage.removeItem("login_status");

            window.location.href = "/html/landingpage.html";
        });
    }

    /* =========================
       SIDEBAR ACTIVE
    ========================= */

    const menuItems = document.querySelectorAll(".menu-item");
    const currentPage = window.location.pathname.split("/").pop();

    menuItems.forEach(item => {

        const link = item.getAttribute("href");

        if (link && link.includes(currentPage)) {
            item.classList.add("active");
        }

    });

});