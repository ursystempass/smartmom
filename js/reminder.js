// ==============================
// FILTER TAB
// ==============================

const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const filter = tab.dataset.filter;

        const items = document.querySelectorAll(".future-card");

        items.forEach(item => {
            if (filter === "all" || item.dataset.category === filter) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });

    });
});


// ==============================
// LOAD & RENDER DATA
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("futureList");

    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    container.innerHTML = "";

    if (reminders.length === 0) {
        container.innerHTML = "<p style='color:#777;'>Belum ada reminder 😢</p>";
        return;
    }

    reminders.forEach((reminder, index) => {

        const card = document.createElement("div");

        card.classList.add("future-card");
        card.setAttribute("data-category", reminder.kategori);

        // kalau sudah selesai
        if (reminder.done) {
            card.style.opacity = "0.5";
        }

        card.innerHTML = `
            <div class="future-icon">
                <img src="/smartmom/assets/ico pengingat1.png">
            </div>

            <div class="future-info">
                <b>${reminder.tanggal}</b>
                <p>${reminder.judul}</p>
                <span>${reminder.keterangan}</span>
            </div>

            <button class="btn-done" data-index="${index}">
                ${reminder.done ? "✔ Selesai" : "Selesai"}
            </button>
        `;

        container.appendChild(card);

    });

});


// ==============================
// HANDLE BUTTON SELESAI
// ==============================

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("btn-done")) {

        const index = e.target.dataset.index;

        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

        reminders[index].done = true;

        localStorage.setItem("reminders", JSON.stringify(reminders));

        // update UI langsung
        e.target.innerText = "✔ Selesai";
        e.target.style.background = "#b2ffb2";

        const card = e.target.closest(".future-card");
        card.style.opacity = "0.5";

    }

});