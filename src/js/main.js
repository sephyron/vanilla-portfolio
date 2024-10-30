
const transition = document.querySelector('page-transition');
const navLinks = document.querySelectorAll('nav a');
const pages = document.querySelectorAll('.page');
const selectedPage = document.querySelector('.page.active');
const selectedLink = document.querySelector('nav a.active');

navLinks.forEach(link => {
  const linkText = link.textContent.trim();
  const slug = `/${linkText.toLowerCase().replace(/\s+/g, '-')}`; // Create slug with 'bio/' prefix
  link.href = slug; 

  link.addEventListener('click', (event) => {
    event.preventDefault(); 
    const targetId = link.getAttribute('href').substring(1); // Remove the '#' 
    const targetPage = document.querySelector(`[id="${targetId}"]`);

    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    //this.classList.add('active');
    // Hide all links
    navLinks.forEach(link => link.classList.remove('active'));
    //selectedLink.classList.remove('active');
    
    window.history.pushState({}, '', targetId); 
    
    // Scroll to the top with smooth animation
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });

    setTimeout(() => {
      if (targetPage) {
        targetPage.classList.add('active');
        link.classList.add('active');
      } else {
        console.error('Target page not found:', targetId);
      }
    }, 200); 
  });
});




// Mouse movement
document.addEventListener('DOMContentLoaded', () => {
  const cardsContainers = [
    document.getElementById('bio'),
    document.getElementById('cards1'),
    document.getElementById('cards')
  ];

  cardsContainers.forEach(container => {
    container.onmousemove = e => {
      for (const card of container.querySelectorAll('.card')) { // Select cards within the container
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };
  });
});



// Select all cards
const cards = document.querySelectorAll('.card');
const cardData = [
  { 
    title: "Card 1 Title", 
    content: "This is the content for card 1.",
    contentURL: "/about.html" 
  },
  { 
    title: "Card 2 Title", 
    content: "This is the content for card 2.",
    contentURL: "/about.html"  
  },
  { 
    title: "Card 3 Title", 
    content: "This is the content for card 2.",
    contentURL: "/about.html"  
  },
  { 
    title: "Card 4 Title", 
    content: "This is the content for card 2.",
    contentURL: "/about.html"  
  },
  { 
    title: "Card 5 Title", 
    content: "This is the content for card 2.",
    contentURL: "/about.html"  
  },
  { 
    title: "Card 6 Title", 
    content: "This is the content for card 2.",
    contentURL: "/about.html"  
  },
  { 
    title: "Card 7 Title", 
    content: "This is the content for card 2.",
    contentURL: "/about.html"  
  },
  { 
    title: "Card 8 Title", 
    content: "This is the content for card 2.",
    contentURL: "/about.html"  
  },
  { 
    title: "Card 9 Title", 
    content: "This is the content for card 2.",
    contentURL: "/about.html"  
  }
];
// Add event listener to each card
cards.forEach(card => {
  card.addEventListener('click', async (event) => {
    event.stopPropagation();
    const index = card.dataset.cardIndex;
    const cardInfo = cardData[index]; 
    const modal = document.createElement('my-modal');

    try {
      // Fetch the HTML content from the URL
      const response = await fetch(cardInfo.contentURL);
      const htmlContent = await response.text();

      // Update the modal's content
      modal.innerHTML = `
        <span slot="content">
          <h2>${cardInfo.title}</h2>
          <div>${htmlContent}</div> 
        </span>
      `;
    } catch (error) {
      console.error('Error fetching content:', error);
      // Handle the error, e.g., display an error message in the modal
      modal.innerHTML = `
        <span slot="content">
          <h2>Error</h2>
          <p>Failed to load content.</p>
        </span>
      `;
    }

    document.body.appendChild(modal);
    modal.open();
  });
});
