const transition = document.querySelector('page-transition');
const navLinks = document.querySelectorAll('nav a');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); 

    const targetId = link.getAttribute('href'); 
    const targetPage = document.querySelector(targetId);

    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));

    // Show transition
    //transition.show();

    setTimeout(() => {
      targetPage.classList.add('active');
      //transition.hide();
    }, 200); // Adjust the delay as needed
  });
});

// Mouse movement
document.getElementById("cards").onmousemove = e => {
  for(const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
}