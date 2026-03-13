const tabs = document.querySelectorAll(".age-tab");
const container = document.getElementById("timelineContainer");

const milestones = {

    "0-3": [

        {
            title: "Mengangkat Kepala",
            img: "/assets/baby.png",
            desc: "Si kecil mulai mengangkat kepala saat tengkurap"
        },

        {
            title: "Tersenyum Sosial",
            img: "/assets/baby_1.png",
            desc: "Bayi mulai tersenyum saat melihat wajah orang tua"
        },

        {
            title: "Mengikuti Objek",
            img: "/assets/baby_2.png",
            desc: "Mata bayi mulai mengikuti benda bergerak"
        },

        {
            title: "Mengeluarkan Suara",
            img: "/assets/baby_3.png",
            desc: "Bayi mulai mengoceh suara sederhana"
        }

    ],

    "4-6": [

        {
            title: "Mengangkat Kepala",
            img: "/assets/baby.png",
            desc: "Si Kecil mulai bisa mengangkat kepalanya saat tengkurap"
        },

        {
            title: "Membalikkan Badan",
            img: "/assets/baby_1.png",
            desc: "Si Kecil mulai membalikkan badan"
        },

        {
            title: "Meraih Benda",
            img: "/assets/baby_2.png",
            desc: "Bayi mulai meraih mainan"
        },

        {
            title: "Mengeluarkan Ocehan",
            img: "/assets/baby_3.png",
            desc: "Bayi mulai mengoceh"
        }

    ],

    "7-9": [

        {
            title: "Duduk Tanpa Bantuan",
            img: "/assets/baby.png",
            desc: "Bayi mulai duduk sendiri"
        },

        {
            title: "Merangkak",
            img: "/assets/baby_1.png",
            desc: "Bayi mulai merangkak"
        },

        {
            title: "Memindahkan Benda",
            img: "/assets/baby_2.png",
            desc: "Bayi memindahkan benda dari satu tangan ke tangan lain"
        },

        {
            title: "Meniru Suara",
            img: "/assets/baby_3.png",
            desc: "Bayi meniru suara sederhana"
        }

    ],

    "10-12": [

        {
            title: "Berdiri Berpegangan",
            img: "/assets/baby.png",
            desc: "Bayi mulai berdiri dengan pegangan"
        },

        {
            title: "Melambaikan Tangan",
            img: "/assets/baby_1.png",
            desc: "Bayi mulai melambaikan tangan"
        },

        {
            title: "Memanggil Mama",
            img: "/assets/baby_2.png",
            desc: "Bayi mulai menyebut mama/papa"
        },

        {
            title: "Berjalan dengan Bantuan",
            img: "/assets/baby_3.png",
            desc: "Bayi mulai belajar berjalan"
        }

    ]

};


tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const age = tab.dataset.age;

        renderTimeline(age);

    });

});


function renderTimeline(age) {

    container.innerHTML = "";

    milestones[age].forEach(item => {

        const card = document.createElement("div");

        card.classList.add("timeline-card");

        card.innerHTML = `

<h3>${item.title}</h3>

<img src="${item.img}">

<p>${item.desc}</p>

`;

        container.appendChild(card);

    });

}