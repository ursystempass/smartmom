const genderButtons = document.querySelectorAll(".gender");

genderButtons.forEach(btn => {

btn.addEventListener("click", () => {

genderButtons.forEach(b => b.classList.remove("active"));

btn.classList.add("active");

});

});