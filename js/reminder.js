
const tabs = document.querySelectorAll(".tab");
const reminders = document.querySelectorAll(".reminder-item");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const filter = tab.dataset.filter;

        reminders.forEach(item => {

            if (filter === "all" || item.dataset.category === filter) {
                item.style.display = "flex";
            }
            else {
                item.style.display = "none";
            }

        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("futureList");

    const reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    container.innerHTML = "";

    reminders.forEach(reminder => {

        const card = document.createElement("div");

        card.classList.add("future-card");

        card.setAttribute("data-category", reminder.kategori);

        card.innerHTML = `
<div class="future-icon">
<img src="/assets/ico pengingat1.png">
</div>

<div class="future-info">

<b>${reminder.tanggal}</b>

<p>${reminder.judul}</p>

<span>${reminder.keterangan}</span>

</div>
`;

        container.appendChild(card);

    });

});