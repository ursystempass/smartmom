document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("timelineContainer");
    const tabs = document.querySelectorAll(".age-tab");
    const statusText = document.getElementById("statusMilestone");
    const progressBar = document.getElementById("progressBar");

    const milestones = {
        "0-3": ["Mengangkat Kepala","Tersenyum","Mengikuti Objek","Mengoceh"],
        "4-6": ["Tengkurap Stabil","Membalikkan Badan","Meraih Benda","Mengoceh Aktif"],
        "7-9": ["Duduk Sendiri","Merangkak","Memindahkan Benda","Meniru Suara"],
        "10-12": ["Berdiri","Melambaikan Tangan","Memanggil Mama","Belajar Jalan"]
    };

    function getAgeCategory() {
        const user = JSON.parse(localStorage.getItem("smartmom_user"));

        if (!user || !user.anak) return "0-3";

        const lahir = new Date(user.anak.tglLahir);
        const now = new Date();

        let bulan =
            (now.getFullYear() - lahir.getFullYear()) * 12 +
            (now.getMonth() - lahir.getMonth());

        if (bulan <= 3) return "0-3";
        if (bulan <= 6) return "4-6";
        if (bulan <= 9) return "7-9";
        return "10-12";
    }

    function render(age) {
        container.innerHTML = "";

        milestones[age].forEach((item, i) => {

            const card = document.createElement("div");
            card.className = "timeline-card";

            card.innerHTML = `
                <h4>${item}</h4>
                <img src="/smartmom/assets/baby.png">
                <label class="check-label">
                    <input type="checkbox" data-index="${i}">
                    Sudah tercapai
                </label>
            `;

            container.appendChild(card);
        });

        loadProgress(age);
    }

    function loadProgress(age) {

        let saved = JSON.parse(localStorage.getItem("milestone_" + age)) || [];

        const checkboxes = document.querySelectorAll("input[type=checkbox]");

        checkboxes.forEach((box, i) => {

            if (saved[i]) {
                box.checked = true;
                box.closest(".timeline-card").style.opacity = "0.5";
            }

            box.addEventListener("change", () => {

                saved[i] = box.checked;
                localStorage.setItem("milestone_" + age, JSON.stringify(saved));

                box.closest(".timeline-card").style.opacity =
                    box.checked ? "0.5" : "1";

                updateProgress(age);
            });
        });

        updateProgress(age);
    }

    function updateProgress(age) {

        const saved = JSON.parse(localStorage.getItem("milestone_" + age)) || [];

        const total = milestones[age].length;
        const done = saved.filter(v => v).length;

        statusText.innerText = done + "/" + total + " milestone tercapai";

        const percent = (done / total) * 100;
        progressBar.style.width = percent + "%";
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            render(tab.dataset.age);
        });
    });

    const defaultAge = getAgeCategory();
    render(defaultAge);

});