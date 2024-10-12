
const transition = document.querySelector('page-transition');
const navLinks = document.querySelectorAll('nav a');
const pages = document.querySelectorAll('.page');
const selectedPage = document.querySelector('.page.active');
const selectedLink = document.querySelector('nav a.active');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); 
   
    const targetId = link.getAttribute('href'); 
    const targetPage = document.querySelector(targetId);

    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    //this.classList.add('active');
    // Hide all links
    navLinks.forEach(link => link.classList.remove('active'));
    //selectedLink.classList.remove('active');
  
  

    // Show transition
    //transition.show();
    
    setTimeout(() => {
      targetPage.classList.add('active');
      link.classList.add('active');
      //navLinks.forEach(link => link.classList.add('active'));
      //transition.hide();
    }, 200); // Adjust the delay as needed
  });
});

// Mouse movement
document.getElementsByClassName("cards").onmousemove = e => {
  for (const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};
// Select all cards
const cards = document.querySelectorAll('.card');
const cardData = [
  { 
    title: "Card 1 Title", 
    content: "This is the content for card 1." 
  },
  { 
    title: "Card 2 Title", 
    content: "This is the content for card 2." 
  },
  { 
    title: "Card 3 Title", 
    content: "This is the content for card 2." 
  },
  { 
    title: "Card 4 Title", 
    content: "This is the content for card 2." 
  },
  { 
    title: "Card 5 Title", 
    content: "This is the content for card 2." 
  },
  { 
    title: "Card 6 Title", 
    content: "This is the content for card 2." 
  },
  { 
    title: "Card 7 Title", 
    content: "This is the content for card 2." 
  },
  { 
    title: "Card 8 Title", 
    content: "This is the content for card 2." 
  },
  { 
    title: "Card 9 Title", 
    content: "This is the content for card 2." 
  }
];
// Add event listener to each card
cards.forEach(card => {
  card.addEventListener('click', (event) => {
    // Prevent the click event from propagating to the parent container
    event.stopPropagation();
    const index = card.dataset.cardIndex;
    const cardInfo = cardData[index]; // Or access by ID if using that method
    const modal = document.createElement('my-modal');
    modal.innerHTML = `
      <span slot="content">
        <h2>${cardInfo.title}</h2>
        <p>${cardInfo.content}</p>
      </span>
    `;
    document.body.appendChild(modal);
    modal.open();
  });
});