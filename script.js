document.addEventListener('DOMContentLoaded', () => {

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- Hero Text Scroll ---
  const heroText = document.querySelector('.hero-content');
  const stepOneSection = document.getElementById('langkah-awal');

  if (heroText && stepOneSection) {
    heroText.style.cursor = 'pointer'; 
    heroText.addEventListener('click', () => {
      stepOneSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    });
  }

  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const currentItem = question.parentElement;

      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== currentItem) {
          item.classList.remove('open');
        }
      });

      currentItem.classList.toggle('open');
    });
  });
});
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("active");
}
