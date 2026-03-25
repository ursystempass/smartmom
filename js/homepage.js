document.addEventListener("DOMContentLoaded", function () {

    const BASE = "/smartmom/html/";

    const loginStatus = localStorage.getItem("login_status");

    if (loginStatus !== "true") {
        window.location.href = BASE + "sign in.html";
        return;
    }

    const user = JSON.parse(localStorage.getItem("smartmom_user"));

    if (!user) {
        window.location.href = BASE + "sign in.html";
        return;
    }

    const logoText = document.querySelector(".logo span");

    if (logoText && user.nama) {
        logoText.innerText = "Hi, " + user.nama;
    }

    const timelineList = document.getElementById("timelineList");
    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");

    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    if (reminders.length === 0) {
        reminders = [
            { judul: "Belum isi kalkulator bulan ini", tanggal: "28 January", done: false },
            { judul: "Update berat badan bulan ini", tanggal: "-", done: true },
            { judul: "Fokus stimulasi merangkak", tanggal: "-", done: false }
        ];
        localStorage.setItem("reminders", JSON.stringify(reminders));
    }

    if (timelineList) {
        timelineList.innerHTML = "";

        let doneCount = 0;

        reminders.slice(0, 5).forEach(reminder => {

            if (reminder.done) doneCount++;

            const item = document.createElement("div");
            item.classList.add("timeline-item");

            item.innerHTML = `
                <div class="circle ${reminder.done ? "done" : ""}"></div>

                <div class="card-reminder">
                    <span>${reminder.judul}</span>
                    <small>${reminder.tanggal}</small>
                </div>
            `;

            timelineList.appendChild(item);
        });

        if (progressText) {
            progressText.innerText = `${doneCount} dari ${reminders.length} selesai`;
        }

        if (progressFill) {
            const percent = (doneCount / reminders.length) * 100;
            progressFill.style.width = percent + "%";
        }
    }

    const data = user.anak;

    const emptyState = document.getElementById("emptyState");
    const cardsSection = document.getElementById("cardsSection");

    if (!data || !data.tglLahir || !data.pengukuran) {

        if (emptyState) emptyState.style.display = "block";
        if (cardsSection) cardsSection.style.display = "none";

    } else {

        if (emptyState) emptyState.style.display = "none";
        if (cardsSection) cardsSection.style.display = "grid";

        const lahir = new Date(data.tglLahir);
        const sekarang = new Date();

        let usiaBulan =
            (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
            (sekarang.getMonth() - lahir.getMonth());

        const usiaEl = document.getElementById("usiaAnak");

        if (usiaEl) {
            usiaEl.innerText = usiaBulan + " bulan";
        }

        if (data.pengukuran && data.pengukuran.length > 0) {
            const terakhir = data.pengukuran[data.pengukuran.length - 1];

            const updateEl = document.getElementById("updateTerakhir");

            if (updateEl) {
                updateEl.innerText = terakhir.tgl;
            }
        }
    }

    function initMilestone() {
        const total = document.querySelectorAll(".milestone-item input").length;
        const checked = document.querySelectorAll(".milestone-item input:checked").length;
        const progressText = document.getElementById("milestoneProgressText");

        if (progressText) {
            progressText.textContent = `${checked}/${total} Terselesaikan`;
        }
    }

    initMilestone();

    const logoutBtn = document.getElementById("logoutBtn");
    const popup = document.getElementById("logoutPopup");
    const cancelBtn = document.getElementById("cancelLogout");
    const confirmBtn = document.getElementById("confirmLogout");

    if (logoutBtn && popup) {
        logoutBtn.addEventListener("click", () => popup.classList.add("active"));
    }

    if (cancelBtn && popup) {
        cancelBtn.addEventListener("click", () => popup.classList.remove("active"));
    }

    if (confirmBtn) {
        confirmBtn.addEventListener("click", function () {
            localStorage.removeItem("login_status");
            window.location.href = BASE + "landingpage.html";
        });
    }

    const menuItems = document.querySelectorAll(".menu-item");
    const currentPage = window.location.pathname.split("/").pop();

    menuItems.forEach(item => {
        const link = item.getAttribute("href");
        if (link && link.includes(currentPage)) {
            item.classList.add("active");
        }
    });

});
