document.getElementById("simpanReminder").addEventListener("click", () => {

    const kategori = document.getElementById("kategori").value;
    const tanggal = document.getElementById("tanggal").value;
    const judul = document.getElementById("judul").value;
    const keterangan = document.getElementById("keterangan").value;

    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    reminders.push({
        kategori: kategori,
        tanggal: tanggal,
        judul: judul,
        keterangan: keterangan
    });

    localStorage.setItem("reminders", JSON.stringify(reminders));
    window.location.href = "/html/reminder.html";

});